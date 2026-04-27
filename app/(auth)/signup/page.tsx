"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ArrowRight,
  CircleAlert,
  CircleCheck,
  GraduationCap,
  Lock,
  Mail,
  Shield,
  User,
} from "lucide-react";
import React, { Suspense } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { FieldGroup } from "@/components/ui/field";

import { getDefaultRedirectPath, getRoleForIntent } from "@/lib/auth/roles";
import { getSupabaseBrowserClient } from "@/lib/supabase/client";
import { FormField } from "@/components/forms/form-field";

// ── Schema ────────────────────────────────────────────────────────────────────
const signupSchema = z
  .object({
    firstName: z.string().trim().min(1, "First name is required."),
    lastName: z.string().trim().min(1, "Last name is required."),
    email: z
      .string()
      .trim()
      .toLowerCase()
      .email("Enter a valid email address."),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters.")
      .regex(/[a-z]/, "Must contain a lowercase letter.")
      .regex(/[A-Z]/, "Must contain an uppercase letter.")
      .regex(/[0-9]/, "Must contain a number.")
      .regex(/[^a-zA-Z0-9]/, "Must contain a special character."),
    confirmPassword: z.string().min(1, "Please confirm your password."),
    terms: z.boolean().refine((val) => val === true, {
      message: "You must accept the terms to continue."
    }),
  })
  .refine((d) => d.password === d.confirmPassword, {
    message: "Passwords do not match.",
    path: ["confirmPassword"],
  });

type SignupValues = z.infer<typeof signupSchema>;

