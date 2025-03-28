"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

export type EdgeStyle = {
    stroke: string;
    strokeWidth: number;
    strokeStyle: "solid" | "dashed" | "dotted";
    opacity: number;
    animated: boolean;
};

export const defaultEdgeStyle: EdgeStyle = {
    stroke: "#1a192b",
    strokeWidth: 1,
    strokeStyle: "solid",
    opacity: 1,
    animated: false,
};

type EdgeStyleState = {
    edgeStyles: Record<string, EdgeStyle>;
    selectedEdgeId: string | null;
    defaultStyle: EdgeStyle;

    setSelectedEdgeId: (id: string | null) => void;
    updateEdgeStyle: (edgeId: string, style: Partial<EdgeStyle>) => void;
    updateDefaultStyle: (style: Partial<EdgeStyle>) => void;
    resetEdgeStyle: (edgeId: string) => void;
    getEdgeStyle: (edgeId: string) => EdgeStyle;
};

export const useEdgeStyleStore = create<EdgeStyleState>()(
    persist(
        (set, get) => ({
            edgeStyles: {},
            selectedEdgeId: null,
            defaultStyle: defaultEdgeStyle,

            setSelectedEdgeId: (id) => {
                console.log("Setting selected edge ID:", id);
                set({ selectedEdgeId: id });
            },

            updateEdgeStyle: (edgeId, style) => {
                console.log("Updating edge style:", { edgeId, style });
                set((state) => ({
                    edgeStyles: {
                        ...state.edgeStyles,
                        [edgeId]: {
                            ...(state.edgeStyles[edgeId] || get().defaultStyle),
                            ...style,
                        },
                    },
                }));
            },

            updateDefaultStyle: (style) => {
                console.log("Updating default edge style:", style);
                set((state) => ({
                    defaultStyle: {
                        ...state.defaultStyle,
                        ...style,
                    },
                }));
            },

            resetEdgeStyle: (edgeId) => {
                console.log("Resetting edge style for:", edgeId);
                set((state) => {
                    const { [edgeId]: _, ...rest } = state.edgeStyles;
                    return { edgeStyles: rest };
                });
            },

            getEdgeStyle: (edgeId) => {
                const state = get();
                const style = state.edgeStyles[edgeId] || state.defaultStyle;
                console.log("Getting edge style:", { edgeId, style });
                return style;
            },
        }),
        {
            name: "o2des-edge-style-storage",
        }
    )
);
