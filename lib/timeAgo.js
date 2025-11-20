export function timeAgo(date) {
  const now = new Date();
  const past = new Date(date);
  const diff = (now - past) / 1000; // seconds

  if (diff < 60) return `${Math.floor(diff)}s`;
  if (diff < 3600) return `${Math.floor(diff / 60)}m`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h`;
  if (diff < 604800) return `${Math.floor(diff / 86400)}d`;
  if (diff < 2629746) return `${Math.floor(diff / 604800)}w`;
  if (diff < 31556952) return `${Math.floor(diff / 2629746)}mo`;
  
  return `${Math.floor(diff / 31556952)}y`;
}
