"use client";

import React from "react";
import { Handle, Position, NodeProps } from "reactflow";
import { BaseNode, NodeData } from "./BaseNode";
import { useNodeStyleStore } from "@/lib/store/useNodeStyleStore";

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

export function RectangleNode({ data, selected, id }: NodeProps<NodeData>) {
    const nodeStyleStore = useNodeStyleStore();
    const nodeStyle = nodeStyleStore.getNodeStyle(id);

    const style = {
        ...RectangleNodeClass.nodeStyles.base,
        ...(selected ? RectangleNodeClass.nodeStyles.selected : {}),

        ...(nodeStyle
            ? {
                  backgroundColor: nodeStyle.backgroundColor,
                  borderColor: nodeStyle.borderColor,
                  borderWidth: `${nodeStyle.borderWidth}px`,
                  borderStyle: nodeStyle.borderStyle,
                  color: nodeStyle.textColor,
                  fontSize: `${nodeStyle.fontSize}px`,
                  opacity: nodeStyle.opacity,
              }
            : {}),
    };

    return (
        <div style={style}>
            <Handle type="target" position={Position.Top} />
            <div>{data.label}</div>
            <Handle type="source" position={Position.Bottom} />
        </div>
    );
}
