"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Edge, Node } from "reactflow";

type ProjectState = {
    projectName: string;
    setProjectName: (name: string) => void;

    savedNodes: Node[];
    savedEdges: Edge[];
    saveCurrentState: (nodes: Node[], edges: Edge[]) => void;

    lastSaved: string | null;
    setLastSaved: (date: string | null) => void;

    recentProjects: string[];
    addRecentProject: (name: string) => void;
    clearRecentProjects: () => void;
};

export const useProjectStore = create<ProjectState>()(
    persist(
        (set, get) => ({
            projectName: "Untitled Project",
            setProjectName: (name) => set({ projectName: name }),

            savedNodes: [],
            savedEdges: [],
            saveCurrentState: (nodes, edges) => {
                if (typeof window !== "undefined") {
                    set({
                        savedNodes: nodes,
                        savedEdges: edges,
                        lastSaved: new Date().toISOString(),
                    });
                } else {
                    set({
                        savedNodes: nodes,
                        savedEdges: edges,
                    });
                }
            },

            lastSaved: null,
            setLastSaved: (date) => set({ lastSaved: date }),

            recentProjects: [],
            addRecentProject: (name) => {
                const { recentProjects } = get();

                const filteredProjects = recentProjects.filter(
                    (project) => project !== name
                );

                const updatedProjects = [name, ...filteredProjects].slice(0, 5);
                set({ recentProjects: updatedProjects });
            },
            clearRecentProjects: () => set({ recentProjects: [] }),
        }),
        {
            name: "o2des-project-storage",
        }
    )
);
