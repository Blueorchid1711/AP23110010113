"use client";

import { useState } from "react";

export default function AuthPage() {
  const [token, setToken] = useState(null);

  const getToken = async () => {
    const res = await fetch("/api/auth", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email: "aryaa123@gmail.com",
        name: "arya shinde",
        rollNo: "ap23110010113axx",
        accessCode: "QkbpxH",
        clientID: "23e661de-7239-41d0-83e9-e1224e9de1b4",
        clientSecret: "rhUhNqsmCzzeVEeS"
      })
    });

    const data = await res.json();
    console.log(data);
    setToken(data.access_token);
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Get Access Token</h1>
      <button onClick={getToken}>Generate Token</button>

      {token && (
        <p style={{ wordBreak: "break-all" }}>{token}</p>
      )}
    </div>
  );
}