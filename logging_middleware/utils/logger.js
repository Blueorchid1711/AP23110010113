export async function Log(level, pkg, message) {
  try {
    await fetch("/api/log", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        level,
        pkg,
        message
      })
    });
  } catch (err) {
    console.error("Logging failed");
  }
}