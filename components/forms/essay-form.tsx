"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  ArrowLeft,
  ArrowRight,
  Save,
  AlertCircle,
  CheckCircle2,
} from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { saveApplicationStep } from "@/lib/supabase/actions";
import { cn } from "@/lib/utils";

interface EssayFormProps {
  application: Record<string, unknown>;
  onNext?: () => void;
  onBack?: () => void;
}

const essayPrompts = [
  {
    id: "whyApply",
    label: "Why are you applying?",
    wordMin: 300,
    wordMax: 500,
    prompt:
      "Describe in detail why you are applying for the National Talent Development Initiative. What drove you to seek this opportunity, and what specific outcomes do you hope to achieve for Nigeria through this platform?",
  },
  {
    id: "nationalContribution",
    label: "Your Vision for National Contribution",
    wordMin: 300,
    wordMax: 500,
    prompt:
      "In your chosen discipline, describe specifically how you intend to apply your education and skills to address a measurable national challenge within 5 years of graduating. Be detailed, specific, and grounded.",
  },
  {
    id: "leadershipExample",
    label: "Demonstrated Leadership",
    wordMin: 200,
    wordMax: 400,
    prompt:
      "Describe a specific instance where you took initiative and led others — inside or outside a formal setting. What was the challenge, what exactly did you do, what was the result, and what did you learn about yourself as a leader?",
  },
  {
    id: "careerGoals",
    label: "Long-Term Career & Impact Goals",
    wordMin: 200,
    wordMax: 400,
    prompt:
      "Where do you see yourself in 10 years? Describe your career trajectory and the specific national impact you aim to have created. Why is this programme the most effective accelerant for that vision?",
  },
];

function wordCount(text: string) {
  return text.trim() === "" ? 0 : text.trim().split(/\s+/).length;
}

export function EssayForm({ application, onNext, onBack }: EssayFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const essays = application?.essays || {};
  const [formData, setFormData] = useState(essays);

  const handleTextChange = (id: string, value: string) => {
    setFormData((prev: Record<string, string>) => ({ ...prev, [id]: value }));
  };

  const handleSave = async (
    e: React.FormEvent | React.MouseEvent<HTMLButtonElement>,
    isNext = false
  ) => {
    e.preventDefault();
    for (const essay of essayPrompts) {
      const count = wordCount(formData[essay.id] || "");
      if (count < essay.wordMin) {
        toast.error(
          `"${essay.label}" needs at least ${essay.wordMin} words (${count} written).`
        );
        return;
      }
      if (count > essay.wordMax) {
        toast.error(
          `"${essay.label}" exceeds the ${essay.wordMax}-word limit (${count} written).`
        );
        return;
      }
    }
    setLoading(true);
    try {
      const { error } = await saveApplicationStep(3, formData, isNext);
      if (error) {
        toast.error(error);
        return;
      }
      toast.success("Draft saved");
      if (isNext) {
        if (onNext) onNext();
        else router.push("/application/step-4");
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
      {/* Warning banner */}
      <div className="flex items-center gap-2.5 px-4 py-3 bg-muted/30 border border-border/50 rounded-xl text-xs text-muted-foreground">
        <AlertCircle className="h-3.5 w-3.5 text-amber-500 shrink-0" />
        Do not copy content from the internet or use AI-generated text.
        Plagiarism is grounds for immediate disqualification.
      </div>

      <form onSubmit={(e) => handleSave(e, true)}>
        <div className="space-y-4">
          {essayPrompts.map((essay, i) => {
            const content = formData[essay.id] || "";
            const count = wordCount(content);
            const isStarted = count > 0;
            const isOver = count > essay.wordMax;
            const isUnder = count < essay.wordMin;

            return (
              <div
                key={essay.id}
                className="border border-border/50 rounded-xl overflow-hidden"
              >
                {/* Header */}
                <div className="flex items-start justify-between gap-3 px-5 py-4 border-b border-border/50">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                        Essay {i + 1}
                      </span>
                      {isStarted && (
                        <span className="inline-flex items-center gap-1 text-[10px] font-medium bg-green-50 dark:bg-green-950/30 text-green-700 dark:text-green-400 rounded-full px-2 py-px border border-green-200/50 dark:border-green-800/30">
                          <CheckCircle2 className="h-2.5 w-2.5" /> Draft saved
                        </span>
                      )}
                    </div>
                    <h3 className="text-sm font-semibold">{essay.label}</h3>
                  </div>
                  <span className="text-[10px] text-muted-foreground bg-muted/50 border border-border/50 rounded-md px-2 py-1 shrink-0 whitespace-nowrap">
                    {essay.wordMin}–{essay.wordMax} words
                  </span>
                </div>

                {/* Prompt */}
                <div className="px-5 py-3.5 bg-muted/20 border-b border-border/50">
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    {essay.prompt}
                  </p>
                </div>

                {/* Textarea */}
                <div className="p-5 space-y-2">
                  <Label htmlFor={essay.id} className="sr-only">
                    {essay.label}
                  </Label>
                  <Textarea
                    id={essay.id}
                    value={content}
                    onChange={(e) => handleTextChange(essay.id, e.target.value)}
                    placeholder={`Begin your response here… (minimum ${essay.wordMin} words)`}
                    className="min-h-[180px] resize-y text-sm leading-relaxed"
                  />
                  <div className="flex items-center justify-between text-[11px] text-muted-foreground">
                    <span>Auto-saved as you type</span>
                    <span
                      className={cn(
                        "font-medium",
                        isOver
                          ? "text-red-500"
                          : isUnder && isStarted
                            ? "text-amber-500"
                            : !isUnder
                              ? "text-green-600 dark:text-green-400"
                              : ""
                      )}
                    >
                      {count} / {essay.wordMin}–{essay.wordMax} words
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between mt-4 px-5 py-3.5 border border-border/50 rounded-xl bg-muted/20">
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
              <Link href="/application/step-2">
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
              <Save className="h-3.5 w-3.5" /> Save Draft
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
      </form>
    </div>
  );
}
