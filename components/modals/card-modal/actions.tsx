"use client";

import { Copy, Paperclip, Trash } from "lucide-react";
import { toast } from "sonner";
import { useParams } from "next/navigation";

import { useAction } from "@/hooks/use-action";
import { copyCard } from "@/actions/copy-card";
import { deleteCard } from "@/actions/delete-card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { CardWithList } from "@/types";
import { useCardModal } from "@/hooks/use-card-modal";
import { UploadFileButton } from "@/components/ui/upload-file-button";


interface ActionsProps {
    data: CardWithList;
}

export const Actions = ({
    data
}: ActionsProps) => {
    const { 
        execute: executeCopyCard,
        isLoading: isLoadingCopy,
    } = useAction(copyCard, {
        onSuccess: () => {
            toast.success(`Card "${data.title}" copied`);
            cardModal.onClose();
        },
        onError: (error) => {
            toast.error(error);
        }
    });

    const { 
        execute: executeDeleteCard,
        isLoading: isLoadingDelete,
    } = useAction(deleteCard, {
        onSuccess: (data) => {
            toast.success(`Card "${data.title}" deleted`);
            cardModal.onClose();
        },
        onError: (error) => {
            toast.error(error);
        }
    });

    const params = useParams();
    const cardModal = useCardModal();

    const onCopy = () => {
        const boardId = params.boardId as string;

        executeCopyCard({
            id: data.id,
            boardId,
        });
    };

    const onDelete = () => {
        const boardId = params.boardId as string;

        executeDeleteCard({
            id: data.id,
            boardId,
        });

    };

    return (
        <div className="space-y-2 mt-2">
            <p className="text-sm font-semibold">
                Actions
            </p>
            <UploadFileButton
                variant="gray"
                className="w-full justify-start"
                size="inline"
                //disabled={isLoadingCopy}
            >
                <Paperclip className="h-4 w-4 mr-2"/>
                Attachment
            </UploadFileButton>
            <Button
                onClick={onCopy}
                variant="gray"
                className="w-full justify-start"
                size="inline"
                disabled={isLoadingCopy}
            >
                <Copy className="h-4 w-4 mr-2"/>
                Copy
            </Button>
            <Button
                onClick={onDelete}
                variant="gray"
                className="w-full justify-start"
                size="inline"
                disabled={isLoadingDelete}
            >
                <Trash className="h-4 w-4 mr-2"/>
                Delete
            </Button>
        </div>
    );
};

Actions.Skeleton = function ActionsSkeleton() {
    return (
        <div className="space-y-2 mt-2">
            <Skeleton className="w-20 h-4 bg-neutral-200"/>
            <Skeleton className="w-full h-8 bg-neutral-200"/>
            <Skeleton className="w-full h-8 bg-neutral-200"/>
        </div>

    );
}