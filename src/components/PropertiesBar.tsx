"use client";

import React, { useEffect, useState } from "react";
import { useReactFlow, Node, useOnSelectionChange } from "reactflow";
import { useNodeStyleStore, NodeStyle } from "@/lib/store/useNodeStyleStore";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

export const PropertiesBar = () => {
    const { getNodes, setNodes } = useReactFlow();
    const {
        selectedNodeId,
        setSelectedNodeId,
        getNodeStyle,
        updateNodeStyle,
        resetNodeStyle,
    } = useNodeStyleStore();

    const [selectedNode, setSelectedNode] = useState<Node | null>(null);
    const [nodeLabel, setNodeLabel] = useState("");

    // Use React Flow's built-in selection change hook to track selected nodes
    useOnSelectionChange({
        onChange: ({ nodes }) => {
            if (nodes.length === 1) {
                const selectedNode = nodes[0];
                setSelectedNodeId(selectedNode.id);
            } else if (nodes.length === 0) {
                setSelectedNodeId(null);
            }
        },
    });

    // Get the selected node when selectedNodeId changes
    useEffect(() => {
        if (selectedNodeId) {
            const node = getNodes().find((n) => n.id === selectedNodeId);
            setSelectedNode(node || null);
            if (node) {
                setNodeLabel(node.data.label || "");
            }
        } else {
            setSelectedNode(null);
            setNodeLabel("");
        }
    }, [selectedNodeId, getNodes]);

    const handleLabelChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNodeLabel(e.target.value);
        if (selectedNode) {
            // Update node data
            const updatedNodes = getNodes().map((n) => {
                if (n.id === selectedNode.id) {
                    return {
                        ...n,
                        data: {
                            ...n.data,
                            label: e.target.value,
                        },
                    };
                }
                return n;
            });
            setNodes(updatedNodes);
        }
    };

    const handleStyleChange = (property: keyof NodeStyle, value: any) => {
        if (selectedNodeId) {
            updateNodeStyle(selectedNodeId, { [property]: value });
        }
    };

    const handleResetStyle = () => {
        if (selectedNodeId) {
            resetNodeStyle(selectedNodeId);
        }
    };

    // Get style for selected node
    const nodeStyle = selectedNodeId ? getNodeStyle(selectedNodeId) : null;

    // Only render the panel if a node is selected
    if (!selectedNode) {
        return null;
    }

    return (
        <div className="w-72 bg-white dark:bg-gray-800 border-l border-gray-200 dark:border-gray-700 h-screen overflow-y-auto p-4 animate-in slide-in-from-right duration-300">
            <h2 className="text-lg font-semibold mb-4">Properties</h2>

            <Tabs defaultValue="general">
                <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="general">General</TabsTrigger>
                    <TabsTrigger value="style">Style</TabsTrigger>
                </TabsList>

                <TabsContent value="general" className="space-y-4 mt-4">
                    <div className="space-y-2">
                        <Label htmlFor="node-label">Label</Label>
                        <Input
                            id="node-label"
                            value={nodeLabel}
                            onChange={handleLabelChange}
                            placeholder="Node Label"
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="node-id">ID</Label>
                        <Input
                            id="node-id"
                            value={selectedNode.id}
                            disabled
                            className="bg-gray-100 dark:bg-gray-700"
                        />
                    </div>
                </TabsContent>

                <TabsContent value="style" className="space-y-4 mt-4">
                    {nodeStyle && (
                        <>
                            <div className="space-y-2">
                                <Label htmlFor="background-color">
                                    Background Color
                                </Label>
                                <div className="flex gap-2">
                                    <Input
                                        id="background-color"
                                        type="color"
                                        value={nodeStyle.backgroundColor}
                                        onChange={(
                                            e: React.ChangeEvent<HTMLInputElement>
                                        ) =>
                                            handleStyleChange(
                                                "backgroundColor",
                                                e.target.value
                                            )
                                        }
                                        className="w-12 h-8 p-0 rounded"
                                    />
                                    <Input
                                        value={nodeStyle.backgroundColor}
                                        onChange={(
                                            e: React.ChangeEvent<HTMLInputElement>
                                        ) =>
                                            handleStyleChange(
                                                "backgroundColor",
                                                e.target.value
                                            )
                                        }
                                        className="flex-1"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="border-color">
                                    Border Color
                                </Label>
                                <div className="flex gap-2">
                                    <Input
                                        id="border-color"
                                        type="color"
                                        value={nodeStyle.borderColor}
                                        onChange={(
                                            e: React.ChangeEvent<HTMLInputElement>
                                        ) =>
                                            handleStyleChange(
                                                "borderColor",
                                                e.target.value
                                            )
                                        }
                                        className="w-12 h-8 p-0 rounded"
                                    />
                                    <Input
                                        value={nodeStyle.borderColor}
                                        onChange={(
                                            e: React.ChangeEvent<HTMLInputElement>
                                        ) =>
                                            handleStyleChange(
                                                "borderColor",
                                                e.target.value
                                            )
                                        }
                                        className="flex-1"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="border-width">
                                    Border Width ({nodeStyle.borderWidth}px)
                                </Label>
                                <Slider
                                    id="border-width"
                                    min={0}
                                    max={10}
                                    step={1}
                                    value={[nodeStyle.borderWidth]}
                                    onValueChange={(value: number[]) =>
                                        handleStyleChange(
                                            "borderWidth",
                                            value[0]
                                        )
                                    }
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="border-style">
                                    Border Style
                                </Label>
                                <Select
                                    value={nodeStyle.borderStyle}
                                    onValueChange={(value: string) =>
                                        handleStyleChange(
                                            "borderStyle",
                                            value as
                                                | "solid"
                                                | "dashed"
                                                | "dotted"
                                        )
                                    }
                                >
                                    <SelectTrigger id="border-style">
                                        <SelectValue placeholder="Select border style" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="solid">
                                            Solid
                                        </SelectItem>
                                        <SelectItem value="dashed">
                                            Dashed
                                        </SelectItem>
                                        <SelectItem value="dotted">
                                            Dotted
                                        </SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="text-color">Text Color</Label>
                                <div className="flex gap-2">
                                    <Input
                                        id="text-color"
                                        type="color"
                                        value={nodeStyle.textColor}
                                        onChange={(
                                            e: React.ChangeEvent<HTMLInputElement>
                                        ) =>
                                            handleStyleChange(
                                                "textColor",
                                                e.target.value
                                            )
                                        }
                                        className="w-12 h-8 p-0 rounded"
                                    />
                                    <Input
                                        value={nodeStyle.textColor}
                                        onChange={(
                                            e: React.ChangeEvent<HTMLInputElement>
                                        ) =>
                                            handleStyleChange(
                                                "textColor",
                                                e.target.value
                                            )
                                        }
                                        className="flex-1"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="font-size">
                                    Font Size ({nodeStyle.fontSize}px)
                                </Label>
                                <Slider
                                    id="font-size"
                                    min={8}
                                    max={24}
                                    step={1}
                                    value={[nodeStyle.fontSize]}
                                    onValueChange={(value: number[]) =>
                                        handleStyleChange("fontSize", value[0])
                                    }
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="opacity">
                                    Opacity (
                                    {Math.round(nodeStyle.opacity * 100)}%)
                                </Label>
                                <Slider
                                    id="opacity"
                                    min={0.1}
                                    max={1}
                                    step={0.05}
                                    value={[nodeStyle.opacity]}
                                    onValueChange={(value: number[]) =>
                                        handleStyleChange("opacity", value[0])
                                    }
                                />
                            </div>

                            <Button
                                variant="outline"
                                onClick={handleResetStyle}
                                className="w-full mt-4"
                            >
                                Reset to Default Style
                            </Button>
                        </>
                    )}
                </TabsContent>
            </Tabs>
        </div>
    );
};
