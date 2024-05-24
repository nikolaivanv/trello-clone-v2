"use server";

import { auth } from "@clerk/nextjs";
import { revalidatePath } from "next/cache";

import { ACTION, ENTITY_TYPE } from "@prisma/client";
import { CreateComment } from './schema';
import { createSafeAction } from '@/lib/create-safe-action';
import { createAuditLog } from "@/lib/create-audit-log";
import { InputType, ReturnType } from "./types";
import { db } from "@/lib/db";



const handler = async (data: InputType): Promise<ReturnType> => {
    const { userId, orgId } = auth();
    if (!userId || !orgId) {
        return {
            error: "Unauthorized",
        };
    }

    const { comment, cardId, boardId } = data;
    let card;

    try {
        card = await db.card.findUnique({
            where: {
                id: cardId,
                list: {
                    board: {
                        orgId,
                    },
                },
            }
        });
        if (!card) {
            return {
                error: "Card not found.",
            };
        }

        await createAuditLog({
            action: ACTION.COMMENT,
            entityId: card.id,
            entityType: ENTITY_TYPE.CARD,
            entityTitle: card.title,
            comment: comment,
        });

    } catch (error) {
        console.error(error);
        return {
            error: "Failed to create comment.",
        };  
    }

    revalidatePath(`/board/${boardId}`);
    return {
        data: card,
    }

};

export const createComment = createSafeAction(CreateComment, handler);