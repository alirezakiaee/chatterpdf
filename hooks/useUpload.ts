// "use client";

// import { useState } from "react";
// import { useUser } from "@clerk/nextjs";
// import { useRouter } from "next/navigation";
// import { v4 as uuidv4 } from "uuid";
// import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
// import { db, storage } from "@/firebase";
// import { set } from "react-hook-form";
// import { doc, serverTimestamp, setDoc } from "firebase/firestore";

// export enum StatusText {
//   UPLOADING = "Uploading fil...",
//   UPLOADED = "File uploaded successfully",
//   SAVING = "Saving file to database...",
//   GENERATING = "Generating AI embeddings, this will only take a few seconds...",
// }

// export type Status = StatusText[keyof StatusText];

// function useUpload() {
//   const [progress, setProgress] = useState<number | null>(null);
//   const [fileId, setFileId] = useState<string | null>(null);
//   const [status, setStatus] = useState<Status | null>(null);
//   const { user } = useUser();
//   const router = useRouter();

//   const handleUpload = async (file: File) => {
//     if (!file || !user) return;

//     //  Free/PRO plan limitations
//     const fileIdToUploadTo = uuidv4();
//     const storageRef = ref(storage, `users/${user.id}/files/${fileIdToUploadTo}`);
//     setFileId(fileIdToUploadTo);
//     const uploadTask = uploadBytesResumable(storageRef, file);

//     uploadTask.on(
//       "state_changed",
//       (snapshot) => {
//         const progress = Math.round(
//           (snapshot.bytesTransferred / snapshot.totalBytes) * 100
//         );
//         setProgress(progress);
//         setStatus(StatusText.UPLOADING);
//       },
//       (error) => {
//         console.error("Error uploading file:", error);
//       },
//       async () => {
//         setStatus(StatusText.UPLOADED);
//         const downloadUrl = await getDownloadURL(uploadTask.snapshot.ref);
//         setStatus(StatusText.SAVING);
//         await setDoc(doc(db, "users", user.id, "files", fileIdToUploadTo), {
//           name: file.name,
//           url: downloadUrl,
//           size: file.size,
//           type: file.type,
//           downloadUrl: downloadUrl,
//           ref: uploadTask.snapshot.ref.fullPath,
//           createdAt: serverTimestamp(),
//           fileId: fileIdToUploadTo,
//           userId: user.id,
//         });

//         setStatus(StatusText.GENERATING);
//         // Generate AI embeddings

//         setFileId(fileIdToUploadTo);
//       }
//     );
//   };

//   return {
//     handleUpload,
//     progress,
//     status,
//     fileId,
//   };
// }
// export default useUpload;
"use client";

import { useState } from "react";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { v4 as uuidv4 } from "uuid";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { db, storage } from "@/firebase";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import { Upload, CheckCircle2, Database, Sparkles, AlertCircle } from "lucide-react";

export enum StatusText {
  UPLOADING = "Uploading file...",
  UPLOADED = "File uploaded successfully",
  SAVING = "Saving file to database...",
  GENERATING = "Generating AI embeddings, this will only take a few seconds...",
  ERROR = "Error uploading file",
}

export type Status = StatusText[keyof StatusText];

export const StatusIcons = {
  [StatusText.UPLOADING]: Upload,
  [StatusText.UPLOADED]: CheckCircle2,
  [StatusText.SAVING]: Database,
  [StatusText.GENERATING]: Sparkles,
  [StatusText.ERROR]: AlertCircle,
} as const;

export const StatusAnimations = {
  [StatusText.UPLOADING]: "animate-bounce",
  [StatusText.UPLOADED]: "animate-pulse",
  [StatusText.SAVING]: "animate-spin",
  [StatusText.GENERATING]: "animate-pulse",
  [StatusText.ERROR]: "animate-pulse",
} as const;

export type StatusIconType = typeof StatusIcons[Status];

function useUpload() {
  const [progress, setProgress] = useState<number>(0);
  const [fileId, setFileId] = useState<string | null>(null);
  const [status, setStatus] = useState<Status | null>(null);
  const [error, setError] = useState<string | null>(null);
  const { user } = useUser();
  const router = useRouter();

  const handleUpload = async (file: File): Promise<void> => {
    try {
      if (!file || !user) {
        throw new Error("No file or user found");
      }

      setError(null);
      setProgress(0);
      setStatus(StatusText.UPLOADING);

      const fileIdToUploadTo = uuidv4();
      setFileId(fileIdToUploadTo);

      const storageRef = ref(storage, `users/${user.id}/files/${fileIdToUploadTo}`);
      const uploadTask = uploadBytesResumable(storageRef, file);

      return new Promise((resolve, reject) => {
        uploadTask.on(
          "state_changed",
          (snapshot) => {
            const progress = Math.round(
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100
            );
            setProgress(progress);
          },
          (error) => {
            setError(error.message);
            setStatus(StatusText.ERROR);
            reject(error);
          },
          async () => {
            try {
              setStatus(StatusText.UPLOADED);
              const downloadUrl = await getDownloadURL(uploadTask.snapshot.ref);
              
              setStatus(StatusText.SAVING);
              await setDoc(doc(db, "users", user.id, "files", fileIdToUploadTo), {
                name: file.name,
                url: downloadUrl,
                size: file.size,
                type: file.type,
                downloadUrl: downloadUrl,
                ref: uploadTask.snapshot.ref.fullPath,
                createdAt: serverTimestamp(),
                fileId: fileIdToUploadTo,
                userId: user.id,
              });

              setStatus(StatusText.GENERATING);
              // Here you would add your AI embeddings generation logic
              
              resolve();
            } catch (error) {
              setError(error.message);
              setStatus(StatusText.ERROR);
              reject(error);
            }
          }
        );
      });
    } catch (error) {
      setError(error.message);
      setStatus(StatusText.ERROR);
      throw error;
    }
  };

  return {
    handleUpload,
    progress,
    status,
    fileId,
    error,
  };
}

export default useUpload;