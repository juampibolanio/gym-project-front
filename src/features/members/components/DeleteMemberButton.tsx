'use client';

import { useState } from 'react';
import { Loader2, Trash2, AlertTriangle } from 'lucide-react';
import { Modal } from '@/common/components/ui/Modal';
import { useDeleteMember } from '@/features/members/hook/useMembers';

interface DeleteMemberButtonProps {
  uuid: string;
  name: string;
  onDeleted: () => void;
}

export function DeleteMemberButton({
  uuid,
  name,
  onDeleted,
}: DeleteMemberButtonProps) {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const deleteMemberMutation = useDeleteMember();

  return (
    <>
      <button
        onClick={() => setIsDeleteModalOpen(true)}
        className="w-full flex items-center gap-2 px-3 py-2 text-xs text-danger-main hover:bg-danger-main/10 transition-colors cursor-pointer"
      >
        <Trash2 size={14} /> Eliminar
      </button>

      <Modal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        title="Eliminar Miembro"
      >
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-3 text-danger-main bg-danger-surface p-3 rounded border border-danger-main">
            <AlertTriangle size={24} className="shrink-0" />
            <p className="text-sm">
              Esta acción no se puede deshacer. Se eliminarán permanentemente
              todos los datos de este miembro.
            </p>
          </div>

          <p className="text-text-main">
            ¿Estás seguro de que deseas eliminar a <strong>{name}</strong>?
          </p>

          <div className="flex justify-end gap-3 mt-4">
            <button
              onClick={() => setIsDeleteModalOpen(false)}
              disabled={deleteMemberMutation.isPending}
              className="px-4 py-2 text-sm font-medium text-text-main border border-border-primary hover:bg-surface-hover transition-colors rounded cursor-pointer disabled:cursor-not-allowed"
            >
              Cancelar
            </button>
            <button
              onClick={() => {
                deleteMemberMutation.mutate(uuid, {
                  onSuccess: () => {
                    setIsDeleteModalOpen(false);
                    onDeleted();
                  },
                });
              }}
              disabled={deleteMemberMutation.isPending}
              className="px-4 py-2 text-sm font-medium text-white bg-danger-main hover:bg-danger-hover transition-colors rounded flex items-center gap-2 cursor-pointer disabled:cursor-not-allowed"
            >
              {deleteMemberMutation.isPending ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                'Sí, eliminar miembro'
              )}
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
}
