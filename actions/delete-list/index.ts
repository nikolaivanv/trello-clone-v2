"use server";

import { auth } from "@clerk/nextjs";
import { revalidatePath } from "next/cache";

import { DeleteList } from './schema';
import { createSafeAction } from '@/lib/create-safe-action';
import { InputType, ReturnType } from "./types";
import { db } from "@/lib/db";
import { createAuditLog } from "@/lib/create-audit-log";
import { ACTION, ENTITY_TYPE } from "@prisma/client";

const handler = async (data: InputType): Promise<ReturnType> => {
    const { userId, orgId } = auth();
    if (!userId || !orgId) {
        return {
            error: "Unauthorized",
        };
    }

    const { id, boardId } = data;
    let list;

    try {
        list = await db.list.delete({
            where: {
                id,
                boardId,
                board: {
                    orgId,
                }
            },
        });

        await createAuditLog({
            action: ACTION.DELETE,
            entityId: list.id,
            entityType: ENTITY_TYPE.LIST,
            entityTitle: list.title,
        });
    } catch (error) {
        return {
            error: "Failed to delete",
        };
    }

    revalidatePath(`/board/${boardId}`);
    return {
        data: list,
    }
};

export const deleteList = createSafeAction(DeleteList, handler);