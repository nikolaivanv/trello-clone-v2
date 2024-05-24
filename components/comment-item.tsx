import { format } from "date-fns";
import { AuditLog } from "@prisma/client";

interface CommentItemProps {
    data: AuditLog;
};


export const CommentItem = ({ 
    data 
}: CommentItemProps) => {
    return (
        <div className="flex flex-col space-y-0.5">
            <p className="text-sm text-muted-foreground">
                <span className="font-semibold lowercase text-neutral-700">
                    {data.userName}
                </span> {format(new Date(data.createdAt), "MMM d, yyyy 'at' h:mm a")}
            </p>
            <p className="text-sm text-muted-foreground">
                {data.comment}
            </p>
        </div>
    );
};