export const formatTimeAgo = (timestamp: number) => {
  const currentTime = Date.now();
  const timeDifference = currentTime - timestamp;

  const seconds = Math.floor(timeDifference / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const weeks = Math.floor(days / 7);
  const months = Math.floor(days / 30);
  const years = Math.floor(months / 12);

  if (years > 0) return `${years}y`;
  else if (weeks > 0) return `${weeks}w`;
  else if (days > 0) return `${days}d`;
  else if (hours > 0) return `${hours}h`;
  else if (minutes > 0) return `${minutes}m`;
  else if (seconds > 0) return `${seconds}s`;
};
