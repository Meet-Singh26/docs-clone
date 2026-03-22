# NexDocs

NexDocs is a high-performance, real-time collaborative document editor. Built for modern teams, it provides a seamless writing experience with instant synchronization, organization management, and a robust rich-text engine.

## ✨ Essentials

- **Real-time Collaboration**: Simultaneous editing with live cursors, selection highlights, and presence indicators powered by **Liveblocks**.
- **Advanced Rich Text**: A powerful editor engine based on **Tiptap**, supporting tables, floating toolbars, image uploads, and complex formatting.
- **Context-Aware AI**: Integrated AI assistant to help with drafting, summarizing, and refining content.
- **Organizational Focus**: Full support for Clerk Organizations, allowing teams to manage shared workspaces and personal documents.
- **Modern Infrastructure**: A "Thin Backend" architecture using **Convex** for reactive data storage and instant API updates.
- **Adaptive Design**: Fully responsive UI with a premium dark/light mode system and custom-themed Clerk components.

## 🚀 Tech Stack

- **Framework**: [Next.js 15](https://nextjs.org/) (App Router, React 19)
- **Real-time Engine**: [Liveblocks](https://liveblocks.io/) (WebSockets, CRDTs)
- **Database**: [Convex](https://www.convex.dev/) (Reactive Backend-as-a-Service)
- **Auth**: [Clerk](https://clerk.com/) (User & Org Management)
- **Editor**: [Tiptap](https://tiptap.dev/) (Headless Rich Text Engine)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/), [Shadcn UI](https://ui.shadcn.com/)
- **Icons**: [Lucide React](https://lucide.dev/)

## 🛠️ Getting Started

### 1. Clone & Install
```bash
git clone https://github.com/Meet-Singh26/docs-clone.git
cd docs-clone
npm install
```

### 2. Configure Environment
Create a `.env.local` file with the following:
```env
# Convex
NEXT_PUBLIC_CONVEX_URL=your_convex_url

# Clerk
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_pub_key
CLERK_SECRET_KEY=your_clerk_secret_key

# Liveblocks
LIVEBLOCKS_SECRET_KEY=your_liveblocks_secret_key
```

### 3. Initialize Backend
```bash
npx convex dev
```

### 4. Start Development
```bash
npm run dev
```

Visit `http://localhost:3000` to see your local instance of NexDocs.

## 🏗️ Project Structure
- `/src/app`: Next.js 15 App Router (Home & Document routes)
- `/src/components`: Premium UI components & Editor extensions
- `/src/hooks`: Custom hooks for editor state and navigation
- `/convex`: Backend schema and mutations
- `/public`: Static assets and branding
