"use client";

import { BubbleMenu } from "@tiptap/react";
import { Editor } from "@tiptap/react";
import { cn } from "@/lib/utils";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

// ─────────────────────────────────────────────────────────────────────────────
// TableToolbar
//
// A floating bubble menu that appears whenever the cursor is inside a table.
// It uses TipTap's built-in BubbleMenu (positioned automatically near the
// selection) and exposes the most common table operations.
// ─────────────────────────────────────────────────────────────────────────────

interface TableToolbarProps {
  editor: Editor | null;
}

interface TableActionBtn {
  label: string;
  shortLabel: string;
  onClick: () => void;
  disabled?: boolean;
  danger?: boolean;
}

export const TableToolbar = ({ editor }: TableToolbarProps) => {
  if (!editor) return null;

  const actions: TableActionBtn[] = [
    {
      label: "Insert column before",
      shortLabel: "Col ←",
      onClick: () => editor.chain().focus().addColumnBefore().run(),
    },
    {
      label: "Insert column after",
      shortLabel: "Col →",
      onClick: () => editor.chain().focus().addColumnAfter().run(),
    },
    {
      label: "Delete column",
      shortLabel: "Del Col",
      onClick: () => editor.chain().focus().deleteColumn().run(),
      danger: true,
    },
    {
      label: "Insert row above",
      shortLabel: "Row ↑",
      onClick: () => editor.chain().focus().addRowBefore().run(),
    },
    {
      label: "Insert row below",
      shortLabel: "Row ↓",
      onClick: () => editor.chain().focus().addRowAfter().run(),
    },
    {
      label: "Delete row",
      shortLabel: "Del Row",
      onClick: () => editor.chain().focus().deleteRow().run(),
      danger: true,
    },
    {
      label: "Merge cells",
      shortLabel: "Merge 🔗",
      onClick: () => editor.chain().focus().mergeCells().run(),
      disabled: !editor.can().mergeCells(),
    },
    {
      label: "Split cell",
      shortLabel: "Split ✂️",
      onClick: () => editor.chain().focus().splitCell().run(),
      disabled: !editor.can().splitCell(),
    },
    {
      label: "Delete table",
      shortLabel: "Del Table",
      onClick: () => editor.chain().focus().deleteTable().run(),
      danger: true,
    },
  ];

  return (
    <BubbleMenu
      editor={editor}
      pluginKey="tableToolbar"
      // Only show when the cursor is anywhere inside a table node
      shouldShow={({ editor: e }) => e.isActive("table")}
      tippyOptions={{
        placement: "top",
        offset: [0, 8],
        maxWidth: "none",
        zIndex: 40,
      }}
    >
      <TooltipProvider delayDuration={300}>
        <div className="grid grid-cols-3 items-center gap-0.5 bg-white border border-neutral-200 rounded-lg shadow-xl p-1 max-w-[90vw]">
          {actions.map((action, i) => (
            <Tooltip key={action.label}>
              {/* FIX: TooltipTrigger IS the button — avoids nested <button> */}
              <TooltipTrigger
                onClick={action.onClick}
                disabled={action.disabled}
                className={cn(
                  "h-7 px-2 text-xs font-medium rounded-md whitespace-nowrap transition-colors",
                  "disabled:opacity-40 disabled:pointer-events-none",
                  action.danger
                    ? "hover:bg-red-50 hover:text-red-600 text-neutral-600"
                    : "hover:bg-neutral-100 text-neutral-700",
                )}
              >
                {action.shortLabel}
              </TooltipTrigger>
              <TooltipContent side="top">
                <p className="text-xs">{action.label}</p>
              </TooltipContent>
            </Tooltip>
          ))}
        </div>
      </TooltipProvider>
    </BubbleMenu>
  );
};
