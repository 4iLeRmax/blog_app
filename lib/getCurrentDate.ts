export const getCurrentDate = (time: number) => {
  const date = new Date(time);

  return `${date.getDate() < 10 ? `0${date.getDate()}` : date.getDate()}.${
    date.getMonth() + 1 < 10 ? `0${date.getMonth() + 1}` : date.getMonth() + 1
  }.${date.getFullYear()}`;
};
