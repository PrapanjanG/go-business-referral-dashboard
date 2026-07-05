export function formatDate(dateString) {
  if (!dateString) {
    return "";
  }

  const parts = dateString.split("-");
  if (parts.length !== 3) {
    return dateString;
  }

  return parts[0] + "/" + parts[1] + "/" + parts[2];
}

export function formatProfit(amount) {
  const number = Number(amount);

  if (isNaN(number)) {
    return "$0";
  }

  return "$" + Math.round(number).toLocaleString("en-US");
}
