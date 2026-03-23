"use client";
import { useEffect, useState } from "react";

export default function HeroSection() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch("/api/hero")
      .then((r) => r.json())
      .then((res) => setData(res.data))
      .catch(() => {});
  }, []);

  if (!data) return (
    <section id="home" style={{ minHeight: "100vh", paddingTop: "64px", backgroundColor: "var(--cream)" }} />
  );

  return (
    <section
      id="home"
      style={{
        minHeight: "100vh",
        paddingTop: "64px",
        display: "grid",
        gridTemplateColumns: "55% 45%",
        backgroundColor: "var(--cream)",
      }}
    >
      {/* ── LEFT ── */}
      <div
        style={{
          borderRight: "1px solid var(--border)",
          padding: "80px 64px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        {/* Badge */}
        <div style={{ marginBottom: "40px" }}>
          <span
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              border: "1px solid var(--orange)",
              borderRadius: "999px",
              padding: "6px 16px",
              fontSize: "11px",
              letterSpacing: "0.08em",
              color: "var(--orange)",
              fontWeight: 500,
            }}
          >
            <span
              style={{
                width: "6px",
                height: "6px",
                borderRadius: "50%",
                backgroundColor: "var(--orange)",
                flexShrink: 0,
              }}
            />
            {data.badge}
          </span>
        </div>

        {/* Name */}
        <h1
          style={{
            fontFamily: "var(--font-playfair)",
            fontSize: "clamp(80px, 9vw, 120px)",
            fontWeight: 700,
            fontStyle: "italic",
            lineHeight: 0.92,
            color: "var(--text)",
            marginBottom: "36px",
            letterSpacing: "-0.02em",
          }}
        >
          {data.name.split(" ").map((word, i) => (
            <span key={i} style={{ display: "block" }}>{word}</span>
          ))}
        </h1>

        {/* Description */}
        <p
          style={{
            fontSize: "16px",
            lineHeight: 1.7,
            color: "var(--text)",
            maxWidth: "420px",
            marginBottom: "28px",
          }}
        >
          {data.description}
        </p>

        {/* Stack tags */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            flexWrap: "wrap",
            marginBottom: "44px",
          }}
        >
          <span
            style={{
              fontSize: "11px",
              letterSpacing: "0.08em",
              color: "var(--muted)",
              fontWeight: 500,
              marginRight: "4px",
            }}
          >
            STACK:
          </span>
          {data.stack.map((s) => (
            <span
              key={s}
              style={{
                fontSize: "12px",
                padding: "4px 12px",
                border: "1px solid var(--border)",
                color: "var(--text)",
                borderRadius: "2px",
              }}
            >
              {s}
            </span>
          ))}
        </div>

        {/* CTA Buttons */}
        <div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
          <a
            href="#projects"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              backgroundColor: "var(--text)",
              color: "var(--cream)",
              padding: "14px 28px",
              fontSize: "12px",
              letterSpacing: "0.1em",
              fontWeight: 700,
              textDecoration: "none",
              whiteSpace: "nowrap",
            }}
          >
            VIEW WORK →
          </a>
          {data.resumeUrl && (
            <a
              href={data.resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                backgroundColor: "transparent",
                color: "var(--text)",
                padding: "14px 28px",
                fontSize: "12px",
                letterSpacing: "0.1em",
                fontWeight: 600,
                textDecoration: "none",
                border: "1.5px solid var(--border)",
                whiteSpace: "nowrap",
              }}
            >
              ↓ RÉSUMÉ
            </a>
          )}
        </div>
      </div>

      {/* ── RIGHT ── */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          backgroundColor: "var(--cream)",
        }}
      >
        {/* Stats — top 2 */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            flexGrow: 1,
          }}
        >
          {/* Stat: Year */}
          <div
            style={{
              padding: "48px 40px",
              borderRight: "1px solid var(--border)",
              borderBottom: "1px solid var(--border)",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            <div
              style={{
                fontFamily: "var(--font-playfair)",
                fontSize: "clamp(48px, 6vw, 72px)",
                fontWeight: 700,
                color: "var(--orange)",
                lineHeight: 1,
                marginBottom: "10px",
              }}
            >
              {data.stats.year}
            </div>
            <div
              style={{
                fontSize: "11px",
                letterSpacing: "0.15em",
                color: "var(--muted)",
                fontWeight: 500,
              }}
            >
              {data.stats.yearLabel}
            </div>
          </div>

          {/* Stat: Projects */}
          <div
            style={{
              padding: "48px 40px",
              borderBottom: "1px solid var(--border)",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            <div
              style={{
                fontFamily: "var(--font-playfair)",
                fontSize: "clamp(48px, 6vw, 72px)",
                fontWeight: 700,
                color: "var(--green)",
                lineHeight: 1,
                marginBottom: "10px",
              }}
            >
              {data.stats.projects}
            </div>
            <div
              style={{
                fontSize: "11px",
                letterSpacing: "0.15em",
                color: "var(--muted)",
                fontWeight: 500,
              }}
            >
              PROJECTS SHIPPED
            </div>
          </div>

          {/* Stat: Hackathons */}
          <div
            style={{
              padding: "48px 40px",
              borderRight: "1px solid var(--border)",
              borderBottom: "1px solid var(--border)",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            <div
              style={{
                fontFamily: "var(--font-playfair)",
                fontSize: "clamp(48px, 6vw, 72px)",
                fontWeight: 700,
                color: "var(--orange)",
                lineHeight: 1,
                marginBottom: "10px",
              }}
            >
              {data.stats.hackathons}
            </div>
            <div
              style={{
                fontSize: "11px",
                letterSpacing: "0.15em",
                color: "var(--muted)",
                fontWeight: 500,
              }}
            >
              HACKATHON WINNER
            </div>
          </div>

          {/* Stat: Tech Domains */}
          <div
            style={{
              padding: "48px 40px",
              borderBottom: "1px solid var(--border)",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            <div
              style={{
                fontFamily: "var(--font-playfair)",
                fontSize: "clamp(48px, 6vw, 72px)",
                fontWeight: 700,
                color: "var(--navy)",
                lineHeight: 1,
                marginBottom: "10px",
              }}
            >
              {data.stats.techDomains}
            </div>
            <div
              style={{
                fontSize: "11px",
                letterSpacing: "0.15em",
                color: "var(--muted)",
                fontWeight: 500,
              }}
            >
              TECH DOMAINS
            </div>
          </div>
        </div>

        {/* Available For strip */}
        <div
          style={{
            backgroundColor: "#ede8de",
            padding: "28px 40px",
            borderTop: "1px solid var(--border)",
          }}
        >
          <div
            style={{
              fontSize: "11px",
              letterSpacing: "0.15em",
              color: "var(--muted)",
              fontWeight: 500,
              marginBottom: "14px",
            }}
          >
            AVAILABLE FOR
          </div>
          <div
            style={{
              display: "flex",
              gap: "8px",
              flexWrap: "wrap",
              marginBottom: "20px",
            }}
          >
            {data.availableFor.map((item) => (
              <span
                key={item}
                style={{
                  fontSize: "12px",
                  padding: "6px 14px",
                  border: "1px solid var(--border)",
                  color: "var(--text)",
                  backgroundColor: "var(--cream)",
                }}
              >
                {item}
              </span>
            ))}
          </div>

          {/* Email + Social */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <a
              href={`mailto:${data.email}`}
              style={{
                fontSize: "13px",
                color: "var(--muted)",
                textDecoration: "none",
              }}
            >
              {data.email}
            </a>
            <div style={{ display: "flex", gap: "10px" }}>
              {data.githubUrl && (
                <a
                  href={data.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    width: "32px",
                    height: "32px",
                    border: "1px solid var(--border)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "var(--muted)",
                    textDecoration: "none",
                    fontSize: "13px",
                    backgroundColor: "var(--cream)",
                  }}
                >
                  ⌥
                </a>
              )}
              {data.linkedinUrl && (
                <a
                  href={data.linkedinUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    width: "32px",
                    height: "32px",
                    border: "1px solid var(--border)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "var(--muted)",
                    textDecoration: "none",
                    fontSize: "13px",
                    fontWeight: 700,
                    backgroundColor: "var(--cream)",
                  }}
                >
                  in
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}