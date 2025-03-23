import { Button } from "@/components/ui/button";
import { NodeShape } from "./ComponentManager";
import React from "react";
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import { nodeDefinitions } from "./nodes/NodeRegistry";

interface ComponentDrawerProps {
    onAddNode: (label: string, shape: NodeShape) => void;
}

export function ComponentDrawer({ onAddNode }: ComponentDrawerProps) {
    return (
        <div className="w-60 border-r p-4 overflow-y-auto">
            <h2 className="text-lg font-semibold mb-4">Components</h2>
            <div className="grid grid-cols-2 gap-2">
                {nodeDefinitions.map((nodeDef) => {
                    const NodeClass = nodeDef.nodeClass;

                    return (
                        <Tooltip key={nodeDef.label}>
                            <TooltipTrigger asChild>
                                <Button
                                    onClick={() =>
                                        onAddNode(nodeDef.label, nodeDef.type)
                                    }
                                    className="w-full mb-1 h-14 flex flex-col items-center justify-center"
                                    variant="outline"
                                >
                                    {NodeClass.getPreview(nodeDef.label)}
                                </Button>
                            </TooltipTrigger>
                            <TooltipContent
                                side="right"
                                sideOffset={10}
                                className="bg-white border border-gray-200 dark:border-gray-700 shadow-md rounded-md p-3 flex flex-col items-center text-black"
                            >
                                {NodeClass.getTooltipPreview()}
                                <div className="text-sm font-medium mt-1 text-black">
                                    {nodeDef.label}
                                </div>
                            </TooltipContent>
                        </Tooltip>
                    );
                })}
            </div>
        </div>
    );
}
