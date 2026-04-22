"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  ArrowLeft,
  AlertCircle,
  FileText,
  GraduationCap,
  ScrollText,
  Upload,
  Edit,
  Send,
  type LucideIcon,
} from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { submitApplication } from "@/lib/supabase/actions";
import type {
  AcademicBackground,
  EssaySubmission,
  UploadedDocument,
} from "@/types";

type ReviewProfile = {
  first_name?: string | null;
  last_name?: string | null;
  email?: string | null;
  phone?: string | null;
  date_of_birth?: string | null;
  gender?: string | null;
  national_id?: string | null;
  state_of_origin?: string | null;
  lga_of_origin?: string | null;
  address?: string | null;
};

type ReviewApplication = {
  program_id?: string | null;
  program_name?: string | null;
  academic_background?: Partial<AcademicBackground> | null;
  essays?: Partial<EssaySubmission> | null;
};

interface ApplicationReviewProps {
  profile: ReviewProfile | null;
  application: ReviewApplication | null;
  documents: UploadedDocument[];
  onBack?: () => void;
  onEdit?: (step: number) => void;
}

function ReviewSection({
  title,
  icon: Icon,
  editStep,
  onEdit,
  children,
}: {
  title: string;
  icon: LucideIcon;
  editStep?: number;
  onEdit?: (step: number) => void;
  children: React.ReactNode;
}) {
  return (
    <div className="border border-border/50 rounded-xl overflow-hidden">
      <div className="flex items-center justify-between px-5 py-3.5 border-b border-border/50 bg-muted/20">
        <div className="flex items-center gap-2">
          <Icon className="h-3.5 w-3.5 text-primary" />
          <span className="text-xs font-semibold">{title}</span>
        </div>
        {editStep && onEdit ? (
          <button
            onClick={() => onEdit(editStep)}
            className="text-xs font-medium text-primary flex items-center gap-1 hover:underline"
          >
            <Edit className="h-3 w-3" /> Edit
          </button>
        ) : editStep ? (
          <Link href={`/application/step-${editStep}`}>
            <button className="text-xs font-medium text-primary flex items-center gap-1 hover:underline">
              <Edit className="h-3 w-3" /> Edit
            </button>
          </Link>
        ) : null}
      </div>
      <div className="p-5">{children}</div>
    </div>
  );
}

function InfoRow({ label, value }: { label: string; value?: string }) {
  return (
    <div className="flex flex-col sm:flex-row sm:gap-6 py-2 border-b border-border/50 last:border-0">
      <span className="text-[11px] text-muted-foreground min-w-[180px] shrink-0 pt-px">
        {label}
      </span>
      <span className="text-sm font-medium">
        {value || (
          <span className="text-muted-foreground/40 text-xs italic">
            Not provided
          </span>
        )}
      </span>
    </div>
  );
}

function toOptionalString(value?: string | null) {
  return value ?? undefined;
}

