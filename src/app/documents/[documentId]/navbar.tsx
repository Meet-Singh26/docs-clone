"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

// icons
import { BsFilePdf, BsSubscript, BsSuperscript } from "react-icons/bs";
import {
  BoldIcon,
  FileIcon,
  FileJsonIcon,
  FilePenIcon,
  FilePlusIcon,
  FileTextIcon,
  FileType2Icon,
  GlobeIcon,
  ItalicIcon,
  PrinterIcon,
  Redo2Icon,
  RemoveFormattingIcon,
  SearchIcon,
  StrikethroughIcon,
  TextIcon,
  TrashIcon,
  UnderlineIcon,
  Undo2Icon,
  UploadIcon,
} from "lucide-react";

import { RenameDialog } from "@/components/rename-dialog";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarShortcut,
  MenubarSub,
  MenubarSubContent,
  MenubarSubTrigger,
  MenubarTrigger,
} from "@/components/ui/menubar";

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

import { Avatars } from "./avatars";

import { DocumentInput } from "./document-input";
import { useEditorStore } from "@/store/use-editor-store";
import { OrganizationSwitcher, UserButton } from "@clerk/nextjs";
import { Inbox } from "./inbox";
import { Doc } from "../../../../convex/_generated/dataModel";
import { useMutation } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { RemoveDialog } from "@/components/remove-dialog";
import { useImageUpload } from "@/hooks/use-image-upload";
import { ImageDialog } from "./img-dialog";

interface NavbarProps {
  data: Doc<"documents">;
}

