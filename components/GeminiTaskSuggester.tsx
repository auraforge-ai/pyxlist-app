import React, { useState } from 'react';

interface AuraInputProps {
    onCommand: (goal: string) => Promise<void>;
}

const AuraInput: React.FC<AuraInputProps> = ({ onCommand }) => {
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] =useState(false);

    const handleGenerate = async () => {
        if (!input.trim()) return;
        setIsLoading(true);
        try {
            await onCommand(input);
            setInput('');
        } catch (error) {
            console.error("Failed to process Aura command:", error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="p-4 border-2 border-[var(--color-border-secondary)] bg-[var(--color-surface-1)]">
            <h3 className="text-lg text-[var(--color-secondary)] mb-2">Aura Command</h3>
            <p className="text-xs text-[var(--color-text-muted)] mb-4">Break down a goal, complete a quest, or just say hello!</p>
            <form onSubmit={(e) => { e.preventDefault(); handleGenerate(); }} className="flex flex-col sm:flex-row gap-2">
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="e.g., Plan a game night"
                    className="flex-grow bg-[var(--color-surface-3)] border-2 border-[var(--color-border-primary)] p-2 text-[var(--color-text)] focus:outline-none focus:border-[var(--color-border-secondary)] transition-colors placeholder-[var(--color-text-muted)] text-sm min-w-0"
                    disabled={isLoading}
                />
                <button
                    type="submit"
                    disabled={isLoading || !input.trim()}
                    className="px-4 py-2 bg-[var(--color-primary)] text-[var(--color-bg)] border-2 border-[var(--color-border-primary)] hover:opacity-80 disabled:bg-[var(--color-surface-2)] disabled:text-[var(--color-text-muted)] disabled:border-[var(--color-border-muted)] transition-colors text-sm flex-shrink-0"
                >
                    {isLoading ? 'Thinking...' : 'Let\'s Go!'}
                </button>
            </form>
        </div>
    );
};

export default AuraInput;