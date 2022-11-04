const date2string = (datestring: string) => {
  const date = new Date(datestring);

  return `${date.getFullYear()}년 ${date.getMonth() + 1}월 ${date.getDate()}일`;
};

export default date2string;
