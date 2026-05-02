"use client";

import { useEffect, useState } from "react";

export default function Home() {
  const [notifications, setNotifications] = useState([]);
  const [filter, setFilter] = useState("All");
  const [page, setPage] = useState(1);
  const [seen, setSeen] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        let url = `/api/notifications?page=${page}&limit=10`;

        if (filter !== "All") {
          url += `&notification_type=${filter}`;
        }

        const res = await fetch(url);
        const data = await res.json();

        console.log("API DATA:", data);

        // SIMPLE SORT (no bugs)
        const weight = {
          Placement: 3,
          Result: 2,
          Event: 1
        };

        const sorted = (data.notifications || [])
          .sort((a, b) => {
            const scoreA =
              weight[a.Type] + new Date(a.Timestamp).getTime();
            const scoreB =
              weight[b.Type] + new Date(b.Timestamp).getTime();
            return scoreB - scoreA;
          })
          .slice(0, 10);

        setNotifications(sorted);
      } catch (err) {
        console.log("ERROR:", err);
      }
    }

    fetchData();
  }, [page, filter]);

  return (
    <div style={{ padding: "20px", background: "#000", color: "#fff" }}>
      <h1>Priority Notifications</h1>

      {/* FILTERS */}
      <div style={{ marginBottom: "20px" }}>
        {["All", "Placement", "Result", "Event"].map((f) => (
          <button
            key={f}
            onClick={() => {
              setFilter(f);
              setPage(1);
            }}
            style={{
              marginRight: "10px",
              padding: "8px",
              background: filter === f ? "#555" : "#222",
              color: "#fff",
              border: "none"
            }}
          >
            {f}
          </button>
        ))}
      </div>

      {/* LIST */}
      {notifications.length === 0 ? (
        <p>Loading / No Data</p>
      ) : (
        notifications.map((n) => (
          <div
            key={n.ID}
            onClick={() => {
              if (!seen.includes(n.ID)) {
                setSeen([...seen, n.ID]);
              }
            }}
            style={{
              border: "1px solid #444",
              padding: "10px",
              margin: "10px 0",
              background: seen.includes(n.ID) ? "#222" : "#111",
              opacity: seen.includes(n.ID) ? 0.6 : 1,
              cursor: "pointer"
            }}
          >
            {!seen.includes(n.ID) && <span style={{ color: "red" }}>● New</span>}

            <h3>{n.Type}</h3>
            <p>{n.Message}</p>
            <small>{n.Timestamp}</small>
          </div>
        ))
      )}

      {/* PAGINATION */}
      <div style={{ marginTop: "20px" }}>
        <button onClick={() => setPage((p) => Math.max(1, p - 1))}>
          Prev
        </button>

        <span style={{ margin: "0 10px" }}>Page {page}</span>

        <button onClick={() => setPage((p) => p + 1)}>
          Next
        </button>
      </div>
    </div>
  );
}