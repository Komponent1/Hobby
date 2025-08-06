import React from 'react';
import TodoPage from '../../srcs/todo/todo.page';
import {getTodoProps} from '../../srcs/todo/todo.props';

type ServerSideProps = {

};
const Todo: React.FC<ServerSideProps> = ({}) => <TodoPage />;

export default Todo;

export async function getServerSideProps() {
  const data = await getTodoProps();

  return data;
}
