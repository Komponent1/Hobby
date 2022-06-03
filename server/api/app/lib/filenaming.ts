const filenaming = (originalname: string) => {
  return `${originalname}-${new Date().toString()}`
};
const splitpath = (path: string) => {
  const [ dir, filename ] = path.split('/');
  return [ dir, filename ];
}

export { filenaming, splitpath };
