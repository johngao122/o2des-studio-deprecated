"use client";

import { Handle, Position, NodeProps } from "reactflow";

interface NodeData {
    label: string;
}

const nodeStyles = {
    base: {
        padding: "10px",
        border: "1px solid #1a192b",
        borderRadius: "3px",
        width: "150px",
        fontSize: "12px",
        color: "#222",
        textAlign: "center" as const,
        backgroundColor: "white",
    },
    rectangle: {
        height: "40px",
    },
    ellipse: {
        height: "40px",
        borderRadius: "50%",
    },
    diamond: {
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
    diamondLabel: {
        transform: "rotate(-45deg)",
        width: "140px",
    },
};

export function RectangleNode({ data }: NodeProps<NodeData>) {
    return (
        <div style={{ ...nodeStyles.base, ...nodeStyles.rectangle }}>
            <Handle type="target" position={Position.Top} />
            <div>{data.label}</div>
            <Handle type="source" position={Position.Bottom} />
        </div>
    );
}

export function EllipseNode({ data }: NodeProps<NodeData>) {
    return (
        <div style={{ ...nodeStyles.base, ...nodeStyles.ellipse }}>
            <Handle type="target" position={Position.Top} />
            <div>{data.label}</div>
            <Handle type="source" position={Position.Bottom} />
        </div>
    );
}

export function DiamondNode({ data }: NodeProps<NodeData>) {
    return (
        <div style={{ ...nodeStyles.base, ...nodeStyles.diamond }}>
            <Handle type="target" position={Position.Top} />
            <div style={nodeStyles.diamondLabel}>{data.label}</div>
            <Handle type="source" position={Position.Bottom} />
        </div>
    );
}
