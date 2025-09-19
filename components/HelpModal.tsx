
import React from 'react';

interface HelpModalProps {
    onClose: () => void;
}

const HelpModal: React.FC<HelpModalProps> = ({ onClose }) => {
    return (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4" role="dialog" aria-modal="true" onClick={onClose}>
            <div className="w-full max-w-lg bg-[var(--color-bg)] border-4 border-[var(--color-border-primary)] p-6" onClick={(e) => e.stopPropagation()}>
                <h2 className="text-2xl text-[var(--color-primary)] mb-4">Welcome to Pyxlist!</h2>
                
                <div className="space-y-4 max-h-[70vh] overflow-y-auto pr-2 text-sm">
                    <section>
                        <h3 className="text-lg text-[var(--color-secondary)] mb-2">The Basics</h3>
                        <p>Pyxlist is your personal quest log for real life. Create lists for your goals (e.g., "Work Projects", "Fitness"), and add tasks to them. Completing tasks earns you XP and coins, helping you level up and customize your experience.</p>
                    </section>
                    
                    <section>
                        <h3 className="text-lg text-[var(--color-secondary)] mb-2">Aura, Your AI Assistant</h3>
                        <p>Use the "Aura Command" input to interact with your AI assistant. She's here to help you strategize and stay motivated!</p>
                        <ul className="list-disc list-inside space-y-1 pl-2 mt-2">
                            <li><span className="font-bold text-[var(--color-text)]">Break Down Goals:</span> Type a big goal like "Plan my birthday party for next Friday at 8pm" and Aura will create a new list with actionable steps, complete with dates and times.</li>
                            <li><span className="font-bold text-[var(--color-text)]">Complete Tasks:</span> Tell Aura "I finished the financial report" and she'll find the matching task, mark it as complete, and give you a word of encouragement.</li>
                            <li><span className="font-bold text-[var(--color-text)]">Just Chat:</span> Ask her a question or just say hello! Her responses will appear in a notification at the bottom of the screen.</li>
                        </ul>
                    </section>

                    <section>
                        <h3 className="text-lg text-[var(--color-secondary)] mb-2">Quest Tracking & Timer</h3>
                         <p>Focus on one objective at a time! Click the crosshair icon <span className="text-[var(--color-secondary)]">[+]</span> on any task to track it as your 'Current Quest'.</p>
                         <ul className="list-disc list-inside space-y-1 pl-2 mt-2">
                            <li>The Current Quest panel will appear on the left, glowing to signify its importance.</li>
                            <li>Use the Start, Pause, and Reset buttons to track how long you spend on your focused task.</li>
                        </ul>
                    </section>

                    <section>
                        <h3 className="text-lg text-[var(--color-secondary)] mb-2">Focus Timer</h3>
                        <p>Use the built-in Pomodoro timer to manage your focus sessions. Click the settings icon to customize the length of your work periods and breaks to fit your flow.</p>
                    </section>

                    <section>
                        <h3 className="text-lg text-[var(--color-secondary)] mb-2">Gamification & Rewards</h3>
                        <p>Completing tasks earns you Experience Points (XP) and Coins. Earn 100 XP to LEVEL UP!</p>
                         <ul className="list-disc list-inside space-y-1 pl-2 mt-2">
                             <li><span className="text-[var(--color-priority-high)]">High Priority:</span> 10 XP, 1 Coin</li>
                             <li><span className="text-[var(--color-priority-medium)]">Medium Priority:</span> 3 XP, 1 Coin</li>
                             <li><span className="text-[var(--color-priority-low)]">Low Priority:</span> 1 XP, 1 Coin</li>
                             <li><span className="text-[var(--color-primary)]">Using Aura:</span> 5 XP, 2 Coins</li>
                        </ul>
                    </section>

                    <section>
                        <h3 className="text-lg text-[var(--color-secondary)] mb-2">Avatar & Shop</h3>
                        <p>Click your avatar in the header to open the customization menu. Use the coins you earn to buy new hats and shirts from the shop, then equip them in your wardrobe to personalize your look!</p>
                    </section>

                    <section>
                        <h3 className="text-lg text-[var(--color-secondary)] mb-2">Achievements</h3>
                        <p>Unlock achievements by reaching milestones! Click the trophy icon in the header to view your collection and see what quests you can conquer next.</p>
                    </section>

                    <section>
                        <h3 className="text-lg text-[var(--color-secondary)] mb-2">Customization & Data</h3>
                        <p>Personalize your experience by clicking your name to edit it, and use the dropdown in the header to change themes. The "Export" and "Import" buttons let you save and load your entire profile as a JSON file.</p>
                    </section>
                </div>

                <div className="flex justify-end pt-6">
                    <button type="button" onClick={onClose} className="px-4 py-2 bg-[var(--color-secondary)] text-[var(--color-bg)] border-2 border-[var(--color-border-secondary)] hover:opacity-80 transition-opacity" autoFocus>Got It!</button>
                </div>
            </div>
        </div>
    );
};

export default HelpModal;
