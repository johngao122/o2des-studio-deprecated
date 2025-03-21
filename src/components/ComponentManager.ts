import { Node } from "reactflow";

export type NodeShape = "rectangle" | "ellipse" | "diamond";

interface NodeData {
    label: string;
}

export class ComponentManager {
    static createNode(
        id: string,
        shape: NodeShape,
        position: { x: number; y: number },
        label: string
    ): Node<NodeData> {
        const baseNode = {
            id,
            position,
            data: { label },
            draggable: true,
        };

        switch (shape) {
            case "ellipse":
                return {
                    ...baseNode,
                    type: "ellipseNode",
                };
            case "diamond":
                return {
                    ...baseNode,
                    type: "diamondNode",
                };
            case "rectangle":
            default:
                return {
                    ...baseNode,
                    type: "rectangleNode",
                };
        }
    }
}
