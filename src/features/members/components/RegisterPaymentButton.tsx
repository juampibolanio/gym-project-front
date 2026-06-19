"use client";

import { useState } from "react";
import { CreditCard } from "lucide-react";
import { Modal } from "@/common/components/ui/Modal";
import { PaymentForm } from "./PaymentForm";

interface RegisterPaymentButtonProps {
    memberName: string;
    memberSurname: string;
    uuid: string;
}

export default function RegisterPaymentButton({ memberName, memberSurname, uuid }: RegisterPaymentButtonProps) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            <button
                type="button"
                onClick={() => setIsOpen(true)}
                className="w-full py-2.5 bg-brand-main hover:bg-brand-hover text-white font-medium text-sm transition-colors rounded-sm flex items-center justify-center gap-2 cursor-pointer"
            >
                <CreditCard size={20} />
                <span>Registrar nuevo pago</span>
            </button>

            <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} title="Registrar Pago">
                <PaymentForm 
                    memberName={memberName} 
                    memberSurname={memberSurname} 
                    uuid={uuid} 
                    onSuccess={() => setIsOpen(false)} 
                    onCancel={() => setIsOpen(false)} 
                />
            </Modal>
        </>
    );
}