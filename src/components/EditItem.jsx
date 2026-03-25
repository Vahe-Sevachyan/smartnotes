import React, { useState } from "react";

const initialList = [
  { id: 1, name: "Item 1", isEditing: false },
  { id: 2, name: "Item 2", isEditing: false },
];

function TodoList() {
  const [list, setList] = useState(initialList);

  // Function to handle toggling the edit state for an item
  const handleEdit = (id) => {
    const newList = list.map((item) => {
      if (item.id === id) {
        return { ...item, isEditing: true };
      }
      return item;
    });
    setList(newList);
  };

  // Function to handle saving the edited item's new name
  const handleSave = (id, newName) => {
    const newList = list.map((item) => {
      if (item.id === id) {
        return { ...item, name: newName, isEditing: false };
      }
      return item;
    });
    setList(newList);
  };

  return (
    <ul>
      {list.map((item) => (
        <li key={item.id}>
          {item.isEditing ? (
            // Edit View
            <EditForm item={item} onSave={handleSave} />
          ) : (
            // Default View
            <>
              <span>{item.name}</span>
              <button onClick={() => handleEdit(item.id)}>Edit</button>
            </>
          )}
        </li>
      ))}
    </ul>
  );
}

function EditForm({ item, onSave }) {
  const [editName, setEditName] = useState(item.name);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(item.id, editName);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={editName}
        onChange={(e) => setEditName(e.target.value)}
      />
      <button type="submit">Save</button>
    </form>
  );
}

export default TodoList;
