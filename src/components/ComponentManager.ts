import { Node } from "reactflow";
import { NodeType, getNodeTypeFromShape } from "./nodes/NodeRegistry";
import { NodeData, TableNodeData } from "./nodes";

export type NodeShape = NodeType;

export class ComponentManager {
    static createNode(
        id: string,
        shape: NodeShape,
        position: { x: number; y: number },
        label: string
    ): Node<NodeData | TableNodeData> {
        const nodeType = getNodeTypeFromShape(shape);

        if (shape === "table") {
            return {
                id,
                position,
                data: {
                    label,
                    rows: 3,
                    columns: 3,
                    headers: ["Header 1", "Header 2", "Header 3"],
                    cells: Array(3)
                        .fill(null)
                        .map(() => Array(3).fill("")),
                },
                draggable: true,
                type: nodeType,
            };
        }

        return {
            id,
            position,
            data: { label },
            draggable: true,
            type: nodeType,
        };
    }
}
