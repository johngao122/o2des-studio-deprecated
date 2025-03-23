import { Node } from "reactflow";
import { NodeType, getNodeTypeFromShape } from "./nodes/NodeRegistry";
import { NodeData } from "./nodes";

export type NodeShape = NodeType;

export class ComponentManager {
    static createNode(
        id: string,
        shape: NodeShape,
        position: { x: number; y: number },
        label: string
    ): Node<NodeData> {
        const nodeType = getNodeTypeFromShape(shape);

        return {
            id,
            position,
            data: { label },
            draggable: true,
            type: nodeType,
        };
    }
}
