import React, { useEffect, useState } from "react";
import InputHandler from "./commonInput";
import SimpleTable from "./simpleTable";
import "../assets/css/style.css";

function MainComponent(props) {
  const { getUsers, userState, addUser, deleteUser, editUser } = props;
  const [nextId, setNextId] = useState(1);

  useEffect(() => {
    getUsers();
  }, [getUsers]);

  useEffect(() => {
    if (userState.users.length > 0) {
      const maxId = Math.max(...userState.users.map((user) => user.id));
      setNextId(maxId + 1);
    }
  }, [userState.users]);

  const handleSubmit = ({ name, email }) => {
    const newUser = {
      id: nextId,
      name,
      email,
    };
    addUser(newUser);
    setNextId(nextId + 1);
  };

  const handleDelete = (id) => {
    deleteUser(id);

    // Reset the next ID if a lower ID is deleted
    const remainingUsers = userState.users.filter(user => user.id !== id);
    if (remainingUsers.length > 0) {
      const maxId = Math.max(...remainingUsers.map((user) => user.id));
      setNextId(maxId + 1);
    } else {
      setNextId(1);
    }
  };

  const handleEdit = (id, updatedUser) => {
    editUser(id, updatedUser);
  };

  return (
    <div id="main-container-wrapper">
      <InputHandler onSubmit={handleSubmit} />
      <SimpleTable
        dataSource={userState.users}
        onDelete={handleDelete}
        onEdit={handleEdit}
      />
    </div>
  );
}

export default MainComponent;
