import { useState } from "react";
export function SmartNotes() {
  const [input, setInput] = useState("");
  const [tasks, setTasks] = useState([]);
  const uuid = crypto.randomUUID();

  function handleInput(event) {
    setInput(event.target.value);
  }

  function handleAddToList() {
    const newListItem = {
      id: uuid,
      text: input,
      completed: false,
    };

    setTasks([...tasks, newListItem]);
    setInput("");
  }

  function handleDelete(deletedTask) {
    const updatedItems = tasks.filter((task) => task.id !== deletedTask);
    setTasks(updatedItems);
  }

  function handleComplete(id) {
    setTasks(
      tasks.map((task) => {
        if (task.id === id) {
          return { ...task, completed: !task.completed };
        }
        return task;
      }),
    );
  }

  return (
    <div>
      <h1>Task Tracker</h1>
      <input type="text" value={input} onChange={handleInput} id="value" />
      <button onClick={handleAddToList}>Add To List</button>
      <div>
        {tasks.map((task) => (
          <li
            key={task.id}
            style={{ textDecoration: task.completed ? "line-through" : "none" }}
          >
            {task.text}
            <button onClick={() => handleDelete(task.id)}>Delete</button>
            <button onClick={() => handleComplete(task.id)}>
              {task.completed ? "Mark Incomplete" : "Mark Complete"}
            </button>
          </li>
        ))}
      </div>
    </div>
  );
}
