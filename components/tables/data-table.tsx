"use client";

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { ReactNode } from "react";

interface Column<T> {
    header: string;
    accessorKey?: keyof T;
    cell?: (item: T) => ReactNode;
}

interface DataTableProps<T> {
    columns: Column<T>[];
    data: T[];
    onRowClick?: (item: T) => void;
}

export function DataTable<T>({ columns, data, onRowClick }: DataTableProps<T>) {
    return (
        <div className="rounded-md border">
            <Table>
                <TableHeader className="bg-muted/50">
                    <TableRow>
                        {columns.map((col, i) => (
                            <TableHead key={i} className="font-semibold">{col.header}</TableHead>
                        ))}
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {data.length === 0 ? (
                        <TableRow>
                            <TableCell colSpan={columns.length} className="h-24 text-center text-muted-foreground">
                                No results found.
                            </TableCell>
                        </TableRow>
                    ) : (
                        data.map((row, rowIndex) => (
                            <TableRow
                                key={rowIndex}
                                onClick={() => onRowClick && onRowClick(row)}
                                className={onRowClick ? "cursor-pointer hover:bg-muted/50" : ""}
                            >
                                {columns.map((col, colIndex) => (
                                    <TableCell key={colIndex}>
                                        {col.cell ? col.cell(row) : (col.accessorKey ? String(row[col.accessorKey]) : null)}
                                    </TableCell>
                                ))}
                            </TableRow>
                        ))
                    )}
                </TableBody>
            </Table>
        </div>
    );
}
