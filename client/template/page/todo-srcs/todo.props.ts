export async function getTodoProps() {
  try {
    return ({
      props: {},
    });
  } catch (err) {
    return ({
      redirect: {
        destination: '/error',
        permanent: false,
      },
    });
  }
}
