import { useState, useRef, useEffect, useCallback } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

interface Message {
  role: "user" | "assistant";
  content: string;
}

interface Props {
  onClose: () => void;
}

export default function AskQryptum({ onClose }: Props) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [streaming, setStreaming] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const abortRef = useRef<AbortController | null>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const send = useCallback(async () => {
    const text = input.trim();
    if (!text || streaming) return;

    const userMsg: Message = { role: "user", content: text };
    const nextMessages = [...messages, userMsg];
    setMessages(nextMessages);
    setInput("");
    setStreaming(true);

    const assistantMsg: Message = { role: "assistant", content: "" };
    setMessages([...nextMessages, assistantMsg]);

    const abort = new AbortController();
    abortRef.current = abort;

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: nextMessages }),
        signal: abort.signal,
      });

      if (!res.ok) throw new Error("Request failed");

      const reader = res.body!.getReader();
      const decoder = new TextDecoder();
      let buffer = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split("\n");
        buffer = lines.pop() ?? "";

        for (const line of lines) {
          if (!line.startsWith("data: ")) continue;
          try {
            const data = JSON.parse(line.slice(6));
            if (data.done) break;
            if (data.content) {
              setMessages((prev) => {
                const updated = [...prev];
                const last = updated[updated.length - 1];
                if (last.role === "assistant") {
                  updated[updated.length - 1] = {
                    ...last,
                    content: last.content + data.content,
                  };
                }
                return updated;
              });
            }
          } catch {}
        }
      }
    } catch (err: unknown) {
      if (err instanceof Error && err.name !== "AbortError") {
        setMessages((prev) => {
          const updated = [...prev];
          const last = updated[updated.length - 1];
          if (last.role === "assistant" && last.content === "") {
            updated[updated.length - 1] = {
              ...last,
              content: "Something went wrong. Please try again.",
            };
          }
          return updated;
        });
      }
    } finally {
      setStreaming(false);
      abortRef.current = null;
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [input, messages, streaming]);

  const handleKey = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      send();
    }
  };

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 200,
        display: "flex",
        alignItems: "flex-end",
        justifyContent: "flex-end",
        padding: "1rem",
        pointerEvents: "none",
      }}
    >
      <div
        onClick={onClose}
        style={{
          position: "fixed",
          inset: 0,
          background: "rgba(0,0,0,0.35)",
          backdropFilter: "blur(2px)",
          pointerEvents: "auto",
        }}
      />
      <div
        style={{
          position: "relative",
          width: "420px",
          height: "580px",
          background: "hsl(var(--card))",
          border: "1px solid hsl(var(--card-border))",
          borderRadius: "14px",
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
          boxShadow: "0 24px 60px rgba(0,0,0,0.25)",
          pointerEvents: "auto",
        }}
      >
        <div
          style={{
            padding: "1rem 1.25rem",
            borderBottom: "1px solid hsl(var(--card-border))",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexShrink: 0,
            background: "linear-gradient(135deg, rgba(6,182,212,0.05), rgba(124,58,237,0.05))",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
            <img
              src="/qryptum-logo.png"
              alt="Qryptum"
              style={{
                width: "28px",
                height: "28px",
                objectFit: "contain",
                flexShrink: 0,
                borderRadius: "6px",
              }}
            />
            <div>
              <div style={{ fontWeight: 700, fontSize: "0.875rem", color: "hsl(var(--fg))" }}>
                Ask Qryptum
              </div>
              <div style={{ fontSize: "0.68rem", color: "hsl(var(--muted-fg))" }}>
                AI assistant with full protocol knowledge
              </div>
            </div>
          </div>
          <button
            onClick={onClose}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              color: "hsl(var(--muted-fg))",
              padding: "4px",
              borderRadius: "4px",
              display: "flex",
              alignItems: "center",
            }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div
          style={{
            flex: 1,
            overflowY: "auto",
            padding: "1rem",
            display: "flex",
            flexDirection: "column",
            gap: "1rem",
          }}
        >
          {messages.length === 0 && (
            <div style={{ textAlign: "center", paddingTop: "2rem" }}>
              <div
                style={{
                  width: "56px",
                  height: "56px",
                  borderRadius: "14px",
                  background: "linear-gradient(135deg, rgba(6,182,212,0.15), rgba(124,58,237,0.15))",
                  border: "1px solid rgba(6,182,212,0.25)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  margin: "0 auto 1rem",
                }}
              >
                <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#06b6d4" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 18v-6a9 9 0 0 1 18 0v6" />
                  <path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z" />
                </svg>
              </div>
              <div style={{ fontWeight: 600, fontSize: "0.875rem", color: "hsl(var(--fg))", marginBottom: "0.5rem" }}>
                Ask anything about Qryptum
              </div>
              <div style={{ fontSize: "0.75rem", color: "hsl(var(--muted-fg))", lineHeight: 1.5, marginBottom: "1.25rem" }}>
                How vault proofs work, security model, contract addresses, brute-force costs, quantum resistance: anything.
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                {[
                  "How does the vault proof protect my tokens?",
                  "What happens if a quantum computer breaks ECDSA?",
                  "How much would it cost to brute-force my vault?",
                  "How do I unshield my tokens?",
                ].map((q) => (
                  <button
                    key={q}
                    onClick={() => setInput(q)}
                    style={{
                      background: "hsl(var(--bg))",
                      border: "1px solid hsl(var(--card-border))",
                      borderRadius: "8px",
                      padding: "0.5rem 0.75rem",
                      fontSize: "0.75rem",
                      color: "hsl(var(--fg))",
                      cursor: "pointer",
                      textAlign: "left",
                    }}
                  >
                    {q}
                  </button>
                ))}
              </div>
            </div>
          )}

          {messages.map((msg, i) => (
            <div
              key={i}
              style={{
                display: "flex",
                justifyContent: msg.role === "user" ? "flex-end" : "flex-start",
              }}
            >
              <div
                style={{
                  maxWidth: "85%",
                  padding: "0.6rem 0.875rem",
                  borderRadius: msg.role === "user" ? "12px 12px 4px 12px" : "12px 12px 12px 4px",
                  background:
                    msg.role === "user"
                      ? "linear-gradient(135deg, #06b6d4, #7c3aed)"
                      : "hsl(var(--bg))",
                  border: msg.role === "assistant" ? "1px solid hsl(var(--card-border))" : "none",
                  color: msg.role === "user" ? "#fff" : "hsl(var(--fg))",
                  fontSize: "0.82rem",
                  lineHeight: 1.55,
                  wordBreak: "break-word",
                  minWidth: 0,
                }}
              >
                {msg.content === "" && msg.role === "assistant" ? (
                  <span style={{ opacity: 0.5 }}>
                    <TypingDots />
                  </span>
                ) : msg.role === "user" ? (
                  <span style={{ whiteSpace: "pre-wrap" }}>{msg.content}</span>
                ) : (
                  <MarkdownContent content={msg.content} />
                )}
              </div>
            </div>
          ))}
          <div ref={bottomRef} />
        </div>

        <div
          style={{
            padding: "0.75rem",
            borderTop: "1px solid hsl(var(--card-border))",
            flexShrink: 0,
          }}
        >
          <div
            style={{
              display: "flex",
              gap: "0.5rem",
              alignItems: "flex-end",
              background: "hsl(var(--bg))",
              border: "1px solid hsl(var(--card-border))",
              borderRadius: "10px",
              padding: "0.5rem 0.5rem 0.5rem 0.75rem",
            }}
          >
            <textarea
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKey}
              placeholder="Ask anything about Qryptum..."
              rows={1}
              style={{
                flex: 1,
                background: "none",
                border: "none",
                outline: "none",
                resize: "none",
                fontSize: "0.82rem",
                color: "hsl(var(--fg))",
                fontFamily: "inherit",
                lineHeight: 1.5,
                maxHeight: "120px",
                overflowY: "auto",
              }}
            />
            <button
              onClick={send}
              disabled={!input.trim() || streaming}
              style={{
                width: "30px",
                height: "30px",
                borderRadius: "7px",
                background: input.trim() && !streaming
                  ? "linear-gradient(135deg, #06b6d4, #7c3aed)"
                  : "hsl(var(--card-border))",
                border: "none",
                cursor: input.trim() && !streaming ? "pointer" : "default",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
              }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5">
                <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>
          <div style={{ fontSize: "0.65rem", color: "hsl(var(--muted-fg))", textAlign: "center", marginTop: "0.4rem" }}>
            Powered by Claude, answers based on Qryptum protocol documentation
          </div>
        </div>
      </div>
    </div>
  );
}

