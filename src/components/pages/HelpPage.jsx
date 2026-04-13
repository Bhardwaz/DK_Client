import { Link } from "react-router-dom";

const sections = [
  {
    title: "Getting started",
    items: [
      { q: "How do I find matches?", a: "Browse profiles in the Discover feed. Tap the heart to express interest or the X to pass. If both people are interested, you'll match." },
      { q: "How do I edit my profile?", a: "Go to Profile → tap Edit. You can update your photos, bio, and interests. Note that some fields have a 7-day cooldown after editing." },
    ],
  },
  {
    title: "Connections & Chat",
    items: [
      { q: "How do connections work?", a: "When two people both express interest, a connection is created. You can then send each other messages from the Messages tab." },
      { q: "Why can't I message someone?", a: "You can only message people you've mutually connected with. Express interest first — if they like you back, the chat opens automatically." },
    ],
  },
  {
    title: "Privacy & Safety",
    items: [
      { q: "Who can see my profile?", a: "Only other verified users on the platform can view your profile in their Discover feed. You control all profile details." },
      { q: "How do I report someone?", a: "Open their profile or chat, tap ⋮, and choose 'Report'. Our team reviews every report within 24 hours." },
    ],
  },
];

export default function HelpPage() {
  return (
    <div style={{ maxWidth: "600px", margin: "0 auto", padding: "24px 16px 48px" }} className="fade-up">
      {/* Header */}
      <div style={{ marginBottom: "32px" }}>
        <h1 style={{ fontFamily: "var(--font-serif)", fontSize: "32px", fontWeight: 500 }}>Help Center</h1>
        <p style={{ fontSize: "14px", color: "var(--text-3)", marginTop: "6px" }}>Answers to common questions about datekarle.</p>
      </div>

      {/* Sections */}
      {sections.map((section, si) => (
        <div key={si} style={{ marginBottom: "32px" }}>
          <p style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--text-3)", marginBottom: "12px" }}>
            {section.title}
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            {section.items.map((item, ii) => (
              <details
                key={ii}
                style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: "16px", padding: "16px" }}
              >
                <summary style={{ cursor: "pointer", fontWeight: 600, fontSize: "14px", listStyle: "none", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  {item.q}
                  <span style={{ fontSize: "18px", color: "var(--text-3)", flexShrink: 0, marginLeft: "12px" }}>+</span>
                </summary>
                <p style={{ fontSize: "14px", color: "var(--text-2)", lineHeight: 1.7, marginTop: "12px" }}>{item.a}</p>
              </details>
            ))}
          </div>
        </div>
      ))}

      {/* CTA */}
      <div style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: "20px", padding: "24px", textAlign: "center" }}>
        <p style={{ fontSize: "15px", fontWeight: 600, marginBottom: "6px" }}>Still need help?</p>
        <p style={{ fontSize: "13px", color: "var(--text-3)", marginBottom: "16px" }}>Our support team typically responds within 2 hours.</p>
        <a
          href="mailto:support@datekarle.com"
          className="btn btn-primary"
          style={{ textDecoration: "none", padding: "11px 24px" }}
        >
          Contact Support
        </a>
      </div>
    </div>
  );
}
