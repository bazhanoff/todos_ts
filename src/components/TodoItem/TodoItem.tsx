import React from "react";

import { ITask } from "components/TodoLIst/TodoList";
import "./styles.css";

interface IPropsTodoItem {
  item: ITask;
  onClickCompleteHandler: () => void;
  onClickDeleteHandler: () => void;
}

export const TodoItem = ({ item, onClickCompleteHandler, onClickDeleteHandler }: IPropsTodoItem) => {
  return (
    <div className="todo-item">
      <input
        type="checkbox"
        className="todo-item__checkbox"
        checked={item.completed}
        onChange={onClickCompleteHandler}
      />
      <span className={`todo-item__label ${item.completed && 'todo-item__label--completed'}`}>{item.label}</span>
      <button onClick={onClickDeleteHandler} className="todo-item__delete">x</button>
    </div>
  );
};
