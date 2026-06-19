'use client';

import { MoreHorizontal, Edit, Trash2, ShieldAlert, Loader2 } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { User } from '../interfaces/user.interface';
import { useDeleteUser } from '../hooks/useUsers';
import { Modal } from '@/common/components/ui/Modal';

interface AdminRowProps {
    admin: User;
    isCurrentUser: boolean;
}

export function AdminRow({ admin, isCurrentUser }: AdminRowProps) {
    const [showDropdown, setShowDropdown] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const { mutate: deleteUser, isPending: isDeleting } = useDeleteUser();

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setShowDropdown(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const fullName = `${admin.name} ${admin.surname}`;
    const initials = admin.name[0] + admin.surname[0];

    const handleDelete = () => {
        deleteUser(admin.uuid, {
            onSuccess: () => {
                setIsModalOpen(false);
                setShowDropdown(false);
            }
        });
    };

    return (
        <>
            <div className="grid grid-cols-[2fr_1fr_2fr_100px] items-center px-5 py-4 border-b border-border-primary hover:bg-surface-hover transition-colors last:border-b-0 last:rounded-b-lg">

                <div>
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-background border border-border-primary flex items-center justify-center text-xs font-bold text-text-muted uppercase">
                            {initials}
                        </div>
                        <div>
                            <p className="text-sm font-medium text-text-main flex items-center gap-2">
                                {fullName}
                                {isCurrentUser && <span className="text-[9px] bg-brand-main/10 text-brand-main px-1.5 py-0.5 rounded font-bold uppercase">Tú</span>}
                            </p>
                            <p className="text-xs text-text-muted mt-0.5">{admin.dni}</p>
                        </div>
                    </div>
                </div>

                <div>
                    <span className="inline-flex items-center gap-1.5 px-2 py-1 text-[10px] font-bold bg-blue-50 text-blue-600 border border-blue-200 dark:bg-blue-500/10 dark:text-blue-400 dark:border-blue-500/20 rounded-full uppercase transition-colors">
                        {admin.role}
                    </span>
                </div>

                <div>
                    <p className="text-sm font-light text-text-main truncate pr-4">{admin.email}</p>
                </div>

                <div className="relative flex justify-center" ref={dropdownRef}>
                    <button
                        onClick={() => setShowDropdown(!showDropdown)}
                        className="p-1 rounded hover:bg-surface transition-colors"
                    >
                        <MoreHorizontal className="text-text-muted hover:text-text-main transition-colors" />
                    </button>

                    {showDropdown && (
                        <div className="absolute right-6 top-full mt-1 w-36 bg-surface border border-border-primary rounded-md shadow-lg z-10 py-1 overflow-hidden">
                            <Link href={`/dashboard/administradores/${admin.uuid}/editar`} className="w-full flex items-center gap-2 px-3 py-2 text-xs text-text-main hover:bg-surface-hover transition-colors">
                                <Edit size={14} className="text-text-muted" /> Editar
                            </Link>

                            {isCurrentUser ? (
                                <button
                                    disabled
                                    className="w-full flex items-center gap-2 px-3 py-2 text-xs text-text-muted bg-surface-hover cursor-not-allowed"
                                    title="No puedes eliminar tu propia cuenta"
                                >
                                    <ShieldAlert size={14} /> Eliminar
                                </button>
                            ) : (
                                <button
                                    onClick={() => setIsModalOpen(true)}
                                    className="w-full flex items-center gap-2 px-3 py-2 text-xs text-danger-main hover:bg-danger-surface transition-colors"
                                >
                                    <Trash2 size={14} /> Eliminar
                                </button>
                            )}
                        </div>
                    )}
                </div>
            </div>

            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Revocar Acceso">
                <div className="flex flex-col gap-4">
                    <p className="text-text-main text-sm">
                        ¿Estás seguro de que deseas eliminar a <strong>{fullName}</strong> del sistema? Perderá acceso inmediatamente.
                    </p>
                    <div className="flex justify-end gap-3 mt-4">
                        <button
                            onClick={() => setIsModalOpen(false)}
                            disabled={isDeleting}
                            className="px-4 py-2 text-sm font-medium text-text-main border border-border-primary hover:bg-surface-hover transition-colors rounded"
                        >
                            Cancelar
                        </button>
                        <button
                            onClick={handleDelete}
                            disabled={isDeleting}
                            className="px-4 py-2 text-sm font-medium text-white bg-danger-main hover:bg-danger-hover transition-colors rounded flex items-center gap-2"
                        >
                            {isDeleting ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Eliminar usuario'}
                        </button>
                    </div>
                </div>
            </Modal>
        </>
    );
}
