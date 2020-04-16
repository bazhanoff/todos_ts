import React from 'react';
import { TodoList } from 'components/TodoLIst/TodoList';
import { Header } from 'components/Header/Header';

function App() {
  return (
    <div className="App">
      <Header />
      <TodoList />
    </div>
  );
}

export default App;
