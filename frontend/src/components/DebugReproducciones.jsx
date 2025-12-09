import { useEffect, useState } from "react";

export default function DebugReproducciones() {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    const handler = (e) => {
      setLogs((prev) => [...prev, e.detail]);
    };

    window.addEventListener("reproduccion-registrada", handler);
    return () => window.removeEventListener("reproduccion-registrada", handler);
  }, []);

  return (
    <div style={{
      position: "fixed",
      bottom: 10,
      right: 10,
      background: "#111",
      color: "lime",
      padding: "10px 15px",
      fontSize: "12px",
      borderRadius: "8px",
      maxWidth: "280px",
      maxHeight: "200px",
      overflowY: "scroll",
      zIndex: 9999
    }}>
      <strong>LOGS REPRODUCCIONES</strong>
      <hr style={{ borderColor: "#333" }} />

      {logs.map((log, i) => (
        <div key={i}>{JSON.stringify(log)}</div>
      ))}
    </div>
  );
}
