export async function POST(req) {
  try {
    const body = await req.json();

    const res = await fetch(
      "http://20.207.122.201/evaluation-service/auth",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(body)
      }
    );

    const data = await res.json();

    return Response.json(data);
  } catch (err) {
    return Response.json({ error: "Auth failed" });
  }
}