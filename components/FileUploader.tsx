"use client";

import { CircleArrowDown, CircleArrowDownIcon, RocketIcon } from "lucide-react";
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
        className={`flex items-center justify-center p-10 border-2 border-dashed mt-10 w-[90%] border-indigo-400 rounded-xl h-96 text-indigo-500 ${
          isFocused || isDragActive ? "bg-indigo-100" : "bg-indigo-100"
        }`}
      >
        <input {...getInputProps()} />
        <div className="flex flex-col items-center">
          {isDragActive ? (
            <>
              <RocketIcon className="w-20 h-20 animate-ping" />
              <p>Drop the files here ...</p>
            </>
          ) : (
            <>
              <CircleArrowDownIcon className="w-20 h-20 animate-bounce" />
              <p>Drag and drop some files here, or click to select files</p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default FileUploader;
