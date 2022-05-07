import React,  { useState } from 'react';

const Post: React.FC = () => {
  const [value, setValue] = useState<string>('');
  const changefile = () => {
    const file = new Blob([value], { type: 'text/plain' });
    return file;
  }
  const postfile = () => {
    const file = changefile();
    const formData = new FormData();
    formData.append('file', file, 'test.md');
    fetch('/api/article?user=test&category=test', {
      method: 'post',
      body: formData,
    });
  }

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
