"use client";
import { useEffect, useState } from "react";

export default function ContactSection() {
  const [hero, setHero] = useState(null);

  useEffect(() => {
    fetch("/api/hero")
      .then((r) => r.json())
      .then((res) => setHero(res.data))
      .catch(() => {});
  }, []);

  return (
    <section
      id="contact"
      style={{
        backgroundColor: "var(--cream)",
        padding: "120px 64px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        textAlign: "center",
        borderTop: "1px solid var(--border)",
      }}
    >
      <p style={{ fontSize: "11px", letterSpacing: "0.15em", color: "var(--orange)", fontWeight: 600, marginBottom: "24px" }}>
        AVAILABLE FOR WORK
      </p>

      <h2
        style={{
          fontFamily: "var(--font-playfair)",
          fontSize: "clamp(56px, 8vw, 96px)",
          fontWeight: 700,
          fontStyle: "italic",
          color: "var(--text)",
          lineHeight: 1.05,
          marginBottom: "32px",
          maxWidth: "700px",
        }}
      >
        Let&apos;s build something.
      </h2>

      <p style={{ fontSize: "16px", lineHeight: 1.7, color: "var(--muted)", maxWidth: "480px", marginBottom: "48px" }}>
        Whether it&apos;s a full product, a legacy codebase that needs attention, or just a focused technical conversation — I&apos;m open to it.
      </p>

      {hero && (
        <>
          <a
            href={`mailto:${hero.email}`}
            style={{
              fontFamily: "var(--font-playfair)",
              fontSize: "clamp(20px, 3vw, 28px)",
              color: "var(--text)",
              textDecoration: "underline",
              textUnderlineOffset: "6px",
              marginBottom: "48px",
              display: "block",
            }}
          >
            {hero.email}
          </a>

          <div style={{ display: "flex", gap: "32px", alignItems: "center" }}>
            {hero.githubUrl && (
              <a
                href={hero.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  fontSize: "12px",
                  letterSpacing: "0.1em",
                  color: "var(--muted)",
                  textDecoration: "none",
                  fontWeight: 500,
                }}
              >
                ⌥ GITHUB
              </a>
            )}
            {hero.linkedinUrl && (
              <a
                href={hero.linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  fontSize: "12px",
                  letterSpacing: "0.1em",
                  color: "var(--muted)",
                  textDecoration: "none",
                  fontWeight: 500,
                }}
              >
                in LINKEDIN
              </a>
            )}
            {hero.resumeUrl && (
              <a
                href={hero.resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  fontSize: "12px",
                  letterSpacing: "0.1em",
                  color: "var(--muted)",
                  textDecoration: "none",
                  fontWeight: 500,
                }}
              >
                ↗ RÉSUMÉ
              </a>
            )}
          </div>
        </>
      )}

      {/* Footer */}
      <div style={{ marginTop: "80px", paddingTop: "32px", borderTop: "1px solid var(--border)", width: "100%", display: "flex", justifyContent: "space-between" }}>
        <span style={{ fontSize: "12px", color: "var(--muted)" }}>ALEX CHEN.</span>
        <span style={{ fontSize: "12px", color: "var(--muted)" }}>© {new Date().getFullYear()}</span>
      </div>
    </section>
  );
}