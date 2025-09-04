import React, { useEffect, useState } from 'react';
import { Table, Card } from 'react-bootstrap';

const Workouts = () => {
  const [workouts, setWorkouts] = useState([]);
  const apiUrl = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/workouts/`;

  useEffect(() => {
    fetch(apiUrl)
      .then(res => res.json())
      .then(data => {
        const results = data.results || data;
        setWorkouts(results);
        console.log('Fetched workouts:', results);
        console.log('API endpoint:', apiUrl);
      });
  }, [apiUrl]);

  return (
    <div>
      <h2 className="mb-3">Workouts</h2>
      <Table striped bordered hover responsive>
        <thead className="table-dark">
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Description</th>
            <th>Difficulty</th>
          </tr>
        </thead>
        <tbody>
          {workouts.map((workout, idx) => (
            <tr key={idx}>
              <td>{idx + 1}</td>
              <td>{workout.name}</td>
              <td>{workout.description}</td>
              <td>{workout.difficulty}</td>
            </tr>
          ))}
        </tbody>
      </Table>
      {workouts.length > 0 && (
        <Card className="mt-4">
          <Card.Body>
            <Card.Title>Featured Workout</Card.Title>
            <Card.Text>
              {workouts[0].name} - {workouts[0].difficulty}
            </Card.Text>
          </Card.Body>
        </Card>
      )}
    </div>
  );
};

export default Workouts;
