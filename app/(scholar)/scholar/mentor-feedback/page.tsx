import { PageContainer } from "@/components/layout/page-container";
import { Calendar, MessageSquare, Target, User } from "lucide-react";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { getScholarDashboardData } from "@/lib/supabase/actions";
import { redirect } from "next/navigation";

type MentorSession = {
  id: string;
  date: string;
  mentor_name: string;
  theme: string;
  sentiment?: string | null;
  summary: string;
  strengths?: string[] | null;
  action_items?: string[] | null;
};

const sentimentClasses: Record<string, string> = {
  Strong:
    "bg-emerald-100 dark:bg-emerald-900/30 text-emerald-800 dark:text-emerald-400 border-emerald-200/50",
  Positive:
    "bg-blue-100   dark:bg-blue-900/30   text-blue-800   dark:text-blue-400   border-blue-200/50",
  Watch:
    "bg-amber-100  dark:bg-amber-900/30  text-amber-800  dark:text-amber-400  border-amber-200/50",
};

export default async function MentorFeedbackPage() {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const { profile, mentorSessions } = await getScholarDashboardData(user.id);
  const sessions = mentorSessions.map((s: MentorSession) => ({
    id: s.id,
    date: new Date(s.date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }),
    mentor: s.mentor_name,
    theme: s.theme,
    sentiment: s.sentiment || "Positive",
    summary: s.summary,
    strengths: s.strengths || [],
    actionItems: s.action_items || [],
  }));
  const latestSession = sessions[0];
  const mentorName =
    profile?.mentor_name || latestSession?.mentor || "Assigned Mentor";
  const mentorTitle = profile?.mentor_title || "Program Mentor";

  return (
    <PageContainer
      title="Mentor Feedback"
      section="Scholar Portal"
      description="Session notes, strengths, and action items shaping the scholar's next decisions."
    >
      <div className="space-y-5">
        {/* Latest session summary */}
        <div className="border border-border/50 rounded-xl overflow-hidden">
          <div className="p-5">
            <div className="grid gap-4 lg:grid-cols-[1.15fr_0.85fr]">
              <div className="border border-border/50 rounded-lg bg-muted/20 p-5">
                {latestSession ? (
                  <>
                    <div className="flex flex-wrap items-center gap-2 mb-3">
                      <span
                        className={`text-[10px] font-bold uppercase tracking-widest border rounded px-2 py-px ${
                          sentimentClasses[latestSession.sentiment] ||
                          sentimentClasses.Positive
                        }`}
                      >
                        {latestSession.sentiment}
                      </span>
                      <span className="text-[11px] text-muted-foreground">
                        {latestSession.date}
                      </span>
                    </div>
                    <h2 className="text-base font-semibold mb-2">
                      {latestSession.theme}
                    </h2>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      {latestSession.summary}
                    </p>
                  </>
                ) : (
                  <>
                    <p className="text-sm font-semibold mb-2">
                      Mentor session pending
                    </p>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      Once the first mentor session is logged, the latest
                      summary and action items will appear here.
                    </p>
                  </>
                )}
              </div>
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
                {[
                  { label: "Mentor", value: mentorName, sub: mentorTitle },
                  {
                    label: "Next review focus",
                    value: "Interview narrative and evidence storytelling",
                    sub: "",
                  },
                ].map((item) => (
                  <div
                    key={item.label}
                    className="border border-border/50 rounded-lg p-4"
                  >
                    <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-1.5">
                      {item.label}
                    </p>
                    <p className="text-xs font-semibold">{item.value}</p>
                    {item.sub && (
                      <p className="text-[11px] text-muted-foreground">
                        {item.sub}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="grid gap-5 xl:grid-cols-[1.1fr_0.9fr]">
          {/* Feedback Timeline */}
          <div className="border border-border/50 rounded-xl overflow-hidden">
            <div className="flex items-center gap-2 px-5 py-3.5 border-b border-border/50 bg-muted/20">
              <MessageSquare className="h-3.5 w-3.5 text-primary" />
              <div>
                <p className="text-xs font-semibold">Feedback Timeline</p>
                <p className="text-[11px] text-muted-foreground mt-0.5">
                  Historical mentor sessions and follow-up guidance.
                </p>
              </div>
            </div>
            <div className="divide-y divide-border/50">
              {sessions.map((session: { id: string, theme: string, sentiment: string, date: string, mentor: string, summary: string, strengths: string[], actionItems: string[] }, index: number) => (
                <div key={session.id} className="p-5">
                  <div className="flex flex-wrap items-start justify-between gap-3 mb-2">
                    <div>
                      <div className="flex flex-wrap items-center gap-2">
                        <p className="text-xs font-semibold">{session.theme}</p>
                        <span
                          className={`text-[9px] font-bold uppercase tracking-widest border rounded px-1.5 py-px ${
                            sentimentClasses[session.sentiment] ||
                            sentimentClasses.Positive
                          }`}
                        >
                          {session.sentiment}
                        </span>
                      </div>
                      <p className="text-[11px] text-muted-foreground mt-0.5">
                        {session.date} · {session.mentor}
                      </p>
                    </div>
                    <span className="text-[10px] border border-border/50 rounded-full px-2.5 py-0.5 text-muted-foreground">
                      {index === 0 ? "Latest" : "Archived"}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed mb-3">
                    {session.summary}
                  </p>
                  <div className="grid gap-3 sm:grid-cols-2">
                    {[
                      { label: "Strengths", items: session.strengths },
                      { label: "Action items", items: session.actionItems },
                    ].map((col) => (
                      <div
                        key={col.label}
                        className="border border-border/50 rounded-lg bg-muted/20 p-4"
                      >
                        <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-2">
                          {col.label}
                        </p>
                        <ul className="space-y-1.5">
                          {col.items.map((item: string) => (
                            <li
                              key={item}
                              className="flex gap-2 text-xs text-muted-foreground"
                            >
                              <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-primary shrink-0" />
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
              {sessions.length === 0 && (
                <p className="px-5 py-8 text-xs text-muted-foreground text-center">
                  No mentor feedback logs found.
                </p>
              )}
            </div>
          </div>

          <div className="space-y-5">
            {/* Accountability List */}
            <div className="border border-border/50 rounded-xl overflow-hidden">
              <div className="flex items-center gap-2 px-5 py-3.5 border-b border-border/50 bg-muted/20">
                <Target className="h-3.5 w-3.5 text-primary" />
                <div>
                  <p className="text-xs font-semibold">Accountability List</p>
                  <p className="text-[11px] text-muted-foreground mt-0.5">
                    Immediate mentor asks for the current cycle.
                  </p>
                </div>
              </div>
              <div className="p-4 space-y-2">
                {latestSession?.actionItems.length > 0 ? (
                  latestSession.actionItems.map((item: string) => (
                    <div
                      key={item}
                      className="border border-border/50 rounded-lg p-3.5 text-xs text-muted-foreground bg-muted/20"
                    >
                      {item}
                    </div>
                  ))
                ) : (
                  <div className="border border-dashed border-border/50 rounded-lg p-4 text-xs text-muted-foreground text-center">
                    No mentor action items available yet.
                  </div>
                )}
              </div>
            </div>

            {/* Mentor Rhythm */}
            <div className="border border-border/50 rounded-xl overflow-hidden">
              <div className="px-5 py-3.5 border-b border-border/50 bg-muted/20">
                <p className="text-xs font-semibold">Mentor Rhythm</p>
                <p className="text-[11px] text-muted-foreground mt-0.5">
                  How support is being delivered around the scholar.
                </p>
              </div>
              <div className="p-5 space-y-4">
                {[
                  {
                    icon: Calendar,
                    title: "Bi-weekly mentor sessions",
                    body: "Structured around research progress, communication, and placement preparation.",
                  },
                  {
                    icon: User,
                    title: "Quarterly programme reviews",
                    body: "Scholar success staff validate outputs and intervene when momentum drops.",
                  },
                ].map((item) => (
                  <div key={item.title} className="flex items-start gap-3">
                    <item.icon className="mt-0.5 h-3.5 w-3.5 text-primary shrink-0" />
                    <div>
                      <p className="text-xs font-medium">{item.title}</p>
                      <p className="text-[11px] text-muted-foreground mt-0.5 leading-relaxed">
                        {item.body}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageContainer>
  );
}
