export const formatDuration = (minutes) => {
  if (!minutes) return '';
  const hrs = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return hrs > 0 ? `${hrs}h ${mins}m` : `${mins}m`;
};

export const truncateText = (text, maxLength = 100) => {
  if (!text) return '';
  return text.length > maxLength ? `${text.substring(0, maxLength)}...` : text;
};

export const formatYear = (dateString) => {
  if (!dateString) return '';
  const date = new Date(dateString);
  return Number.isNaN(date.getFullYear())
    ? dateString
    : date.getFullYear().toString();
};

export const formatRating = (rating) => {
  if (rating === undefined || rating === null) return '';
  return typeof rating === 'number' ? rating.toFixed(1) : rating;
};
