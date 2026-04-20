import { PageContainer } from "@/components/layout/page-container";
import { Bell, Calendar, Pin } from "lucide-react";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export default async function ScholarAnnouncementsPage() {
  const supabase = await createSupabaseServerClient();
  const { data: announcements, error } = await supabase
    .from("announcements")
    .select("*, profiles(first_name, last_name)")
    .or("audience.eq.all,audience.eq.scholars")
    .order("created_at", { ascending: false });

  if (error) console.error("Error fetching announcements:", error);
  const list = announcements || [];

  return (
    <PageContainer
      title="Announcements"
      section="Scholar Portal"
      description="Important updates, events, and notices from the programme office."
    >
      <div className="space-y-4">
        {list.length > 0 ? (
          list.map((a) => {
            const isPinned = a.is_pinned || a.isPinned;
            const createdAt = a.created_at || a.createdAt;
            return (
              <div
                key={a.id}
                className={`border rounded-xl overflow-hidden ${
                  isPinned ? "border-t-2 border-foreground" : "border-border/50"
                }`}
              >
                <div
                  className={`px-5 py-4 ${
                    isPinned ? "" : "border-b border-border/50 bg-muted/20"
                  }`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-2">
                      {isPinned ? (
                        <Pin className="h-3.5 w-3.5 text-foreground shrink-0" />
                      ) : (
                        <Bell className="h-3.5 w-3.5 text-muted-foreground shrink-0" />
                      )}
                      <p className="text-sm font-semibold">{a.title}</p>
                    </div>
                    {isPinned && (
                      <span className="text-[9px] font-bold uppercase tracking-widest bg-foreground text-background rounded px-2 py-px shrink-0">
                        Pinned
                      </span>
                    )}
                  </div>
                  <p className="text-[11px] text-muted-foreground mt-1.5 flex items-center gap-2 pl-5">
                    <Calendar className="h-3 w-3" />
                    {new Date(createdAt).toLocaleDateString("en-US", {
                      weekday: "long",
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                    <span className="text-muted-foreground/40">·</span>
                    {a.profiles
                      ? `${a.profiles.first_name || ""} ${
                          a.profiles.last_name || ""
                        }`.trim()
                      : a.author || "Programme Office"}
                  </p>
                </div>
                <div className="px-5 py-4">
                  <p className="text-xs text-muted-foreground leading-relaxed whitespace-pre-wrap">
                    {a.body}
                  </p>
                </div>
              </div>
            );
          })
        ) : (
          <div className="border border-dashed border-border/50 rounded-xl flex flex-col items-center justify-center p-12 text-center">
            <Bell className="h-7 w-7 mb-3 text-muted-foreground/30" />
            <p className="text-sm text-muted-foreground">
              No announcements at this time.
            </p>
            <p className="text-xs text-muted-foreground/60 mt-1">
              Check back later for updates from the programme office.
            </p>
          </div>
        )}
      </div>
    </PageContainer>
  );
}
