import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Edge, Node } from "reactflow";

const STORAGE_VERSION = 1;

export type HistoryState = {
    version: number;

    past: Array<{ nodes: Node[]; edges: Edge[] }>;
    future: Array<{ nodes: Node[]; edges: Edge[] }>;

    canUndo: boolean;
    canRedo: boolean;

    addToHistory: (nodes: Node[], edges: Edge[]) => void;
    undo: () => { nodes: Node[]; edges: Edge[] } | null;
    redo: () => { nodes: Node[]; edges: Edge[] } | null;
    clearHistory: () => void;

    debugHistory: () => void;
};

const MAX_HISTORY_LENGTH = 30;

const areStatesEqual = (
    state1: { nodes: Node[]; edges: Edge[] },
    state2: { nodes: Node[]; edges: Edge[] }
): boolean => {
    if (
        state1.nodes.length !== state2.nodes.length ||
        state1.edges.length !== state2.edges.length
    ) {
        return false;
    }

    for (let i = 0; i < state1.nodes.length; i++) {
        const node1 = state1.nodes[i];
        const node2 = state2.nodes.find((n) => n.id === node1.id);

        if (
            !node2 ||
            node1.position.x !== node2.position.x ||
            node1.position.y !== node2.position.y ||
            JSON.stringify(node1.data) !== JSON.stringify(node2.data)
        ) {
            return false;
        }
    }

    for (let i = 0; i < state1.edges.length; i++) {
        const edge1 = state1.edges[i];
        const edge2 = state2.edges.find((e) => e.id === edge1.id);

        if (
            !edge2 ||
            edge1.source !== edge2.source ||
            edge1.target !== edge2.target
        ) {
            return false;
        }
    }

    return true;
};

export const useHistoryStore = create<HistoryState>()(
    persist(
        (set, get) => ({
            version: STORAGE_VERSION,

            past: [],
            future: [],

            canUndo: false,
            canRedo: false,

            addToHistory: (nodes, edges) => {
                set((state) => {
                    const nodesCopy = JSON.parse(JSON.stringify(nodes));
                    const edgesCopy = JSON.parse(JSON.stringify(edges));

                    if (state.past.length > 0) {
                        const lastState = state.past[state.past.length - 1];

                        if (
                            areStatesEqual(lastState, {
                                nodes: nodesCopy,
                                edges: edgesCopy,
                            })
                        ) {
                            console.log("Skipping duplicate state");
                            return state;
                        }
                    }

                    console.log("Added to history:", {
                        nodes: nodesCopy.length,
                        edges: edgesCopy.length,
                        pastLength: state.past.length + 1,
                    });

                    const newPast = [
                        ...state.past,
                        { nodes: nodesCopy, edges: edgesCopy },
                    ];

                    const limitedPast =
                        newPast.length > MAX_HISTORY_LENGTH
                            ? newPast.slice(newPast.length - MAX_HISTORY_LENGTH)
                            : newPast;

                    return {
                        past: limitedPast,
                        future: [],
                        canUndo: limitedPast.length > 1,
                        canRedo: false,
                    };
                });
            },

            undo: () => {
                const { past } = get();

                console.log("Undo requested:", {
                    pastLength: past.length,
                    futureLength: get().future.length,
                    canUndo: past.length > 0,
                });

                if (past.length <= 1) {
                    console.log("Nothing to undo");
                    return null;
                }

                const current = past[past.length - 1];
                const previous = past[past.length - 2];

                console.log("Undoing to previous state:", {
                    nodes: previous.nodes.length,
                    edges: previous.edges.length,
                    remainingPast: past.length - 1,
                });

                set((state) => ({
                    past: state.past.slice(0, -1),
                    future: [current, ...state.future],
                    canUndo: state.past.length > 2,
                    canRedo: true,
                }));

                return previous;
            },

            redo: () => {
                const { future } = get();

                console.log("Redo requested:", {
                    futureLength: future.length,
                    canRedo: future.length > 0,
                });

                if (future.length === 0) {
                    console.log("Nothing to redo");
                    return null;
                }

                const newPresent = future[0];

                console.log("Redoing to next state:", {
                    nodes: newPresent.nodes.length,
                    edges: newPresent.edges.length,
                    remainingFuture: future.length - 1,
                });

                set((state) => ({
                    past: [...state.past, newPresent],
                    future: state.future.slice(1),
                    canUndo: true,
                    canRedo: state.future.length > 1,
                }));

                return newPresent;
            },

            clearHistory: () => {
                console.log("Clearing history");
                set({
                    past: [],
                    future: [],
                    canUndo: false,
                    canRedo: false,
                });
            },

            debugHistory: () => {
                const { past, future, canUndo, canRedo } = get();
                console.log("----- HISTORY STORE DEBUG -----");
                console.log("Past states:", past.length);
                past.forEach((state, index) => {
                    console.log(`Past[${index}]:`, {
                        nodes: state.nodes.length,
                        edges: state.edges.length,
                    });
                });

                console.log("Future states:", future.length);
                future.forEach((state, index) => {
                    console.log(`Future[${index}]:`, {
                        nodes: state.nodes.length,
                        edges: state.edges.length,
                    });
                });

                console.log("Can undo:", canUndo);
                console.log("Can redo:", canRedo);
                console.log("------------------------------");
            },
        }),
        {
            name: "o2des-history-storage",
            partialize: (state) => {
                const persistedState = {
                    version: state.version,

                    past: state.past,
                    canUndo: state.canUndo,
                    canRedo: state.canRedo,
                    future: state.future,
                };

                console.log("Persisting state:", {
                    version: persistedState.version,
                    pastStates: persistedState.past.length,
                    futureStates: persistedState.future.length,
                    nodes:
                        persistedState.past[persistedState.past.length - 1]
                            ?.nodes.length || 0,
                    edges:
                        persistedState.past[persistedState.past.length - 1]
                            ?.edges.length || 0,
                });

                return persistedState;
            },

            onRehydrateStorage: (state) => {
                return (persistedState) => {
                    if (!persistedState) return;

                    console.log("Rehydrating state:", {
                        version: persistedState.version || "unknown",
                        pastStates: persistedState.past?.length || 0,
                        futureStates: persistedState.future?.length || 0,
                        nodes:
                            persistedState.past?.[
                                persistedState.past.length - 1
                            ]?.nodes?.length || 0,
                        edges:
                            persistedState.past?.[
                                persistedState.past.length - 1
                            ]?.edges?.length || 0,
                    });

                    if (
                        !persistedState.version ||
                        persistedState.version < STORAGE_VERSION
                    ) {
                        console.log(
                            `Migrating from version ${
                                persistedState.version || "unknown"
                            } to ${STORAGE_VERSION}`
                        );
                    }

                    if (persistedState.past?.length > 0) {
                        state.past = persistedState.past;
                        state.future = persistedState.future || [];
                        state.canUndo = persistedState.past.length > 1;
                        state.canRedo =
                            (persistedState.future?.length || 0) > 0;

                        console.log("Restored complete history:", {
                            pastLength: state.past.length,
                            futureLength: state.future.length,
                            canUndo: state.canUndo,
                            canRedo: state.canRedo,
                        });
                    }

                    state.version = STORAGE_VERSION;
                };
            },
        }
    )
);
