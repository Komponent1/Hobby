const date2string = (datestring: string) => {
  const date = new Date(datestring);

  return `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`
}

export default date2string;
