import { auth, currentUser } from "@clerk/nextjs";
import { db } from "./db";
import { ACTION, ENTITY_TYPE } from "@prisma/client";

interface Props {
    action: ACTION;
    entityId: string;
    entityType: ENTITY_TYPE;
    entityTitle: string;
}

export const createAuditLog = async (props: Props) => {
    const { action, entityType, entityId, entityTitle } = props;

    try {
        const { orgId } = auth();
        const user = await currentUser();

        if (!user || !orgId) {
            throw new Error("User not found!");
        }

        await db.auditLog.create({
            data: {
                action,
                entityType,
                entityId,
                entityTitle,
                userId: user.id,
                userName: user?.firstName + " " + user?.lastName,
                userImage: user?.imageUrl,
                orgId,
            }
        });

    }
    catch (error) {
        console.error("Failed to create audit log", error);
    }

}