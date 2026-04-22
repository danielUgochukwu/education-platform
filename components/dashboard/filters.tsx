"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Filter, Search } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface FiltersProps {
    placeholder?: string;
    categories?: string[];
    className?: string;
    onFilterChange?: (search: string, category: string) => void;
}

export function Filters({ placeholder = "Search...", categories = [], className, onFilterChange }: FiltersProps) {
    const [activeCategory, setActiveCategory] = useState<string>("All");
    const [search, setSearch] = useState("");

    const handleCategoryClick = (category: string) => {
        setActiveCategory(category);
        if (onFilterChange) onFilterChange(search, category);
    };

    return (
        <div className={cn("space-y-4", className)}>
            <div className="flex flex-col sm:flex-row gap-4">
                <div className="relative flex-1">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                        type="search"
                        placeholder={placeholder}
                        className="pl-9"
                        value={search}
                        onChange={(e) => {
                            setSearch(e.target.value);
                            if (onFilterChange) onFilterChange(e.target.value, activeCategory);
                        }}
                    />
                </div>
                <Button variant="outline" className="sm:w-auto w-full">
                    <Filter className="mr-2 h-4 w-4" />
                    More Filters
                </Button>
            </div>

            {categories.length > 0 && (
                <div className="flex flex-wrap gap-2">
                    <Button
                        variant={activeCategory === "All" ? "default" : "secondary"}
                        size="sm"
                        onClick={() => handleCategoryClick("All")}
                        className="rounded-full text-xs h-7"
                    >
                        All
                    </Button>
                    {categories.map((category) => (
                        <Button
                            key={category}
                            variant={activeCategory === category ? "default" : "secondary"}
                            size="sm"
                            onClick={() => handleCategoryClick(category)}
                            className="rounded-full text-xs h-7"
                        >
                            {category}
                        </Button>
                    ))}
                </div>
            )}
        </div>
    );
}
