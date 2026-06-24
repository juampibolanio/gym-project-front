'use client';

import { useState } from 'react';
import { useDeleteMember, useDeactivateMember } from '@/features/members/hooks/useMembers';
import { Modal } from '@/common/components/ui/Modal';
import { DeleteMemberButtonProps } from '../interfaces/delete-member-button.interface';
import { Loader2, Trash2, AlertTriangle, UserMinus } from 'lucide-react';

export function DeleteMemberButton({
  uuid,
  name,
  onDeleted,
}: DeleteMemberButtonProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const deleteMemberMutation = useDeleteMember();
  const deactivateMemberMutation = useDeactivateMember();

  const isPending = deleteMemberMutation.isPending || deactivateMemberMutation.isPending;

  return (
    <>
      <button
        onClick={() => setIsModalOpen(true)}
        className="w-full flex items-center gap-2 px-3 py-2 text-xs text-danger-main hover:bg-danger-main/10 transition-colors cursor-pointer"
      >
        <Trash2 size={14} />Dar de baja
      </button>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Opciones de eliminación"
      >
        <div className="flex flex-col gap-5">
          <p className="text-sm text-text-main">
            ¿Qué deseas hacer con el socio <strong>{name}</strong>?
          </p>

          <div className="p-4 border border-border-primary bg-background rounded-lg flex flex-col gap-2">
            <div className="flex items-center gap-2 text-brand-main font-bold">
              <UserMinus size={18} />
              <h3>Dar de baja (Recomendado)</h3>
            </div>
            <p className="text-xs text-text-muted mb-2">
              El socio pasará a estado INACTIVO. Mantendrás todo su historial de pagos y planes intacto para tus reportes financieros y otros datos.
            </p>
            <button
              onClick={() => {
                deactivateMemberMutation.mutate(uuid, {
                  onSuccess: () => {
                    setIsModalOpen(false);
                    onDeleted();
                  },
                });
              }}
              disabled={isPending}
              className="w-full py-2 text-sm font-medium text-white bg-brand-main hover:bg-brand-hover transition-colors rounded flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {deactivateMemberMutation.isPending ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                'Dar de baja al socio'
              )}
            </button>
          </div>

          <div className="p-4 border border-danger-main/30 bg-danger-surface rounded-lg flex flex-col gap-2">
            <div className="flex items-center gap-2 text-danger-main font-bold">
              <AlertTriangle size={18} />
              <h3>Eliminar definitivamente</h3>
            </div>
            <p className="text-xs text-danger-main/80 mb-2">
              Se borrarán todos sus datos permanentemente. <strong>Solo funcionará si el socio no tiene historial de pagos ni suscripciones asignadas.</strong>
            </p>
            <button
              onClick={() => {
                deleteMemberMutation.mutate(uuid, {
                  onSuccess: () => {
                    setIsModalOpen(false);
                    onDeleted();
                  },
                });
              }}
              disabled={isPending}
              className="w-full py-2 text-sm font-medium text-danger-main border border-danger-main hover:bg-danger-main hover:text-white transition-colors rounded flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {deleteMemberMutation.isPending ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                'Intentar eliminar permanentemente'
              )}
            </button>
          </div>

          <div className="flex justify-end mt-2">
            <button
              onClick={() => setIsModalOpen(false)}
              disabled={isPending}
              className="px-4 py-2 text-sm font-medium text-text-main border border-border-primary hover:bg-surface-hover transition-colors rounded cursor-pointer disabled:opacity-50"
            >
              Cancelar
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
}
