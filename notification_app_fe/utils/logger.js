export async function POST(req) {
  try {
    const body = await req.json();

    const res = await fetch(
      "http://20.207.122.201/evaluation-service/logs",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiYXVkIjoiaHR0cDovLzIwLjI0NC41Ni4xNDQvZXZhbHVhdGlvbi1zZXJ2aWNlIiwiZW1haWwiOiJhcnlhYTEyM0BnbWFpbC5jb20iLCJleHAiOjE3Nzc3MDg1MzIsImlhdCI6MTc3NzcwNzYzMiwiaXNzIjoiQWZmb3JkIE1lZGljYWwgVGVjaG5vbG9naWVzIFByaXZhdGUgTGltaXRlZCIsImp0aSI6IjQwZTZmYzdkLTJmOTYtNDNhOC1iYWZjLWExYThjMTkwNTBlNyIsImxvY2FsZSI6ImVuLUlOIiwibmFtZSI6ImFyeWEgc2hpbmRlIiwic3ViIjoiMjNlNjYxZGUtNzIzOS00MWQwLTgzZTktZTEyMjRlOWRlMWI0In0sImVtYWlsIjoiYXJ5YWExMjNAZ21haWwuY29tIiwibmFtZSI6ImFyeWEgc2hpbmRlIiwicm9sbE5vIjoiYXAyMzExMDAxMDExM2F4eCIsImFjY2Vzc0NvZGUiOiJRa2JweEgiLCJjbGllbnRJRCI6IjIzZTY2MWRlLTcyMzktNDFkMC04M2U5LWUxMjI0ZTlkZTFiNCIsImNsaWVudFNlY3JldCI6InJoVWhOcXNtQ3p6ZVZFZVMifQ.dCTOmVHuKg4uf9BPdVchaGn0ZZpmZVRHMZEq_DWGUyI"
        body: JSON.stringify({
          stack: "frontend",
          level: body.level,
          package: body.pkg,
          message: body.message
        })
      }
    );

    const data = await res.json();
    return Response.json(data);
  } catch (err) {
    return Response.json({ error: "log failed" });
  }
}
