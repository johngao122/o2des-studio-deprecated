"use client";

import React from "react";
import { Handle, Position, NodeProps } from "reactflow";
import { BaseNode, NodeData } from "./BaseNode";
import { useNodeStyleStore } from "@/lib/store/useNodeStyleStore";

export class DiamondNodeClass extends BaseNode {
    static nodeStyles = {
        ...BaseNode.nodeStyles,
        base: {
            ...BaseNode.nodeStyles.base,
            width: "106px",
            height: "106px",
            borderRadius: "0",
            transform: "rotate(45deg)",
            borderWidth: "1px",
            borderStyle: "solid",
            borderColor: "#1a192b",
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

export function DiamondNode({ data, selected, id }: NodeProps<NodeData>) {
    const nodeStyleStore = useNodeStyleStore();
    const nodeStyle = nodeStyleStore.getNodeStyle(id);

    const style = {
        ...DiamondNodeClass.nodeStyles.base,
        ...(selected ? DiamondNodeClass.nodeStyles.selected : {}),

        ...(nodeStyle
            ? {
                  backgroundColor: nodeStyle.backgroundColor,
                  borderColor: nodeStyle.borderColor,
                  borderWidth: `${nodeStyle.borderWidth}px`,
                  borderStyle: nodeStyle.borderStyle,
                  opacity: nodeStyle.opacity,
              }
            : {}),
    };

    const labelStyle = {
        ...DiamondNodeClass.nodeStyles.label,
        ...(nodeStyle
            ? {
                  color: nodeStyle.textColor,
                  fontSize: `${nodeStyle.fontSize}px`,
              }
            : {}),
    };

    return (
        <div style={style} className={selected ? "selected" : ""}>
            <Handle type="target" position={Position.Top} />
            <div style={labelStyle}>{data.label}</div>
            <Handle type="source" position={Position.Bottom} />
        </div>
    );
}
