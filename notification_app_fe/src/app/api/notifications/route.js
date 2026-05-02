export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);

    const page = searchParams.get("page") || 1;
    const limit = searchParams.get("limit") || 10;
    const type = searchParams.get("notification_type");

    let url = `http://20.207.122.201/evaluation-service/notifications?page=${page}&limit=${limit}`;

    // ONLY add type if valid
    if (type === "Event" || type === "Result" || type === "Placement") {
      url += `&notification_type=${type}`;
    }

    const res = await fetch(url, {
      headers: {
        Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiYXVkIjoiaHR0cDovLzIwLjI0NC41Ni4xNDQvZXZhbHVhdGlvbi1zZXJ2aWNlIiwiZW1haWwiOiJhcnlhYTEyM0BnbWFpbC5jb20iLCJleHAiOjE3Nzc3MDUxNDksImlhdCI6MTc3NzcwNDI0OSwiaXNzIjoiQWZmb3JkIE1lZGljYWwgVGVjaG5vbG9naWVzIFByaXZhdGUgTGltaXRlZCIsImp0aSI6ImYyZmY0YmRlLWI4YzgtNGExOS04NGNiLTM2MGQ0NmQ5MGI5OCIsImxvY2FsZSI6ImVuLUlOIiwibmFtZSI6ImFyeWEgc2hpbmRlIiwic3ViIjoiMjNlNjYxZGUtNzIzOS00MWQwLTgzZTktZTEyMjRlOWRlMWI0In0sImVtYWlsIjoiYXJ5YWExMjNAZ21haWwuY29tIiwibmFtZSI6ImFyeWEgc2hpbmRlIiwicm9sbE5vIjoiYXAyMzExMDAxMDExM2F4eCIsImFjY2Vzc0NvZGUiOiJRa2JweEgiLCJjbGllbnRJRCI6IjIzZTY2MWRlLTcyMzktNDFkMC04M2U5LWUxMjI0ZTlkZTFiNCIsImNsaWVudFNlY3JldCI6InJoVWhOcXNtQ3p6ZVZFZVMifQ.b3liGY-IYiick7_cwQSpswNpz3Yrze7oQddGfkkatAM"
      }
    });

    const data = await res.json();

    console.log("BACKEND DATA:", data);

    return Response.json(data);
  } catch (err) {
    console.log(err);
    return Response.json({ notifications: [] });
  }
}
