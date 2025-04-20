import React, { useState } from 'react';

const AdminPage: React.FC = () => {
  const [data, setData] = useState();
  const onClick = () => {
    fetch('/seolim/ping', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    }).then((res: any) => setData(res)).catch((err: any) => {
      console.log(err);
    });
  };
  return (
    <div>
      <h1>Admin Page</h1>
      <button type="button" onClick={onClick}>Ping</button>
      {data && <div>{JSON.stringify(data)}</div>}
    </div>
  );
};
export default AdminPage;
