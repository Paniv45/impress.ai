import React, { useState } from "react";
import PropTypes from 'prop-types';
import { Table, Button, Input, Modal } from "antd";

const SimpleTable = ({ dataSource, onDelete, onEdit }) => {
  const [editingId, setEditingId] = useState(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const handleDelete = (id) => {
    Modal.confirm({
      title: 'Are you sure you want to delete this user?',
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      onOk() {
        onDelete(id);
      }
    });
  };

  const handleEdit = (id) => {
    const user = dataSource.find(user => user.id === id);
    setEditingId(id);
    setName(user.name);
    setEmail(user.email);
  };

  const handleSave = () => {
    if (name && email) {
      onEdit(editingId, { name, email });
      setEditingId(null);
    }
  };

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: (text, record) => (
        editingId === record.id ? (
          <Input
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        ) : (
          text
        )
      ),
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      render: (text, record) => (
        editingId === record.id ? (
          <Input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        ) : (
          text
        )
      ),
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        editingId === record.id ? (
          <>
            <Button type="primary" onClick={handleSave} style={{ marginRight: 8 }}>
              Save
            </Button>
            <Button onClick={() => setEditingId(null)}>Cancel</Button>
          </>
        ) : (
          <>
            <Button
              onClick={() => handleEdit(record.id)}
              style={{ backgroundColor: 'green', color: 'white', marginRight: 8 }}
            >
              Edit
            </Button>
            <Button
              onClick={() => handleDelete(record.id)}
              style={{ backgroundColor: 'red', color: 'white' }}
            >
              Delete
            </Button>
          </>
        )
      ),
    },
  ];

  return (
    <Table
      dataSource={dataSource}
      columns={columns}
      pagination={false}
      rowKey="id"
    />
  );
};

SimpleTable.propTypes = {
  dataSource: PropTypes.array.isRequired,
  onDelete: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
};

export default SimpleTable;
