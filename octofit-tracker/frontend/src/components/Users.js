import React, { useEffect, useState } from 'react';
import { Table, Card } from 'react-bootstrap';

const Users = () => {
  const [users, setUsers] = useState([]);
  const apiUrl = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/users/`;

  useEffect(() => {
    fetch(apiUrl)
      .then(res => res.json())
      .then(data => {
        const results = data.results || data;
        setUsers(results);
        console.log('Fetched users:', results);
        console.log('API endpoint:', apiUrl);
      });
  }, [apiUrl]);

  return (
    <div>
      <h2 className="mb-3">Users</h2>
      <Table striped bordered hover responsive>
        <thead className="table-dark">
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Email</th>
            <th>Team</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, idx) => (
            <tr key={idx}>
              <td>{idx + 1}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.team}</td>
            </tr>
          ))}
        </tbody>
      </Table>
      {users.length > 0 && (
        <Card className="mt-4">
          <Card.Body>
            <Card.Title>Featured User</Card.Title>
            <Card.Text>
              {users[0].name} - {users[0].email} ({users[0].team})
            </Card.Text>
          </Card.Body>
        </Card>
      )}
    </div>
  );
};

export default Users;
