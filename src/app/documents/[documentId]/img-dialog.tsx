import { useEditorStore } from "@/store/use-editor-store";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../../../components/ui/dialog";
import { Input } from "../../../components/ui/input";
import { Button } from "../../../components/ui/button";

export const ImageDialog = ({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
}) => {
  const { editor } = useEditorStore();
  const [imageUrl, setImageUrl] = useState("");

  const onChange = (src: string) => {
    editor?.chain().focus().setImage({ src }).run();
    editor?.chain().focus().createParagraphNear().run();
  };

  const handleImageUrlSubmit = () => {
    if (!imageUrl) return;

    onChange(imageUrl);
    setImageUrl("");
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Insert image URL</DialogTitle>
        </DialogHeader>

        <Input
          placeholder="Insert image URL"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") handleImageUrlSubmit();
          }}
        />

        <DialogFooter>
          <Button onClick={handleImageUrlSubmit}>Insert</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
