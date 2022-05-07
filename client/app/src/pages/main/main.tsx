import React from 'react';
import { Link } from 'react-router-dom';

const Main: React.FC = () => { 

  return (
    <div>
      Main
      <Link to='/signup'><p>sign up</p></Link>
      <Link to='/login'><p>login</p></Link>
      <Link to='/post'><p>post</p></Link>
    </div>
  )
};

export default Main