import { PaperclipIcon } from "lucide-react";

import { Attachment } from "@prisma/client";

import { FileUpload } from "@/components/ui/file-upload";
import { UploadThing } from "@/components/ui/upload-thing";
import { AttachmentItem } from "@/components/attachment-item";


interface AttachmentsProps {
  attachments: Attachment[];
}

export const Attachments = ({
  attachments
}: AttachmentsProps) => {
    return (
      <>
        {attachments.length > 0 ? (
          <div className="flex flex-row gap-x-3 items-start">
          <PaperclipIcon className="h-5 w-5"/>
          <div>
            <p className="font-semibold text-neutral-700">
              Attachments
            </p>
            <div className="mt-2 space-y-4">
              {attachments.map((attachment) => (
                <AttachmentItem
                  key={attachment.id}
                  attachment={attachment}
                />
              ))}
              </div>
          </div>
          {/* <UploadThing /> */}
        </div>) : null
        }
      </>
    );
};