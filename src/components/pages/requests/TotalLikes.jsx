export default function TotalLikes({ count }) {
  return (
    <li style={{
      padding: "20px 20px 12px",
      listStyle: "none",
      borderBottom: "1px solid var(--border)",
    }}>
      <h1 style={{ fontFamily: "var(--font-serif)", fontSize: "28px", fontWeight: 500 }}>Requests</h1>
      <p style={{ fontSize: "13px", color: "var(--text-3)", marginTop: "3px" }}>
        {count > 0 ? `${count} ${count === 1 ? "person wants" : "people want"} to connect` : "No pending requests"}
      </p>
    </li>
  );
}
