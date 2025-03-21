"use client";

import React, { ChangeEvent, useRef } from "react";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Separator } from "@/components/ui/separator";
import {
    FileIcon,
    Edit,
    Eye,
    LayoutGrid,
    Plus,
    Settings,
    HelpCircle,
    ChevronDown,
    Save,
    Undo,
    Redo,
    Copy,
    Scissors,
    ClipboardPaste,
    ZoomIn,
    ZoomOut,
    Maximize,
    Upload,
    Moon,
    Sun,
} from "lucide-react";

interface ToolbarProps {
    onSave?: () => void;
    onLoad?: (event: ChangeEvent<HTMLInputElement>) => void;
    onUndo?: () => void;
    onRedo?: () => void;
    onZoomIn?: () => void;
    onZoomOut?: () => void;
    onFitView?: () => void;
    onToggleDarkMode?: () => void;
    isDarkMode?: boolean;
    lastAction?: string;
}

export function Toolbar({
    onSave,
    onLoad,
    onUndo,
    onRedo,
    onZoomIn,
    onZoomOut,
    onFitView,
    onToggleDarkMode,
    isDarkMode,
    lastAction,
}: ToolbarProps) {
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileUploadClick = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    return (
        <div className="flex items-center h-10 px-2 border-b bg-background">
            <div className="flex items-center space-x-1">
                {/* Logo */}
                <div className="w-6 h-6 bg-orange-500 flex items-center justify-center rounded">
                    <FileIcon className="h-4 w-4 text-white" />
                </div>

                {/* File Menu */}
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm" className="h-8 px-2">
                            File
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                        <DropdownMenuItem onSelect={onSave}>
                            <Save className="mr-2 h-4 w-4" />
                            Save
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={handleFileUploadClick}>
                            <Upload className="mr-2 h-4 w-4" />
                            Load
                        </DropdownMenuItem>
                        <DropdownMenuItem
                            onSelect={() => {
                                const event = new CustomEvent(
                                    "loadExampleDiagram"
                                );
                                window.dispatchEvent(event);
                            }}
                        >
                            <FileIcon className="mr-2 h-4 w-4" />
                            Load Example
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
                <input
                    type="file"
                    ref={fileInputRef}
                    className="hidden"
                    accept=".json"
                    onChange={onLoad}
                />

                {/* Edit Menu */}
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm" className="h-8 px-2">
                            Edit
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                        <DropdownMenuItem onSelect={onUndo}>
                            <Undo className="mr-2 h-4 w-4" />
                            Undo
                        </DropdownMenuItem>
                        <DropdownMenuItem onSelect={onRedo}>
                            <Redo className="mr-2 h-4 w-4" />
                            Redo
                        </DropdownMenuItem>
                        <Separator className="my-1" />
                        <DropdownMenuItem>
                            <Copy className="mr-2 h-4 w-4" />
                            Copy
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                            <Scissors className="mr-2 h-4 w-4" />
                            Cut
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                            <ClipboardPaste className="mr-2 h-4 w-4" />
                            Paste
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>

                {/* View Menu */}
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm" className="h-8 px-2">
                            View
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                        <DropdownMenuItem onSelect={onZoomIn}>
                            <ZoomIn className="mr-2 h-4 w-4" />
                            Zoom In
                        </DropdownMenuItem>
                        <DropdownMenuItem onSelect={onZoomOut}>
                            <ZoomOut className="mr-2 h-4 w-4" />
                            Zoom Out
                        </DropdownMenuItem>
                        <DropdownMenuItem onSelect={onFitView}>
                            <Maximize className="mr-2 h-4 w-4" />
                            Fit to View
                        </DropdownMenuItem>
                        <Separator className="my-1" />
                        <DropdownMenuItem onSelect={onToggleDarkMode}>
                            {isDarkMode ? (
                                <>
                                    <Sun className="mr-2 h-4 w-4" />
                                    Light Mode
                                </>
                            ) : (
                                <>
                                    <Moon className="mr-2 h-4 w-4" />
                                    Dark Mode
                                </>
                            )}
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>

                {/* Arrange Menu */}
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm" className="h-8 px-2">
                            Arrange
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                        <DropdownMenuItem>
                            <LayoutGrid className="mr-2 h-4 w-4" />
                            Align
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>

                {/* Extras Menu */}
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm" className="h-8 px-2">
                            Extras
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                        <DropdownMenuItem>
                            <Plus className="mr-2 h-4 w-4" />
                            Add Component
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>

                {/* Help Menu */}
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm" className="h-8 px-2">
                            Help
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                        <DropdownMenuItem>
                            <HelpCircle className="mr-2 h-4 w-4" />
                            Documentation
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>

            <div className="ml-auto flex items-center">
                <span className="text-xs text-muted-foreground mr-2">
                    {lastAction || "All changes saved"}
                </span>
            </div>
        </div>
    );
}
