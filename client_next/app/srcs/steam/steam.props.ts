export async function getSteamProps() {
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
