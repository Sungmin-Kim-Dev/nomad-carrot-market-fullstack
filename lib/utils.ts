export const formatToTimeAgo = (date: string) => {
  const dayInMs = 1000 * 60 * 60 * 24;
  const time = new Date(date).getTime();
  const now = new Date().getTime();
  const difference = Math.round((time - now) / dayInMs);

  const formatter = new Intl.RelativeTimeFormat("en");

  return formatter.format(difference, "days");
};

export const formatToWon = (price: number) => {
  return price.toLocaleString("ko-KR");
};
