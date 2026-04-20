import { PageContainer } from "@/components/layout/page-container";
import { Button } from "@/components/ui/button";
import { StatusBadge } from "@/components/ui/status-badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { FileText, Shield, Upload } from "lucide-react";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { getScholarDocuments } from "@/lib/supabase/actions";
import { redirect } from "next/navigation";

export default async function DocumentsPage() {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const scholarDocuments = await getScholarDocuments(user.id);

  const DocCard = ({
    title,
    icon: Icon,
    type,
  }: {
    title: string;
    icon: any;
    type: string;
  }) => {
    const docs = scholarDocuments.filter(
      (d: any) =>
        d.type === type || (type === "Identity" && d.type === "Compliance")
    );
    return (
      <div className="border border-border/50 rounded-xl overflow-hidden">
        <div className="flex items-center justify-between px-5 py-3.5 border-b border-border/50 bg-muted/20">
          <p className="text-xs font-semibold">{title}</p>
          <Icon className="h-3.5 w-3.5 text-muted-foreground" />
        </div>
        <div className="p-4 space-y-2">
          {docs.map((doc: any) => (
            <div
              key={doc.id}
              className="flex items-center justify-between p-3 border border-border/50 rounded-lg bg-muted/20"
            >
              <div className="flex items-center gap-2.5">
                <FileText className="h-3.5 w-3.5 text-primary shrink-0" />
                <span className="text-xs font-medium">{doc.name}</span>
              </div>
              <StatusBadge status={doc.status} />
            </div>
          ))}
          {docs.length === 0 && (
            <p className="text-xs text-muted-foreground italic py-2">
              No {title.toLowerCase()} found.
            </p>
          )}
        </div>
      </div>
    );
  };

  return (
    <PageContainer
      title="Documents & Compliance"
      section="Scholar Portal"
      description="Manage your scholarship records, identity verification, and programme compliance documents."
      action={
        <Button size="sm" className="gap-2 rounded-md">
          <Upload className="h-3.5 w-3.5" /> Upload Document
        </Button>
      }
    >
      <div className="space-y-5">
        <div className="grid gap-5 md:grid-cols-2">
          <DocCard title="Identity & Profile" icon={Shield} type="Identity" />
          <DocCard title="Academic Records" icon={FileText} type="Academic" />
        </div>

        {/* Ledger */}
        <div className="border border-border/50 rounded-xl overflow-hidden">
          <div className="px-5 py-3.5 border-b border-border/50 bg-muted/20">
            <p className="text-xs font-semibold">Document Ledger</p>
            <p className="text-[11px] text-muted-foreground mt-0.5">
              Full register of all uploaded files and verification status.
            </p>
          </div>
          <div className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Document Name</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Updated</TableHead>
                  <TableHead>Expires</TableHead>
                  <TableHead>Owner</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {scholarDocuments.map((doc: any) => (
                  <TableRow key={doc.id}>
                    <TableCell className="font-medium text-sm">
                      {doc.name}
                    </TableCell>
                    <TableCell className="text-sm">{doc.type}</TableCell>
                    <TableCell className="text-sm">
                      {new Date(doc.updated_on).toLocaleDateString()}
                    </TableCell>
                    <TableCell className="text-sm">
                      {doc.expires_on
                        ? new Date(doc.expires_on).toLocaleDateString()
                        : "—"}
                    </TableCell>
                    <TableCell className="text-sm">{doc.owner}</TableCell>
                    <TableCell>
                      <StatusBadge status={doc.status} />
                    </TableCell>
                  </TableRow>
                ))}
                {scholarDocuments.length === 0 && (
                  <TableRow>
                    <TableCell
                      colSpan={6}
                      className="text-center py-8 text-xs text-muted-foreground"
                    >
                      No documents recorded in the ledger.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    </PageContainer>
  );
}
