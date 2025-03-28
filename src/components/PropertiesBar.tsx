"use client";

import React, { useEffect, useState } from "react";
import { useReactFlow, Node, Edge } from "reactflow";
import { useNodeStyleStore, NodeStyle } from "@/lib/store/useNodeStyleStore";
import { useEdgeStyleStore, EdgeStyle } from "@/lib/store/useEdgeStyleStore";
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
    selectedEdges: Edge[];
}

export const PropertiesBar = ({
    selectedNodes,
    selectedEdges,
}: PropertiesBarProps) => {
    const { getNode, setNodes, getNodes, getEdges, setEdges } = useReactFlow<
        NodeData | TableNodeData
    >();
    const {
        selectedNodeId,
        setSelectedNodeId,
        getNodeStyle,
        updateNodeStyle,
        resetNodeStyle,
    } = useNodeStyleStore();

    const {
        selectedEdgeId,
        setSelectedEdgeId,
        getEdgeStyle,
        updateEdgeStyle,
        resetEdgeStyle,
    } = useEdgeStyleStore();

    const [selectedNode, setSelectedNode] = useState<Node | null>(null);
    const [selectedEdge, setSelectedEdge] = useState<Edge | null>(null);
    const [nodeLabel, setNodeLabel] = useState("");
    const [nodeId, setNodeId] = useState("");
    const [multiSelection, setMultiSelection] = useState(false);
    const [edgeMultiSelection, setEdgeMultiSelection] = useState(false);

    const [commonStyle, setCommonStyle] = useState<Partial<NodeStyle> | null>(
        null
    );
    const [commonEdgeStyle, setCommonEdgeStyle] =
        useState<Partial<EdgeStyle> | null>(null);
    const [selectedIds, setSelectedIds] = useState<string[]>([]);
    const [selectedEdgeIds, setSelectedEdgeIds] = useState<string[]>([]);

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

    useEffect(() => {
        if (selectedEdges.length === 1) {
            const edge = selectedEdges[0];
            console.log("Single edge selected:", edge);
            setSelectedEdge(edge);
            setSelectedEdgeId(edge.id);
            setEdgeMultiSelection(false);
            setSelectedEdgeIds([edge.id]);
        } else if (selectedEdges.length > 1) {
            console.log("Multiple edges selected:", selectedEdges.length);
            setSelectedEdge(null);
            setSelectedEdgeId(null);
            setEdgeMultiSelection(true);
            const ids = selectedEdges.map((edge) => edge.id);
            setSelectedEdgeIds(ids);
        } else {
            console.log("No edges selected");
            setSelectedEdge(null);
            setSelectedEdgeId(null);
            setEdgeMultiSelection(false);
            setSelectedEdgeIds([]);
        }
    }, [selectedEdges, setSelectedEdgeId]);

    useEffect(() => {
        if (edgeMultiSelection && selectedEdges.length > 1) {
            console.log(
                "Calculating common edge styles for multiple selection"
            );
            const edgeStyles = selectedEdges.map((edge) =>
                getEdgeStyle(edge.id)
            );
            const firstStyle = edgeStyles[0];
            const common: Partial<EdgeStyle> = {};

            Object.keys(firstStyle).forEach((key) => {
                const property = key as keyof EdgeStyle;
                const firstValue = firstStyle[property];
                const allMatch = edgeStyles.every(
                    (style) => style[property] === firstValue
                );

                if (allMatch) {
                    common[property] = firstValue as any;
                }
            });

            console.log("Common edge styles:", common);
            setCommonEdgeStyle(common);
        } else {
            console.log("No common edge styles to calculate");
            setCommonEdgeStyle(null);
        }
    }, [edgeMultiSelection, selectedEdges, getEdgeStyle]);

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

    const handleEdgeStyleChange = (property: keyof EdgeStyle, value: any) => {
        console.log("Edge style change:", { property, value });
        if (edgeMultiSelection) {
            console.log("Applying style to multiple edges:", selectedEdgeIds);
            selectedEdgeIds.forEach((id) => {
                updateEdgeStyle(id, { [property]: value });
            });

            setCommonEdgeStyle((prev) =>
                prev ? { ...prev, [property]: value } : null
            );
        } else if (selectedEdgeId) {
            console.log("Applying style to single edge:", selectedEdgeId);
            updateEdgeStyle(selectedEdgeId, { [property]: value });
        }
    };

    const handleResetEdgeStyle = () => {
        console.log("Resetting edge styles");
        if (edgeMultiSelection) {
            console.log(
                "Resetting styles for multiple edges:",
                selectedEdgeIds
            );
            selectedEdgeIds.forEach((id) => {
                resetEdgeStyle(id);
            });
        } else if (selectedEdgeId) {
            console.log("Resetting style for single edge:", selectedEdgeId);
            resetEdgeStyle(selectedEdgeId);
        }
    };

    const edgeStyle = edgeMultiSelection
        ? commonEdgeStyle
        : selectedEdgeId
        ? getEdgeStyle(selectedEdgeId)
        : null;

    const handleRowsChange = (value: number) => {
        if (!selectedNodes.length) return;
        const node = getNode(selectedNodes[0].id);
        if (!node || node.type !== "tableNode") return;

        const newRows = Math.max(1, Math.min(30, value));
        setRows(newRows);

        const tableData = node.data as TableNodeData;

        let newCells;
        if (newRows > tableData.cells.length) {
            const additionalRows = Array(newRows - tableData.cells.length)
                .fill(null)
                .map(() => Array(tableData.columns).fill(""));
            newCells = [...tableData.cells, ...additionalRows];
        } else {
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

        const newColumns = Math.max(1, Math.min(30, value));
        setColumns(newColumns);

        const tableData = node.data as TableNodeData;

        let newHeaders;
        if (newColumns > tableData.headers.length) {
            const additionalHeaders = Array(
                newColumns - tableData.headers.length
            )
                .fill("")
                .map((_, i) => `Header ${tableData.headers.length + i + 1}`);
            newHeaders = [...tableData.headers, ...additionalHeaders];
        } else {
            newHeaders = tableData.headers.slice(0, newColumns);
        }

        const newCells = tableData.cells.map((row) => {
            if (newColumns > row.length) {
                return [...row, ...Array(newColumns - row.length).fill("")];
            } else {
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

    if (selectedNodes.length === 0 && selectedEdges.length === 0) {
        return null;
    }

    return (
        <div className="w-80 h-full bg-background border-l border-border p-4 overflow-y-auto fixed right-0 top-0 bottom-0">
            <Tabs defaultValue="properties" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="properties">Properties</TabsTrigger>
                    <TabsTrigger value="styles">Styles</TabsTrigger>
                </TabsList>
                <TabsContent value="properties">
                    {selectedNodes.length > 0 ? (
                        <div className="space-y-4">
                            <div className="space-y-2">
                                <Label>Label</Label>
                                <Input
                                    value={nodeLabel}
                                    onChange={handleLabelChange}
                                    placeholder="Enter label"
                                />
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
                                                            : parseInt(
                                                                  e.target.value
                                                              );
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
                                                            : parseInt(
                                                                  e.target.value
                                                              );
                                                    handleColumnsChange(value);
                                                }}
                                            />
                                        </div>
                                    </div>
                                )}
                        </div>
                    ) : selectedEdges.length > 0 ? (
                        <div className="space-y-4">
                            <div className="space-y-2">
                                <Label>Edge ID</Label>
                                <Input
                                    value={
                                        edgeMultiSelection
                                            ? `${selectedEdges.length} edges selected`
                                            : selectedEdge?.id || ""
                                    }
                                    disabled
                                    className="bg-gray-100 dark:bg-gray-700"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label>Source</Label>
                                <Input
                                    value={selectedEdge?.source || ""}
                                    disabled
                                    className="bg-gray-100 dark:bg-gray-700"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label>Target</Label>
                                <Input
                                    value={selectedEdge?.target || ""}
                                    disabled
                                    className="bg-gray-100 dark:bg-gray-700"
                                />
                            </div>
                        </div>
                    ) : (
                        <div className="p-4 text-center text-muted-foreground">
                            Select a node or edge to view properties
                        </div>
                    )}
                </TabsContent>
                <TabsContent value="styles">
                    {selectedNodes.length > 0 ? (
                        <div className="space-y-4">
                            <div className="flex items-center justify-between">
                                <Label>Node Style</Label>
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={handleResetStyle}
                                >
                                    Reset
                                </Button>
                            </div>
                            <div className="space-y-2">
                                <Label>Background Color</Label>
                                <Input
                                    type="color"
                                    value={
                                        nodeStyle?.backgroundColor || "#ffffff"
                                    }
                                    onChange={(e) =>
                                        handleStyleChange(
                                            "backgroundColor",
                                            e.target.value
                                        )
                                    }
                                />
                            </div>
                            <div className="space-y-2">
                                <Label>Border Color</Label>
                                <Input
                                    type="color"
                                    value={nodeStyle?.borderColor || "#000000"}
                                    onChange={(e) =>
                                        handleStyleChange(
                                            "borderColor",
                                            e.target.value
                                        )
                                    }
                                />
                            </div>
                            <div className="space-y-2">
                                <Label>Border Width</Label>
                                <Slider
                                    value={[nodeStyle?.borderWidth || 1]}
                                    min={1}
                                    max={10}
                                    step={1}
                                    onValueChange={([value]) =>
                                        handleStyleChange("borderWidth", value)
                                    }
                                />
                            </div>
                            <div className="space-y-2">
                                <Label>Border Style</Label>
                                <Select
                                    value={nodeStyle?.borderStyle || "solid"}
                                    onValueChange={(
                                        value: "solid" | "dashed" | "dotted"
                                    ) =>
                                        handleStyleChange("borderStyle", value)
                                    }
                                >
                                    <SelectTrigger>
                                        <SelectValue />
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
                                <Label>Font Size</Label>
                                <Slider
                                    value={[nodeStyle?.fontSize || 12]}
                                    min={8}
                                    max={24}
                                    step={1}
                                    onValueChange={([value]) =>
                                        handleStyleChange("fontSize", value)
                                    }
                                />
                            </div>
                            <div className="space-y-2">
                                <Label>Font Color</Label>
                                <Input
                                    type="color"
                                    value={nodeStyle?.textColor || "#000000"}
                                    onChange={(e) =>
                                        handleStyleChange(
                                            "textColor",
                                            e.target.value
                                        )
                                    }
                                />
                            </div>
                            <div className="space-y-2">
                                <Label>Opacity</Label>
                                <Slider
                                    value={[nodeStyle?.opacity || 1]}
                                    min={0}
                                    max={1}
                                    step={0.1}
                                    onValueChange={([value]) =>
                                        handleStyleChange("opacity", value)
                                    }
                                />
                            </div>
                        </div>
                    ) : selectedEdges.length > 0 ? (
                        <div className="space-y-4">
                            <div className="flex items-center justify-between">
                                <Label>Edge Style</Label>
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={handleResetEdgeStyle}
                                >
                                    Reset
                                </Button>
                            </div>
                            <div className="space-y-2">
                                <Label>Color</Label>
                                <Input
                                    type="color"
                                    value={edgeStyle?.stroke || "#1a192b"}
                                    onChange={(e) =>
                                        handleEdgeStyleChange(
                                            "stroke",
                                            e.target.value
                                        )
                                    }
                                />
                            </div>
                            <div className="space-y-2">
                                <Label>Width</Label>
                                <Slider
                                    value={[edgeStyle?.strokeWidth || 1]}
                                    min={1}
                                    max={10}
                                    step={1}
                                    onValueChange={([value]) =>
                                        handleEdgeStyleChange(
                                            "strokeWidth",
                                            value
                                        )
                                    }
                                />
                            </div>
                            <div className="space-y-2">
                                <Label>Style</Label>
                                <Select
                                    value={edgeStyle?.strokeStyle || "solid"}
                                    onValueChange={(
                                        value: "solid" | "dashed" | "dotted"
                                    ) =>
                                        handleEdgeStyleChange(
                                            "strokeStyle",
                                            value
                                        )
                                    }
                                >
                                    <SelectTrigger>
                                        <SelectValue />
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
                                <Label>Opacity</Label>
                                <Slider
                                    value={[edgeStyle?.opacity || 1]}
                                    min={0}
                                    max={1}
                                    step={0.1}
                                    onValueChange={([value]) =>
                                        handleEdgeStyleChange("opacity", value)
                                    }
                                />
                            </div>
                            <div className="flex items-center space-x-2">
                                <Label>Animated</Label>
                                <input
                                    type="checkbox"
                                    checked={edgeStyle?.animated || false}
                                    onChange={(e) =>
                                        handleEdgeStyleChange(
                                            "animated",
                                            e.target.checked
                                        )
                                    }
                                />
                            </div>
                        </div>
                    ) : (
                        <div className="p-4 text-center text-muted-foreground">
                            Select a node or edge to edit its style
                        </div>
                    )}
                </TabsContent>
            </Tabs>
        </div>
    );
};
