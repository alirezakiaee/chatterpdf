// "use client";

// import useUpload from "@/hooks/useUpload";
// import { CircleArrowDownIcon, RocketIcon } from "lucide-react";
// import { useRouter } from "next/navigation";
// import { useCallback, useEffect } from "react";
// import { useDropzone } from "react-dropzone";

// function FileUploader() {

//   const {progress, status, fileId, handleUpload} = useUpload();
//   const router = useRouter();

//   useEffect(() => {
//     if (fileId) {
//       router.push(`/dashboard/files/${fileId}`);
//     }
//   }, [fileId, router]);

//   const onDrop = useCallback(async (acceptedFiles: File[]) => {
//     console.log(acceptedFiles);
//     const file = acceptedFiles[0];
//     if (file) {
//       await handleUpload(file);
      
//     } else {
//       //toast error
//     }

//   }, []);
//   const { getRootProps, getInputProps, isDragActive, isFocused } = useDropzone({
//     onDrop,
//     maxFiles: 1,
//     accept: {
//       "application/pdf": [".pdf"],
//     }
//   });

//   return (
//     <div className="flex flex-col gap-4 items-center max-w-7xl mx-auto">
//       <div
//         {...getRootProps()}
//         className={`flex items-center justify-center p-10 border-2 border-dashed mt-10 w-[90%] border-indigo-400 rounded-xl h-96 text-indigo-500 ${
//           isFocused || isDragActive ? "bg-indigo-100" : "bg-indigo-100"
//         }`}
//       >
//         <input {...getInputProps()} />
//         <div className="flex flex-col items-center">
//           {isDragActive ? (
//             <>
//               <RocketIcon className="w-20 h-20 animate-ping" />
//               <p>Drop the files here ...</p>
//             </>
//           ) : (
//             <>
//               <CircleArrowDownIcon className="w-20 h-20 animate-bounce" />
//               <p>Drag and drop some files here, or click to select files</p>
//             </>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }

// export default FileUploader;
"use client";

import useUpload from "@/hooks/useUpload";
import { CircleArrowDownIcon, RocketIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useCallback, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import { StatusText, StatusIcons, StatusAnimations } from "@/hooks/useUpload";

function FileUploader() {
  const { progress, status, fileId, error, handleUpload } = useUpload();
  const router = useRouter();

  useEffect(() => {
    if (fileId && status === StatusText.GENERATING) {
      router.push(`/dashboard/files/${fileId}`);
    }
  }, [fileId, router, status]);

  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      const file = acceptedFiles[0];
      if (file) {
        try {
          await handleUpload(file);
        } catch (error) {
          console.error("Error uploading file:", error);
        }
      }
    },
    [handleUpload]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    maxFiles: 1,
    accept: {
      "application/pdf": [".pdf"],
    },
  });

  const renderUploadStatus = () => {
    if (!status) return null;
    
    const StatusIcon = StatusIcons[status];
    const animation = StatusAnimations[status];
    
    return (
      <div className="flex flex-col items-center justify-center w-full max-w-md mx-auto p-8 rounded-xl bg-white shadow-lg">
        <div className="relative mb-4">
          <StatusIcon 
            className={`w-12 h-12 ${animation} ${status === StatusText.ERROR ? 'text-red-500' : 'text-indigo-600'}`}
          />
        </div>
        <h3 className="text-lg font-semibold text-gray-800 mb-2">
          {status === StatusText.ERROR ? 'Upload Error' : 'Processing your file'}
        </h3>
        <p className="text-center text-gray-600 mb-4">{status}</p>
        {progress > 0 && progress < 100 && status === StatusText.UPLOADING && (
          <div className="w-full max-w-xs">
            <div className="relative pt-1">
              <div className="w-full h-2 bg-indigo-200 rounded-full">
                <div
                  className="h-2 bg-indigo-600 rounded-full transition-all duration-300"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <p className="mt-2 text-sm text-gray-600 text-center">
                {progress}% complete
              </p>
            </div>
          </div>
        )}
      </div>
    );
  };

  const renderDropzone = () => (
    <div
      {...getRootProps()}
      className={`relative flex items-center justify-center p-10 border-2 border-dashed mt-10 w-[90%] 
        ${isDragActive ? "border-indigo-600 bg-indigo-50" : "border-indigo-400 bg-indigo-100"}
        rounded-xl h-96 text-indigo-500 transition-colors duration-200`}
    >
      <input {...getInputProps()} />
      <div className="flex flex-col items-center gap-4">
        {isDragActive ? (
          <>
            <RocketIcon className="w-20 h-20 animate-bounce" />
            <p>Drop the PDF here...</p>
          </>
        ) : (
          <>
            <CircleArrowDownIcon className="w-20 h-20 animate-bounce" />
            <p>Drag and drop a PDF here, or click to select</p>
            <p className="text-sm text-gray-500 mt-2">
              Supported files: PDF
            </p>
          </>
        )}
      </div>
    </div>
  );

  return (
    <div className="flex flex-col gap-4 items-center max-w-7xl mx-auto p-4">
      {status ? renderUploadStatus() : renderDropzone()}

      {error && (
        <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-red-600">
            Error: {error}
          </p>
          <button 
            onClick={() => window.location.reload()} 
            className="mt-2 text-sm text-red-600 hover:text-red-800 underline"
          >
            Try again
          </button>
        </div>
      )}
    </div>
  );
}

export default FileUploader;