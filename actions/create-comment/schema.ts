import { z } from "zod";

export const CreateComment = z.object({
    comment:  z.string({
        required_error: "Comment is required",
        invalid_type_error: "Comment is required",
    }),
    cardId: z.string(),
    boardId: z.string(),
});