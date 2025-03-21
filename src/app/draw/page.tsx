"use client";

import React, { useCallback, ChangeEvent, useRef, useEffect } from "react";
import ReactFlow, {
    Background,
    Controls,
    MiniMap,
    BackgroundVariant,
    NodeTypes,
    ReactFlowInstance,
    Edge,
    MarkerType,
} from "reactflow";
import "reactflow/dist/style.css";
import { saveAs } from "file-saver";
import { ComponentDrawer } from "@/components/ComponentDrawer";
import { NodeShape } from "@/components/ComponentManager";
import {
    RectangleNode,
    EllipseNode,
    DiamondNode,
} from "@/components/nodes/CustomNodes";
import { Toolbar } from "@/components/Toolbar";
import { useFlowStore } from "@/lib/store/useFlowStore";
import { useUIStore } from "@/lib/store/useUIStore";
import { useProjectStore } from "@/lib/store/useProjectStore";
import exampleDiagram from "@/data/examplediagram.json";
import { Toaster, toast } from "sonner";

const nodeTypes: NodeTypes = {
    rectangleNode: RectangleNode,
    ellipseNode: EllipseNode,
    diamondNode: DiamondNode,
};

export default function Draw() {
    // Flow state from Zustand
    const {
        nodes,
        edges,
        onNodesChange,
        onEdgesChange,
        onConnect,
        addNode,
        setNodes,
        setEdges,
        loadFlow,
    } = useFlowStore();

    // UI state from Zustand
    const {
        snapToGrid,
        gridSize,
        miniMapVisible,
        controlsVisible,
        isSidebarOpen,
        setLastAction,
        lastAction,
        isDarkMode,
        toggleDarkMode,
    } = useUIStore();

    // Project state from Zustand
    const {
        projectName,
        setProjectName,
        saveCurrentState,
        lastSaved,
        savedNodes,
        savedEdges,
        addRecentProject,
    } = useProjectStore();

    const reactFlowInstance = useRef<ReactFlowInstance | null>(null);

    // Apply dark mode
    useEffect(() => {
        if (isDarkMode) {
            document.documentElement.classList.add("dark");
        } else {
            document.documentElement.classList.remove("dark");
        }
    }, [isDarkMode]);

    // Auto-save effect
    useEffect(() => {
        // Only save if there are changes (nodes or edges have changed)
        const autoSaveTimer = setTimeout(() => {
            saveCurrentState(nodes, edges);
            setLastAction("Auto-saved");
        }, 10000); // Auto-save every 10 seconds of inactivity

        return () => clearTimeout(autoSaveTimer);
    }, [nodes, edges, saveCurrentState, setLastAction]);

    // Load saved state on initial load
    useEffect(() => {
        if (savedNodes.length > 0 || savedEdges.length > 0) {
            loadFlow(savedNodes, savedEdges);
            setLastAction("Loaded from auto-save");
        }
    }, []);

    // Add this useEffect to listen for the loadExampleDiagram event
    useEffect(() => {
        const handleLoadExample = () => {
            try {
                // Process the example diagram data
                const loadedNodes = exampleDiagram.nodes.map((node: any) => ({
                    ...node,
                    draggable: true,
                    type: node.type || "rectangleNode",
                }));

                const loadedEdges = exampleDiagram.edges.map((edge: any) => ({
                    ...edge,
                    markerEnd: edge.markerEnd || { type: MarkerType.Arrow },
                }));

                // Load the data into the flow
                loadFlow(loadedNodes, loadedEdges);
                saveCurrentState(loadedNodes, loadedEdges);

                // Update ReactFlow view
                if (reactFlowInstance.current) {
                    setTimeout(() => {
                        reactFlowInstance.current?.fitView({ padding: 0.2 });
                    }, 50);
                }

                setLastAction("Loaded example diagram");
            } catch (error) {
                console.error("Failed to load example diagram", error);
                setLastAction("Error: Failed to load example diagram");
            }
        };

        window.addEventListener("loadExampleDiagram", handleLoadExample);
        return () => {
            window.removeEventListener("loadExampleDiagram", handleLoadExample);
        };
    }, [loadFlow, saveCurrentState, setLastAction, reactFlowInstance]);

    const handleSave = () => {
        const diagramData = JSON.stringify(
            {
                projectName,
                nodes,
                edges,
            },
            null,
            2
        );
        const blob = new Blob([diagramData], { type: "application/json" });
        saveAs(blob, `${projectName.replace(/\s+/g, "_")}.json`);
        saveCurrentState(nodes, edges);
        addRecentProject(projectName);
        setLastAction(`Saved: ${projectName}`);
    };

    const handleLoad = (event: ChangeEvent<HTMLInputElement>) => {
        console.log("Starting file load process...");
        const fileReader = new FileReader();
        fileReader.onload = () => {
            console.log("File read complete");
            const content = fileReader.result;
            if (typeof content === "string") {
                try {
                    console.log("Parsing JSON data...");
                    const loadedData = JSON.parse(content);

                    // Validate required structure
                    if (
                        !loadedData.nodes ||
                        !Array.isArray(loadedData.nodes) ||
                        !loadedData.edges ||
                        !Array.isArray(loadedData.edges)
                    ) {
                        throw new Error(
                            "Invalid file format: Missing nodes or edges array"
                        );
                    }

                    // Validate nodes structure
                    for (const node of loadedData.nodes) {
                        if (!node.id || !node.position || !node.data) {
                            throw new Error(
                                "Invalid node format: Missing required properties"
                            );
                        }
                    }

                    // Validate edges structure
                    for (const edge of loadedData.edges) {
                        if (!edge.source || !edge.target) {
                            throw new Error(
                                "Invalid edge format: Missing source or target"
                            );
                        }
                    }

                    console.log("Loaded data:", loadedData);

                    // Ensure nodes have all required properties
                    console.log("Processing nodes...");
                    const loadedNodes = loadedData.nodes?.map((node: any) => {
                        const processedNode = {
                            id: node.id,
                            type: node.type || "rectangleNode",
                            position: node.position,
                            data: node.data || { label: "Node" },
                            draggable: true,
                            width: node.width || 150,
                            height: node.height || 40,
                            selected: false,
                            positionAbsolute: node.position,
                        };
                        console.log(
                            `Processed node ${node.id}:`,
                            processedNode
                        );
                        return processedNode;
                    });

                    // Ensure edges have all required properties
                    console.log("Processing edges...");
                    const loadedEdges = loadedData.edges?.map((edge: any) => {
                        const processedEdge = {
                            id:
                                edge.id ||
                                `reactflow__edge-${edge.source}-${edge.target}`,
                            source: edge.source,
                            target: edge.target,
                            sourceHandle: edge.sourceHandle,
                            targetHandle: edge.targetHandle,
                            markerEnd: edge.markerEnd || {
                                type: MarkerType.Arrow,
                            },
                        };
                        console.log(
                            `Processed edge ${processedEdge.id}:`,
                            processedEdge
                        );
                        return processedEdge;
                    });

                    if (loadedData.projectName) {
                        console.log(
                            "Setting project name:",
                            loadedData.projectName
                        );
                        setProjectName(loadedData.projectName);
                        addRecentProject(loadedData.projectName);
                    }

                    // Clear existing nodes and edges before loading new ones
                    console.log("Clearing existing nodes and edges...");
                    setNodes([]);
                    setEdges([]);

                    // Update the flow with a slight delay to ensure clear happens first
                    console.log("Starting load timeout...");
                    setTimeout(() => {
                        console.log("Loading nodes and edges into flow...");
                        console.log("Nodes to load:", loadedNodes);
                        console.log("Edges to load:", loadedEdges);
                        loadFlow(loadedNodes, loadedEdges);

                        console.log("Saving current state...");
                        saveCurrentState(loadedNodes, loadedEdges);

                        // Fit view after loading
                        if (reactFlowInstance.current) {
                            console.log("Fitting view...");
                            reactFlowInstance.current.fitView({ padding: 0.2 });
                        }

                        console.log("Load process complete");
                        toast.success("Diagram loaded successfully");
                        setLastAction(
                            `Loaded: ${
                                loadedData.projectName || "Unnamed Project"
                            }`
                        );
                    }, 50);
                } catch (error: any) {
                    console.error("Failed to parse diagram file", error);
                    toast.error(
                        `Failed to load diagram: ${
                            error.message || "Unknown error"
                        }`
                    );
                    setLastAction("Error: Failed to load diagram");
                }
            }
        };

        fileReader.onerror = () => {
            toast.error("Failed to read file");
            setLastAction("Error: Failed to read file");
        };

        const files = event.target.files;
        if (files && files[0]) {
            const file = files[0];
            if (file.type !== "application/json") {
                toast.error("Invalid file type. Please select a JSON file");
                return;
            }
            fileReader.readAsText(file);
        }
    };

    const handleAddNode = (label: string, shape: NodeShape = "rectangle") => {
        addNode(label, shape);
        setLastAction(`Added ${shape} node: ${label}`);
    };

    const handleZoomIn = () => {
        if (reactFlowInstance.current) {
            reactFlowInstance.current.zoomIn();
            setLastAction("Zoomed in");
        }
    };

    const handleZoomOut = () => {
        if (reactFlowInstance.current) {
            reactFlowInstance.current.zoomOut();
            setLastAction("Zoomed out");
        }
    };

    const handleFitView = () => {
        if (reactFlowInstance.current) {
            reactFlowInstance.current.fitView();
            setLastAction("Fitted view");
        }
    };

    return (
        <div
            className={`h-screen w-full flex flex-col ${
                isDarkMode
                    ? "dark bg-gray-900 text-white"
                    : "bg-white text-black"
            }`}
        >
            <Toaster richColors position="top-center" />
            <Toolbar
                onSave={handleSave}
                onLoad={handleLoad}
                onZoomIn={handleZoomIn}
                onZoomOut={handleZoomOut}
                onFitView={handleFitView}
                onToggleDarkMode={toggleDarkMode}
                isDarkMode={isDarkMode}
                lastAction={lastAction}
            />
            <div className="flex-1 flex">
                {isSidebarOpen && <ComponentDrawer onAddNode={handleAddNode} />}
                <div className="flex-1 flex flex-col">
                    <div className="flex-1">
                        <ReactFlow
                            nodes={nodes}
                            edges={edges}
                            onNodesChange={onNodesChange}
                            onEdgesChange={onEdgesChange}
                            onConnect={onConnect}
                            snapToGrid={snapToGrid}
                            snapGrid={[gridSize, gridSize]}
                            nodeTypes={nodeTypes}
                            nodesDraggable={true}
                            defaultEdgeOptions={{
                                markerEnd: { type: MarkerType.Arrow },
                            }}
                            fitView
                            fitViewOptions={{ padding: 0.2 }}
                            onInit={(instance) => {
                                reactFlowInstance.current = instance;
                            }}
                        >
                            {miniMapVisible && <MiniMap />}
                            {controlsVisible && <Controls />}
                            <Background
                                variant={BackgroundVariant.Dots}
                                gap={12}
                                size={1}
                                className={
                                    isDarkMode ? "bg-gray-800" : "bg-gray-100"
                                }
                            />
                        </ReactFlow>
                    </div>
                </div>
            </div>
        </div>
    );
}
