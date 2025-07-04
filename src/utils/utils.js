const pad = (num) => num.toString().padStart(2, "0");

export const getFormattedDate = (date) => {
  if (!date) {
    return "";
  }
  const formattedDate =
    [date.getFullYear(), pad(date.getMonth() + 1), pad(date.getDate())].join(
      "-"
    ) +
    " " +
    [pad(date.getHours()), pad(date.getMinutes()), pad(date.getSeconds())].join(
      ":"
    );

  return formattedDate;
};
