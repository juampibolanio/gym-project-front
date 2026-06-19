'use client';

import { useState } from 'react';
import { Loader2, Trash2 } from 'lucide-react';
import { Modal } from '@/common/components/ui/Modal';
import { useDeleteUser } from '../hooks/useUsers';
import { User } from '../interfaces/user.interface';

interface DeleteAdminButtonProps {
    admin: User;
    onDeleted: () => void;
}

export function DeleteAdminButton({ admin, onDeleted }: DeleteAdminButtonProps) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { mutate: deleteUser, isPending: isDeleting } = useDeleteUser();

    const fullName = `${admin.name} ${admin.surname}`;

    const handleDelete = () => {
        deleteUser(admin.uuid, {
            onSuccess: () => {
                setIsModalOpen(false);
                onDeleted();
            }
        });
    };

    return (
        <>
            <button
                onClick={() => setIsModalOpen(true)}
                className="w-full flex items-center gap-2 px-3 py-2 text-xs text-danger-main hover:bg-danger-surface transition-colors cursor-pointer"
            >
                <Trash2 size={14} /> Eliminar
            </button>

            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Revocar Acceso">
                <div className="flex flex-col gap-4">
                    <p className="text-text-main text-sm">
                        ¿Estás seguro de que deseas eliminar a <strong>{fullName}</strong> del sistema? Perderá acceso inmediatamente.
                    </p>
                    <div className="flex justify-end gap-3 mt-4">
                        <button
                            onClick={() => setIsModalOpen(false)}
                            disabled={isDeleting}
                            className="px-4 py-2 text-sm font-medium text-text-main border border-border-primary hover:bg-surface-hover transition-colors rounded cursor-pointer disabled:cursor-not-allowed"
                        >
                            Cancelar
                        </button>
                        <button
                            onClick={handleDelete}
                            disabled={isDeleting}
                            className="px-4 py-2 text-sm font-medium text-white bg-danger-main hover:bg-danger-hover transition-colors rounded flex items-center gap-2 cursor-pointer disabled:cursor-not-allowed"
                        >
                            {isDeleting ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Eliminar usuario'}
                        </button>
                    </div>
                </div>
            </Modal>
        </>
    );
}
