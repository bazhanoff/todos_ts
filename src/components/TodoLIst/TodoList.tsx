import React, { useState, useEffect } from "react";
import "./styles.css";
import { TodoItem } from "components/TodoItem/TodoItem";

export interface ITask {
  label: string;
  completed: boolean;
}

export const TodoList = () => {
  const [tasks, setTasks] = useState<ITask[]>([]);
  const [task, setTask] = useState("");

  useEffect(() => {
    const lsTasks = localStorage.getItem("lsTasks");
    if (lsTasks) {
      setTasks(JSON.parse(lsTasks));
    }
  }, []);


  useEffect(() => {
    localStorage.setItem("lsTasks", JSON.stringify(tasks));
  }, [tasks]);

  const changeTaskHandler = (event: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setTask(event.target.value);
  };

  const onKeyPressHandler = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter" && task) {
      setTasks([...tasks, { label: task, completed: false }]);
      setTask("");
    }
  };

  const onClickCompleteHandler = (index: number) => () => {
    tasks[index].completed = !tasks[index].completed;
    setTasks([...tasks]);
  };


  const onClickDeleteHandler = (index: number) => () => {
    const newTasks = tasks.filter((item, i) => i !== index)
    setTasks([...newTasks]);
  };

  return (
    <div className="todo-list">
      <header>
        <input
          value={task}
          onChange={changeTaskHandler}
          onKeyPressCapture={onKeyPressHandler}
          className="todo-list__field"
          placeholder="type a task..."
          type="text"
        />
      </header>
      <div className="todo-list__container">
        {tasks.map((item: ITask, index: number) => (
          <TodoItem
            key={index}
            item={item}
            onClickCompleteHandler={onClickCompleteHandler(index)}
            onClickDeleteHandler={onClickDeleteHandler(index)}
          />
        ))}
      </div>
      <footer className="todo-list__footer">
        <div>
          <span>Total Tasks: {tasks.length}</span>
        </div>
      </footer>
    </div>
  );
};
