import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Edge, Node } from "reactflow";

type HistoryState = {
    // History stacks
    past: Array<{ nodes: Node[]; edges: Edge[] }>;
    future: Array<{ nodes: Node[]; edges: Edge[] }>;

    // Current state tracking
    canUndo: boolean;
    canRedo: boolean;

    // Actions
    addToHistory: (nodes: Node[], edges: Edge[]) => void;
    undo: () => { nodes: Node[]; edges: Edge[] } | null;
    redo: () => { nodes: Node[]; edges: Edge[] } | null;
    clearHistory: () => void;

    // Debug
    debugHistory: () => void;
};

// Maximum number of history states to keep
const MAX_HISTORY_LENGTH = 30;

// Helper function for better state comparison
const areStatesEqual = (
    state1: { nodes: Node[]; edges: Edge[] },
    state2: { nodes: Node[]; edges: Edge[] }
): boolean => {
    // Quick check: if node/edge counts differ, states are different
    if (
        state1.nodes.length !== state2.nodes.length ||
        state1.edges.length !== state2.edges.length
    ) {
        return false;
    }

    // Check if node positions or data changed
    for (let i = 0; i < state1.nodes.length; i++) {
        const node1 = state1.nodes[i];
        const node2 = state2.nodes.find((n) => n.id === node1.id);

        // If a node is missing or has different position/data, states are different
        if (
            !node2 ||
            node1.position.x !== node2.position.x ||
            node1.position.y !== node2.position.y ||
            JSON.stringify(node1.data) !== JSON.stringify(node2.data)
        ) {
            return false;
        }
    }

    // Check if edges changed
    for (let i = 0; i < state1.edges.length; i++) {
        const edge1 = state1.edges[i];
        const edge2 = state2.edges.find((e) => e.id === edge1.id);

        // If an edge is missing or has different source/target, states are different
        if (
            !edge2 ||
            edge1.source !== edge2.source ||
            edge1.target !== edge2.target
        ) {
            return false;
        }
    }

    // If we got here, the states are effectively the same
    return true;
};

export const useHistoryStore = create<HistoryState>()(
    persist(
        (set, get) => ({
            // History stacks
            past: [],
            future: [],

            // Current state tracking
            canUndo: false,
            canRedo: false,

            // Actions
            addToHistory: (nodes, edges) => {
                set((state) => {
                    // Make deep copies to ensure history states are immutable
                    const nodesCopy = JSON.parse(JSON.stringify(nodes));
                    const edgesCopy = JSON.parse(JSON.stringify(edges));

                    // Skip if the new state is the same as the last one in past
                    if (state.past.length > 0) {
                        const lastState = state.past[state.past.length - 1];
                        // Use our improved comparison function
                        if (
                            areStatesEqual(lastState, {
                                nodes: nodesCopy,
                                edges: edgesCopy,
                            })
                        ) {
                            console.log("Skipping duplicate state");
                            return state; // Return current state unchanged
                        }
                    }

                    console.log("Added to history:", {
                        nodes: nodesCopy.length,
                        edges: edgesCopy.length,
                        pastLength: state.past.length + 1,
                    });

                    // Add current state to past, clear future (as in traditional undo/redo pattern)
                    const newPast = [
                        ...state.past,
                        { nodes: nodesCopy, edges: edgesCopy },
                    ];

                    // Limit history length to prevent memory issues
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

                // Get the current state and the previous state
                const current = past[past.length - 1];
                const previous = past[past.length - 2];

                console.log("Undoing to previous state:", {
                    nodes: previous.nodes.length,
                    edges: previous.edges.length,
                    remainingPast: past.length - 1,
                });

                // Update the state
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

                // Get the first state from future
                const newPresent = future[0];

                console.log("Redoing to next state:", {
                    nodes: newPresent.nodes.length,
                    edges: newPresent.edges.length,
                    remainingFuture: future.length - 1,
                });

                // Update the state
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

            // Debug function to log complete state
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
            partialize: (state) => ({
                // Only store the essential parts to avoid storage size issues
                past: state.past.slice(-5), // Store only the last 5 states for persistence
                canUndo: state.past.length > 1,
                canRedo: false, // Reset canRedo on refresh
                future: [], // Don't persist future states
            }),
        }
    )
);
