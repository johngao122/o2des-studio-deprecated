"use client";

import { create } from "zustand";

interface TableState {
    activeTableId: string | null;
    tables: Record<
        string,
        {
            rows: number;
            columns: number;
            headers: string[];
            cells: string[][];
        }
    >;
    setActiveTable: (id: string | null) => void;
    updateTableData: (
        id: string,
        data: {
            rows?: number;
            columns?: number;
            headers?: string[];
            cells?: string[][];
        }
    ) => void;
    initializeTable: (
        id: string,
        data: {
            rows: number;
            columns: number;
            headers: string[];
            cells: string[][];
        }
    ) => void;
    getTableData: (id: string) => {
        rows: number;
        columns: number;
        headers: string[];
        cells: string[][];
    } | null;
}

export const useTableStore = create<TableState>((set, get) => ({
    activeTableId: null,
    tables: {},

    setActiveTable: (id) => set({ activeTableId: id }),

    updateTableData: (id, data) => {
        set((state) => ({
            tables: {
                ...state.tables,
                [id]: {
                    ...state.tables[id],
                    ...data,
                },
            },
        }));
    },

    initializeTable: (id, data) => {
        set((state) => ({
            tables: {
                ...state.tables,
                [id]: data,
            },
        }));
    },

    getTableData: (id) => {
        const state = get();
        return state.tables[id] || null;
    },
}));
