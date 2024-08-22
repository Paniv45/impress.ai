import React, { useState } from "react";
import { Input, Button } from "antd";

const InputHandler = ({ onSubmit, editMode = false }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !email) return;
    onSubmit({ name, email });
    setName("");
    setEmail("");
  };

  return (
    <div className="header-box">
      <Input
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        style={{ marginBottom: 10 }}
      />
      <Input
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        style={{ marginBottom: 10 }}
      />
      <Button type="primary" onClick={handleSubmit}>
        {!!editMode ? "Edit user" : "Add user"}
      </Button>
    </div>
  );
};

export default InputHandler;
