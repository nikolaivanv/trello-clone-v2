"use client";

import { useState, useRef, ElementRef } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useUser } from "@clerk/nextjs";
import { MDXEditorMethods } from "@mdxeditor/editor";
import { toast } from "sonner";

import { MDXDisplay } from "@/components/ui/mdx-display";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { FormRichTextarea } from "@/components/form/form-rich-textarea";
import { FormSubmit } from "@/components/form/form-submit";
import { Button } from "@/components/ui/button";
import { useParams } from "next/navigation";

import { useAction } from "@/hooks/use-action";
import { createComment } from "@/actions/create-comment";
import { CardWithList } from "@/types";


interface CommentFormProps {
    card: CardWithList;
};

export const CommentForm = ({
    card
}: CommentFormProps) => {
    const queryClient = useQueryClient();
    const params = useParams();
    
    const [isEditing, setIsEditing] = useState(false);
    const { isSignedIn, user } = useUser();
    
    const editorRef = useRef<MDXEditorMethods>(null);
    const formRef = useRef<ElementRef<"form">>(null);

    const { execute, fieldErrors } = useAction(createComment, {
        onSuccess: (data) => {
            queryClient.invalidateQueries({
                queryKey: ["card-logs", data.id]
            });
            toast.success("Comment created");
            editorRef.current?.setMarkdown("");
            disableEditing();
        },
        onError: (error) => {
            toast.error(error);
        }
    });

    const enableEditing = () => {
        setIsEditing(true);
        setTimeout(() => {
            editorRef.current?.focus();
        });
    };

    const disableEditing = () => { 
        setIsEditing(false);
    };

    const onSubmit = (formData: FormData) => {
        const comment = editorRef.current?.getMarkdown();
        const boardId = params.boardId as string;

        if (!comment) {
            return;
        }

        execute({
            cardId: card.id,
            boardId,
            comment,
        });
    };

    return (
        <div>
            {isEditing ? (
                <form 
                    action={onSubmit}
                    ref={formRef}
                    className="space-y-2"
                >
                    <FormRichTextarea
                        id="comment"
                        ref={editorRef}
                        className="w-full mt-2"
                        palceholder=""
                        defaultValue=""
                        errors={fieldErrors}
                    />
                    <div className="flex items-center gap-x-2">
                        <FormSubmit> 
                            Save
                        </FormSubmit>
                        <Button
                            type="button"
                            onClick={disableEditing}
                            size="sm"
                            variant="ghost"
                        >
                            Cancel
                        </Button>
                    </div>
                </form>
            ) : (
                <div className="flex flex-row w-full">
                    <Avatar className="h-8 w-8 mr-2">
                        <AvatarImage src={user?.imageUrl}/>
                    </Avatar>
                    <div
                        onClick={enableEditing}
                        role="button"
                        className="w-full border-2 border-transparent hover:border-black text-sm bg-neutral-200 py-2 px-3 rounded-md shadow-sm"
                    >
                        <MDXDisplay source="Comment *here*"></MDXDisplay>
                    </div>
                </div>
            )}
        </div>
    );
};