import { KeyboardEventHandler, forwardRef } from "react";
import { useFormStatus } from "react-dom";

import { cn } from "@/lib/utils";
import { FormErrors } from "@/components/form/form-errors";
import { Textarea } from "@/components/ui/textarea";
import { Editor } from "@/components/ui/mdx-editor";
import { MDXEditorMethods } from "@mdxeditor/editor";


interface FormRichTextareaProps {
    id: string;
    label?: string;
    palceholder?: string;
    required?: boolean;
    disabled?: boolean;
    errors?: Record<string, string[] | undefined>;
    className?: string;
    onBlur?: () => void;
    onClick?: () => void;
    onKeyDown?: KeyboardEventHandler<HTMLTextAreaElement> | undefined;
    defaultValue?: string;
};


export const FormRichTextarea = forwardRef<MDXEditorMethods, FormRichTextareaProps>(({
    id,
    label,
    palceholder,
    required,
    disabled,
    errors,
    className,
    onBlur,
    onClick,
    onKeyDown,
    defaultValue,
}, ref) => {
    const { pending } = useFormStatus();
    return (
        <div className="space-y-2 w-full">
            <div className="space-y-1 w-full">
                { label ? (
                    <label 
                        htmlFor={id}
                        className="text-xs font-semibold text-neutral-700"
                    >
                        {label}
                    </label>
                ) : null }
                <Editor 
                    ref={ref}
                    markdown={defaultValue || ""}
                />
            </div>
            <FormErrors
                id={id}
                errors={errors}
            />
        </div>
    );
});

FormRichTextarea.displayName = "FormTextarea";