"use client";

import { create } from "zustand";
import {
    Connection,
    Edge,
    EdgeChange,
    Node,
    NodeChange,
    addEdge,
    OnNodesChange,
    OnEdgesChange,
    OnConnect,
    applyNodeChanges,
    applyEdgeChanges,
    MarkerType,
} from "reactflow";
import { ComponentManager, NodeShape } from "@/components/ComponentManager";
import { useHistoryStore } from "./useHistoryStore";

type RFState = {
    nodes: Node[];
    edges: Edge[];
    onNodesChange: OnNodesChange;
    onEdgesChange: OnEdgesChange;
    onConnect: OnConnect;
    addNode: (label: string, shape?: NodeShape) => void;
    deleteNode: (nodeId: string) => void;
    deleteEdge: (edgeId: string) => void;
    updateNodeData: (nodeId: string, data: any) => void;
    setNodes: (nodes: Node[]) => void;
    setEdges: (edges: Edge[]) => void;
    resetFlow: () => void;
    loadFlow: (nodes: Node[], edges: Edge[]) => void;
};

const initialNodes = [
    ComponentManager.createNode(
        "1",
        "rectangle",
        { x: 250, y: 5 },
        "Start Node"
    ),
];

const initialEdges: Edge[] = [];

export const useFlowStore = create<RFState>((set, get) => ({
    nodes: initialNodes,
    edges: initialEdges,

    onNodesChange: (changes: NodeChange[]) => {
        const significantChange = changes.some(
            (change) =>
                change.type === "remove" ||
                (change.type === "position" && change.position)
        );

        set({
            nodes: applyNodeChanges(changes, get().nodes),
        });
    },

    onEdgesChange: (changes: EdgeChange[]) => {
        const significantChange = changes.some(
            (change) => change.type === "remove"
        );

        set({
            edges: applyEdgeChanges(changes, get().edges),
        });
    },

    onConnect: (connection: Connection) => {
        set({
            edges: addEdge(
                { ...connection, markerEnd: { type: MarkerType.Arrow } },
                get().edges
            ),
        });
    },

    addNode: (label: string, shape: NodeShape = "rectangle") => {
        const { nodes } = get();

        // Use fixed positions instead of random ones to avoid hydration mismatch
        // Calculate position based on current node count for deterministic placement
        const nodeCount = nodes.length;
        const xPos = 100 + (nodeCount % 3) * 150;
        const yPos = 100 + Math.floor(nodeCount / 3) * 150;

        const newNode = ComponentManager.createNode(
            (nodes.length + 1).toString(),
            shape,
            { x: xPos, y: yPos },
            label
        );
        set({ nodes: [...nodes, newNode] });
    },

    deleteNode: (nodeId: string) => {
        const { nodes, edges } = get();
        // Remove the node
        const newNodes = nodes.filter((node) => node.id !== nodeId);
        // Remove any edges connected to this node
        const newEdges = edges.filter(
            (edge) => edge.source !== nodeId && edge.target !== nodeId
        );
        set({
            nodes: newNodes,
            edges: newEdges,
        });
    },

    deleteEdge: (edgeId: string) => {
        const { edges } = get();
        const newEdges = edges.filter((edge) => edge.id !== edgeId);
        set({ edges: newEdges });
    },

    updateNodeData: (nodeId: string, data: any) => {
        const { nodes } = get();
        const newNodes = nodes.map((node) => {
            if (node.id === nodeId) {
                return {
                    ...node,
                    data: {
                        ...node.data,
                        ...data,
                    },
                };
            }
            return node;
        });
        set({ nodes: newNodes });
    },

    setNodes: (nodes: Node[]) => set({ nodes }),
    setEdges: (edges: Edge[]) => set({ edges }),

    resetFlow: () => set({ nodes: initialNodes, edges: initialEdges }),

    loadFlow: (nodes: Node[], edges: Edge[]) => {
        console.log("loadFlow called with:", { nodes, edges });
        set({ nodes, edges });
        console.log("State updated in loadFlow");
    },
}));
