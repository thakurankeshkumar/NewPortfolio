"use client";
import { useEffect, useState } from "react";

export default function ProjectSection() {
    const [projects, setProjects] = useState([]);
    const [hovered, setHovered] = useState(null);

    useEffect(() => {
        fetch("/api/projects")
            .then((r) => r.json())
            .then((res) => setProjects(res.data || []))
            .catch(() => { });
    }, []);

    return (
        <section id="projects" style={{ backgroundColor: "var(--cream)", padding: "100px 64px" }}>
            {/* Header */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "48px" }}>
                <div>
                    <p style={{ fontSize: "11px", letterSpacing: "0.15em", color: "var(--orange)", fontWeight: 600, marginBottom: "12px" }}>
                        THINGS I&apos;VE BUILT
                    </p>
                    <h2 style={{ fontFamily: "var(--font-playfair)", fontSize: "clamp(40px, 5vw, 56px)", fontWeight: 700, color: "var(--text)" }}>
                        Selected Works
                    </h2>
                </div>
                <span style={{ fontSize: "12px", letterSpacing: "0.1em", color: "var(--muted)", cursor: "pointer" }}>
                    ALL PROJECTS →
                </span>
            </div>

            {/* Divider */}
            <div style={{ height: "1px", backgroundColor: "var(--border)", marginBottom: "0" }} />

            {/* Projects List */}
            {projects.map((project, index) => (
                <div
                    key={project._id}
                    onMouseEnter={() => setHovered(project._id)}
                    onMouseLeave={() => setHovered(null)}
                    style={{
                        display: "grid",
                        gridTemplateColumns: "80px 1fr auto",
                        gap: "32px",
                        padding: "48px 0",
                        borderBottom: "1px solid var(--border)",
                        borderLeft: hovered === project._id ? "3px solid var(--green)" : "3px solid transparent",
                        paddingLeft: hovered === project._id ? "24px" : "0",
                        transition: "all 0.2s ease",
                        cursor: "pointer",
                    }}
                >
                    {/* Number */}
                    <div
                        style={{
                            fontFamily: "var(--font-playfair)",
                            fontSize: "14px",
                            fontStyle: "italic",
                            color: "var(--orange)",
                            paddingTop: "4px",
                        }}
                    >
                        {String(index + 1).padStart(2, "0")}
                    </div>

                    {/* Content */}
                    <div>
                        <div style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "12px" }}>
                            <h3 style={{ fontSize: "20px", fontWeight: 700, color: "var(--text)" }}>
                                {project.title}
                            </h3>
                            <span style={{ fontSize: "12px", color: "var(--muted)" }}>{project.year}</span>
                        </div>
                        <p style={{ fontSize: "14px", lineHeight: 1.7, color: "var(--muted)", marginBottom: "20px", maxWidth: "600px" }}>
                            {project.description}
                        </p>
                        <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
                            {project.tags.map((tag) => (
                                <span
                                    key={tag}
                                    style={{
                                        fontSize: "11px",
                                        letterSpacing: "0.1em",
                                        padding: "4px 12px",
                                        border: "1px solid var(--border)",
                                        color: "var(--text)",
                                    }}
                                >
                                    {tag}
                                </span>
                            ))}
                        </div>
                    </div>

                    {/* Right — type + arrow */}
                    <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: "8px", minWidth: "160px" }}>
                        <span style={{ fontSize: "11px", letterSpacing: "0.1em", padding: "4px 10px", border: "1px solid var(--border)", color: "var(--muted)" }}>
                            {project.type}
                        </span>
                        <span style={{ fontSize: "11px", letterSpacing: "0.1em", color: "var(--muted)" }}>
                            {project.role}
                        </span>
                        {(project.liveUrl || project.githubUrl) && (
                            <a
                                href={project.liveUrl || project.githubUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                style={{
                                    marginTop: "auto",
                                    width: "36px",
                                    height: "36px",
                                    border: "1px solid var(--border)",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    color: "var(--text)",
                                    textDecoration: "none",
                                    fontSize: "14px",
                                }}
                            >
                                →
                            </a>
                        )}
                    </div>
                </div>
            ))}
        </section>
    );
}