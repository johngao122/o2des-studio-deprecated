"use client";

import React, { useEffect, useState } from "react";
import { Handle, Position, NodeProps } from "reactflow";
import { BaseNode, NodeData } from "./BaseNode";
import { useNodeStyleStore } from "@/lib/store/useNodeStyleStore";
import { useTableStore } from "@/lib/store/useTableStore";

export interface TableNodeData extends NodeData {
    rows: number;
    columns: number;
    headers: string[];
    cells: string[][];
}

export class TableNodeClass extends BaseNode {
    static nodeStyles = {
        ...BaseNode.nodeStyles,
        base: {
            ...BaseNode.nodeStyles.base,
            borderRadius: "3px",
            minWidth: "250px",
            width: "auto",
            minHeight: "100px",
            padding: "10px",
            backgroundColor: "white",
        },
    };

    static previewStyles = {
        ...BaseNode.previewStyles,
        base: {
            ...BaseNode.previewStyles.base,
            borderRadius: "3px",
            padding: "4px",
            display: "flex",
            flexDirection: "column" as const,
            gap: "4px",
            width: "45px",
            height: "45px",
        },
        tooltip: {
            ...BaseNode.previewStyles.tooltip,
            borderRadius: "3px",
            padding: "4px",
            display: "flex",
            flexDirection: "column" as const,
            gap: "4px",
            width: "60px",
            height: "60px",
        },
    };

    static getPreview(label: string): React.ReactElement {
        return (
            <div style={this.previewStyles.base}>
                <div
                    style={{
                        fontSize: "8px",
                        textAlign: "center" as const,
                        borderBottom: "1px solid #d1d5db",
                        paddingBottom: "2px",
                    }}
                >
                    {label}
                </div>
                <div
                    style={{
                        display: "grid",
                        gridTemplateColumns: "1fr 1fr",
                        gap: "2px",
                        flex: 1,
                    }}
                >
                    {Array(4)
                        .fill(null)
                        .map((_, i) => (
                            <div
                                key={i}
                                style={{
                                    border: "1px solid #d1d5db",
                                    width: "100%",
                                    height: "100%",
                                }}
                            />
                        ))}
                </div>
            </div>
        );
    }

    static getTooltipPreview(): React.ReactElement {
        return (
            <div style={this.previewStyles.tooltip}>
                <div
                    style={{
                        fontSize: "10px",
                        textAlign: "center" as const,
                        borderBottom: "1px solid #d1d5db",
                        paddingBottom: "3px",
                    }}
                >
                    Table
                </div>
                <div
                    style={{
                        display: "grid",
                        gridTemplateColumns: "1fr 1fr 1fr",
                        gap: "2px",
                        flex: 1,
                    }}
                >
                    {Array(9)
                        .fill(null)
                        .map((_, i) => (
                            <div
                                key={i}
                                style={{
                                    border: "1px solid #d1d5db",
                                    width: "100%",
                                    height: "100%",
                                }}
                            />
                        ))}
                </div>
            </div>
        );
    }
}

