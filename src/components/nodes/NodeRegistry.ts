import { NodeTypes } from "reactflow";
import { RectangleNode, RectangleNodeClass } from "./RectangleNode";
import { EllipseNode, EllipseNodeClass } from "./EllipseNode";
import { DiamondNode, DiamondNodeClass } from "./DiamondNode";
import { TableNode, TableNodeClass } from "./TableNode";

export type NodeType = "rectangle" | "ellipse" | "diamond" | "table";

export interface NodeDefinition {
    label: string;
    type: NodeType;
    nodeClass: any;
}

export const nodeDefinitions: NodeDefinition[] = [
    { label: "Rectangle", type: "rectangle", nodeClass: RectangleNodeClass },
    { label: "Ellipse", type: "ellipse", nodeClass: EllipseNodeClass },
    { label: "Diamond", type: "diamond", nodeClass: DiamondNodeClass },
    { label: "Table", type: "table", nodeClass: TableNodeClass },
];

export const nodeTypes: NodeTypes = {
    rectangleNode: RectangleNode,
    ellipseNode: EllipseNode,
    diamondNode: DiamondNode,
    tableNode: TableNode,
};

export function getNodeTypeFromShape(shape: NodeType): string {
    switch (shape) {
        case "ellipse":
            return "ellipseNode";
        case "diamond":
            return "diamondNode";
        case "table":
            return "tableNode";
        case "rectangle":
        default:
            return "rectangleNode";
    }
}

export function getNodeDefinitionByType(
    type: NodeType
): NodeDefinition | undefined {
    return nodeDefinitions.find((def) => def.type === type);
}
