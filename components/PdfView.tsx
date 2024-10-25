"use client";

import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";
import { Document, Page, pdfjs } from "react-pdf";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { Loader2Icon, RotateCw, ZoomInIcon, ZoomOutIcon } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import { ScrollArea } from "@/components/ui/scroll-area";

// We need to configure CORS
// go here >>> https://console.cloud.google.com/
//find and type the name of the app and click on it
// go here >>> activate shell editor
// create new file in editor calls cors.json
// [
//     {
//         "origin":["*"],
//         "method":["GET"],
//         "maxAgeSeconds":3600
//     }
// ]

// go back to online terminal
// run >>> // gsutil cors set cors.json gs://chatter-pdf.appspot.com
// https://firebase.google.com/docs/storage/web/download-files#cors_configuration

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;
function PdfView({ url }: { url: string }) {
  const [numPages, setNumPages] = useState<number>();
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [file, setFile] = useState<Blob | null>(null);
  const [rotation, setRotation] = useState<number>(0); 
  const [scale, setScale] = useState<number>(1);

  useEffect(() => {
    const fetchFile = async () => {
      const response = await fetch(url);
      const file = await response.blob();
      setFile(file);
    };
    fetchFile();
  }, [url]);

  const onDocumentLoadSuccess = ({ numPages }: { numPages: number }): void => {
    setNumPages(numPages);
  };

  return (
    <div className="flex justify-center items-center h-auto">
      <Sheet>
        <Card className="justify-center items-center">
          <div className="sticky top-0 z-50 bg-red-100 p-2">
            <div className="max-w-6xl px-2 grid grid-cols-8 gap-2">
              <Button
                variant="outline"
                disabled={pageNumber == 1}
                onClick={() => {
                  if (pageNumber > 1) {
                    setPageNumber(pageNumber - 1);
                  }
                }}
              >
                Previous
              </Button>
              <p className="mx-2">
                {pageNumber} of {numPages}
              </p>
              <Button
                variant="outline"
                disabled={pageNumber == numPages}
                onClick={() => {
                  if (pageNumber < numPages) {
                    setPageNumber(pageNumber + 1);
                  }
                }}
              >
                Next
              </Button>

              <Button
                variant="outline"
                onClick={() => {
                  setRotation((rotation + 90) % 360);
                }}
              >
                <RotateCw className="h-4 w-4" />
              </Button>

              <Button
                variant="outline"
                onClick={() => {
                  setScale(scale + 0.1);
                }}
              >
                <ZoomInIcon className="h-4 w-4" />
              </Button>

              <Button
                variant="outline"
                onClick={() => {
                  setScale(scale - 0.1);
                }}
              >
                <ZoomOutIcon className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {!file ? (
            <Loader2Icon className="animate-spin h-20 w-20 text-indigo-600 mt-20" />
          ) : (
            <Document
              loading={null}
              file={file}
              rotate={rotation}
              onLoadSuccess={onDocumentLoadSuccess}
              className="m-4 overflow-scroll"
            >
              <Page
                className="shadow-lg"
                scale={scale}
                pageNumber={pageNumber}
              />
            </Document>
          )}
        </Card>
      </Sheet>
    </div>
  );
}

export default PdfView;
