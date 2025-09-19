import React, { useState, useEffect } from 'react';

interface UndoToastProps {
    listTitle: string;
    onUndo: () => void;
}

const UndoToast: React.FC<UndoToastProps> = ({ listTitle, onUndo }) => {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        // Fade in
        const timer = setTimeout(() => setVisible(true), 10);
        return () => clearTimeout(timer);
    }, []);

    return (
        <div 
            className={`fixed bottom-5 left-1/2 -translate-x-1/2 w-full max-w-md p-4 bg-[var(--color-surface-2)] border-2 border-[var(--color-border-secondary)] shadow-lg
                        flex items-center justify-between gap-4 transition-all duration-300 z-50 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
            role="alert"
        >
            <p className="text-sm text-[var(--color-text)]">
                List "<span className="text-[var(--color-primary)] font-bold truncate">{listTitle}</span>" deleted.
            </p>
            <button
                onClick={onUndo}
                className="px-3 py-1 bg-[var(--color-secondary)] text-[var(--color-bg)] border-2 border-[var(--color-border-secondary)] hover:opacity-80 transition-opacity text-sm flex-shrink-0"
            >
                Undo
            </button>
        </div>
    );
};

export default UndoToast;
