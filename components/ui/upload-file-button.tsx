'use client';

import { useRef, useState } from "react";
import { useUploadThing } from "../uploadthing";
import { Button, ButtonProps } from "./button";

import {
    generateMimeTypes,
  } from "uploadthing/client";
import { PaperclipIcon } from "lucide-react";
import { ClientUploadedFileData } from "uploadthing/types";

  interface UploadButtonProps extends ButtonProps {
    onClientUploadComplete?: (res: ClientUploadedFileData<{ uploadedBy: string; }>[]) => void;
    onUploadError?: () => void;
    onUploadBegin?: () => void;
  }

export const UploadFileButton = ({
    onClientUploadComplete,
    onUploadError,
    onUploadBegin,
    ...props
}: UploadButtonProps) => {
    const labelRef = useRef<HTMLLabelElement>(null);

    const { startUpload, isUploading, permittedFileInfo } = useUploadThing(
        "imageUploader",
        {
            onClientUploadComplete,
            onUploadError,
            onUploadBegin
        },
    );

    const fileTypes = permittedFileInfo?.config
        ? Object.keys(permittedFileInfo?.config)
        : [];

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files) return;
            void startUpload(Array.from(e.target.files));
    }

    return (

        <label ref={labelRef}>
            <input
                id="file"
                type="file"
                className="hidden"
                multiple={false}
                accept={generateMimeTypes(fileTypes ?? [])?.join(", ")}
                onChange={onChange}
            />
            <Button
                {...props}
                onClick={() => labelRef.current?.click()}
            />
                {/* <PaperclipIcon className="h-4 w-4 mr-2"/>
                {isUploading ? "Uploading..." : "Upload"} */}
          </label>
    );
};