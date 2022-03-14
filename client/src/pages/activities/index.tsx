import { createSelector } from '@reduxjs/toolkit';
import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Card, CardBody, Container, Table } from 'reactstrap';
import { AppState } from '../../store/reducer';
import { getActivities } from './store/actions';
import './index.scss';

const activitySelector = createSelector(
  (state: AppState) => state.activities,
  act => act
);

function Activities() {
  const { activities, hasMore } = useSelector(activitySelector);
  const [disabled, setDisabled] = useState<boolean>(true);
  const dispatch = useDispatch();

  const fetchActivities = useCallback(() => {
    dispatch(getActivities());
  }, [dispatch]);

  useEffect(() => {
    fetchActivities();
  }, [fetchActivities]);

  useEffect(() => {
    if (activities.length) {
      setDisabled(false);
    }
  }, [activities]);

  return (
    <Container className="activities">
      <Card className="activities__card_table">
        <CardBody>
          <Table bordered hover responsive striped>
            <thead data-testid="theader">
              <tr>
                <th>ID</th>
                <th>Activity type</th>
                <th>Customer</th>
                <th>Created At</th>
                <th>Details</th>
              </tr>
            </thead>
            <tbody>
              {activities.map(activity => (
                <tr key={activity._id}>
                  <th scope="row">{activity._id}</th>
                  <td>{activity.activity_type.split('-').join(' ')}</td>
                  <td>{activity.customer}</td>
                  <td>{new Date(activity.createdAt).toLocaleString()}</td>
                  <td>{JSON.stringify(activity.details, undefined, 2)}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </CardBody>
      </Card>
      {hasMore && (
        <Button
          disabled={disabled}
          block
          color="success"
          onClick={fetchActivities}
          data-testid="load-more"
        >
          Load More
        </Button>
      )}
    </Container>
  );
}

export default Activities;
