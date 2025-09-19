
import { GoogleGenAI, Type } from "@google/genai";
import type { Priority, Task } from '../types';

if (!process.env.API_KEY) {
  console.error("API_KEY environment variable not set!");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY! });

// Response types for the new unified Aura input processor
type GenerateAction = {
    action: 'GENERATE_TASKS';
    payload: {
        listTitle?: string;
        tasks: {
            title: string;
            priority: Priority;
            dueDate?: string | null;
            dueTime?: string | null;
            notes?: string;
        }[];
    };
    message: string;
};

type CompleteAction = {
    action: 'COMPLETE_TASK';
    payload: { taskId: string; listId: string; };
    message: string;
};

type RespondAction = {
    action: 'RESPOND';
    payload: {}; // Changed from null to {} to match schema requirements
    message: string;
};

export type AuraActionResponse = GenerateAction | CompleteAction | RespondAction;


export const processAuraInput = async (
    input: string,
    tasks: (Task & {listId: string})[]
): Promise<AuraActionResponse> => {
    if (!process.env.API_KEY) {
        console.warn("Cannot call Gemini API: API_KEY is missing.");
        return {
            action: 'RESPOND',
            payload: {},
            message: "I can't connect to my brain right now! The Gemini API key seems to be missing."
        };
    }

    // Simplify tasks for the prompt context
    const taskContext = tasks.map(t => ({ id: t.id, listId: t.listId, title: t.title, completed: t.completed }));

    try {
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: `Analyze the user's input and determine the correct action. The user's input is: "${input}". Current tasks for context: ${JSON.stringify(taskContext)}`,
            config: {
                systemInstruction: `You are Aura, a friendly, encouraging AI assistant for the Pyxlist app. Your personality is ENFP. You have three primary functions based on user input:
1.  **Goal Breakdown (GENERATE_TASKS):** If the input is a goal (e.g., "plan a trip", "learn guitar"), break it down into 5-7 actionable tasks. Extract specifics like a title for the list, due dates (format as YYYY-MM-DD), times (format as HH:MM), and notes. Provide a brief, encouraging confirmation message.
2.  **Task Completion (COMPLETE_TASK):** If the input indicates a task is finished (e.g., "I'm done with the report", "finished my workout"), find the most relevant uncompleted task from the context provided and identify its taskId and listId. Provide a cheerful, celebratory message.
3.  **General Response (RESPOND):** If the input is a question or a statement that doesn't fit the above, provide a helpful and friendly response in character. For this action, the 'payload' field in your response must be an empty object {}.

Your response MUST be a single JSON object matching the defined schema.`,
                responseMimeType: "application/json",
                responseSchema: {
                    type: Type.OBJECT,
                    properties: {
                        action: { type: Type.STRING, enum: ['GENERATE_TASKS', 'COMPLETE_TASK', 'RESPOND'] },
                        payload: {
                            type: Type.OBJECT,
                            description: "Varies based on action. For GENERATE_TASKS, contains 'listTitle' and 'tasks'. For COMPLETE_TASK, contains 'taskId' and 'listId'. For RESPOND, it is an empty object.",
                            properties: {
                                listTitle: {
                                    type: Type.STRING,
                                    description: "The title for a new list of tasks. Only for GENERATE_TASKS action."
                                },
                                tasks: {
                                    type: Type.ARRAY,
                                    description: "An array of task objects to be created. Only for GENERATE_TASKS action.",
                                    items: {
                                        type: Type.OBJECT,
                                        properties: {
                                            title: { type: Type.STRING, description: "The task title." },
                                            priority: { type: Type.STRING, enum: ['Low', 'Medium', 'High'], description: "The task priority." },
                                            dueDate: { type: Type.STRING, description: "Due date in YYYY-MM-DD format. Optional." },
                                            dueTime: { type: Type.STRING, description: "Due time in HH:MM format. Optional." },
                                            notes: { type: Type.STRING, description: "Additional notes for the task. Optional." },
                                        },
                                        required: ['title', 'priority'],
                                    }
                                },
                                taskId: {
                                    type: Type.STRING,
                                    description: "The ID of the task that has been completed. Only for COMPLETE_TASK action."
                                },
                                listId: {
                                    type: Type.STRING,
                                    description: "The ID of the list containing the completed task. Only for COMPLETE_TASK action."
                                },
                            },
                        },
                        message: { type: Type.STRING, description: "A friendly message for the user." }
                    },
                    required: ['action', 'payload', 'message']
                },
            },
        });
        
        const jsonString = response.text;
        return JSON.parse(jsonString) as AuraActionResponse;

    } catch (error) {
        console.error("Error processing Aura input with Gemini:", error);
        return {
            action: 'RESPOND',
            payload: {},
            message: "Oops, I got a little scrambled trying to figure that out. Could you try rephrasing?"
        };
    }
};