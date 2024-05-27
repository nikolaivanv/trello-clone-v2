import { Attachment } from "@prisma/client";

interface AttachmentItemProps {
    attachment: Attachment;
}

export const AttachmentItem = ({
    attachment
}: AttachmentItemProps) => {
    return (
        <div>{attachment.name}</div>
    );
}