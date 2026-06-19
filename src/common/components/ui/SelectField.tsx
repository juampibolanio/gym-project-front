import { SelectFieldProps } from "@/common/interfaces/select-field.interface";

export function SelectField({
  label,
  registration,
  error,
  children,
  className = '',
  ...props
}: SelectFieldProps) {
  return (
    <div className={`flex flex-col gap-1.5 ${className}`}>
      <label className="text-xs font-semibold text-text-muted tracking-wide">
        {label}
      </label>
      <select
        {...registration}
        {...props}
        className={`w-full bg-background border ${error ? 'border-danger-main' : 'border-border-primary'} rounded px-3 py-2.5 text-sm text-text-main focus:outline-none focus:border-brand-main transition-colors disabled:opacity-50 cursor-pointer`}
      >
        {children}
      </select>
      {error && <p className="text-xs text-danger-main">{error}</p>}
    </div>
  );
}
