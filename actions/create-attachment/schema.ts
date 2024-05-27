import { z } from "zod";

export const CreateAttachment = z.object({
    url: z.string({
        required_error: "URL is required",
        invalid_type_error: "URL is required",
    }),
    name: z.string({
        required_error: "File name is required",
        invalid_type_error: "File name is required",
    }),
    type: z.string({
        required_error: "File name is required",
        invalid_type_error: "File name is required",
    }),
    size: z.number({
        required_error: "File size is required",
        invalid_type_error: "File size is required",
    }),
    cardId: z.string(),
    boardId: z.string(),
});