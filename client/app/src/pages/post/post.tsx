import React, { useState } from 'react';

const Post: React.FC = () => {
  const [] = useState()

  return (
    <div>
      <textarea
        value={value}
        onChange={e => setValue(e.target.value)}/>
      <button onClick={() => postfile()}>submit</button>
    </div>
  )
};

export default Post;
