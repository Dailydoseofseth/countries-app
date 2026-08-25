// Minimal structured logger: one JSON line per event, easy to pipe into
// any log aggregator later (Render's log stream, Datadog, etc.) without
// changing call sites.
function log(level, message, meta = {}) {
  const entry = {
    timestamp: new Date().toISOString(),
    level,
    message,
    ...meta,
  };
  const line = JSON.stringify(entry);
  if (level === "error") {
    console.error(line);
  } else {
    console.log(line);
  }
}

export const logger = {
  info: (message, meta) => log("info", message, meta),
  error: (message, meta) => log("error", message, meta),
};
