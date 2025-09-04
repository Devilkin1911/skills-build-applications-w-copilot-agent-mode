import React, { useEffect, useState } from 'react';
import { Button, Table, Card, Modal } from 'react-bootstrap';

const Activities = () => {
  const [activities, setActivities] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedActivity, setSelectedActivity] = useState(null);
  const apiUrl = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/activities/`;

  useEffect(() => {
    fetch(apiUrl)
      .then(res => res.json())
      .then(data => {
        const results = data.results || data;
        setActivities(results);
        console.log('Fetched activities:', results);
        console.log('API endpoint:', apiUrl);
      });
  }, [apiUrl]);

  const handleShowModal = (activity) => {
    setSelectedActivity(activity);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedActivity(null);
  };

  return (
    <div>
      <h2 className="mb-3">Activities</h2>
      <Table striped bordered hover responsive>
        <thead className="table-dark">
          <tr>
            <th>#</th>
            <th>Type</th>
            <th>Duration (min)</th>
            <th>Date</th>
            <th>Details</th>
          </tr>
        </thead>
        <tbody>
          {activities.map((activity, idx) => (
            <tr key={idx}>
              <td>{idx + 1}</td>
              <td>{activity.type}</td>
              <td>{activity.duration}</td>
              <td>{activity.date}</td>
              <td>
                <Button variant="info" size="sm" onClick={() => handleShowModal(activity)}>
                  View
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Modal show={showModal} onHide={handleCloseModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>Activity Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedActivity && (
            <Card>
              <Card.Body>
                <Card.Title>{selectedActivity.type}</Card.Title>
                <Card.Text>
                  <strong>Duration:</strong> {selectedActivity.duration} min<br />
                  <strong>Date:</strong> {selectedActivity.date}<br />
                </Card.Text>
              </Card.Body>
            </Card>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>Close</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Activities;
