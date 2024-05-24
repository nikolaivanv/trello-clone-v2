import { format } from "date-fns";
import { AuditLog } from "@prisma/client";
import { generateLogMessage } from "@/lib/generate-log-message";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { AuditLogItem } from "./audit-log-item";
import { CommentItem } from "./comment-item";

interface ActivityItemProps {
    data: AuditLog;
};


export const ActivityItem = ({ 
    data 
}: ActivityItemProps) => {
    return (
        <li className="flex items-center gap-x-2">
            <Avatar className="h-8 w-8">
                <AvatarImage src={data.userImage}/>
            </Avatar>
            {data.action === "COMMENT" ? (
                    <CommentItem data={data}/>
                ) : (
                    <AuditLogItem data={data}/>
            )}
        </li>
    );
};