// ── Inner component ───────────────────────────────────────────────────────────
function SignupPageContent() {
  const router = useRouter();

  const [successMessage, setSuccessMessage] = React.useState<string | null>(
    null
  );

  const {
    control,
    handleSubmit,
    setError,
    reset,
    formState: { isSubmitting, errors },
  } = useForm<SignupValues>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
      terms: false,
    },
  });

  const onSubmit = async (values: SignupValues) => {
    setSuccessMessage(null);

    try {
      const role = getRoleForIntent("applicant");
      const supabase = getSupabaseBrowserClient();

      const { data, error } = await supabase.auth.signUp({
        email: values.email,
        password: values.password,
        options: {
          data: {
            first_name: values.firstName,
            last_name: values.lastName,
            full_name: `${values.firstName} ${values.lastName}`.trim(),
            role,
            account_type: "applicant",
          },
        },
      });

      if (error) {
        setError("root", { message: error.message });
        toast.error("Signup failed", { description: error.message });
        return;
      }

      if (data.user && data.user.identities?.length === 0) {
        const msg =
          "An account with this email already exists. Please sign in.";
        setError("root", { message: msg });
        toast.error("Account exists", { description: msg });
        return;
      }

      if (data.session?.user) {
        toast.success("Account created!", {
          description: "Welcome to the National Talent Initiative.",
        });
        router.replace(getDefaultRedirectPath(role));
        router.refresh();
        return;
      }

      reset();
      const msg =
        "Account created. Check your email to confirm your address before signing in.";
      toast.success("Success!", { description: msg });

      router.replace("/login");
    } catch (err) {
      const msg =
        err instanceof Error
          ? err.message
          : "Unable to create your account right now.";
      setError("root", { message: msg });
      toast.error("Error", { description: msg });
    }
  };

  return (
    <div className="min-h-screen flex items-start md:items-center justify-center p-4 bg-muted/30">
      <div className="w-full max-w-3xl grid md:grid-cols-[5fr_7fr] border border-border/50 rounded-xl overflow-hidden shadow-sm my-8 md:my-0">
      
        {/* ── Left: Brand Panel ── */}
        <div className="bg-foreground p-8 md:p-10 hidden md:flex flex-col gap-8 justify-between">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="h-8 w-8 rounded-md bg-primary flex items-center justify-center shrink-0">
              <span className="text-primary-foreground font-bold text-sm">
                N
              </span>
            </div>
            <span className="text-background font-bold text-sm tracking-tight">
              National Talent Initiative
            </span>
          </Link>

          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-primary flex items-center gap-2 mb-4">
              <span className="inline-block w-5 h-px bg-primary" />
              Join the Initiative
            </p>
            <h2 className="text-2xl font-bold leading-snug tracking-tight text-background mb-2">
              Start your application{" "}
              <span className="text-background/40 font-medium">
                and make an impact.
              </span>
            </h2>
          </div>

          <div className="flex flex-col border-t border-background/10">
            <div className="flex items-start gap-3 py-4 opacity-100">
              <div className="h-7 w-7 rounded-md flex items-center justify-center shrink-0 mt-0.5 bg-primary/20">
                <GraduationCap className="h-3.5 w-3.5 text-primary" />
              </div>
              <div>
                <p className="text-xs font-bold capitalize mb-0.5 text-background">
                  Applicant
                </p>
                <p className="text-xs text-background/40 leading-relaxed">
                  Apply for scholarship funding and university placement.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* ── Right: Form Panel ── */}
        <div className="bg-background p-8 md:p-10 flex flex-col gap-5">
          {/* Mobile logo */}
          <Link href="/" className="flex md:hidden items-center gap-2">
            <div className="h-7 w-7 rounded-md bg-primary flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-xs">
                N
              </span>
            </div>
            <span className="font-bold text-sm tracking-tight">
              National Talent Initiative
            </span>
          </Link>

          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-1">
              Create your account
            </p>
            <h1 className="text-xl font-bold tracking-tight">
              Continue as Applicant
            </h1>
            <p className="text-xs text-muted-foreground mt-1">
              Start your application for education support and national impact.
            </p>
          </div>

          {/* Alerts */}
          {errors.root && (
            <Alert variant="destructive">
              <CircleAlert className="h-4 w-4" />
              <AlertTitle>Signup failed</AlertTitle>
              <AlertDescription>{errors.root.message}</AlertDescription>
            </Alert>
          )}
          {successMessage && (
            <Alert>
              <CircleCheck className="h-4 w-4" />
              <AlertTitle>Verify your email</AlertTitle>
              <AlertDescription>{successMessage}</AlertDescription>
            </Alert>
          )}

          {/* Form */}
          <form
            noValidate
            onSubmit={handleSubmit(onSubmit)}
            className="transition-opacity duration-200 opacity-100"
          >
            <fieldset className="min-w-0 border-0 p-0 m-0">
              <FieldGroup className="">
                {/* Name row */}
                <div className="grid grid-cols-2 gap-3">
                  <FormField
                    name="firstName"
                    control={control}
                    label="First name"
                    placeholder="Chukwuemeka"
                    autoComplete="given-name"
                    icon={User}
                  />

                  <FormField
                    name="lastName"
                    control={control}
                    label="Last name"
                    placeholder="Okafor"
                    autoComplete="family-name"
                  />
                </div>

                {/* Email */}
                <FormField
                  name="email"
                  control={control}
                  label="Email address"
                  type="email"
                  placeholder="you@email.com"
                  autoComplete="email"
                  icon={Mail}
                />

                <FormField
                  name="password"
                  control={control}
                  isPassword
                  label="Password"
                  placeholder="Minimum 8 characters"
                  autoComplete="new-password"
                  icon={Lock}
                />

                {/* Confirm password */}
                <FormField
                  name="confirmPassword"
                  control={control}
                  isPassword
                  label="Confirm password"
                  placeholder="Repeat your password"
                  autoComplete="new-password"
                  icon={Shield}
                />

                {/* Terms */}
                <FormField
                  name="terms"
                  control={control}
                  type="checkbox"
                  label="I confirm that all information I provide will be
                        truthful. I understand that NTDI reserves the right to
                        verify all submissions for security and compliance."
                />

                <Button
                  type="submit"
                  className="w-full h-9 text-sm rounded-md gap-2"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Creating account..." : "Continue as Applicant"}
                  <ArrowRight className="h-3.5 w-3.5" />
                </Button>
              </FieldGroup>
            </fieldset>
          </form>

          {/* Security note */}
          <div className="flex items-start gap-2 border-t border-border/50 pt-4">
            <Shield className="h-3.5 w-3.5 shrink-0 mt-0.5 text-primary" />
            <p className="text-[11px] text-muted-foreground leading-relaxed">
              Your session is encrypted. By creating an account, you agree to
              our data privacy terms for applicants.
            </p>
          </div>

          <p className="text-xs text-muted-foreground">
            Already have an account?{" "}
            <Link
              href="/login"
              className="text-foreground font-semibold hover:underline"
            >
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

// ── Page export ───────────────────────────────────────────────────────────────
export default function SignupPage() {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center min-h-screen">
          <p className="text-sm text-muted-foreground">Loading...</p>
        </div>
      }
    >
      <SignupPageContent />
    </Suspense>
  );
}
