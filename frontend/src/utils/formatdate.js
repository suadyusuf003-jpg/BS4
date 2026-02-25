export const formatDate = (dateString) => {
  const date = new Date(dateString);

  return date.toLocaleDateString("en-KE", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};