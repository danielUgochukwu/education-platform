"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";

import {
  ArrowLeft,
  ArrowRight,
  Upload,
  CheckCircle2,
  Clock,
  XCircle,
  Trash2,
  FileText,
  Info,
  AlertCircle,
} from "lucide-react";
import type {
  DocumentStatus,
  DocumentType,
  UploadedDocument,
} from "@/types";
import Link from "next/link";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import {
  CldUploadWidget,
  type CloudinaryUploadWidgetResults,
} from "next-cloudinary";
import {
  deleteApplicationDocument,
  saveApplicationDocument,
} from "@/lib/supabase/actions";

interface DocumentUploadFormProps {
  documents: UploadedDocument[];
  onNext?: () => void;
  onBack?: () => void;
}

interface RequiredDocument {
  slot: string;
  type: DocumentType;
  label: string;
  description: string;
  required: boolean;
}

type CloudinaryUploadInfo = {
  bytes?: number;
  format?: string;
  original_filename?: string;
  public_id: string;
  resource_type?: string;
  secure_url: string;
};

const MAX_FILE_SIZE = 5 * 1024 * 1024;

const requiredDocuments: RequiredDocument[] = [
  {
    slot: "transcript",
    type: "transcript",
    label: "Academic Transcripts / WAEC Result",
    description: "Certified copy of your final secondary school results.",
    required: true,
  },
  {
    slot: "government_id",
    type: "id",
    label: "Government-Issued ID",
    description:
      "National ID card, International Passport, or Birth Certificate.",
    required: true,
  },
  {
    slot: "reference_letter_academic",
    type: "reference_letter",
    label: "Reference Letter 1 (Academic)",
    description: "Letter from a teacher, lecturer, or school principal.",
    required: true,
  },
  {
    slot: "reference_letter_community",
    type: "reference_letter",
    label: "Reference Letter 2 (Community)",
    description: "Letter from a community or civic leader.",
    required: true,
  },
  {
    slot: "jamb_result",
    type: "jamb_result",
    label: "JAMB / UTME Result",
    description: "Official JAMB slip or result notification.",
    required: true,
  },
  {
    slot: "statement_of_purpose",
    type: "essay",
    label: "Statement of Purpose (Optional)",
    description: "Additional written statement.",
    required: false,
  },
];



const statusIcon: Record<DocumentStatus, React.ReactNode> = {
  verified: <CheckCircle2 className="h-4 w-4 text-emerald-500" />,
  pending: <Clock className="h-4 w-4 text-amber-500" />,
  rejected: <XCircle className="h-4 w-4 text-red-500" />,
  expiring: <AlertCircle className="h-4 w-4 text-red-500" />,
};

const statusLabel: Record<DocumentStatus, string> = {
  verified: "Verified",
  pending: "Under Review",
  rejected: "Rejected",
  expiring: "Expiring Soon",
};

function isCloudinaryUploadInfo(value: unknown): value is CloudinaryUploadInfo {
  if (!value || typeof value !== "object") {
    return false;
  }

  const source = value as Record<string, unknown>;
  return (
    typeof source.public_id === "string" &&
    typeof source.secure_url === "string"
  );
}

function getCloudinaryUploadInfo(
  result: CloudinaryUploadWidgetResults
): CloudinaryUploadInfo | null {
  if (!result || typeof result !== "object" || !("info" in result)) {
    return null;
  }

  const info = result.info;
  return isCloudinaryUploadInfo(info) ? info : null;
}

function buildUploadedFileName(
  info: CloudinaryUploadInfo,
  fallbackLabel: string
): string {
  const fallbackBaseName = fallbackLabel
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
  const baseName =
    typeof info.original_filename === "string" && info.original_filename.trim()
      ? info.original_filename.trim()
      : fallbackBaseName;
  const extension =
    typeof info.format === "string" && info.format.trim()
      ? `.${info.format.trim()}`
      : "";

  if (!extension || baseName.toLowerCase().endsWith(extension.toLowerCase())) {
    return baseName;
  }

  return `${baseName}${extension}`;
}

function getMimeType(info: CloudinaryUploadInfo): string | undefined {
  const format = info.format?.trim().toLowerCase();

  if (!format) {
    return undefined;
  }

  if (format === "pdf") {
    return "application/pdf";
  }

  if (format === "jpg" || format === "jpeg") {
    return "image/jpeg";
  }

  if (format === "png") {
    return "image/png";
  }

  if (info.resource_type === "image") {
    return `image/${format}`;
  }

  return undefined;
}

