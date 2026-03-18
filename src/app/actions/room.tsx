"use server";

import { Liveblocks } from "@liveblocks/node";

const liveblocks = new Liveblocks({
  secret: process.env.LIVEBLOCKS_SECRET_KEY as string,
});

export async function deleteLiveblocksRoom(roomId: string) {
  try {
    // Under the hood, this uses fetch() to send a DELETE request to Liveblocks.
    // We wrap it in a Promise execution context to ensure it completes before returning.
    await liveblocks.deleteRoom(roomId);
    return { success: true };
  } catch (error) {
    console.error("Error deleting liveblocks room:", error);
    return { success: false, error: "Failed to delete room" };
  }
}
