import { UseFormRegisterReturn } from "react-hook-form";
import React from "react";

interface InputFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label: string;
    registration: UseFormRegisterReturn;
    error?: string;
    icon?: React.ReactNode;
}

export function InputField({ label, registration, error, icon, className = "", ...props }: InputFieldProps) {
    return (
        <div className={`flex flex-col gap-1.5 ${className}`}>
            <label className="text-xs font-semibold text-text-muted tracking-wide">{label}</label>
            <div className="relative">
                {icon && (
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        {icon}
                    </div>
                )}
                <input
                    {...registration}
                    {...props}
                    className={`w-full bg-background border ${error ? 'border-danger-main' : 'border-border-primary'} rounded ${icon ? 'pl-9 pr-3' : 'px-3'} py-2.5 text-sm text-text-main focus:outline-none focus:border-brand-main transition-colors disabled:opacity-50`}
                />
            </div>
            {error && <p className="text-xs text-danger-main">{error}</p>}
        </div>
    );
}
