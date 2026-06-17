'use client';

import { useRouter } from "next/navigation";
import { useRole } from "../hooks/useRole";
import { useEffect } from "react";
import { Loader2 } from "lucide-react";

interface RoleGuardProps {
    allowedRoles: string[];
    children: React.ReactNode;
}

export function RoleGuard({ allowedRoles, children }: RoleGuardProps) {
    const { role } = useRole();
    const router = useRouter();

    useEffect(() => {
        if (role && !allowedRoles.includes(role)) {
            router.replace('/dashboard');
        }
    }, [role, allowedRoles, router]);

    if (!allowedRoles.includes(role)) {
        return (
            <div className="h-64 flex flex-col items-center justify-center">
                <Loader2 className="animate-spin text-brand-main mb-4" />
                <p>Verificando permisos...</p>
            </div>
        )
    }

    return <>{children}</>
}
