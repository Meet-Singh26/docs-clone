import { Liveblocks } from "@liveblocks/node";
import { ConvexHttpClient } from "convex/browser";
import { auth, currentUser, clerkClient } from "@clerk/nextjs/server";
import { api } from "../../../../convex/_generated/api";

const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL!);
const liveblocks = new Liveblocks({
  secret: process.env.LIVEBLOCKS_SECRET_KEY!,
});

export async function POST(req: Request) {
  const { userId, orgId } = await auth();

  if (!userId) {
    console.error("Liveblocks Auth: No userId found");
    return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 });
  }

  const user = await currentUser();

  if (!user) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 });
  }

  const { room } = await req.json();
  console.log(`Liveblocks Auth: Attempting to auth user ${userId} for room ${room}`);

  const document = await convex.query(api.documents.getById, { id: room });

  if (!document) {
    console.error(`Liveblocks Auth: Document ${room} not found in Convex`);
    return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 });
  }

  const isOwner = document.ownerId === user.id;

  // Primary check: orgId from active session
  let isOrganizationMember = !!(
    document.organizationId && document.organizationId === orgId
  );

  // Fallback: if the session orgId doesn't match (e.g. user opened the doc without
  // switching the active org), verify membership directly via the Clerk API.
  if (!isOrganizationMember && document.organizationId) {
    try {
      const clerk = await clerkClient();
      const membership = await clerk.organizations.getOrganizationMembershipList({
        organizationId: document.organizationId,
      });
      isOrganizationMember = membership.data.some(
        (m) => m.publicUserData?.userId === userId
      );
    } catch (err) {
      console.error("Liveblocks Auth: Failed to fetch org membership from Clerk", err);
    }
  }

  if (!isOwner && !isOrganizationMember) {
    console.error(`Liveblocks Auth: User ${userId} is not owner or org member of ${room}`);
    return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 });
  }

  const name = user.fullName ?? user.primaryEmailAddress?.emailAddress ?? "Anonymous";
  const nameToNumber = name.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0);
  const hue = Math.abs(nameToNumber) % 360
  const color = `hsl(${hue}, 80%, 60%)`;
  
  const session = liveblocks.prepareSession(user.id, {
    userInfo: {
      name,
      avatar: user.imageUrl,
      color,
    },
  });
  session.allow(room, session.FULL_ACCESS);
  const { body, status } = await session.authorize();

  if (status !== 200) {
    console.error(`Liveblocks Auth: Liveblocks API returned status ${status}. Check your LIVEBLOCKS_SECRET_KEY.`);
  }

  return new Response(body, { status });
}
