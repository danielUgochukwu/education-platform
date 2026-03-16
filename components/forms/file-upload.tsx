import { UploadCloud } from "lucide-react";

interface FileUploadProps {
    label: string;
    acceptedTypes?: string;
    maxSize?: string;
}

export function FileUpload({ label, acceptedTypes = "PDF, JPG, PNG", maxSize = "5MB" }: FileUploadProps) {
    return (
        <div className="w-full">
            <label className="block text-sm font-medium mb-2">{label}</label>
            <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-8 hover:bg-muted/30 transition-colors cursor-pointer text-center group">
                <UploadCloud className="mx-auto h-10 w-10 text-muted-foreground mb-4 group-hover:text-primary transition-colors" />
                <p className="text-sm font-medium mb-1">Click to upload or drag and drop</p>
                <p className="text-xs text-muted-foreground">
                    {acceptedTypes} up to {maxSize}
                </p>
            </div>
        </div>
    );
}
