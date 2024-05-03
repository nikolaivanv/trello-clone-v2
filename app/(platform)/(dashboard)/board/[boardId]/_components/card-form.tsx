"use client";
import { Plus, X } from "lucide-react";
import { 
    forwardRef, 
    useRef, 
    ElementRef, 
    KeyboardEvent, 
    use,
    KeyboardEventHandler
} from "react";
import { useParams } from "next/navigation";
import { toast } from "sonner";
import { useOnClickOutside, useEventListener } from "usehooks-ts";

import { useAction } from "@/hooks/use-action";
import { createCard } from "@/actions/create-card";

import { Button } from "@/components/ui/button";
import { FormTextarea } from "./form-textarea";
import { FormSubmit } from "@/components/form/form-submit";

interface CardFormProps {
    listId: string;
    isEditing: boolean;
    enableEditing: () => void;
    disableEditing: () => void;
};

export const CardForm = forwardRef<HTMLTextAreaElement, CardFormProps>(({
    listId,
    isEditing,
    enableEditing,
    disableEditing
}, ref) => {
    const params = useParams();
    const formRef = useRef<ElementRef<"form">>(null);

    const { execute, fieldErrors } = useAction(createCard, {
        onSuccess: (data) => {
            toast.success(`Card "${data.title}" created`);
            formRef.current?.reset();
        },
        onError: (error) => {
            toast.error(error);
        },
    });

    const onKeyDown = (e: KeyboardEvent) => {
        if (e.key === "Escape") {
            disableEditing();
        }
    };

    const onSubmit = (formData: FormData) => {
        const title = formData.get("title") as string;
        const listId = formData.get("listId") as string;
        const boardId = params.boardId as string;

        execute({ title, listId, boardId});
    };

    useOnClickOutside(formRef, disableEditing);
    useEventListener("keydown", onKeyDown);

    const onTextareakeyDown: KeyboardEventHandler<HTMLTextAreaElement> = (e) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            formRef.current?.requestSubmit();
        }
    };

    if (isEditing) {
        return (
            <form
                className="m-1 py-0.5 px-1 space-y-4"
                ref={formRef}
                action={onSubmit}
            >
                <FormTextarea 
                    id="title"
                    onKeyDown={onTextareakeyDown}
                    ref={ref}
                    palceholder="Enter a title for this card..."
                    errors={fieldErrors}
                />
                <input
                    hidden
                    id="listId"
                    name="listId"
                    value={listId}
                />
                <div className="flex items-center gap-x-1">
                    <FormSubmit>
                        Add card
                    </FormSubmit>
                    <Button onClick={disableEditing} size="sm" variant="ghost">
                        <X className="w-5 h-5"/>
                    </Button>
                </div>
            </form>
        );
    }

    return (
        <div className="pt-2 px-2">
            <Button
                onClick={enableEditing}
                className="h-auto px-2 py-1.5 w-full justify-start text-muted-foreground text-sm"
                size="sm"
                variant="ghost"
            >
                <Plus className="w-4 h-4 mr-2"/>
                Add a card
            </Button>
        </div>
    );
});

CardForm.displayName = "CardForm";