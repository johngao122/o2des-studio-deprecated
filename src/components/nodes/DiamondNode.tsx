"use client";

import React from "react";
import { Handle, Position, NodeProps } from "reactflow";
import { BaseNode, NodeData } from "./BaseNode";

export class DiamondNodeClass extends BaseNode {
    static nodeStyles = {
        ...BaseNode.nodeStyles,
        base: {
            ...BaseNode.nodeStyles.base,
            width: "106px",
            height: "106px",
            borderRadius: "0",
            transform: "rotate(45deg)",
            border: "1px solid #1a192b",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "0",
        },
        label: {
            transform: "rotate(-45deg)",
            width: "140px",
        },
    };

    static previewStyles = {
        ...BaseNode.previewStyles,
        base: {
            ...BaseNode.previewStyles.base,
            width: "30px",
            height: "30px",
            transform: "rotate(45deg)",
            borderRadius: "0",
            padding: "0",
        },
        tooltip: {
            ...BaseNode.previewStyles.tooltip,
            width: "42px",
            height: "42px",
            transform: "rotate(45deg)",
            borderRadius: "0",
            padding: "0",
        },
    };
}

export function DiamondNode({ data }: NodeProps<NodeData>) {
    return (
        <div style={DiamondNodeClass.nodeStyles.base}>
            <Handle type="target" position={Position.Top} />
            <div style={DiamondNodeClass.nodeStyles.label}>{data.label}</div>
            <Handle type="source" position={Position.Bottom} />
        </div>
    );
}
