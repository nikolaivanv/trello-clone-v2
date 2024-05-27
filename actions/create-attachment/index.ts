"use server";

import { auth } from "@clerk/nextjs";
import { revalidatePath } from "next/cache";

import { CreateAttachment } from './schema';
import { createSafeAction } from '@/lib/create-safe-action';
import { InputType, ReturnType } from "./types";
import { db } from "@/lib/db";



const handler = async (data: InputType): Promise<ReturnType> => {
    const { userId, orgId } = auth();
    if (!userId || !orgId) {
        return {
            error: "Unauthorized",
        };
    }

    const {  
        cardId, 
        boardId,
        ...values
    } = data;
    let card;
    let attachment;

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

        attachment = await db.attachment.create({
            data: {
                ...values,
                cardId,
                orgId
            },
        });

    } catch (error) {
        console.error(error);
        return {
            error: "Failed to create attachment.",
        };  
    }

    revalidatePath(`/board/${boardId}`);
    return {
        data: attachment,
    }

};

export const createAttachment = createSafeAction(CreateAttachment, handler);