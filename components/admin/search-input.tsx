"use client";

import { useTransition } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export function SearchInput({ placeholder }: { placeholder?: string }) {
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const { replace } = useRouter();
    const [isPending, startTransition] = useTransition();

    function handleSearch(term: string) {
        startTransition(() => {
            const params = new URLSearchParams(searchParams);
            if (term) {
                params.set("q", term);
            } else {
                params.delete("q");
            }
            replace(`${pathname}?${params.toString()}`);
        });
    }

    return (
        <div className="relative flex w-full max-w-sm items-center">
            <Search className="absolute left-2.5 h-4 w-4 text-muted-foreground" />
            <Input
                type="search"
                placeholder={placeholder || "Search..."}
                className="w-full bg-background pl-8 shadow-none"
                onChange={(e) => {
                    handleSearch(e.target.value);
                }}
                defaultValue={searchParams.get("q")?.toString()}
            />
            {isPending && (
                <div className="absolute right-3 flex h-4 w-4 items-center justify-center">
                    <div className="h-3 w-3 animate-spin rounded-full border-2 border-primary border-t-transparent" />
                </div>
            )}
        </div>
    );
}
