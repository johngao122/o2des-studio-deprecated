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

type RFState = {
    nodes: Node[];
    edges: Edge[];
    onNodesChange: OnNodesChange;
    onEdgesChange: OnEdgesChange;
    onConnect: OnConnect;
    addNode: (label: string, shape?: NodeShape) => void;
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
        set({
            nodes: applyNodeChanges(changes, get().nodes),
        });
    },

    onEdgesChange: (changes: EdgeChange[]) => {
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
        const newNode = ComponentManager.createNode(
            (nodes.length + 1).toString(),
            shape,
            { x: Math.random() * 400, y: Math.random() * 400 },
            label
        );
        set({ nodes: [...nodes, newNode] });
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