function getDocumentForRequirement(
  requirement: RequiredDocument,
  documents: UploadedDocument[]
) {
  const matchingSlot = documents.find(
    (document) => document.slot === requirement.slot
  );

  if (matchingSlot) {
    return matchingSlot;
  }

  if (requirement.type === "reference_letter") {
    return undefined;
  }

  return documents.find(
    (document) => !document.slot && document.type === requirement.type
  );
}

export function DocumentUploadForm({ documents, onNext, onBack }: DocumentUploadFormProps) {
  const router = useRouter();
  const [busyKey, setBusyKey] = useState<string | null>(null);

  const isBusy = busyKey !== null;

  const handleUploadSuccess = async (
    requirement: RequiredDocument,
    result: CloudinaryUploadWidgetResults
  ) => {
    const info = getCloudinaryUploadInfo(result);

    if (!info) {
      toast.error("Upload failed.", {
        description:
          "The file uploaded, but its metadata could not be read. Please try again.",
      });
      return;
    }

    setBusyKey(requirement.slot);
    toast.info("Saving document...");

    try {
      const { error } = await saveApplicationDocument({
        type: requirement.type,
        slot: requirement.slot,
        name: buildUploadedFileName(info, requirement.label),
        size:
          typeof info.bytes === "number" && Number.isFinite(info.bytes)
            ? info.bytes
            : 0,
        url: info.secure_url,
        publicId: info.public_id,
        mimeType: getMimeType(info),
      });

      if (error) {
        toast.error("Upload failed.", {
          description: error,
        });
        return;
      }

      toast.success("Document uploaded successfully.");
      router.refresh();
    } catch {
      toast.error("Upload failed. Please try again.");
    } finally {
      setBusyKey(null);
    }
  };

  const handleDelete = async (id: string) => {
    if (isBusy) return;

    setBusyKey(id);
    toast.info("Deleting document...");

    try {
      const { error } = await deleteApplicationDocument(id);

      if (error) {
        toast.error("Delete failed.", {
          description: error,
        });
        return;
      }

      toast.success("Document deleted successfully.");
      router.refresh();
    } catch {
      toast.error("Delete failed. Please try again.");
    } finally {
      setBusyKey(null);
    }
  };

  return (
    <div className="max-w-3xl mx-auto space-y-5">
      {/* Info banner */}
      <div className="flex items-center gap-2.5 px-4 py-3 bg-muted/30 border border-border/50 rounded-xl">
        <Info className="h-3.5 w-3.5 text-primary shrink-0" />
        <p className="text-xs text-muted-foreground">
          <span className="font-semibold text-foreground">Accepted formats:</span>{" "}
          PDF, JPG, PNG. Maximum file size: 5MB per document.
        </p>
      </div>

      <div className="space-y-4">
        {requiredDocuments.map((requirement) => {
          const uploaded = getDocumentForRequirement(requirement, documents);
          const isSavingThisRequirement = busyKey === requirement.slot;
          const isDeletingThisRequirement = busyKey === uploaded?.id;

          return (
            <div key={requirement.slot}
              className={`border rounded-xl overflow-hidden ${uploaded ? "border-green-200/60 dark:border-green-800/30" : "border-border/50"}`}
            >
              {/* Header */}
              <div className="flex items-start justify-between gap-3 px-5 py-4 border-b border-border/50">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="text-sm font-semibold">{requirement.label}</h3>
                    {requirement.required ? (
                      <span className="text-[9px] font-bold bg-red-50 dark:bg-red-950/30 text-red-700 dark:text-red-400 border border-red-200/50 dark:border-red-800/30 rounded px-1.5 py-px">Required</span>
                    ) : (
                      <span className="text-[9px] font-bold bg-muted text-muted-foreground border border-border/50 rounded px-1.5 py-px">Optional</span>
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground">{requirement.description}</p>
                </div>
                {uploaded && (
                  <div className="flex items-center gap-1.5 text-xs font-medium shrink-0">
                    {statusIcon[uploaded.status] || <Clock className="h-4 w-4" />}
                    <span className={
                      uploaded.status === "verified" ? "text-green-600 dark:text-green-400" :
                        uploaded.status === "pending" ? "text-amber-600" : "text-red-600"
                    }>
                      {statusLabel[uploaded.status] || uploaded.status}
                    </span>
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="p-4">
                {uploaded ? (
                  <div className="flex items-center gap-3 p-3 bg-muted/30 rounded-lg border border-border/50">
                    <FileText className="h-7 w-7 text-primary/50 shrink-0" />
                    <div className="flex-1 min-w-0">
                      {uploaded.url ? (
                        <a href={uploaded.url} target="_blank" rel="noreferrer"
                          className="text-sm font-medium truncate block hover:text-primary transition-colors">
                          {uploaded.name}
                        </a>
                      ) : (
                        <p className="text-sm font-medium truncate">{uploaded.name}</p>
                      )}
                      <p className="text-xs text-muted-foreground">
                        Uploaded {new Date(uploaded.uploadedAt).toLocaleDateString()}
                      </p>
                      {uploaded.status === "rejected" && (
                        <p className="text-xs text-red-600 font-medium mt-1 flex items-center gap-1">
                          <AlertCircle className="h-3 w-3" /> Rejected — please re-upload
                        </p>
                      )}
                    </div>
                    <button
                      onClick={() => handleDelete(uploaded.id)}
                      disabled={isBusy}
                      className="text-muted-foreground hover:text-destructive transition-colors p-1 rounded-md hover:bg-destructive/10 disabled:opacity-40"
                    >
                      {isDeletingThisRequirement ? (
                        <span className="text-xs">Deleting…</span>
                      ) : (
                        <Trash2 className="h-4 w-4" />
                      )}
                    </button>
                  </div>
                ) : (
                  <CldUploadWidget
                    signatureEndpoint="/api/cloudinary/sign"
                    options={{ clientAllowedFormats: ["pdf", "jpg", "jpeg", "png"], maxFileSize: MAX_FILE_SIZE, maxFiles: 1, multiple: false, resourceType: "auto", sources: ["local"] }}
                    onError={() => toast.error("Upload failed. Please try again.")}
                    onSuccess={(result) => void handleUploadSuccess(requirement, result)}
                  >
                    {({ open }) => (
                      <div
                        onClick={() => { if (isBusy) return; open(); }}
                        className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors group ${isBusy ? "border-border/20 cursor-not-allowed opacity-50" : "border-border/40 hover:border-primary/40 cursor-pointer"
                          }`}
                      >
                        <div className="flex flex-col items-center gap-3">
                          <div className="h-10 w-10 rounded-full bg-muted/50 flex items-center justify-center group-hover:bg-primary/10 transition-colors">
                            <Upload className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
                          </div>
                          <div>
                            <p className="text-sm font-medium">Select a file to upload</p>
                            <p className="text-xs text-muted-foreground mt-0.5">Secure file picker</p>
                          </div>
                          <Button variant="outline" size="sm" className="text-xs rounded-md" disabled={isBusy}
                            onClick={(e) => { e.preventDefault(); e.stopPropagation(); if (!isBusy) open(); }}>
                            {isSavingThisRequirement ? "Saving…" : "Browse Files"}
                          </Button>
                          <p className="text-[11px] text-muted-foreground/60">PDF, JPG, PNG — max 5MB</p>
                        </div>
                      </div>
                    )}
                  </CldUploadWidget>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Status summary */}
      <div className="flex items-center gap-5 px-5 py-3.5 border border-border/50 rounded-xl bg-muted/20">
        <div className="flex items-center gap-2 text-xs">
          <CheckCircle2 className="h-4 w-4 text-green-500" />
          <span>{documents.filter((d) => d.status === "verified").length} Verified</span>
        </div>
        <div className="flex items-center gap-2 text-xs">
          <Clock className="h-4 w-4 text-amber-500" />
          <span>{documents.filter((d) => d.status === "pending").length} Under Review</span>
        </div>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between px-5 py-3.5 border border-border/50 rounded-xl bg-muted/20">
        {onBack ? (
          <Button variant="outline" size="sm" className="gap-2 rounded-md" onClick={onBack}>
            <ArrowLeft className="h-3.5 w-3.5" /> Back
          </Button>
        ) : (
          <Link href="/application/step-3">
            <Button variant="outline" size="sm" className="gap-2 rounded-md">
              <ArrowLeft className="h-3.5 w-3.5" /> Back
            </Button>
          </Link>
        )}
        {onNext ? (
          <Button size="sm" className="gap-2 rounded-md" onClick={onNext}>
            Continue <ArrowRight className="h-3.5 w-3.5" />
          </Button>
        ) : (
          <Link href="/application/step-5">
            <Button size="sm" className="gap-2 rounded-md">
              Continue <ArrowRight className="h-3.5 w-3.5" />
            </Button>
          </Link>
        )}
      </div>
    </div>
  );
}

