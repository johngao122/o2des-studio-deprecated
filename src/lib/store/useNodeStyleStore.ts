"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Node } from "reactflow";

export type NodeStyle = {
    backgroundColor: string;
    borderColor: string;
    borderWidth: number;
    borderStyle: "solid" | "dashed" | "dotted";
    textColor: string;
    fontSize: number;
    opacity: number;
    shadowColor?: string;
    shadowBlur?: number;
};

export const defaultNodeStyle: NodeStyle = {
    backgroundColor: "#ffffff",
    borderColor: "#1a192b",
    borderWidth: 1,
    borderStyle: "solid",
    textColor: "#222222",
    fontSize: 12,
    opacity: 1,
};

type NodeStyleState = {
    // Stores styles for each node by ID
    nodeStyles: Record<string, NodeStyle>;

    // Current selected node
    selectedNodeId: string | null;

    // Current default style for new nodes
    defaultStyle: NodeStyle;

    // Actions
    setSelectedNodeId: (id: string | null) => void;
    updateNodeStyle: (nodeId: string, style: Partial<NodeStyle>) => void;
    updateDefaultStyle: (style: Partial<NodeStyle>) => void;
    resetNodeStyle: (nodeId: string) => void;
    getNodeStyle: (nodeId: string) => NodeStyle;
};

export const useNodeStyleStore = create<NodeStyleState>()(
    persist(
        (set, get) => ({
            nodeStyles: {},
            selectedNodeId: null,
            defaultStyle: defaultNodeStyle,

            setSelectedNodeId: (id) => set({ selectedNodeId: id }),

            updateNodeStyle: (nodeId, style) =>
                set((state) => ({
                    nodeStyles: {
                        ...state.nodeStyles,
                        [nodeId]: {
                            ...(state.nodeStyles[nodeId] || get().defaultStyle),
                            ...style,
                        },
                    },
                })),

            updateDefaultStyle: (style) =>
                set((state) => ({
                    defaultStyle: {
                        ...state.defaultStyle,
                        ...style,
                    },
                })),

            resetNodeStyle: (nodeId) =>
                set((state) => {
                    const { [nodeId]: _, ...rest } = state.nodeStyles;
                    return { nodeStyles: rest };
                }),

            getNodeStyle: (nodeId) => {
                const state = get();
                return state.nodeStyles[nodeId] || state.defaultStyle;
            },
        }),
        {
            name: "o2des-node-style-storage",
        }
    )
);
