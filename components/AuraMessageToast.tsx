
import React, { useState, useEffect } from 'react';
import { PxAuraIcon, PxXIcon } from './Icons';

interface AuraMessageToastProps {
    message: string;
    onClose: () => void;
}

const AuraMessageToast: React.FC<AuraMessageToastProps> = ({ message, onClose }) => {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => setVisible(true), 10);
        return () => clearTimeout(timer);
    }, []);

    return (
        <div 
            className={`fixed bottom-5 left-1/2 -translate-x-1/2 w-full max-w-md p-4 bg-[var(--color-surface-2)] border-2 border-[var(--color-border-secondary)] shadow-lg
                        flex items-start gap-4 transition-all duration-500 z-50 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
            role="alert"
        >
            <PxAuraIcon className="w-8 h-8 text-[var(--color-secondary)] flex-shrink-0 mt-1" />
            <div className="flex-grow">
                 <p className="text-xs text-[var(--color-primary)]">Aura says...</p>
                 <p className="text-sm text-[var(--color-text)]">{message}</p>
            </div>
            <button
                onClick={onClose}
                className="p-1 text-[var(--color-text-muted)] hover:text-[var(--color-primary)] transition-colors flex-shrink-0"
                aria-label="Close message"
            >
                <PxXIcon className="w-5 h-5" />
            </button>
        </div>
    );
};

export default AuraMessageToast;
