import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const PANELS = {
  financial: {
    id: "financial",
    route: "/financial",
    label: "Financial Services",
    subtitle: "Wealth Management Authorization",
    description: "Dynamic row filtering and column masking across wealth management accounts. Policies enforce account assignments, transfer limits, and manager hierarchies — all driven by PlainID's centralized policy engine.",
    features: [
      "Row-level filtering by account assignment",
      "Column masking (private classification: employer, address)",
      "Transfer limit enforcement per policy",
      "Manager full visibility through direct reports policy",
      "Column classification: public, private, confidential, financial, PII",
    ],
    personas: [
      { name: "Sara Jameson", role: "Wealth Manager", detail: "7 accounts · $100 limit" },
      { name: "Jim Johnson", role: "Wealth Manager", detail: "7 accounts · $50 limit" },
      { name: "Bob Sinclair", role: "Wealth Manager", detail: "7 accounts · $100 limit" },
      { name: "Tim Taylor", role: "Wealth Manager", detail: "7 accounts · $50 limit" },
      { name: "Lara Manager", role: "Regional Manager", detail: "21 accounts · Hierarchical" },
      { name: "Alex Manager", role: "Regional Manager", detail: "19 accounts · Hierarchical" },
    ],
    accentColor: "#2563eb",
    accentLight: "rgba(37,99,235,0.12)",
    gradient: "linear-gradient(135deg, #0f172a 0%, #1e293b 40%, #0f2744 100%)",
    textColor: "#e2e8f0",
    mutedColor: "#94a3b8",
    icon: "📊",
    patternId: "grid-dark",
    patternColor: "rgba(37,99,235,0.06)",
    featureTextColor: "#60a5fa",
  },
  healthcare: {
    id: "healthcare",
    route: "/healthcare",
    label: "Healthcare",
    subtitle: "Clinical Data Authorization",
    description: "HIPAA-compliant column-level access control for patient records. Physicians, nurses, billing staff, and administrators each see only the data their role permits — enforced dynamically at query time.",
    features: [
      "Role-based column visibility (Physician vs Nurse vs Billing)",
      "SSN masking with partial reveal for billing verification",
      "Clinical data isolation from non-clinical roles",
      "Diagnosis truncation for nursing staff",
      "HIPAA & GDPR compliance enforcement",
    ],
    personas: [
      { name: "Dr. Michael Chen", role: "Physician", detail: "Full clinical access" },
      { name: "Jennifer Smith", role: "Nurse", detail: "Care data · No billing" },
      { name: "Sarah Williams", role: "Billing Staff", detail: "Financial · No clinical" },
      { name: "Alex Johnson", role: "Administrator", detail: "Aggregate · Masked PII" },
    ],
    accentColor: "#0891b2",
    accentLight: "rgba(8,145,178,0.12)",
    gradient: "linear-gradient(135deg, #ecfeff 0%, #f0f9ff 40%, #f8fafc 100%)",
    textColor: "#0f172a",
    mutedColor: "#64748b",
    icon: "🏥",
    patternId: "grid-light",
    patternColor: "rgba(8,145,178,0.06)",
    featureTextColor: "#0891b2",
  },
};

