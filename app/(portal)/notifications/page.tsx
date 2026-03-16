import { PageContainer } from "@/components/layout/page-container";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Bell, CheckCircle2, Info, AlertTriangle, XCircle, Check } from "lucide-react";
import { mockNotifications } from "@/mock-data/applicant";
import type { Notification } from "@/types";

const notifIcon = {
    info: <Info className="h-4 w-4 text-blue-500" />,
    warning: <AlertTriangle className="h-4 w-4 text-amber-500" />,
    success: <CheckCircle2 className="h-4 w-4 text-emerald-500" />,
    error: <XCircle className="h-4 w-4 text-red-500" />,
};

const notifBg = {
    info: "bg-blue-50 border-blue-100 dark:bg-blue-900/10",
    warning: "bg-amber-50 border-amber-100 dark:bg-amber-900/10",
    success: "bg-emerald-50 border-emerald-100 dark:bg-emerald-900/10",
    error: "bg-red-50 border-red-100 dark:bg-red-900/10",
};

export default function NotificationsPage() {
    const unread = mockNotifications.filter((n) => !n.isRead);
    const read = mockNotifications.filter((n) => n.isRead);

    return (
        <PageContainer
            title="Notifications"
            description="Application updates, messages from the programme office, and important alerts."
            action={
                <Button variant="outline" size="sm" className="gap-2">
                    <Check className="h-3.5 w-3.5" /> Mark All Read
                </Button>
            }
        >
            <div className="max-w-3xl mx-auto space-y-8">
                {/* Unread */}
                {unread.length > 0 && (
                    <div className="space-y-3">
                        <div className="flex items-center gap-2">
                            <Bell className="h-4 w-4 text-primary" />
                            <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                                New
                            </h2>
                            <Badge className="h-5 text-[10px]">{unread.length}</Badge>
                        </div>
                        {unread.map((notif) => (
                            <NotifCard key={notif.id} notif={notif} />
                        ))}
                    </div>
                )}

                {/* Read */}
                {read.length > 0 && (
                    <div className="space-y-3">
                        <Separator />
                        <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Earlier</h2>
                        {read.map((notif) => (
                            <NotifCard key={notif.id} notif={notif} isRead />
                        ))}
                    </div>
                )}

                {mockNotifications.length === 0 && (
                    <div className="text-center py-20 text-muted-foreground">
                        <Bell className="h-12 w-12 mx-auto mb-4 opacity-20" />
                        <p className="font-semibold">No notifications yet</p>
                        <p className="text-sm mt-1">You'll be notified of important application updates here.</p>
                    </div>
                )}
            </div>
        </PageContainer>
    );
}

function NotifCard({ notif, isRead }: { notif: Notification; isRead?: boolean }) {
    return (
        <Card className={`border transition-colors ${isRead ? "border-border/40 bg-background" : `${notifBg[notif.type]} border`}`}>
            <CardContent className="p-4 flex items-start gap-3">
                <div className="shrink-0 mt-0.5">{notifIcon[notif.type]}</div>
                <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-3">
                        <p className={`text-sm font-semibold ${isRead ? "text-foreground/70" : ""}`}>{notif.title}</p>
                        {!isRead && <div className="h-2 w-2 rounded-full bg-primary shrink-0 mt-1.5" />}
                    </div>
                    <p className="text-xs text-muted-foreground leading-relaxed mt-1">{notif.body}</p>
                    <p className="text-[10px] text-muted-foreground/60 mt-2">
                        {new Date(notif.createdAt).toLocaleString("en-GB", {
                            day: "numeric", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit"
                        })}
                    </p>
                </div>
            </CardContent>
        </Card>
    );
}
