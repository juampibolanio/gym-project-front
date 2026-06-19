import { UseFormRegisterReturn } from "react-hook-form";
import React from "react";

interface TextareaFieldProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
    label: string;
    registration: UseFormRegisterReturn;
    error?: string;
}

export function TextareaField({ label, registration, error, className = "", ...props }: TextareaFieldProps) {
    return (
        <div className={`flex flex-col gap-1.5 ${className}`}>
            <label className="text-xs font-semibold text-text-muted tracking-wide">{label}</label>
            <textarea
                {...registration}
                {...props}
                className={`w-full bg-background border ${error ? 'border-danger-main' : 'border-border-primary'} rounded px-3 py-2.5 text-sm text-text-main focus:outline-none focus:border-brand-main transition-colors disabled:opacity-50 min-h-[100px] resize-y`}
            />
            {error && <p className="text-xs text-danger-main">{error}</p>}
        </div>
    );
}
