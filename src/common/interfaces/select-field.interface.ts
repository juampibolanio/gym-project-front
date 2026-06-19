import { UseFormRegisterReturn } from "react-hook-form";

export interface SelectFieldProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  registration: UseFormRegisterReturn;
  error?: string;
  children: React.ReactNode;
}
