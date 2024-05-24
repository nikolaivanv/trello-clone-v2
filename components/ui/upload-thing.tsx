'use client';

import { UploadButton, UploadDropzone } from "../uploadthing";

export const UploadThing = () => {
    return (
        <div className="flex flex-col items-center justify-between p-24">
            <UploadButton
                endpoint="imageUploader"
                onClientUploadComplete={(res) => {
                // Do something with the response
                console.log("Files: ", res);
                alert("Upload Completed");
                }}
                onUploadError={(error: Error) => {
                // Do something with the error.
                alert(`ERROR! ${error.message}`);
                }}
            />
        </div>
    );
};