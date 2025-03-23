"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Edge, Node } from "reactflow";

type ProjectState = {
    // Project metadata
    projectName: string;
    setProjectName: (name: string) => void;

    // Auto-save feature
    savedNodes: Node[];
    savedEdges: Edge[];
    saveCurrentState: (nodes: Node[], edges: Edge[]) => void;

    // Project metadata
    lastSaved: string | null;
    setLastSaved: (date: string | null) => void;

    // Recent projects
    recentProjects: string[];
    addRecentProject: (name: string) => void;
    clearRecentProjects: () => void;
};

export const useProjectStore = create<ProjectState>()(
    persist(
        (set, get) => ({
            // Project metadata
            projectName: "Untitled Project",
            setProjectName: (name) => set({ projectName: name }),

            // Auto-save feature
            savedNodes: [],
            savedEdges: [],
            saveCurrentState: (nodes, edges) => {
                // Only generate timestamps on the client side
                if (typeof window !== "undefined") {
                    set({
                        savedNodes: nodes,
                        savedEdges: edges,
                        lastSaved: new Date().toISOString(),
                    });
                } else {
                    // During SSR, don't set the timestamp
                    set({
                        savedNodes: nodes,
                        savedEdges: edges,
                    });
                }
            },

            // Last saved timestamp
            lastSaved: null,
            setLastSaved: (date) => set({ lastSaved: date }),

            // Recent projects
            recentProjects: [],
            addRecentProject: (name) => {
                const { recentProjects } = get();
                // Remove the project if it's already in the list
                const filteredProjects = recentProjects.filter(
                    (project) => project !== name
                );
                // Add the project to the beginning of the list
                const updatedProjects = [name, ...filteredProjects].slice(0, 5); // Keep only 5 recent projects
                set({ recentProjects: updatedProjects });
            },
            clearRecentProjects: () => set({ recentProjects: [] }),
        }),
        {
            name: "o2des-project-storage",
        }
    )
);
