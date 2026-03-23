"use client";
import { useEffect, useState } from "react";

const iconMap = {
    code: "</>",
    globe: "⊕",
    server: "⊟",
    database: "⊕",
    tool: "⚙",
    cpu: "⊞",
};

export default function SkillsSection() {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        fetch("/api/skills")
            .then((r) => r.json())
            .then((res) => setCategories(res.data || []))
            .catch(() => { });
    }, []);

    return (
        <section id="skills" style={{ backgroundColor: "var(--cream)", padding: "100px 64px" }}>
            {/* Header */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "64px" }}>
                <div>
                    <p style={{ fontSize: "11px", letterSpacing: "0.15em", color: "var(--orange)", fontWeight: 600, marginBottom: "12px" }}>
                        WHAT I WORK WITH
                    </p>
                    <h2 style={{ fontFamily: "var(--font-playfair)", fontSize: "clamp(40px, 5vw, 56px)", fontWeight: 700, color: "var(--text)" }}>
                        Technical Skills
                    </h2>
                </div>
                <p style={{ fontSize: "14px", lineHeight: 1.7, color: "var(--muted)", maxWidth: "320px", textAlign: "right", marginTop: "8px" }}>
                    Grouped by domain so recruiters and collaborators can quickly map depth to needs.
                </p>
            </div>

            {/* Grid */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "2px", backgroundColor: "var(--border)" }}>
                {categories.map((cat) => (
                    <div
                        key={cat._id}
                        style={{
                            backgroundColor: "var(--cream)",
                            padding: "40px",
                        }}
                    >
                        {/* Icon + Title */}
                        <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "28px" }}>
                            <div
                                style={{
                                    width: "36px",
                                    height: "36px",
                                    border: "1px solid var(--border)",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    fontSize: "14px",
                                    color: "var(--orange)",
                                    backgroundColor: "#fdf8f2",
                                }}
                            >
                                {iconMap[cat.icon] || "</>"}
                            </div>
                            <span style={{ fontSize: "12px", letterSpacing: "0.12em", fontWeight: 700, color: "var(--text)" }}>
                                {cat.title}
                            </span>
                        </div>

                        {/* Skills */}
                        <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                            {cat.skills.map((skill) => (
                                <span
                                    key={skill}
                                    style={{
                                        fontSize: "12px",
                                        padding: "5px 12px",
                                        border: "1px solid var(--border)",
                                        color: "var(--text)",
                                        backgroundColor: "transparent",
                                    }}
                                >
                                    {skill}
                                </span>
                            ))}
                        </div>
                    </div>
                ))}
            </div>

            {/* Footer note */}
            <div style={{ textAlign: "right", marginTop: "24px" }}>
                <span style={{ fontSize: "11px", letterSpacing: "0.12em", color: "var(--muted)" }}>
                    UPDATED DYNAMICALLY · ALWAYS CURRENT
                </span>
            </div>
        </section>
    );
}