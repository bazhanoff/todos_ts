import React, { useState, useRef } from "react";
import useOnclickOutside from "react-cool-onclickoutside";

import { ITask } from "components/TodoLIst/TodoList";
import "./styles.css";

interface IPropsTodoItem {
  item: ITask;
  onClickCompleteHandler: () => void;
  onClickDeleteHandler: () => void;
  onChangeTaskHandler: (event: {
    target: { value: React.SetStateAction<string> };
  }) => void;
}

export const TodoItem = ({
  item,
  onClickCompleteHandler,
  onClickDeleteHandler,
  onChangeTaskHandler
}: IPropsTodoItem) => {
  const [isEdit, setIsEdit] = useState(false);
  const ref = useRef();

  const isEditClickHandler = () => {
    setIsEdit(true);
  };

  useOnclickOutside(ref as any, () => {
    setIsEdit(false);
  });

  const onKeyPressHandler = (event: React.KeyboardEvent<HTMLInputElement>) => {
    event.key === "Enter" && setIsEdit(false);
  };

  return (
    <div className="todo-item">
      <input
        type="checkbox"
        className="todo-item__checkbox"
        checked={item.completed}
        onChange={onClickCompleteHandler}
      />
      {!isEdit ? (
        <span
          onDoubleClick={isEditClickHandler}
          className={`todo-item__label ${item.completed &&
            "todo-item__label--completed"}`}
        >
          {item.label}
        </span>
      ) : (
        <input
          ref={ref as any}
          className="todo-item__input"
          value={item.label}
          onChange={onChangeTaskHandler}
          onKeyPress={onKeyPressHandler}
        />
      )}
      <button onClick={onClickDeleteHandler} className="todo-item__delete">
        x
      </button>
    </div>
  );
};
