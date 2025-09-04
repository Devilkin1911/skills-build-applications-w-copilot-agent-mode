import React, { useEffect, useState } from 'react';
import { Table, Card } from 'react-bootstrap';

const Teams = () => {
  const [teams, setTeams] = useState([]);
  const apiUrl = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/teams/`;

  useEffect(() => {
    fetch(apiUrl)
      .then(res => res.json())
      .then(data => {
        const results = data.results || data;
        setTeams(results);
        console.log('Fetched teams:', results);
        console.log('API endpoint:', apiUrl);
      });
  }, [apiUrl]);

  return (
    <div>
      <h2 className="mb-3">Teams</h2>
      <Table striped bordered hover responsive>
        <thead className="table-dark">
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          {teams.map((team, idx) => (
            <tr key={idx}>
              <td>{idx + 1}</td>
              <td>{team.name}</td>
              <td>{team.description}</td>
            </tr>
          ))}
        </tbody>
      </Table>
      {teams.length > 0 && (
        <Card className="mt-4">
          <Card.Body>
            <Card.Title>Featured Team</Card.Title>
            <Card.Text>
              {teams[0].name} - {teams[0].description}
            </Card.Text>
          </Card.Body>
        </Card>
      )}
    </div>
  );
};

export default Teams;
