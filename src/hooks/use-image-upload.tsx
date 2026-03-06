import { useEditorStore } from "@/store/use-editor-store";

export const useImageUpload = () => {
  const { editor } = useEditorStore();

  const handleUpload = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";

    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];

      if (!file) return;

      const imageUrl = URL.createObjectURL(file);

      editor?.chain().focus().setImage({ src: imageUrl }).run();
      editor?.chain().focus().createParagraphNear().run();
    };

    input.click();
  };

  return { handleUpload };
};