function MarkdownContent({ content }: { content: string }) {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      components={{
        h1: ({ children }) => (
          <h1 style={{ fontSize: "1rem", fontWeight: 700, margin: "0.75rem 0 0.35rem", color: "hsl(var(--fg))", lineHeight: 1.3 }}>{children}</h1>
        ),
        h2: ({ children }) => (
          <h2 style={{ fontSize: "0.92rem", fontWeight: 700, margin: "0.75rem 0 0.35rem", color: "hsl(var(--fg))", lineHeight: 1.3 }}>{children}</h2>
        ),
        h3: ({ children }) => (
          <h3 style={{ fontSize: "0.85rem", fontWeight: 700, margin: "0.6rem 0 0.25rem", color: "hsl(var(--fg))", lineHeight: 1.3 }}>{children}</h3>
        ),
        p: ({ children }) => (
          <p style={{ margin: "0.35rem 0", lineHeight: 1.6 }}>{children}</p>
        ),
        strong: ({ children }) => (
          <strong style={{ fontWeight: 700, color: "hsl(var(--fg))" }}>{children}</strong>
        ),
        em: ({ children }) => (
          <em style={{ fontStyle: "italic" }}>{children}</em>
        ),
        code: ({ children, className }) => {
          const isBlock = className?.includes("language-");
          if (isBlock) {
            return (
              <code
                style={{
                  display: "block",
                  background: "hsl(var(--card))",
                  border: "1px solid hsl(var(--card-border))",
                  borderRadius: "6px",
                  padding: "0.6rem 0.75rem",
                  fontSize: "0.75rem",
                  fontFamily: "monospace",
                  overflowX: "auto",
                  whiteSpace: "pre",
                  margin: "0.4rem 0",
                  lineHeight: 1.5,
                }}
              >
                {children}
              </code>
            );
          }
          return (
            <code
              style={{
                background: "hsl(var(--card))",
                border: "1px solid hsl(var(--card-border))",
                borderRadius: "3px",
                padding: "0.1rem 0.3rem",
                fontSize: "0.75rem",
                fontFamily: "monospace",
              }}
            >
              {children}
            </code>
          );
        },
        pre: ({ children }) => (
          <pre style={{ margin: "0.4rem 0", overflow: "auto" }}>{children}</pre>
        ),
        ul: ({ children }) => (
          <ul style={{ margin: "0.35rem 0", paddingLeft: "1.25rem", lineHeight: 1.6 }}>{children}</ul>
        ),
        ol: ({ children }) => (
          <ol style={{ margin: "0.35rem 0", paddingLeft: "1.25rem", lineHeight: 1.6 }}>{children}</ol>
        ),
        li: ({ children }) => (
          <li style={{ margin: "0.15rem 0" }}>{children}</li>
        ),
        table: ({ children }) => (
          <div style={{ overflowX: "auto", margin: "0.5rem 0" }}>
            <table
              style={{
                width: "100%",
                borderCollapse: "collapse",
                fontSize: "0.75rem",
                lineHeight: 1.5,
              }}
            >
              {children}
            </table>
          </div>
        ),
        thead: ({ children }) => (
          <thead style={{ borderBottom: "2px solid hsl(var(--card-border))" }}>{children}</thead>
        ),
        tbody: ({ children }) => <tbody>{children}</tbody>,
        tr: ({ children }) => (
          <tr style={{ borderBottom: "1px solid hsl(var(--card-border))" }}>{children}</tr>
        ),
        th: ({ children }) => (
          <th
            style={{
              padding: "0.3rem 0.6rem",
              textAlign: "left",
              fontWeight: 700,
              color: "hsl(var(--fg))",
              whiteSpace: "nowrap",
            }}
          >
            {children}
          </th>
        ),
        td: ({ children }) => (
          <td
            style={{
              padding: "0.3rem 0.6rem",
              color: "hsl(var(--fg))",
            }}
          >
            {children}
          </td>
        ),
        blockquote: ({ children }) => (
          <blockquote
            style={{
              borderLeft: "3px solid rgba(6,182,212,0.5)",
              paddingLeft: "0.75rem",
              margin: "0.4rem 0",
              color: "hsl(var(--muted-fg))",
              fontStyle: "italic",
            }}
          >
            {children}
          </blockquote>
        ),
        hr: () => (
          <hr style={{ border: "none", borderTop: "1px solid hsl(var(--card-border))", margin: "0.6rem 0" }} />
        ),
        a: ({ children, href }) => (
          <a href={href} target="_blank" rel="noopener noreferrer" style={{ color: "#06b6d4", textDecoration: "underline" }}>
            {children}
          </a>
        ),
      }}
    >
      {content}
    </ReactMarkdown>
  );
}

function TypingDots() {
  return (
    <span style={{ display: "inline-flex", gap: "3px", alignItems: "center" }}>
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          style={{
            width: "5px",
            height: "5px",
            borderRadius: "50%",
            background: "hsl(var(--muted-fg))",
            display: "inline-block",
            animation: `pulse 1.2s ease-in-out ${i * 0.2}s infinite`,
          }}
        />
      ))}
      <style>{`@keyframes pulse { 0%,80%,100%{opacity:0.3} 40%{opacity:1} }`}</style>
    </span>
  );
}
