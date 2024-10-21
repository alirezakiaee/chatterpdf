"use client";

import { use, useCallback } from "react";
import { useDropzone } from "react-dropzone";

function FileUploader() {
  const onDrop = useCallback((acceptedFiles: File[]) => {
    console.log(acceptedFiles);
  }, []);
  const { getRootProps, getInputProps, isDragActive, isFocused } = useDropzone({
    onDrop,
  });

  return (
    <div className="flex flex-col gap-4 items-center max-w-7xl mx-auto">
      <div
        {...getRootProps()}
        className={`flex items-center justify-center p-10 border-2 border-dashed mt-10 w-[90%] border-indigo-400 rounded-xl h-96 text-indigo-500`}
      >
        <input {...getInputProps()} />
        {isDragActive ? (
          <p>Drop the files here ...</p>
        ) : (
          <p>Drag and drop some files here, or click to select files</p>
        )}
      </div>
    </div>
  );
}

export default FileUploader;
