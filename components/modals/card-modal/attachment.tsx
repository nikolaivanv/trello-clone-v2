import { FileUpload } from "@/components/ui/file-upload";
import { UploadThing } from "@/components/ui/upload-thing";

export const Attachment = () => {
    return (
        <div>
          <h1>Upload a file to S3</h1>
          <UploadThing />
        </div>
      );
};