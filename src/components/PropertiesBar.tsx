"use client";

import React, { useEffect, useState } from "react";
import { useReactFlow, Node } from "reactflow";
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
import { TableNodeData } from "./nodes/TableNode";
import { NodeData } from "./nodes/BaseNode";
import { useTableStore } from "@/lib/store/useTableStore";

type FlowNode = Node<NodeData | TableNodeData>;

interface PropertiesBarProps {
    selectedNodes: FlowNode[];
}

export const PropertiesBar = ({ selectedNodes }: PropertiesBarProps) => {
    const { getNode, setNodes, getNodes } = useReactFlow<
        NodeData | TableNodeData
    >();
    const {
        selectedNodeId,
        setSelectedNodeId,
        getNodeStyle,
        updateNodeStyle,
        resetNodeStyle,
    } = useNodeStyleStore();

    const [selectedNode, setSelectedNode] = useState<Node | null>(null);
    const [nodeLabel, setNodeLabel] = useState("");
    const [nodeId, setNodeId] = useState("");
    const [multiSelection, setMultiSelection] = useState(false);

    const [commonStyle, setCommonStyle] = useState<Partial<NodeStyle> | null>(
        null
    );
    const [selectedIds, setSelectedIds] = useState<string[]>([]);

    const [rows, setRows] = useState(3);
    const [columns, setColumns] = useState(3);

    useEffect(() => {
        console.log(
            "Selected nodes updated in PropertiesBar:",
            selectedNodes.length
        );

        if (selectedNodes.length === 1) {
            const node = selectedNodes[0];
            setSelectedNode(node);
            setNodeLabel(node.data.label || "");
            setNodeId(node.id);
            setSelectedNodeId(node.id);
            setMultiSelection(false);
            setSelectedIds([node.id]);
        } else if (selectedNodes.length > 1) {
            console.log(
                "Multi-selection detected:",
                selectedNodes.length,
                "nodes"
            );
            setSelectedNode(null);
            setSelectedNodeId(null);
            setMultiSelection(true);

            const ids = selectedNodes.map((node) => node.id);
            setSelectedIds(ids);
        } else {
            setSelectedNode(null);
            setSelectedNodeId(null);
            setMultiSelection(false);
            setSelectedIds([]);
        }
    }, [selectedNodes, setSelectedNodeId]);

    useEffect(() => {
        if (multiSelection && selectedNodes.length > 1) {
            const nodeStyles = selectedNodes.map((node) =>
                getNodeStyle(node.id)
            );

            const firstStyle = nodeStyles[0];
            const common: Partial<NodeStyle> = {};

            Object.keys(firstStyle).forEach((key) => {
                const property = key as keyof NodeStyle;
                const firstValue = firstStyle[property];
                const allMatch = nodeStyles.every(
                    (style) => style[property] === firstValue
                );

                if (allMatch) {
                    common[property] = firstValue as any;
                }
            });

            setCommonStyle(common);

            setNodeLabel(`${selectedNodes.length} nodes selected`);
            setNodeId("multiple");
        } else {
            setCommonStyle(null);
        }
    }, [multiSelection, selectedNodes, getNodeStyle]);

    useEffect(() => {
        if (
            selectedNodes.length === 1 &&
            selectedNodes[0].type === "tableNode"
        ) {
            const tableData = selectedNodes[0].data as TableNodeData;
            setRows(tableData.rows);
            setColumns(tableData.columns);
        }
    }, [selectedNodes]);

    const handleLabelChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNodeLabel(e.target.value);

        if (multiSelection) {
            const updatedNodes = getNodes().map((node) => {
                if (selectedIds.includes(node.id)) {
                    return {
                        ...node,
                        data: {
                            ...node.data,
                            label: e.target.value,
                        },
                    };
                }
                return node;
            });
            setNodes(updatedNodes);
        } else if (selectedNode) {
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
        if (multiSelection) {
            selectedIds.forEach((id) => {
                updateNodeStyle(id, { [property]: value });
            });

            setCommonStyle((prev) =>
                prev ? { ...prev, [property]: value } : null
            );
        } else if (selectedNodeId) {
            updateNodeStyle(selectedNodeId, { [property]: value });
        }
    };

    const handleResetStyle = () => {
        if (multiSelection) {
            selectedIds.forEach((id) => {
                resetNodeStyle(id);
            });
        } else if (selectedNodeId) {
            resetNodeStyle(selectedNodeId);
        }
    };

    const nodeStyle = multiSelection
        ? commonStyle
        : selectedNodeId
        ? getNodeStyle(selectedNodeId)
        : null;

    const handleRowsChange = (value: number) => {
        if (!selectedNodes.length) return;
        const node = getNode(selectedNodes[0].id);
        if (!node || node.type !== "tableNode") return;

        // Ensure value is within bounds
        const newRows = Math.max(1, Math.min(30, value));
        setRows(newRows); // Update local state immediately

        const tableData = node.data as TableNodeData;

        // Preserve existing content when changing rows
        let newCells;
        if (newRows > tableData.cells.length) {
            // Adding rows - keep existing content and add empty rows
            const additionalRows = Array(newRows - tableData.cells.length)
                .fill(null)
                .map(() => Array(tableData.columns).fill(""));
            newCells = [...tableData.cells, ...additionalRows];
        } else {
            // Removing rows - keep only the first newRows rows
            newCells = tableData.cells.slice(0, newRows);
        }

        useTableStore.getState().updateTableData(node.id, {
            rows: newRows,
            cells: newCells,
        });

        setNodes(
            getNodes().map((n: FlowNode) =>
                n.id === node.id
                    ? {
                          ...n,
                          data: {
                              ...n.data,
                              rows: newRows,
                              cells: newCells,
                          },
                      }
                    : n
            )
        );
    };

    const handleColumnsChange = (value: number) => {
        if (!selectedNodes.length) return;
        const node = getNode(selectedNodes[0].id);
        if (!node || node.type !== "tableNode") return;

        // Ensure value is within bounds
        const newColumns = Math.max(1, Math.min(30, value));
        setColumns(newColumns); // Update local state immediately

        const tableData = node.data as TableNodeData;

        // Preserve existing headers when changing columns
        let newHeaders;
        if (newColumns > tableData.headers.length) {
            // Adding columns - keep existing headers and add new ones
            const additionalHeaders = Array(
                newColumns - tableData.headers.length
            )
                .fill("")
                .map((_, i) => `Header ${tableData.headers.length + i + 1}`);
            newHeaders = [...tableData.headers, ...additionalHeaders];
        } else {
            // Removing columns - keep only the first newColumns headers
            newHeaders = tableData.headers.slice(0, newColumns);
        }

        // Preserve existing cell content when changing columns
        const newCells = tableData.cells.map((row) => {
            if (newColumns > row.length) {
                // Adding columns - keep existing content and add empty cells
                return [...row, ...Array(newColumns - row.length).fill("")];
            } else {
                // Removing columns - keep only the first newColumns cells
                return row.slice(0, newColumns);
            }
        });

        useTableStore.getState().updateTableData(node.id, {
            columns: newColumns,
            headers: newHeaders,
            cells: newCells,
        });

        setNodes(
            getNodes().map((n: FlowNode) =>
                n.id === node.id
                    ? {
                          ...n,
                          data: {
                              ...n.data,
                              columns: newColumns,
                              headers: newHeaders,
                              cells: newCells,
                          },
                      }
                    : n
            )
        );
    };

    if (selectedNodes.length === 0) {
        return null;
    }

    return (
        <div className="w-72 bg-white dark:bg-gray-800 border-l border-gray-200 dark:border-gray-700 h-screen overflow-y-auto p-4 animate-in slide-in-from-right duration-300 absolute right-0 top-0 z-10">
            <h2 className="text-lg font-semibold mb-4">
                {multiSelection ? "Multiple Selection" : "Properties"}
            </h2>

            <Tabs defaultValue="general">
                <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="general">General</TabsTrigger>
                    <TabsTrigger value="style">Style</TabsTrigger>
                </TabsList>

                <TabsContent value="general" className="space-y-4 mt-4">
                    <div className="space-y-2">
                        <Label htmlFor="node-label">
                            {multiSelection ? "Common Label" : "Label"}
                        </Label>
                        <Input
                            id="node-label"
                            value={nodeLabel}
                            onChange={handleLabelChange}
                            placeholder={
                                multiSelection
                                    ? "Set label for all nodes"
                                    : "Node Label"
                            }
                            disabled={
                                multiSelection && !commonStyle?.backgroundColor
                            }
                        />
                        {multiSelection && !commonStyle?.backgroundColor && (
                            <div className="text-xs text-amber-500 mt-1">
                                Nodes have different labels
                            </div>
                        )}
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="node-id">ID</Label>
                        <Input
                            id="node-id"
                            value={
                                multiSelection
                                    ? `${selectedNodes.length} nodes selected`
                                    : nodeId
                            }
                            disabled
                            className="bg-gray-100 dark:bg-gray-700"
                        />
                    </div>

                    {selectedNodes.length === 1 &&
                        selectedNodes[0].type === "tableNode" && (
                            <div className="space-y-4">
                                <div className="space-y-2">
                                    <Label>Rows</Label>
                                    <Input
                                        type="number"
                                        min={1}
                                        max={30}
                                        value={rows}
                                        onChange={(e) => {
                                            const value =
                                                e.target.value === ""
                                                    ? 1
                                                    : parseInt(e.target.value);
                                            handleRowsChange(value);
                                        }}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label>Columns</Label>
                                    <Input
                                        type="number"
                                        min={1}
                                        max={30}
                                        value={columns}
                                        onChange={(e) => {
                                            const value =
                                                e.target.value === ""
                                                    ? 1
                                                    : parseInt(e.target.value);
                                            handleColumnsChange(value);
                                        }}
                                    />
                                </div>
                            </div>
                        )}
                </TabsContent>

                <TabsContent value="style" className="space-y-4 mt-4">
                    {nodeStyle && (
                        <>
                            {/* Background Color */}
                            <div className="space-y-2">
                                <Label htmlFor="background-color">
                                    Background Color
                                </Label>
                                {nodeStyle.backgroundColor !== undefined ? (
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
                                ) : (
                                    <div className="text-xs text-amber-500">
                                        Nodes have different background colors
                                    </div>
                                )}
                            </div>

                            {/* Border Color */}
                            <div className="space-y-2">
                                <Label htmlFor="border-color">
                                    Border Color
                                </Label>
                                {nodeStyle.borderColor !== undefined ? (
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
                                ) : (
                                    <div className="text-xs text-amber-500">
                                        Nodes have different border colors
                                    </div>
                                )}
                            </div>

                            {/* Border Width */}
                            <div className="space-y-2">
                                <Label htmlFor="border-width">
                                    Border Width{" "}
                                    {nodeStyle.borderWidth !== undefined
                                        ? `(${nodeStyle.borderWidth}px)`
                                        : ""}
                                </Label>
                                {nodeStyle.borderWidth !== undefined ? (
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
                                ) : (
                                    <div className="text-xs text-amber-500">
                                        Nodes have different border widths
                                    </div>
                                )}
                            </div>

                            {/* Border Style */}
                            <div className="space-y-2">
                                <Label htmlFor="border-style">
                                    Border Style
                                </Label>
                                {nodeStyle.borderStyle !== undefined ? (
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
                                ) : (
                                    <div className="text-xs text-amber-500">
                                        Nodes have different border styles
                                    </div>
                                )}
                            </div>

                            {/* Text Color */}
                            <div className="space-y-2">
                                <Label htmlFor="text-color">Text Color</Label>
                                {nodeStyle.textColor !== undefined ? (
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
                                ) : (
                                    <div className="text-xs text-amber-500">
                                        Nodes have different text colors
                                    </div>
                                )}
                            </div>

                            {/* Font Size */}
                            <div className="space-y-2">
                                <Label htmlFor="font-size">
                                    Font Size{" "}
                                    {nodeStyle.fontSize !== undefined
                                        ? `(${nodeStyle.fontSize}px)`
                                        : ""}
                                </Label>
                                {nodeStyle.fontSize !== undefined ? (
                                    <Slider
                                        id="font-size"
                                        min={8}
                                        max={24}
                                        step={1}
                                        value={[nodeStyle.fontSize]}
                                        onValueChange={(value: number[]) =>
                                            handleStyleChange(
                                                "fontSize",
                                                value[0]
                                            )
                                        }
                                    />
                                ) : (
                                    <div className="text-xs text-amber-500">
                                        Nodes have different font sizes
                                    </div>
                                )}
                            </div>

                            {/* Opacity */}
                            <div className="space-y-2">
                                <Label htmlFor="opacity">
                                    Opacity{" "}
                                    {nodeStyle.opacity !== undefined
                                        ? `(${Math.round(
                                              nodeStyle.opacity * 100
                                          )}%)`
                                        : ""}
                                </Label>
                                {nodeStyle.opacity !== undefined ? (
                                    <Slider
                                        id="opacity"
                                        min={0.1}
                                        max={1}
                                        step={0.05}
                                        value={[nodeStyle.opacity]}
                                        onValueChange={(value: number[]) =>
                                            handleStyleChange(
                                                "opacity",
                                                value[0]
                                            )
                                        }
                                    />
                                ) : (
                                    <div className="text-xs text-amber-500">
                                        Nodes have different opacity values
                                    </div>
                                )}
                            </div>

                            <Button
                                variant="outline"
                                onClick={handleResetStyle}
                                className="w-full mt-4"
                            >
                                {multiSelection
                                    ? "Reset All Styles"
                                    : "Reset to Default Style"}
                            </Button>
                        </>
                    )}
                </TabsContent>
            </Tabs>
        </div>
    );
};
