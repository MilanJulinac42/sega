export function formatRelative(input: string | Date): string {
  if (!input) return "";
  const d = typeof input === "string" ? new Date(input) : input;
  if (isNaN(d.getTime())) return String(input);

  const now = new Date();
  const diffSec = Math.round((now.getTime() - d.getTime()) / 1000);

  if (diffSec < 10) return "upravo sad";
  if (diffSec < 60) return `pre ${diffSec}s`;

  const diffMin = Math.round(diffSec / 60);
  if (diffMin < 60) return `pre ${diffMin} min`;

  const diffH = Math.round(diffMin / 60);
  if (diffH < 24) return `pre ${diffH} h`;

  const diffD = Math.round(diffH / 24);
  if (diffD === 1) return "juče";
  if (diffD < 7) return `pre ${diffD} dana`;
  if (diffD < 30) return `pre ${Math.round(diffD / 7)} nedelje`;

  return d.toLocaleDateString("sr-RS", {
    day: "numeric",
    month: "short",
    year: d.getFullYear() === now.getFullYear() ? undefined : "numeric",
  });
}
