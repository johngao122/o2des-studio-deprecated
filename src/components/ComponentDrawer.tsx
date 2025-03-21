import { Button } from "@/components/ui/button";
import { NodeShape } from "./ComponentManager";

const DefaultComponents = [
    { label: "Rectangle", shape: "rectangle" as NodeShape },
    { label: "Ellipse", shape: "ellipse" as NodeShape },
    { label: "Diamond", shape: "diamond" as NodeShape },
];

interface ComponentDrawerProps {
    onAddNode: (label: string, shape: NodeShape) => void;
}

export function ComponentDrawer({ onAddNode }: ComponentDrawerProps) {
    return (
        <div className="w-60 border-r p-4 overflow-y-auto">
            <h2 className="text-lg font-semibold mb-4">Components</h2>
            {DefaultComponents.map((comp) => (
                <Button
                    key={comp.label}
                    onClick={() => onAddNode(comp.label, comp.shape)}
                    className="w-full mb-2"
                >
                    {comp.label}
                </Button>
            ))}
        </div>
    );
}