export function TableNode({ data, selected, id }: NodeProps<TableNodeData>) {
    const nodeStyleStore = useNodeStyleStore();
    const nodeStyle = nodeStyleStore.getNodeStyle(id);
    const { initializeTable, getTableData, setActiveTable, updateTableData } =
        useTableStore();
    const [editingCell, setEditingCell] = useState<{
        row: number;
        col: number;
    } | null>(null);
    const [editingHeader, setEditingHeader] = useState<number | null>(null);
    const [editValue, setEditValue] = useState("");

    useEffect(() => {
        initializeTable(id, {
            rows: data.rows,
            columns: data.columns,
            headers: data.headers,
            cells: data.cells,
        });
    }, [
        id,
        data.rows,
        data.columns,
        data.headers,
        data.cells,
        initializeTable,
    ]);

    useEffect(() => {
        if (selected) {
            setActiveTable(id);
        }
    }, [selected, id, setActiveTable]);

    const tableData = getTableData(id);
    if (!tableData) return null;

    const style = {
        ...TableNodeClass.nodeStyles.base,
        ...(selected ? TableNodeClass.nodeStyles.selected : {}),
        ...(nodeStyle
            ? {
                  backgroundColor: nodeStyle.backgroundColor,
                  borderColor: nodeStyle.borderColor,
                  borderWidth: `${nodeStyle.borderWidth}px`,
                  borderStyle: nodeStyle.borderStyle,
                  color: nodeStyle.textColor,
                  fontSize: `${nodeStyle.fontSize}px`,
                  opacity: nodeStyle.opacity,
              }
            : {}),
    };

    const handleCellClick = (row: number, col: number, value: string) => {
        setEditingCell({ row, col });
        setEditValue(value);
    };

    const handleHeaderClick = (index: number, value: string) => {
        setEditingHeader(index);
        setEditValue(value);
    };

    const handleEditChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEditValue(e.target.value);
    };

    const handleEditKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter" || e.key === "Escape") {
            e.preventDefault();
            if (e.key === "Enter") {
                if (editingCell) {
                    const newCells = [...tableData.cells];
                    newCells[editingCell.row][editingCell.col] = editValue;
                    updateTableData(id, { cells: newCells });
                } else if (editingHeader !== null) {
                    const newHeaders = [...tableData.headers];
                    newHeaders[editingHeader] = editValue;
                    updateTableData(id, { headers: newHeaders });
                }
            }
            setEditingCell(null);
            setEditingHeader(null);
            setEditValue("");
        }
    };

    const handleEditBlur = () => {
        if (editingCell) {
            const newCells = [...tableData.cells];
            newCells[editingCell.row][editingCell.col] = editValue;
            updateTableData(id, { cells: newCells });
        } else if (editingHeader !== null) {
            const newHeaders = [...tableData.headers];
            newHeaders[editingHeader] = editValue;
            updateTableData(id, { headers: newHeaders });
        }
        setEditingCell(null);
        setEditingHeader(null);
        setEditValue("");
    };

    return (
        <div style={style}>
            <Handle type="target" position={Position.Top} />
            <div className="flex flex-col gap-2">
                <div className="font-semibold text-center">{data.label}</div>
                <div className="overflow-x-auto">
                    <table className="min-w-full border-collapse bg-white">
                        <thead>
                            <tr>
                                {tableData.headers.map((header, index) => (
                                    <th
                                        key={index}
                                        className="border border-gray-300 px-3 py-2 text-sm font-medium bg-gray-50 cursor-text"
                                        onClick={() =>
                                            handleHeaderClick(index, header)
                                        }
                                    >
                                        {editingHeader === index ? (
                                            <input
                                                type="text"
                                                value={editValue}
                                                onChange={handleEditChange}
                                                onKeyDown={handleEditKeyDown}
                                                onBlur={handleEditBlur}
                                                className="w-full bg-white border-none p-0 focus:outline-none text-sm font-medium text-center"
                                                autoFocus
                                            />
                                        ) : (
                                            header
                                        )}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {tableData.cells.map((row, rowIndex) => (
                                <tr key={rowIndex}>
                                    {row.map((cell, colIndex) => (
                                        <td
                                            key={colIndex}
                                            className="border border-gray-300 px-3 py-2 text-sm cursor-text"
                                            onClick={() =>
                                                handleCellClick(
                                                    rowIndex,
                                                    colIndex,
                                                    cell
                                                )
                                            }
                                        >
                                            {editingCell?.row === rowIndex &&
                                            editingCell?.col === colIndex ? (
                                                <input
                                                    type="text"
                                                    value={editValue}
                                                    onChange={handleEditChange}
                                                    onKeyDown={
                                                        handleEditKeyDown
                                                    }
                                                    onBlur={handleEditBlur}
                                                    className="w-full bg-white border-none p-0 focus:outline-none text-sm"
                                                    autoFocus
                                                />
                                            ) : (
                                                cell
                                            )}
                                        </td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            <Handle type="source" position={Position.Bottom} />
        </div>
    );
}
