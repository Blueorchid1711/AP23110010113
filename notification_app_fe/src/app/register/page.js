"use client";

import { useState } from "react";

export default function Register() {
  const [result, setResult] = useState(null);

  const handleRegister = async () => {
    try {
      const res = await fetch(
        "/api/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            email: "aryaA123@gmail.com",        
            name: "Arya Shinde",
            mobileNo: "8282828276",             
            githubUsername: "arya-shinde-dev",         
            rollNo: "AP23110010113AXX",            
            accessCode: "QkbpxH"
          })
        }
      );

      const data = await res.json();
      console.log(data);
      setResult(data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Register API Test</h1>
      <button onClick={handleRegister}>Register</button>

      {result && (
        <pre>{JSON.stringify(result, null, 2)}</pre>
      )}
    </div>
  );
}