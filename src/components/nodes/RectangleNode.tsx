"use client";

import React from "react";
import { Handle, Position, NodeProps } from "reactflow";
import { BaseNode, NodeData } from "./BaseNode";

export class RectangleNodeClass extends BaseNode {
    static nodeStyles = {
        ...BaseNode.nodeStyles,
        base: {
            ...BaseNode.nodeStyles.base,
            borderRadius: "3px",
            height: "40px",
        },
    };

    static previewStyles = {
        ...BaseNode.previewStyles,
        base: {
            ...BaseNode.previewStyles.base,
            borderRadius: "3px",
        },
        tooltip: {
            ...BaseNode.previewStyles.tooltip,
            borderRadius: "3px",
        },
    };
}

export function RectangleNode({ data, selected }: NodeProps<NodeData>) {
    const style = {
        ...RectangleNodeClass.nodeStyles.base,
        ...(selected ? RectangleNodeClass.nodeStyles.selected : {}),
    };

    return (
        <div style={style} className={selected ? "selected" : ""}>
            <Handle type="target" position={Position.Top} />
            <div>{data.label}</div>
            <Handle type="source" position={Position.Bottom} />
        </div>
    );
}
