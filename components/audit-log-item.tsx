import { format } from "date-fns";
import { AuditLog } from "@prisma/client";
import { generateLogMessage } from "@/lib/generate-log-message";

interface AuditLogItemProps {
    data: AuditLog;
};


export const AuditLogItem = ({ 
    data 
}: AuditLogItemProps) => {
    return (
        <div className="flex flex-col space-y-0.5">
            <p className="text-sm text-muted-foreground">
                <span className="font-semibold lowercase text-neutral-700">
                    {data.userName}
                </span> {generateLogMessage(data)}
            </p>
            <p className="text-sm text-muted-foreground">
                {format(new Date(data.createdAt), "MMM d, yyyy 'at' h:mm a")}
            </p>
        </div>
    );
};