const DemoLauncher = () => {
  const navigate = useNavigate();
  const [hoveredPanel, setHoveredPanel] = useState(null);
  const [animatedIn, setAnimatedIn] = useState(false);
  const [contentVisible, setContentVisible] = useState(false);

  useEffect(() => {
    requestAnimationFrame(() => setAnimatedIn(true));
    const t = setTimeout(() => setContentVisible(true), 400);
    return () => clearTimeout(t);
  }, []);

  const getFlexBasis = (panelId) => {
    if (!hoveredPanel) return "50%";
    return hoveredPanel === panelId ? "58%" : "42%";
  };

  const renderPanel = (panel, side) => {
    const isLeft = side === "left";

    return (
      <div
        style={{
          position: "relative",
          flexBasis: getFlexBasis(panel.id),
          background: panel.gradient,
          opacity: animatedIn ? 1 : 0,
          transform: animatedIn ? "translateX(0)" : `translateX(${isLeft ? "-40px" : "40px"})`,
          transition: "flex-basis 0.5s cubic-bezier(0.25,0.46,0.45,0.94), opacity 0.8s ease, transform 0.8s ease",
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          cursor: "pointer",
        }}
        onMouseEnter={() => setHoveredPanel(panel.id)}
        onMouseLeave={() => setHoveredPanel(null)}
        onClick={() => navigate(panel.route)}
      >
        {/* Grid pattern */}
        <svg style={{ position: "absolute", inset: 0, zIndex: 1, pointerEvents: "none", opacity: 0.5 }} width="100%" height="100%">
          <defs>
            <pattern id={panel.patternId} width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke={panel.patternColor} strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill={`url(#${panel.patternId})`} />
        </svg>

        <div style={{
          padding: "60px 56px",
          maxWidth: 640,
          position: "relative",
          zIndex: 2,
          marginLeft: isLeft ? undefined : "auto",
          opacity: contentVisible ? 1 : 0,
          transform: contentVisible ? "translateY(0)" : "translateY(20px)",
          transition: `opacity 0.6s ease ${isLeft ? "0.2s" : "0.35s"}, transform 0.6s ease ${isLeft ? "0.2s" : "0.35s"}`,
        }}>
          <div style={{ fontSize: 48, marginBottom: 16 }}>{panel.icon}</div>

          <h2 style={{
            fontFamily: "Georgia, 'Times New Roman', serif",
            fontSize: 38, fontWeight: 400, color: panel.textColor,
            lineHeight: 1.15, marginBottom: 6, letterSpacing: "-0.01em",
          }}>
            {panel.label}
          </h2>

          <p style={{
            fontSize: 15, color: panel.accentColor, fontWeight: 600,
            marginBottom: 20, letterSpacing: "0.02em",
          }}>
            {panel.subtitle}
          </p>

          <p style={{
            fontSize: 15, lineHeight: 1.65, color: panel.mutedColor,
            marginBottom: 28, maxWidth: 480,
          }}>
            {panel.description}
          </p>

          {/* Feature tags */}
          <div style={{ marginBottom: 28 }}>
            {panel.features.map((f, i) => (
              <span key={i} style={{
                display: "inline-block", padding: "5px 12px", borderRadius: 6,
                fontSize: 12, fontWeight: 500, margin: "3px 4px 3px 0", lineHeight: 1.4,
                background: panel.accentLight, color: panel.featureTextColor,
              }}>{f}</span>
            ))}
          </div>

          {/* Personas */}
          <div style={{ marginBottom: 32 }}>
            <p style={{
              fontSize: 11, fontWeight: 600, textTransform: "uppercase",
              letterSpacing: "0.08em", color: panel.mutedColor, marginBottom: 10,
            }}>
              {panel.personas.length} Personas
            </p>
            {panel.personas.map((p, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 12, padding: "8px 0" }}>
                <div style={{ width: 8, height: 8, borderRadius: "50%", background: panel.accentColor, flexShrink: 0 }} />
                <div>
                  <span style={{ fontSize: 13, fontWeight: 600, color: panel.textColor }}>{p.name}</span>
                  <span style={{ fontSize: 12, color: panel.mutedColor, marginLeft: 8 }}>{p.role} · {p.detail}</span>
                </div>
              </div>
            ))}
          </div>

          <button
            style={{
              display: "inline-flex", alignItems: "center", gap: 10,
              padding: "14px 32px", borderRadius: 10, border: "none",
              fontSize: 15, fontWeight: 600, cursor: "pointer",
              background: panel.accentColor, color: "#fff",
              fontFamily: "inherit", letterSpacing: "0.01em",
              transition: "all 0.3s ease",
            }}
            onMouseOver={(e) => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 8px 24px rgba(0,0,0,0.2)"; }}
            onMouseOut={(e) => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "none"; }}
            onClick={(e) => { e.stopPropagation(); navigate(panel.route); }}
          >
            Launch Demo <span style={{ fontSize: 18 }}>→</span>
          </button>
        </div>
      </div>
    );
  };

  return (
    <div style={{ display: "flex", minHeight: "100vh", overflow: "hidden", fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" }}>
      {renderPanel(PANELS.financial, "left")}

      {/* Center branding */}
      <div style={{
        position: "fixed", top: "50%", left: "50%", transform: "translate(-50%, -50%)",
        zIndex: 20, textAlign: "center", pointerEvents: "none",
        opacity: contentVisible ? 1 : 0, transition: "opacity 0.8s ease 0.6s",
      }}>
        <div style={{
          background: "rgba(255,255,255,0.95)", backdropFilter: "blur(20px)",
          borderRadius: 20, padding: "24px 40px",
          boxShadow: "0 20px 60px rgba(0,0,0,0.12), 0 0 0 1px rgba(0,0,0,0.04)",
        }}>
          <div style={{
            fontSize: 11, fontWeight: 700, textTransform: "uppercase",
            letterSpacing: "0.15em", color: "#64748b", marginBottom: 6,
          }}>PlainID</div>
          <div style={{
            fontFamily: "Georgia, 'Times New Roman', serif",
            fontSize: 18, color: "#0f172a", fontWeight: 400, lineHeight: 1.3,
          }}>
            Data Authorization<br />Walkthrough
          </div>
          <div style={{
            width: 32, height: 2,
            background: "linear-gradient(90deg, #2563eb, #0891b2)",
            margin: "12px auto 0", borderRadius: 1,
          }} />
        </div>
      </div>

      {/* Divider */}
      <div style={{
        position: "absolute", top: 0, bottom: 0, left: "50%", width: 1, zIndex: 10, pointerEvents: "none",
        background: "linear-gradient(180deg, transparent, rgba(148,163,184,0.2) 20%, rgba(148,163,184,0.2) 80%, transparent)",
      }} />

      {renderPanel(PANELS.healthcare, "right")}
    </div>
  );
};

export default DemoLauncher;
