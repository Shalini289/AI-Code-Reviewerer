export const formatDate = (date) => {
  return new Date(date).toLocaleDateString();
};

export const truncateText = (text, max) => {
  if (text.length <= max) return text;

  return text.substring(0, max) + "...";
};

export const copyToClipboard = (text) => {
  navigator.clipboard.writeText(text);
};

export const calculatePercentage = (value, total) => {
  return ((value / total) * 100).toFixed(2);
};