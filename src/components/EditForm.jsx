import { useState } from "react";
function EditForm({ task, onSave }) {
  const [editTask, setEditTask] = useState(task.text);

  const handleSubmit = (event) => {
    event.preventDefault();
    onSave(task.id, editTask);
  };

  return (
    <>
      <input
        type="text"
        value={editTask}
        onChange={(e) => setEditTask(e.target.value)}
      />
      <button onClick={handleSubmit}>Save</button>
    </>
  );
}
export default EditForm;
