'use client';

import { useRef, useState } from "react";
import { useUploadThing, UploadButton } from "../uploadthing";
import { Button } from "./button";

import {
    generateMimeTypes,
  } from "uploadthing/client";

  interface UploadButtonProps {
    onClientUploadComplete?: () => void;
    onUploadError?: () => void;
    onBeforeUploadBegin?: (files: File[]) => File[];
    onUploadBegin?: () => void;
    //children: React.ReactNode;
  }

export const UploadFileButton2 = ({
    onClientUploadComplete,
    onUploadError,
    onBeforeUploadBegin,
    onUploadBegin,
    //children
}: UploadButtonProps) => {
    

    return (
        <UploadButton
            className="ut-allowed-content:hidden"
            endpoint="imageUploader"
            onClientUploadComplete={onClientUploadComplete}
            onUploadError={onUploadError}
            onBeforeUploadBegin={onBeforeUploadBegin}
            onUploadBegin={onUploadBegin}
            content={{
                button({ ready, isUploading }) {
                    return (
                        <Button
                            variant="primary"
                            disabled={isUploading}
                        >
                            {isUploading ? "Uploading..." : "Upload"}
                        </Button>
                    );
                } 
            }}
        />
    );
};