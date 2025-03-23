"use client";

import React from "react";
import { Handle, Position, NodeProps } from "reactflow";

export interface NodeData {
    label: string;
}

export interface NodeStyles {
    base: React.CSSProperties;
    container?: React.CSSProperties;
    label?: React.CSSProperties;
}

export interface NodePreviewStyles {
    base: React.CSSProperties;
    tooltip: React.CSSProperties;
}

export interface BaseNodeProps {
    label: string;
    shape: string;
}

export class BaseNode {
    static nodeStyles: NodeStyles = {
        base: {
            padding: "10px",
            border: "1px solid #1a192b",
            width: "150px",
            fontSize: "12px",
            color: "#222",
            textAlign: "center",
            backgroundColor: "white",
        },
    };

    static previewStyles: NodePreviewStyles = {
        base: {
            padding: "5px",
            border: "1px solid #1a192b",
            width: "70%",
            height: "30px",
            fontSize: "12px",
            color: "#222",
            textAlign: "center",
            backgroundColor: "white",
            margin: "0 auto",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
        },
        tooltip: {
            padding: "10px",
            border: "1px solid #1a192b",
            width: "60px",
            height: "60px",
            fontSize: "12px",
            color: "#222",
            textAlign: "center",
            backgroundColor: "white",
            margin: "0 auto 5px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
        },
    };

    static getNodeComponent(data: NodeData): React.ReactElement {
        return (
            <div style={this.nodeStyles.base}>
                <Handle type="target" position={Position.Top} />
                <div>{data.label}</div>
                <Handle type="source" position={Position.Bottom} />
            </div>
        );
    }

    static getPreview(label: string): React.ReactElement {
        return <div style={this.previewStyles.base}></div>;
    }

    static getTooltipPreview(): React.ReactElement {
        return <div style={this.previewStyles.tooltip}></div>;
    }
}