export const Navbar = ({ data }: NavbarProps) => {
  const router = useRouter();
  const { editor } = useEditorStore();

  const { handleUpload } = useImageUpload();
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const [customTableOpen, setCustomTableOpen] = useState(false);
  const [customRows, setCustomRows] = useState("3");
  const [customCols, setCustomCols] = useState("3");

  const mutation = useMutation(api.documents.create);
  const onNewDocument = () => {
    mutation({
      title: "Untitled Document",
      initialContent: "",
    })
      .then((id) => {
        toast.success("Document created");
        router.push(`/documents/${id}`);
      })
      .catch(() => toast.error("Something went wrong"));
  };

  const insertTable = ({ rows, cols }: { rows: number; cols: number }) => {
    editor
      ?.chain()
      .focus()
      .insertTable({ rows, cols, withHeaderRow: false })
      .run();
  };

  const onDownload = (blob: Blob, filename: string) => {
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  };

  const onSaveJson = () => {
    if (!editor) return;

    const content = editor.getJSON();
    const blob = new Blob([JSON.stringify(content)], {
      type: "application/json",
    });
    onDownload(blob, `${data.title}.json`);
  };

  const onSaveHTML = () => {
    if (!editor) return;

    const content = editor.getHTML();
    const blob = new Blob([content], {
      type: "text/html",
    });
    onDownload(blob, `${data.title}.html`);
  };

  const onSaveText = () => {
    if (!editor) return;

    const content = editor.getText();
    const blob = new Blob([content], {
      type: "text/plain",
    });
    onDownload(blob, `${data.title}.txt`);
  };

  const onSaveWord = () => {
    if (!editor) return;

    const html = editor.getHTML();

    // Basic inline styles so the Word document looks reasonable out of the box
    const styles = `
      <style>
        body { font-family: Calibri, Arial, sans-serif; font-size: 11pt; margin: 1in; }
        h1 { font-size: 20pt; font-weight: bold; }
        h2 { font-size: 16pt; font-weight: bold; }
        h3 { font-size: 14pt; font-weight: bold; }
        table { border-collapse: collapse; width: 100%; }
        td, th { border: 1px solid #000; padding: 4px 8px; }
        th { background-color: #c7c7c7; font-weight: bold; }
        ul { list-style-type: disc; }
        ol { list-style-type: decimal; }
      </style>
    `;

    const wordHtml = `
      <html xmlns:o="urn:schemas-microsoft-com:office:office"
            xmlns:w="urn:schemas-microsoft-com:office:word"
            xmlns="http://www.w3.org/TR/REC-html40">
        <head>
          <meta charset="utf-8">
          <title>${data.title}</title>
          <!--[if gte mso 9]>
            <xml>
              <w:WordDocument>
                <w:View>Print</w:View>
                <w:Zoom>100</w:Zoom>
              </w:WordDocument>
            </xml>
          <![endif]-->
          ${styles}
        </head>
        <body>${html}</body>
      </html>
    `;

    // BOM prefix ensures Word reads UTF-8 correctly
    onDownload(
      new Blob(["﻿", wordHtml], { type: "application/msword" }),
      `${data.title}.doc`,
    );
  };

  return (
    <nav className="flex items-center justify-between">
      <div className="flex gap-2 items-center">
        <Link href="/">
          <Image src={"/logo.svg"} alt="logo" width={36} height={36} />
        </Link>
        <div className="flex flex-col">
          <DocumentInput title={data.title} id={data._id} />
          <div className="flex">
            <Menubar className="border-none bg-transparent shadow-none h-auto p-0">
              <MenubarMenu>
                <MenubarTrigger className="text-sm font-normal py-0.5 px-[7px] rounded-sm hover:bg-muted h-auto">
                  File
                </MenubarTrigger>
                <MenubarContent className="print:hidden">
                  <MenubarSub>
                    <MenubarSubTrigger>
                      <FileIcon className="size-4 mr-2" /> Save
                    </MenubarSubTrigger>
                    <MenubarSubContent>
                      <MenubarItem onClick={onSaveJson}>
                        <FileJsonIcon className="size-4 mr-2" />
                        JSON
                      </MenubarItem>
                      <MenubarItem onClick={onSaveHTML}>
                        <GlobeIcon className="size-4 mr-2" />
                        HTML
                      </MenubarItem>
                      <MenubarItem onClick={() => window.print()}>
                        <BsFilePdf className="size-4 mr-2" />
                        PDF
                      </MenubarItem>
                      <MenubarItem onClick={onSaveText}>
                        <FileTextIcon className="size-4 mr-2" />
                        Text
                      </MenubarItem>
                      <MenubarItem onClick={onSaveWord}>
                        <FileType2Icon className="size-4 mr-2" />
                        Word (.doc)
                      </MenubarItem>
                    </MenubarSubContent>
                  </MenubarSub>
                  <MenubarItem onClick={onNewDocument}>
                    <FilePlusIcon className="mr-2 size-4" />
                    New Document
                  </MenubarItem>
                  <MenubarSeparator />
                  <RenameDialog documentId={data._id} initialTitle={data.title}>
                    <MenubarItem
                      onClick={(e) => e.stopPropagation()}
                      onSelect={(e) => e.preventDefault()}
                    >
                      <FilePenIcon className="mr-2 size-4" />
                      Rename
                    </MenubarItem>
                  </RenameDialog>
                  <RemoveDialog documentId={data._id}>
                    <MenubarItem
                      onClick={(e) => e.stopPropagation()}
                      onSelect={(e) => e.preventDefault()}
                    >
                      <TrashIcon className="mr-2 size-4" />
                      Remove
                    </MenubarItem>
                  </RemoveDialog>
                  <MenubarSeparator />
                  <MenubarItem onClick={() => window.print()}>
                    <PrinterIcon className="mr-2 size-4" />
                    Print <MenubarShortcut>CTRL + P</MenubarShortcut>
                  </MenubarItem>
                </MenubarContent>
              </MenubarMenu>
              <MenubarMenu>
                <MenubarTrigger className="text-sm font-normal py-0.5 px-[7px] rounded-sm hover:bg-muted h-auto">
                  Edit
                </MenubarTrigger>
                <MenubarContent>
                  <MenubarItem
                    onClick={() => editor?.chain().focus().undo().run()}
                  >
                    <Undo2Icon className="mr-2 size-4" />
                    Undo <MenubarShortcut>CTRL + Z</MenubarShortcut>
                  </MenubarItem>
                  <MenubarItem
                    onClick={() => editor?.chain().focus().redo().run()}
                  >
                    <Redo2Icon className="mr-2 size-4" />
                    Redo <MenubarShortcut>CTRL + Y</MenubarShortcut>
                  </MenubarItem>
                </MenubarContent>
              </MenubarMenu>
              <MenubarMenu>
                <MenubarTrigger className="text-sm font-normal py-0.5 px-[7px] rounded-sm hover:bg-muted h-auto">
                  Insert
                </MenubarTrigger>
                <MenubarContent>
                  <MenubarSub>
                    <MenubarSubTrigger>Image</MenubarSubTrigger>
                    <MenubarSubContent>
                      <MenubarItem onClick={handleUpload}>
                        <UploadIcon className="size-4 mr-2" />
                        Upload Image
                      </MenubarItem>
                      <MenubarItem onClick={() => setIsDialogOpen(true)}>
                        <SearchIcon className="size-4 mr-2" />
                        Paste Image URL
                      </MenubarItem>
                    </MenubarSubContent>
                  </MenubarSub>
                  <MenubarSub>
                    <MenubarSubTrigger>Table</MenubarSubTrigger>
                    <MenubarSubContent>
                      <MenubarItem
                        onClick={() => insertTable({ rows: 1, cols: 1 })}
                      >
                        1 x 1
                      </MenubarItem>
                      <MenubarItem
                        onClick={() => insertTable({ rows: 2, cols: 2 })}
                      >
                        2 x 2
                      </MenubarItem>
                      <MenubarItem
                        onClick={() => insertTable({ rows: 4, cols: 4 })}
                      >
                        4 x 4
                      </MenubarItem>
                      <MenubarItem
                        onClick={() => insertTable({ rows: 4, cols: 6 })}
                      >
                        4 x 6
                      </MenubarItem>

                      <MenubarSeparator />

                      <MenubarItem
                        onClick={(e) => {
                          e.preventDefault();
                          setCustomTableOpen(true);
                        }}
                        onSelect={(e) => e.preventDefault()}
                      >
                        Custom size…
                      </MenubarItem>
                    </MenubarSubContent>
                  </MenubarSub>
                </MenubarContent>
              </MenubarMenu>
              <MenubarMenu>
                <MenubarTrigger className="text-sm font-normal py-0.5 px-[7px] rounded-sm hover:bg-muted h-auto">
                  Format
                </MenubarTrigger>
                <MenubarContent>
                  <MenubarSub>
                    <MenubarSubTrigger>
                      <TextIcon className="size-4 mr-2" />
                      Text
                    </MenubarSubTrigger>
                    <MenubarSubContent>
                      <MenubarItem
                        onClick={() =>
                          editor?.chain().focus().toggleBold().run()
                        }
                      >
                        <BoldIcon className="size-4 mr-2" />
                        Bold
                      </MenubarItem>
                      <MenubarItem
                        onClick={() =>
                          editor?.chain().focus().toggleItalic().run()
                        }
                      >
                        <ItalicIcon className="size-4 mr-2" />
                        Italic
                      </MenubarItem>
                      <MenubarItem
                        onClick={() =>
                          editor?.chain().focus().toggleUnderline().run()
                        }
                      >
                        <UnderlineIcon className="size-4 mr-2" />
                        Underline
                      </MenubarItem>
                      <MenubarItem
                        onClick={() =>
                          editor?.chain().focus().toggleStrike().run()
                        }
                      >
                        <StrikethroughIcon className="size-4 mr-2" />
                        Strikethrough
                      </MenubarItem>
                      <MenubarItem
                        onClick={() =>
                          editor?.chain().focus().toggleSubscript().run()
                        }
                      >
                        <BsSubscript className="size-4 mr-2" />
                        Subscript
                      </MenubarItem>
                      <MenubarItem
                        onClick={() =>
                          editor?.chain().focus().toggleSuperscript().run()
                        }
                      >
                        <BsSuperscript className="size-4 mr-2" />
                        Superscript
                      </MenubarItem>
                    </MenubarSubContent>
                  </MenubarSub>
                  <MenubarItem
                    onClick={() =>
                      editor?.chain().focus().unsetAllMarks().run()
                    }
                  >
                    <RemoveFormattingIcon className="size-4 mr-2" />
                    Clear formatting
                  </MenubarItem>
                </MenubarContent>
              </MenubarMenu>
            </Menubar>
          </div>
        </div>
      </div>
      <div className="flex gap-3 items-center pl-6">
        <Avatars />
        <Inbox />
        <OrganizationSwitcher
          afterCreateOrganizationUrl="/"
          afterLeaveOrganizationUrl="/"
          afterSelectOrganizationUrl="/"
          afterSelectPersonalUrl="/"
        />
        <UserButton />
      </div>

      <Dialog open={customTableOpen} onOpenChange={setCustomTableOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Insert custom table</DialogTitle>
          </DialogHeader>
          <div className="grid grid-cols-2 gap-4 py-2">
            <div className="flex flex-col gap-1">
              <Label htmlFor="rows">Rows</Label>
              <Input
                id="rows"
                type="number"
                min={1}
                max={50}
                value={customRows}
                onChange={(e) => setCustomRows(e.target.value)}
              />
            </div>
            <div className="flex flex-col gap-1">
              <Label htmlFor="cols">Columns</Label>
              <Input
                id="cols"
                type="number"
                min={1}
                max={50}
                value={customCols}
                onChange={(e) => setCustomCols(e.target.value)}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="ghost" onClick={() => setCustomTableOpen(false)}>
              Cancel
            </Button>
            <Button
              onClick={() => {
                const rows = Math.max(
                  1,
                  Math.min(50, parseInt(customRows) || 3),
                );
                const cols = Math.max(
                  1,
                  Math.min(50, parseInt(customCols) || 3),
                );
                insertTable({ rows, cols });
                setCustomTableOpen(false);
              }}
            >
              Insert
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      <ImageDialog open={isDialogOpen} setOpen={setIsDialogOpen} />
    </nav>
  );
};