export function ApplicationReview({
  profile,
  application,
  documents,
  onBack,
  onEdit,
}: ApplicationReviewProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [agreed, setAgreed] = useState(false);

  const handleSubmit = async () => {
    if (!agreed) {
      toast.error("Please agree to the declaration");
      return;
    }
    setLoading(true);
    try {
      const { error } = await submitApplication();
      if (error) {
        toast.error(error);
        return;
      }

      toast.success("Application submitted successfully!");
      router.push("/status");
      router.refresh();
    } catch {
      toast.error("Failed to submit application. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const pi: ReviewProfile = profile ?? {};
  const ab: Partial<AcademicBackground> = application?.academic_background ?? {};
  const essays: Partial<EssaySubmission> = application?.essays ?? {};

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="flex items-start gap-3 p-4 bg-amber-50 border border-amber-200 rounded-xl text-sm text-amber-800">
        <AlertCircle className="h-4 w-4 text-amber-600 shrink-0 mt-0.5" />
        <div>
          <p className="font-semibold">
            Final Submission — No Revisions After Submit
          </p>
          <p className="mt-0.5 text-amber-700">
            Once you click &quot;Submit Application&quot;, your application is
            locked and forwarded to the Selection Board.
          </p>
        </div>
      </div>

      {/* Personal Info Review */}
      <ReviewSection
        title="Personal Information"
        icon={FileText}
        editStep={1}
        onEdit={onEdit}
      >
        <div className="space-y-3">
          <InfoRow
            label="Full Name"
            value={
              [pi.first_name, pi.last_name].filter(Boolean).join(" ") ||
              undefined
            }
          />
          <Separator />
          <InfoRow label="Email Address" value={toOptionalString(pi.email)} />
          <InfoRow label="Phone Number" value={toOptionalString(pi.phone)} />
          <Separator />
          <InfoRow
            label="Date of Birth"
            value={toOptionalString(pi.date_of_birth)}
          />
          <InfoRow label="Gender" value={toOptionalString(pi.gender)} />
          <InfoRow label="NIN" value={toOptionalString(pi.national_id)} />
          <Separator />
          <InfoRow
            label="State of Origin"
            value={toOptionalString(pi.state_of_origin)}
          />
          <InfoRow
            label="LGA of Origin"
            value={toOptionalString(pi.lga_of_origin)}
          />
          <InfoRow
            label="Residential Address"
            value={toOptionalString(pi.address)}
          />
        </div>
      </ReviewSection>

      {/* Academic Review */}
      <ReviewSection
        title="Academic Background"
        icon={GraduationCap}
        editStep={2}
        onEdit={onEdit}
      >
        <div className="space-y-3">
          <InfoRow
            label="Preferred Programme"
            value={toOptionalString(application?.program_name)}
          />
          <Separator />
          <InfoRow label="Secondary School" value={ab.secondarySchool} />
          <InfoRow
            label="WAEC Year / Grade"
            value={
              ab.waecYear && ab.waecGrade
                ? `${ab.waecYear} — ${ab.waecGrade}`
                : undefined
            }
          />
          <InfoRow
            label="JAMB Score"
            value={
              ab.jambScore != null && ab.jambYear
                ? `${ab.jambScore} (${ab.jambYear})`
                : undefined
            }
          />
          <Separator />
          <InfoRow label="Institution" value={ab.institution} />
          <InfoRow label="Course" value={ab.course} />
          <InfoRow label="Year" value={ab.currentYear} />
        </div>
      </ReviewSection>

      {/* Essays Review */}
      <ReviewSection
        title="Essays"
        icon={ScrollText}
        editStep={3}
        onEdit={onEdit}
      >
        <div className="space-y-4">
          {[
            { label: "Why are you applying?", value: essays.whyApply },
            {
              label: "Your Vision for National Contribution",
              value: essays.nationalContribution,
            },
            {
              label: "Demonstrated Leadership",
              value: essays.leadershipExample,
            },
            { label: "Long-Term Goals", value: essays.careerGoals },
          ].map((essay, i) => (
            <div key={i}>
              <p className="text-xs text-muted-foreground mb-1">
                {essay.label}
              </p>
              {essay.value ? (
                <p className="text-sm line-clamp-3 text-foreground/80 bg-muted/30 p-3 rounded-lg border leading-relaxed">
                  {essay.value}
                </p>
              ) : (
                <div className="flex items-center gap-2 text-amber-600 text-xs">
                  <AlertCircle className="h-3.5 w-3.5" /> Not completed
                </div>
              )}
              {i < 3 && <Separator className="mt-4" />}
            </div>
          ))}
        </div>
      </ReviewSection>

      {/* Documents Review */}
      <ReviewSection
        title="Documents"
        icon={Upload}
        editStep={4}
        onEdit={onEdit}
      >
        <div className="space-y-2">
          {documents.length > 0 ? (
            documents.map((doc) => (
              <div
                key={doc.id}
                className="flex items-center gap-3 p-3 rounded-lg bg-muted/20"
              >
                <FileText className="h-4 w-4 text-muted-foreground shrink-0" />
                <span className="text-sm flex-1 truncate">{doc.name}</span>
                <Badge
                  variant="outline"
                  className={`text-[10px] capitalize shrink-0 ${doc.status === "verified"
                    ? "border-emerald-300 text-emerald-700 bg-emerald-50"
                    : doc.status === "pending"
                      ? "border-amber-300 text-amber-700 bg-amber-50"
                      : "border-red-300 text-red-700 bg-red-50"
                    }`}
                >
                  {doc.status}
                </Badge>
              </div>
            ))
          ) : (
            <div className="flex items-center gap-2 text-amber-600 text-xs text-center py-4 bg-amber-50 rounded-lg border border-amber-100">
              <AlertCircle className="h-3.5 w-3.5 shrink-0 ml-auto" />
              <span className="mr-auto">No documents uploaded yet</span>
            </div>
          )}
        </div>
      </ReviewSection>

      {/* Declaration */}
      <Card className="border-primary/30 bg-primary/5">
        <CardContent className="p-5 space-y-4">
          <h3 className="font-bold text-base">Declaration & Agreement</h3>
          <p className="text-sm text-muted-foreground leading-relaxed">
            By submitting this application, I,{" "}
            <strong>
              {pi.first_name} {pi.last_name}
            </strong>
            , hereby certify that all information provided is true, accurate,
            and complete.
          </p>
          <div className="flex items-start gap-2">
            <input
              type="checkbox"
              id="declaration"
              className="mt-1 accent-primary"
              checked={agreed}
              onChange={(e) => setAgreed(e.target.checked)}
            />
            <label
              htmlFor="declaration"
              className="text-sm font-medium cursor-pointer"
            >
              I confirm the above declaration and consent to the verification of
              all information provided.
            </label>
          </div>
        </CardContent>
      </Card>

      <div className="flex flex-col sm:flex-row justify-between gap-4 pb-8">
        {onBack ? (
          <Button variant="outline" className="gap-2 w-full sm:w-auto" onClick={onBack}>
            <ArrowLeft className="h-4 w-4" /> Back to Documents
          </Button>
        ) : (
          <Link href="/application/step-4">
            <Button variant="outline" className="gap-2 w-full sm:w-auto">
              <ArrowLeft className="h-4 w-4" /> Back to Documents
            </Button>
          </Link>
        )}
        <Button
          onClick={handleSubmit}
          className="gap-2 font-semibold h-12 px-8 w-full sm:w-auto"
          size="lg"
          disabled={loading || !agreed}
        >
          {loading ? (
            "Submitting..."
          ) : (
            <>
              <Send className="h-4 w-4" /> Submit Application
            </>
          )}
        </Button>
      </div>
    </div>
  );
}
