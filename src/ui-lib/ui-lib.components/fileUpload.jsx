import { encodeFileToBase64 } from "@/utils/convertTo64";
import { Input } from "@chakra-ui/react";
import React, { useRef } from "react";

export const FileUpload = ({ inputRef, onFileSelect, ...inputProps }) => {
  //   const inputRef = useRef(null);
  //   console.log({ inputRef });
  const handleFileChange = async (event) => {
    const selectedFile = event.target.files[0];

    let preview;

    if (selectedFile) {
      try {
        const reader = new FileReader();
        const base64 = await encodeFileToBase64(selectedFile);

        if (selectedFile.type.startsWith("image/")) {
          if (onFileSelect) {
            onFileSelect({
              selectedFile,
              base64,
              preview: base64,
              error: null,
            });
          }

          reader.readAsDataURL(selectedFile);
        } else {
          preview = null;
          if (onFileSelect) {
            onFileSelect({ selectedFile, base64, preview, error: null });
          }
        }

        // Pass selected file to parent component
      } catch (error) {
        console.error("Error reading the file:", error);
        if (onFileSelect) {
          onFileSelect({
            selectedFile: selectedFile || null,
            base64: null,
            preview: null,
            error,
          });
        }
      }
    }
  };

  return (
    <Input
      type="file"
      onChange={handleFileChange}
      opacity={0}
      position="absolute"
      w="full"
      h="full"
      top="0"
      left="0"
      cursor="pointer"
      accept=".doc,.docx,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document, application/pdf"
      {...inputProps}
      ref={inputRef}
    />
  );
};
