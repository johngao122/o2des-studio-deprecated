"use client";

import React from "react";
import { Handle, Position, NodeProps } from "reactflow";
import { BaseNode, NodeData } from "./BaseNode";

export class EllipseNodeClass extends BaseNode {
    static nodeStyles = {
        ...BaseNode.nodeStyles,
        base: {
            ...BaseNode.nodeStyles.base,
            borderRadius: "50%",
            height: "40px",
        },
    };

    static previewStyles = {
        ...BaseNode.previewStyles,
        base: {
            ...BaseNode.previewStyles.base,
            borderRadius: "50%",
        },
        tooltip: {
            ...BaseNode.previewStyles.tooltip,
            borderRadius: "50%",
        },
    };
}

export function EllipseNode({ data }: NodeProps<NodeData>) {
    return (
        <div style={EllipseNodeClass.nodeStyles.base}>
            <Handle type="target" position={Position.Top} />
            <div>{data.label}</div>
            <Handle type="source" position={Position.Bottom} />
        </div>
    );
}
