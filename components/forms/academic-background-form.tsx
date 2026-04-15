"use client";

import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ArrowLeft, ArrowRight, Save, Info } from "lucide-react";
import { programChoices } from "@/constants/application";
import Link from "next/link";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { saveApplicationStep } from "@/lib/supabase/actions";

interface AcademicBackgroundFormProps {
  application: any;
  onNext?: () => void;
  onBack?: () => void;
}

export function AcademicBackgroundForm({
  application,
  onNext,
  onBack,
}: AcademicBackgroundFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
  const ab = application?.academic_background || {};

  const handleSave = async (
    e: React.FormEvent | React.MouseEvent<HTMLButtonElement>,
    isNext = false
  ) => {
    e.preventDefault();
    setLoading(true);
    try {
      const form = formRef.current;
      if (!form) {
        toast.error("Unable to save at the moment.");
        return;
      }
      const formData = new FormData(form);
      const getString = (key: string) => {
        const value = formData.get(key);
        return typeof value === "string" ? value.trim() : "";
      };
      const academicBackground = {
        programChoice: getString("programChoice"),
        secondarySchool: getString("secondarySchool"),
        waecYear: getString("waecYear"),
        waecGrade: getString("waecGrade"),
        jambScore: getString("jambScore"),
        jambYear: getString("jambYear"),
        institution: getString("institution"),
        course: getString("course"),
        currentYear: getString("currentYear"),
        programType: getString("programType"),
      };
      const { error } = await saveApplicationStep(
        2,
        academicBackground,
        isNext
      );
      if (error) {
        toast.error(error);
        return;
      }
      toast.success("Progress saved");
      if (isNext) {
        if (onNext) onNext();
        else router.push("/application/step-3");
      }
      else router.refresh();
    } catch {
      toast.error("Failed to save progress. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto space-y-5">
      <form ref={formRef} onSubmit={(e) => handleSave(e, true)}>
        <div className="border border-border/50 rounded-xl overflow-hidden">
          {/* Info banner */}
          <div className="flex items-center gap-2.5 px-5 py-3 bg-muted/30 border-b border-border/50">
            <Info className="h-3.5 w-3.5 text-primary shrink-0" />
            <p className="text-xs text-muted-foreground">
              All academic credentials will be independently verified. Any
              discrepancy will result in disqualification.
            </p>
          </div>

          <div className="p-5 space-y-7">
            {/* Programme Selection */}
            <div>
              <div className="flex items-center gap-2 mb-4 pb-2.5 border-b border-border/50">
                <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                  Programme Selection
                </span>
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="program" className="text-xs">
                  Preferred NTDI Programme *
                </Label>
                <Select
                  name="programChoice"
                  defaultValue={
                    application?.programChoice ||
                    application?.program_choice ||
                    ""
                  }
                >
                  <SelectTrigger id="program" className="h-9 text-sm">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {programChoices.map((p) => (
                      <SelectItem key={p} value={p}>
                        {p}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <p className="text-[11px] text-muted-foreground">
                  Programme placement is subject to assessment results and
                  national strategic needs.
                </p>
              </div>
            </div>

            {/* Secondary School */}
            <div>
              <div className="flex items-center gap-2 mb-4 pb-2.5 border-b border-border/50">
                <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                  Secondary School
                </span>
              </div>
              <div className="space-y-4">
                <div className="space-y-1.5">
                  <Label htmlFor="school" className="text-xs">
                    Name of Secondary School *
                  </Label>
                  <Input
                    id="school"
                    name="secondarySchool"
                    className="h-9 text-sm"
                    defaultValue={ab.secondarySchool || ""}
                    placeholder="Full official name of school"
                    required
                  />
                </div>
                <div className="grid sm:grid-cols-3 gap-4">
                  <div className="space-y-1.5">
                    <Label htmlFor="waec-year" className="text-xs">
                      WAEC/NECO Year *
                    </Label>
                    <Input
                      id="waec-year"
                      name="waecYear"
                      className="h-9 text-sm"
                      defaultValue={ab.waecYear || ""}
                      placeholder="e.g. 2021"
                      maxLength={4}
                      required
                    />
                  </div>
                  <div className="space-y-1.5 sm:col-span-2">
                    <Label htmlFor="waec-grade" className="text-xs">
                      WAEC/NECO Results Summary *
                    </Label>
                    <Input
                      id="waec-grade"
                      name="waecGrade"
                      className="h-9 text-sm"
                      defaultValue={ab.waecGrade || ""}
                      placeholder="e.g. 8 A1s, including Mathematics and English"
                      required
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* JAMB */}
            <div>
              <div className="flex items-center gap-2 mb-4 pb-2.5 border-b border-border/50">
                <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                  JAMB / UTME
                </span>
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label htmlFor="jamb-score" className="text-xs">
                    JAMB Score *
                  </Label>
                  <Input
                    id="jamb-score"
                    name="jambScore"
                    className="h-9 text-sm"
                    defaultValue={ab.jambScore || ""}
                    placeholder="e.g. 334"
                    required
                  />
                  <p className="text-[11px] text-muted-foreground">
                    Minimum 280 required
                  </p>
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="jamb-year" className="text-xs">
                    JAMB Year *
                  </Label>
                  <Input
                    id="jamb-year"
                    name="jambYear"
                    className="h-9 text-sm"
                    defaultValue={ab.jambYear || ""}
                    placeholder="e.g. 2022"
                    maxLength={4}
                    required
                  />
                </div>
              </div>
            </div>

            {/* Current Institution */}
            <div>
              <div className="flex items-center gap-2 mb-4 pb-2.5 border-b border-border/50">
                <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                  Current Tertiary Institution (if enrolled)
                </span>
              </div>
              <div className="space-y-4">
                <div className="space-y-1.5">
                  <Label htmlFor="institution" className="text-xs">
                    Institution Name
                  </Label>
                  <Input
                    id="institution"
                    name="institution"
                    className="h-9 text-sm"
                    defaultValue={ab.institution || ""}
                    placeholder="University / Polytechnic name"
                  />
                </div>
                <div className="grid sm:grid-cols-3 gap-4">
                  <div className="space-y-1.5 sm:col-span-2">
                    <Label htmlFor="course" className="text-xs">
                      Course / Department
                    </Label>
                    <Input
                      id="course"
                      name="course"
                      className="h-9 text-sm"
                      defaultValue={ab.course || ""}
                      placeholder="e.g. Computer Science"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="year" className="text-xs">
                      Current Year
                    </Label>
                    <Select name="currentYear" defaultValue={ab.currentYear}>
                      <SelectTrigger id="year" className="h-9 text-sm">
                        <SelectValue placeholder="Select year" />
                      </SelectTrigger>
                      <SelectContent>
                        {[
                          "Year 1",
                          "Year 2",
                          "Year 3",
                          "Year 4",
                          "Year 5",
                          "Postgraduate",
                        ].map((y) => (
                          <SelectItem key={y} value={y}>
                            {y}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="program-type" className="text-xs">
                    Programme Type *
                  </Label>
                  <Select name="programType" defaultValue={ab.programType}>
                    <SelectTrigger id="program-type" className="h-9 text-sm">
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="undergraduate">
                        Undergraduate
                      </SelectItem>
                      <SelectItem value="postgraduate">Postgraduate</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between px-5 py-3.5 border-t border-border/50 bg-muted/20">
            <div className="flex gap-2">
              {onBack ? (
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  className="gap-2 rounded-md"
                  onClick={onBack}
                >
                  <ArrowLeft className="h-3.5 w-3.5" /> Back
                </Button>
              ) : (
                <Link href="/application/step-1">
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    className="gap-2 rounded-md"
                  >
                    <ArrowLeft className="h-3.5 w-3.5" /> Back
                  </Button>
                </Link>
              )}
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="gap-2 rounded-md"
                onClick={(e) => handleSave(e, false)}
                disabled={loading}
              >
                <Save className="h-3.5 w-3.5" /> Save
              </Button>
            </div>
            <Button
              type="submit"
              size="sm"
              className="gap-2 rounded-md"
              disabled={loading}
            >
              {loading ? "Saving..." : "Save & Continue"}{" "}
              <ArrowRight className="h-3.5 w-3.5" />
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}
