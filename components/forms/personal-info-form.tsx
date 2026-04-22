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
import { Info, Save, ArrowRight } from "lucide-react";
import { nigerianStates } from "@/constants/nigeria";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { saveApplicationStep } from "@/lib/supabase/actions";

interface PersonalInfoFormProps {
  application: Record<string, unknown>;
  profile: Record<string, unknown>;
  onNext?: () => void;
}

export function PersonalInfoForm({
  application,
  profile,
  onNext,
}: PersonalInfoFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
  const pi = (application?.personal_info as Record<string, any>) || {};

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
      const personalInfo = {
        firstName: getString("firstName"),
        middleName: getString("middleName"),
        lastName: getString("lastName"),
        email: pi.email || profile.email || "",
        phone: getString("phone"),
        dateOfBirth: getString("dob"),
        gender: getString("gender"),
        nationalId: getString("nationalId"),
        stateOfOrigin: getString("stateOfOrigin"),
        lgaOfOrigin: getString("lgaOfOrigin"),
        address: getString("address"),
        city: getString("city"),
        resState: getString("resState"),
      };
      const { error } = await saveApplicationStep(1, personalInfo, isNext);
      if (error) {
        toast.error(error);
        return;
      }
      toast.success("Progress saved");
      if (isNext) {
        if (onNext) onNext();
        else router.push("/application/step-2");
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
              All fields marked * are required. Ensure all information matches
              your official identification.
            </p>
          </div>

          <div className="p-5 space-y-7">
            {/* Full Name */}
            <div>
              <div className="flex items-center gap-2 mb-4 pb-2.5 border-b border-border/50">
                <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                  Full Name
                </span>
              </div>
              <div className="grid sm:grid-cols-3 gap-4">
                <div className="space-y-1.5">
                  <Label htmlFor="firstName" className="text-xs">
                    First Name *
                  </Label>
                  <Input
                    id="firstName"
                    name="firstName"
                    className="h-9 text-sm"
                    defaultValue={pi.firstName || profile?.first_name || ""}
                    required
                  />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="middleName" className="text-xs">
                    Middle Name
                  </Label>
                  <Input
                    id="middleName"
                    name="middleName"
                    className="h-9 text-sm"
                    defaultValue={pi.middleName || ""}
                  />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="lastName" className="text-xs">
                    Last Name / Surname *
                  </Label>
                  <Input
                    id="lastName"
                    name="lastName"
                    className="h-9 text-sm"
                    defaultValue={pi.lastName || profile?.last_name || ""}
                    required
                  />
                </div>
              </div>
            </div>

            {/* Contact Details */}
            <div>
              <div className="flex items-center gap-2 mb-4 pb-2.5 border-b border-border/50">
                <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                  Contact Details
                </span>
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label htmlFor="email" className="text-xs">
                    Email Address *
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    className="h-9 text-sm"
                    defaultValue={pi.email || profile.email}
                    disabled
                  />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="phone" className="text-xs">
                    Phone Number *
                  </Label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    className="h-9 text-sm"
                    defaultValue={pi.phone || profile.phone || ""}
                    required
                  />
                </div>
              </div>
            </div>

            {/* Personal Details */}
            <div>
              <div className="flex items-center gap-2 mb-4 pb-2.5 border-b border-border/50">
                <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                  Personal Details
                </span>
              </div>
              <div className="grid sm:grid-cols-3 gap-4">
                <div className="space-y-1.5">
                  <Label htmlFor="dob" className="text-xs">
                    Date of Birth *
                  </Label>
                  <Input
                    id="dob"
                    name="dob"
                    type="date"
                    className="h-9 text-sm"
                    defaultValue={pi.dateOfBirth || ""}
                    required
                  />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="gender" className="text-xs">
                    Gender *
                  </Label>
                  <Select name="gender" defaultValue={pi.gender?.toLowerCase()}>
                    <SelectTrigger id="gender" className="h-9 text-sm">
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="male">Male</SelectItem>
                      <SelectItem value="female">Female</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="national-id" className="text-xs">
                    NIN / National ID *
                  </Label>
                  <Input
                    id="national-id"
                    name="nationalId"
                    className="h-9 text-sm"
                    defaultValue={pi.nationalId || ""}
                    placeholder="11-digit NIN"
                    maxLength={11}
                    required
                  />
                </div>
              </div>
            </div>

            {/* State of Origin */}
            <div>
              <div className="flex items-center gap-2 mb-4 pb-2.5 border-b border-border/50">
                <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                  State of Origin
                </span>
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label htmlFor="state" className="text-xs">
                    State of Origin *
                  </Label>
                  <Select
                    name="stateOfOrigin"
                    defaultValue={pi.stateOfOrigin || profile.state_of_origin}
                  >
                    <SelectTrigger id="state" className="h-9 text-sm">
                      <SelectValue placeholder="Select state" />
                    </SelectTrigger>
                    <SelectContent>
                      {nigerianStates.map((s) => (
                        <SelectItem key={s} value={s}>
                          {s}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="lga" className="text-xs">
                    LGA of Origin *
                  </Label>
                  <Input
                    id="lga"
                    name="lgaOfOrigin"
                    className="h-9 text-sm"
                    defaultValue={pi.lgaOfOrigin || ""}
                    placeholder="Enter your LGA"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Residential Address */}
            <div>
              <div className="flex items-center gap-2 mb-4 pb-2.5 border-b border-border/50">
                <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                  Residential Address
                </span>
              </div>
              <div className="space-y-4">
                <div className="space-y-1.5">
                  <Label htmlFor="address" className="text-xs">
                    Street Address *
                  </Label>
                  <Input
                    id="address"
                    name="address"
                    className="h-9 text-sm"
                    defaultValue={pi.address || ""}
                    placeholder="House number, street name"
                    required
                  />
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <Label htmlFor="city" className="text-xs">
                      City *
                    </Label>
                    <Input
                      id="city"
                      name="city"
                      className="h-9 text-sm"
                      defaultValue={pi.city || ""}
                      placeholder="City"
                      required
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="res-state" className="text-xs">
                      State of Residence *
                    </Label>
                    <Select name="resState" defaultValue={pi.resState}>
                      <SelectTrigger id="res-state" className="h-9 text-sm">
                        <SelectValue placeholder="Select state" />
                      </SelectTrigger>
                      <SelectContent>
                        {nigerianStates.map((s) => (
                          <SelectItem key={s} value={s}>
                            {s}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between px-5 py-3.5 border-t border-border/50 bg-muted/20">
            <Button
              type="button"
              variant="outline"
              size="sm"
              className="gap-2 rounded-md"
              onClick={(e) => handleSave(e, false)}
              disabled={loading}
            >
              <Save className="h-3.5 w-3.5" /> Save Progress
            </Button>
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
