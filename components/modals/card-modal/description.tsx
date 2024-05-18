"use client";

import { useState, useRef, ElementRef } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { AlignLeft } from "lucide-react";
import { useEventListener, useOnClickOutside } from "usehooks-ts";
import { toast } from "sonner";


import { useAction } from "@/hooks/use-action";
import { updateCard } from "@/actions/update-card";
import { Skeleton } from "@/components/ui/skeleton";
import { CardWithList } from "@/types";
import { FormRichTextarea } from "@/components/form/form-rich-textarea";
import { FormSubmit } from "@/components/form/form-submit";
import { Button } from "@/components/ui/button";
import { MDXDisplay } from "@/components/ui/mdx-display";
import { MDXEditorMethods } from "@mdxeditor/editor";


interface DescriptionProps {
    data: CardWithList;
}

export const Description = ({
    data
}: DescriptionProps) => {
    const queryClient = useQueryClient();
    const params = useParams();
    const [isEditing, setIsEditing] = useState(false);

    const editorRef = useRef<MDXEditorMethods>(null)
    const formRef = useRef<ElementRef<"form">>(null);

    const { execute, fieldErrors } = useAction(updateCard, {
        onSuccess: (data) => {
            queryClient.invalidateQueries({
                queryKey: ["card", data.id],
            });
            queryClient.invalidateQueries({
                queryKey: ["card-logs", data.id]
            });
            toast.success(`Card "${data.title}" updated`);
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

    const onKeyDown = (e: KeyboardEvent) => {
        if (e.key === "Escape") {
            disableEditing();
        }
    };

    useEventListener("keydown", onKeyDown);
    useOnClickOutside(formRef, disableEditing);

    const onSubmit = (formData: FormData) => {
        //console.log(editorRef.current?.getMarkdown());
        const description = editorRef.current?.getMarkdown();
        const boardId = params.boardId as string;

        if (description === data.description) {
            return;
        }
        execute({
            id: data.id,
            boardId,
            description,
        });
    };


    return (
        <div className="flex items-start gap-x-3 w-full">
            <AlignLeft className="w-5 h-5 mt-0.5 text-neutral-700"/>
            <div className="w-full">
                <p className="font-semibold text-neutral-700 mb-2">
                    Description
                </p>
                {isEditing ? (
                    <form
                        action={onSubmit}
                        ref={formRef}
                        className="space-y-2"
                    >
                        <FormRichTextarea
                            id="description"
                            ref={editorRef}
                            className="w-full mt-2"
                            palceholder="Add a more detailed description..."
                            defaultValue={data.description || undefined}
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
                    <div
                        onClick={enableEditing}
                        role="button"
                        className="min-h-[78px] bg-neutral-200 text-sm font-medium py-3 px-3.5 rounded-md"
                    >
                        <MDXDisplay source={data.description || "Add a more detailed description..."} />
                    </div>
                )}
            </div>
        </div>
    );
};

Description.Skeleton = function DescriptionSkeleton() {
    return (
        <div className="flex items-start gap-x-3 w-full">
            <Skeleton className="w-6 h-6 bg-neutral-200" />
            <div className="w-full">
                <Skeleton className="w-24 h-6 mb-2 bg-neutral-200" />
                <Skeleton className="w-full h-[78px] mb-2 bg-neutral-200" />
            </div>
        </div>
    );
}