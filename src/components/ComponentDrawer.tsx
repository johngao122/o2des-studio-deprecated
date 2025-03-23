import { Button } from "@/components/ui/button";
import { NodeShape } from "./ComponentManager";
import React from "react";

const nodeStyles = {
    base: {
        padding: "5px",
        border: "1px solid #1a192b",
        width: "70%",
        height: "30px",
        fontSize: "12px",
        color: "#222",
        textAlign: "center" as const,
        backgroundColor: "white",
        margin: "0 auto",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    },
    rectangle: {
        borderRadius: "3px",
    },
    ellipse: {
        borderRadius: "50%",
    },
    diamond: {
        transform: "rotate(45deg)",
    },
    diamondLabel: {
        transform: "rotate(-45deg)",
    },
};

const DefaultComponents = [
    { label: "Rectangle", shape: "rectangle" as NodeShape },
    { label: "Ellipse", shape: "ellipse" as NodeShape },
    { label: "Diamond", shape: "diamond" as NodeShape },
];

interface ComponentDrawerProps {
    onAddNode: (label: string, shape: NodeShape) => void;
}

const getComponentPreview = (shape: NodeShape, label: string) => {
    switch (shape) {
        case "ellipse":
            return (
                <div style={{ ...nodeStyles.base, ...nodeStyles.ellipse }}>
                    {label}
                </div>
            );
        case "diamond":
            return (
                <div style={{ ...nodeStyles.base, ...nodeStyles.diamond }}>
                    <span style={nodeStyles.diamondLabel}>{label}</span>
                </div>
            );
        case "rectangle":
        default:
            return (
                <div style={{ ...nodeStyles.base, ...nodeStyles.rectangle }}>
                    {label}
                </div>
            );
    }
};

export function ComponentDrawer({ onAddNode }: ComponentDrawerProps) {
    return (
        <div className="w-60 border-r p-4 overflow-y-auto">
            <h2 className="text-lg font-semibold mb-4">Components</h2>
            {DefaultComponents.map((comp) => (
                <Button
                    key={comp.label}
                    onClick={() => onAddNode(comp.label, comp.shape)}
                    className="w-full mb-2 h-16 flex flex-col items-center justify-center"
                    variant="outline"
                >
                    {getComponentPreview(comp.shape, comp.label)}
                </Button>
            ))}
        </div>
    );
}
