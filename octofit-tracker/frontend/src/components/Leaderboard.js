import React, { useEffect, useState } from 'react';
import { Table, Card } from 'react-bootstrap';

const Leaderboard = () => {
  const [leaderboard, setLeaderboard] = useState([]);
  const apiUrl = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/leaderboard/`;

  useEffect(() => {
    fetch(apiUrl)
      .then(res => res.json())
      .then(data => {
        const results = data.results || data;
        setLeaderboard(results);
        console.log('Fetched leaderboard:', results);
        console.log('API endpoint:', apiUrl);
      });
  }, [apiUrl]);

  return (
    <div>
      <h2 className="mb-3">Leaderboard</h2>
      <Table striped bordered hover responsive>
        <thead className="table-dark">
          <tr>
            <th>#</th>
            <th>Team</th>
            <th>Points</th>
          </tr>
        </thead>
        <tbody>
          {leaderboard.map((entry, idx) => (
            <tr key={idx}>
              <td>{idx + 1}</td>
              <td>{entry.team?.name || entry.team}</td>
              <td>{entry.points}</td>
            </tr>
          ))}
        </tbody>
      </Table>
      {leaderboard.length > 0 && (
        <Card className="mt-4">
          <Card.Body>
            <Card.Title>Top Team</Card.Title>
            <Card.Text>
              {leaderboard[0].team?.name || leaderboard[0].team} - {leaderboard[0].points} pts
            </Card.Text>
          </Card.Body>
        </Card>
      )}
    </div>
  );
};

export default Leaderboard;
