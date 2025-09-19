import React, { useRef } from 'react';
import { PxSaveIcon, PxUploadIcon } from './Icons';

interface FileControlsProps {
    onExport: () => void;
    onImport: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const FileControls: React.FC<FileControlsProps> = ({ onExport, onImport }) => {
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleImportClick = () => {
        fileInputRef.current?.click();
    };

    const buttonClass = "flex items-center gap-2 px-3 py-2 border-2 border-[var(--color-border-secondary)] text-[var(--color-secondary)] hover:bg-[var(--color-secondary)] hover:text-[var(--color-bg)] transition-colors text-sm";

    return (
        <div className="flex gap-2">
            <button onClick={onExport} className={buttonClass} aria-label="Export Data">
                <PxSaveIcon className="w-4 h-4" />
                <span>Export</span>
            </button>
            <button onClick={handleImportClick} className={buttonClass} aria-label="Import Data">
                <PxUploadIcon className="w-4 h-4" />
                <span>Import</span>
            </button>
            <input
                type="file"
                ref={fileInputRef}
                onChange={onImport}
                accept=".json"
                className="hidden"
            />
        </div>
    );
};

export default FileControls;
