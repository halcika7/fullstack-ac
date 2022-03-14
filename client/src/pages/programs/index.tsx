import { createSelector } from '@reduxjs/toolkit';
import { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Card, CardBody, Container, Table } from 'reactstrap';
import { AppState } from '../../store/reducer';
import { getPrograms, deletePrograms } from './store/actions';
import './index.scss';
import { ReactComponent as DeleteIcon } from '../../svg/delete.svg';

const programSelector = createSelector(
  (state: AppState) => state.programs,
  act => act
);

function Orders() {
  const { programs } = useSelector(programSelector);
  const dispatch = useDispatch();

  const deleteProgramAction = (id: string) => () => {
    dispatch(deletePrograms([id]));
  };

  const fetchOrders = useCallback(() => {
    dispatch(getPrograms());
  }, [dispatch]);

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  return (
    <Container className="programs">
      <Card className="programs__card_table">
        <CardBody>
          <Table bordered hover responsive striped>
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Created At</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {programs.map(program => (
                <tr key={program._id}>
                  <th scope="row">{program._id}</th>
                  <td>{program.name}</td>
                  <td>{new Date(program.createdAt).toLocaleString()}</td>
                  <td className="icons">
                    <Button
                      className="delete-icon"
                      active
                      color="danger"
                      size="sm"
                      onClick={deleteProgramAction(program._id)}
                    >
                      <DeleteIcon />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </CardBody>
      </Card>
    </Container>
  );
}

export default Orders;
