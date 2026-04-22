"use client";

import { useState } from "react";
import { PageContainer } from "@/components/layout/page-container";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { Mail, Send } from "lucide-react";
import { scholarMessages } from "@/lib/constants";

export default function ScholarMessagesPage() {
  const [selectedThreadId, setSelectedThreadId] = useState<string | null>(
    scholarMessages[0]?.id ?? null
  );
  const activeThread =
    scholarMessages.find((t) => t.id === selectedThreadId) ?? null;

  return (
    <PageContainer
      title="Messages"
      section="Scholar Portal"
      description="Direct communication with your programme mentor, academic support, and finance team."
      action={
        <Button size="sm" className="rounded-md">
          New Message
        </Button>
      }
    >
      <div className="grid gap-5 xl:grid-cols-[0.8fr_1.2fr]">
        {/* Thread list */}
        <div className="border border-border/50 rounded-xl overflow-hidden">
          <div className="flex items-center gap-2 px-5 py-3.5 border-b border-border/50 bg-muted/20">
            <Mail className="h-3.5 w-3.5 text-primary" />
            <div>
              <p className="text-xs font-semibold">Threads</p>
              <p className="text-[11px] text-muted-foreground mt-0.5">
                Recent conversations and requests.
              </p>
            </div>
          </div>
          <div className="divide-y divide-border/50">
            {scholarMessages.map((thread) => {
              const isActive = thread.id === selectedThreadId;
              return (
                <button
                  key={thread.id}
                  type="button"
                  onClick={() => setSelectedThreadId(thread.id)}
                  className={cn(
                    "w-full p-4 text-left transition-colors",
                    isActive
                      ? "bg-foreground text-background"
                      : "hover:bg-muted/30"
                  )}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p
                        className={cn(
                          "text-xs font-semibold",
                          isActive ? "text-background" : "text-foreground"
                        )}
                      >
                        {thread.participant}
                      </p>
                      <p
                        className={cn(
                          "text-[11px]",
                          isActive
                            ? "text-background/60"
                            : "text-muted-foreground"
                        )}
                      >
                        {thread.role}
                      </p>
                    </div>
                    {thread.unreadCount > 0 && (
                      <span
                        className={cn(
                          "text-[9px] font-bold rounded-full px-2 py-px",
                          isActive
                            ? "bg-primary text-primary-foreground"
                            : "bg-foreground text-background"
                        )}
                      >
                        {thread.unreadCount}
                      </span>
                    )}
                  </div>
                  <p
                    className={cn(
                      "mt-2 text-[11px] line-clamp-1",
                      isActive ? "text-background/60" : "text-muted-foreground"
                    )}
                  >
                    {thread.lastMessage}
                  </p>
                  <p
                    className={cn(
                      "mt-1 text-[10px]",
                      isActive
                        ? "text-background/40"
                        : "text-muted-foreground/50"
                    )}
                  >
                    {thread.timestamp}
                  </p>
                </button>
              );
            })}
          </div>
        </div>

        {/* Thread view */}
        <div className="border border-border/50 rounded-xl overflow-hidden flex flex-col min-h-[500px]">
          <div className="px-5 py-3.5 border-b border-border/50 bg-muted/20">
            <p className="text-xs font-semibold">
              {activeThread ? activeThread.participant : "No thread selected"}
            </p>
            <p className="text-[11px] text-muted-foreground mt-0.5">
              {activeThread
                ? activeThread.role
                : "Select a thread to view messages."}
            </p>
          </div>
          <div className="flex-1 flex flex-col p-4">
            {activeThread ? (
              <>
                <div className="flex-1 space-y-3 overflow-y-auto pr-1 pb-3">
                  {activeThread.messages.map((message) => {
                    const isScholar =
                      message.sender === "You" || message.sender === "Scholar";
                    return (
                      <div
                        key={message.id}
                        className={`rounded-xl p-4 text-xs max-w-[85%] ${
                          isScholar
                            ? "bg-foreground text-background ml-auto"
                            : "bg-muted/30 mr-auto"
                        }`}
                      >
                        <p className="font-semibold mb-1">{message.sender}</p>
                        <p
                          className={
                            isScholar
                              ? "text-background/80"
                              : "text-muted-foreground"
                          }
                        >
                          {message.body}
                        </p>
                        <p
                          className={`mt-1.5 text-[10px] ${
                            isScholar
                              ? "text-background/40"
                              : "text-muted-foreground/50"
                          }`}
                        >
                          {message.time}
                        </p>
                      </div>
                    );
                  })}
                </div>
                <div className="border border-border/50 rounded-xl p-4 mt-auto bg-muted/10">
                  <Textarea
                    rows={3}
                    placeholder="Send not implemented yet..."
                    className="resize-none text-xs"
                    readOnly
                  />
                  <div className="mt-3 flex justify-end">
                    <Button size="sm" disabled className="gap-2 rounded-md">
                      <Send className="h-3.5 w-3.5" /> Send Message
                    </Button>
                  </div>
                </div>
              </>
            ) : (
              <div className="flex-1 flex items-center justify-center border border-dashed border-border/50 rounded-xl text-xs text-muted-foreground text-center p-6">
                Your inbox is empty. Once you receive a message, it will appear
                here.
              </div>
            )}
          </div>
        </div>
      </div>
    </PageContainer>
  );
}
