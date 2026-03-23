"use client";
import { useState, useEffect, useLayoutEffect } from "react";

const navLinks = [
    { label: "HOME", href: "#home" },
    { label: "SKILLS", href: "#skills" },
    { label: "PROJECTS", href: "#projects" },
    { label: "SERVICES", href: "#services" },
    { label: "ABOUT", href: "#about" },
    { label: "CONTACT", href: "#contact" },
];

export default function Navbar() {
    const [active, setActive] = useState("HOME");
    const [scrolled, setScrolled] = useState(false);
    const [mounted, setMounted] = useState(false);

    useLayoutEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setMounted(true);
    }, []);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
            const sections = ["home", "skills", "projects", "services", "about", "contact"];
            for (const section of sections) {
                const el = document.getElementById(section);
                if (el) {
                    const rect = el.getBoundingClientRect();
                    if (rect.top <= 100 && rect.bottom >= 100) {
                        setActive(section.toUpperCase());
                        break;
                    }
                }
            }
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    if (!mounted) return null;

    return (
        <nav
            style={{
                position: "fixed",
                top: 0,
                left: 0,
                right: 0,
                zIndex: 100,
                backgroundColor: scrolled ? "rgba(245, 240, 232, 0.95)" : "var(--cream)",
                backdropFilter: scrolled ? "blur(10px)" : "none",
                borderBottom: scrolled ? "1px solid var(--border)" : "1px solid transparent",
                transition: "all 0.3s ease",
                padding: "0 48px",
                height: "64px",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
            }}
        >
            {/* Logo */}
            <a
                href="#home"
                style={{
                    fontFamily: "var(--font-inter)",
                    fontWeight: 700,
                    fontSize: "16px",
                    letterSpacing: "0.05em",
                    color: "var(--text)",
                    textDecoration: "none",
                }}
            >
                ALEX CHEN.
            </a>

            {/* Nav Links */}
            <div style={{ display: "flex", alignItems: "center", gap: "32px" }}>
                {navLinks.map((link) => (
                    <a
                        key={link.label}
                        href={link.href}
                        onClick={() => setActive(link.label)}
                        style={{
                            fontSize: "12px",
                            letterSpacing: "0.1em",
                            fontWeight: 500,
                            color: active === link.label ? "var(--orange)" : "var(--muted)",
                            textDecoration: "none",
                            transition: "color 0.2s ease",
                        }}
                    >
                        {link.label}
                    </a>
                ))}

                {/* Hire Me Button */}
                <a
                    href="#contact"
                    style={{
                        fontSize: "12px",
                        letterSpacing: "0.1em",
                        fontWeight: 600,
                        color: "var(--text)",
                        textDecoration: "none",
                        border: "1.5px solid var(--text)",
                        padding: "8px 20px",
                        transition: "all 0.2s ease",
                    }}
                    onMouseEnter={(e) => {
                        e.target.style.backgroundColor = "var(--text)";
                        e.target.style.color = "var(--cream)";
                    }}
                    onMouseLeave={(e) => {
                        e.target.style.backgroundColor = "transparent";
                        e.target.style.color = "var(--text)";
                    }}
                >
                    HIRE ME
                </a>
            </div>
        </nav>
    );
}