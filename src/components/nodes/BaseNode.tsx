"use client";

import React, { useEffect } from "react";
import { Handle, Position, NodeProps } from "reactflow";
import { useNodeStyleStore, NodeStyle } from "@/lib/store/useNodeStyleStore";

export interface NodeData {
    label: string;
    style?: NodeStyle;
}

export interface NodeStyles {
    base: React.CSSProperties;
    container?: React.CSSProperties;
    label?: React.CSSProperties;
    selected?: React.CSSProperties;
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
            borderWidth: "1px",
            borderStyle: "solid",
            borderColor: "#1a192b",
            width: "150px",
            fontSize: "12px",
            color: "#222",
            textAlign: "center",
            backgroundColor: "white",
        },
        selected: {
            boxShadow: "0 0 0 3px #6366f1",
            borderWidth: "2px",
            borderStyle: "solid",
            borderColor: "#6366f1",
            backgroundColor: "rgba(99, 102, 241, 0.1)",
            outline: "none",
            transition: "all 0.2s ease",
        },
    };

    static previewStyles: NodePreviewStyles = {
        base: {
            padding: "5px",
            borderWidth: "1px",
            borderStyle: "solid",
            borderColor: "#1a192b",
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
            borderWidth: "1px",
            borderStyle: "solid",
            borderColor: "#1a192b",
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

    static getPreview(label: string): React.ReactElement {
        return <div style={this.previewStyles.base}></div>;
    }

    static getTooltipPreview(): React.ReactElement {
        return <div style={this.previewStyles.tooltip}></div>;
    }
}
