export const formatDuration = (minutes: number | null | undefined): string => {
  if (!minutes) return '';
  const hrs = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return hrs > 0 ? `${hrs}h ${mins}m` : `${mins}m`;
};

export const truncateText = (text: string | null | undefined, maxLength: number = 100): string => {
  if (!text) return '';
  return text.length > maxLength ? `${text.substring(0, maxLength)}...` : text;
};

export const formatYear = (dateString: string | null | undefined): string => {
  if (!dateString) return '';
  const date = new Date(dateString);
  return Number.isNaN(date.getFullYear())
    ? dateString
    : date.getFullYear().toString();
};

export const formatRating = (rating: number | string | null | undefined): string => {
  if (rating === undefined || rating === null) return '';
  return typeof rating === 'number' ? rating.toFixed(1) : rating;
};
