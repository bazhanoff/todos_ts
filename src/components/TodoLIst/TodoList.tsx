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
  const [sort, setSort] = useState("asc");

  useEffect(() => {
    const lsTasks = localStorage.getItem("lsTasks");
    if (lsTasks) {
      const tasks = JSON.parse(lsTasks);
      tasks.sort((prevItem: ITask, nextItem: ITask) =>
        prevItem.label > nextItem.label ? 1 : -1
      );
      setTasks(tasks);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("lsTasks", JSON.stringify(tasks));
  }, [tasks]);

  const changeSortHandler = () => {
    const sortTasks = [...tasks];
    if (sort === "asc") {
      sortTasks.sort((prevItem: ITask, nextItem: ITask) => {
        return prevItem.label > nextItem.label ? -1 : 1;
      });
      setTasks([...sortTasks]);
      return setSort("desc");
    }
    if (sort === "desc") {
      sortTasks.sort((prevItem: ITask, nextItem: ITask) => {
        return prevItem.label > nextItem.label ? 1 : -1;
      });
      setTasks([...sortTasks]);
      setSort("asc");
    }
  };

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

  const onChangeTaskHandler = (index: number) => (event: {
    target: { value: React.SetStateAction<string> };
  }) => {
    tasks[index].label = event.target.value as string;
    setTasks([...tasks]);
  };

  const onClickDeleteHandler = (index: number) => () => {
    const newTasks = tasks.filter((item, i) => i !== index);
    setTasks([...newTasks]);
  };

  return (
    <div className="todo-list">
      <header className="todo-list__header">
        <button className="toggle" onClick={changeSortHandler}></button>
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
            onChangeTaskHandler={onChangeTaskHandler(index)}
          />
        ))}
      </div>
      <footer className="todo-list__footer">
        <div>
          <span>Total tasks: {tasks.length}</span>
        </div>
      </footer>
    </div>
  );
};
