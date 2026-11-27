export const formatDateTime = (date: Date): string => {
  return date.toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

export const formatDate = (date: Date): string =>
  date.toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

export const formatTime = (date: Date): string =>
  date.toLocaleTimeString(undefined, {
    hour: "2-digit",
    minute: "2-digit",
  });