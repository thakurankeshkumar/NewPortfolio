"use client";
import { useEffect, useState } from "react";

export default function AboutSection() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch("/api/about")
      .then((r) => r.json())
      .then((res) => setData(res.data))
      .catch(() => {});
  }, []);

  if (!data) return <section id="about" style={{ minHeight: "60vh" }} />;

  return (
    <section id="about" style={{ backgroundColor: "var(--cream)", padding: "100px 64px" }}>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "80px" }}>

        {/* Left — Bio */}
        <div>
          <p style={{ fontSize: "11px", letterSpacing: "0.15em", color: "var(--orange)", fontWeight: 600, marginBottom: "12px" }}>
            WHO I AM
          </p>
          <h2 style={{ fontFamily: "var(--font-playfair)", fontSize: "clamp(40px, 4vw, 52px)", fontWeight: 700, color: "var(--text)", marginBottom: "40px" }}>
            The Background
          </h2>

          {data.bio.map((para, i) => (
            <p key={i} style={{ fontSize: "15px", lineHeight: 1.8, color: "var(--text)", marginBottom: "20px" }}>
              {para}
            </p>
          ))}

          {/* Achievements */}
          <div style={{ marginTop: "48px" }}>
            <p style={{ fontSize: "11px", letterSpacing: "0.15em", color: "var(--muted)", marginBottom: "16px" }}>
              ACHIEVEMENTS
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
              {data.achievements.map((a, i) => (
                <span
                  key={i}
                  style={{
                    fontSize: "12px",
                    padding: "6px 14px",
                    border: `1px solid ${i === 0 ? "var(--orange)" : i === 1 ? "var(--green)" : "var(--border)"}`,
                    color: i === 0 ? "var(--orange)" : i === 1 ? "var(--green)" : "var(--text)",
                    backgroundColor: "transparent",
                  }}
                >
                  {a}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Right — Timeline */}
        <div>
          <p style={{ fontSize: "11px", letterSpacing: "0.15em", color: "var(--orange)", fontWeight: 600, marginBottom: "12px" }}>
            WHERE I&apos;VE BEEN
          </p>
          <h2 style={{ fontFamily: "var(--font-playfair)", fontSize: "clamp(40px, 4vw, 52px)", fontWeight: 700, color: "var(--text)", marginBottom: "40px" }}>
            Timeline
          </h2>

          <div style={{ position: "relative" }}>
            {data.timeline
              .sort((a, b) => a.order - b.order)
              .map((item, i) => (
                <div
                  key={i}
                  style={{
                    display: "grid",
                    gridTemplateColumns: "24px 1fr",
                    gap: "20px",
                    marginBottom: "40px",
                  }}
                >
                  {/* Dot */}
                  <div style={{ paddingTop: "6px" }}>
                    <div
                      style={{
                        width: "12px",
                        height: "12px",
                        borderRadius: "50%",
                        border: "2px solid var(--border)",
                        backgroundColor: "var(--cream)",
                      }}
                    />
                  </div>

                  {/* Content */}
                  <div>
                    <p style={{ fontSize: "12px", color: "var(--muted)", marginBottom: "4px", fontStyle: "italic" }}>
                      {item.period}
                    </p>
                    <h3 style={{ fontSize: "17px", fontWeight: 700, color: "var(--text)", marginBottom: "4px" }}>
                      {item.title}
                    </h3>
                    <p style={{ fontSize: "11px", letterSpacing: "0.1em", color: item.orgType === "INDEPENDENT" ? "var(--orange)" : "var(--muted)", marginBottom: "8px" }}>
                      {item.orgType || item.organization}
                    </p>
                    <p style={{ fontSize: "13px", lineHeight: 1.7, color: "var(--muted)" }}>
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </section>
  );
}