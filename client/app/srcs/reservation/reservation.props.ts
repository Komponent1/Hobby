export async function getReservationProps() {
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
