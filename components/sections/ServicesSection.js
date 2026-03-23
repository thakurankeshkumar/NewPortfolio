"use client";
import { useEffect, useState } from "react";

const iconMap = {
  layers: "⊟",
  refresh: "↺",
  search: "⌕",
  zap: "⚡",
  code: "</>",
  message: "⌨",
};

export default function ServicesSection() {
  const [services, setServices] = useState([]);

  useEffect(() => {
    fetch("/api/services")
      .then((r) => r.json())
      .then((res) => setServices(res.data || []))
      .catch(() => {});
  }, []);

  return (
    <section
      id="services"
      style={{ backgroundColor: "#1a1510", padding: "100px 64px" }}
    >
      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "80px" }}>
        <div>
          <p style={{ fontSize: "11px", letterSpacing: "0.15em", color: "var(--orange)", fontWeight: 600, marginBottom: "20px" }}>
            OPEN TO COLLABORATION
          </p>
          <h2
            style={{
              fontFamily: "var(--font-playfair)",
              fontSize: "clamp(48px, 6vw, 72px)",
              fontWeight: 700,
              fontStyle: "italic",
              color: "#f5f0e8",
              lineHeight: 1.1,
              maxWidth: "500px",
            }}
          >
            What I can build for you
          </h2>
        </div>
        <p style={{ fontSize: "14px", lineHeight: 1.7, color: "#8a8178", maxWidth: "300px", textAlign: "right", marginTop: "60px" }}>
          Not a fixed menu. Every engagement starts with a conversation about what you actually need.
        </p>
      </div>

      {/* Services Grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "0",
          border: "1px solid #2a2520",
        }}
      >
        {services.map((service, index) => (
          <div
            key={service._id}
            style={{
              padding: "40px",
              borderRight: (index + 1) % 3 !== 0 ? "1px solid #2a2520" : "none",
              borderBottom: index < 3 ? "1px solid #2a2520" : "none",
            }}
          >
            {/* Icon + Badge */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "24px" }}>
              <div
                style={{
                  width: "40px",
                  height: "40px",
                  border: "1px solid #3a3530",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "16px",
                  color: "var(--orange)",
                }}
              >
                {iconMap[service.icon] || "◈"}
              </div>
              <span
                style={{
                  fontSize: "10px",
                  letterSpacing: "0.12em",
                  padding: "4px 10px",
                  border: "1px solid #3a3530",
                  color: "#8a8178",
                }}
              >
                {service.badge}
              </span>
            </div>

            {/* Title */}
            <h3 style={{ fontSize: "17px", fontWeight: 700, color: "#f5f0e8", marginBottom: "12px" }}>
              {service.title}
            </h3>

            {/* Description */}
            <p style={{ fontSize: "13px", lineHeight: 1.7, color: "#8a8178" }}>
              {service.description}
            </p>
          </div>
        ))}
      </div>

      {/* CTA */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginTop: "64px",
          paddingTop: "40px",
          borderTop: "1px solid #2a2520",
        }}
      >
        <p style={{ fontSize: "16px", lineHeight: 1.7, color: "#8a8178", maxWidth: "400px" }}>
          Have a project or idea in mind? I&apos;m always up for a focused conversation — no commitment required.
        </p>
        <a
          href="#contact"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
            backgroundColor: "var(--orange)",
            color: "#fff",
            padding: "16px 32px",
            fontSize: "12px",
            letterSpacing: "0.12em",
            fontWeight: 700,
            textDecoration: "none",
          }}
        >
          LET&apos;S TALK →
        </a>
      </div>
    </section>
  );
}