import { useState } from "react";
import EditForm from "./EditForm";
export function SmartNotes() {
  const [input, setInput] = useState("");
  const [tasks, setTasks] = useState([]);

  function handleInput(event) {
    setInput(event.target.value);
  }

  function handleAddToList() {
    const newListItem = {
      id: crypto.randomUUID(),
      text: input,
      completed: false,
      isEditing: false,
    };

    setTasks((prev) => [...prev, newListItem]);
    setInput("");
  }

  function handleDelete(id) {
    setTasks((prev) => prev.filter((task) => task.id !== id));
  }

  function updateTask(id, updates) {
    setTasks((prev) =>
      prev.map((task) => (task.id === id ? { ...task, ...updates } : task)),
    );
  }

  function handleComplete(id) {
    const task = tasks.find((t) => t.id === id);
    updateTask(id, { completed: !task.completed });
  }

  function handleEdit(id) {
    updateTask(id, { isEditing: true });
  }

  function handleSave(id) {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task,
      ),
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
            {task.isEditing ? (
              <EditForm task={task} onSave={handleSave} />
            ) : (
              <>
                <span>{task.text}</span>
                <button onClick={() => handleEdit(task.id)}>Edit</button>
              </>
            )}
            <button onClick={() => handleComplete(task.id)}>
              {task.completed ? "Mark Incomplete" : "Mark Complete"}
            </button>
            <button onClick={() => handleDelete(task.id)}>Delete</button>
          </li>
        ))}
      </div>
    </div>
  );
}
