import { createSelector } from '@reduxjs/toolkit';
import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Card, CardBody, Container, Table } from 'reactstrap';
import { AppState } from '../../store/reducer';
import { getOrders } from './store/actions';
import './index.scss';
import { toTwoDigits } from '../../utils/toTwoDigits';

const orderSelector = createSelector(
  (state: AppState) => state.orders,
  act => act
);

function Orders() {
  const { orders, hasMore } = useSelector(orderSelector);
  const [disabled, setDisabled] = useState<boolean>(true);
  const dispatch = useDispatch();

  const fetchOrders = useCallback(() => {
    dispatch(getOrders());
  }, [dispatch]);

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  useEffect(() => {
    if (orders.length) {
      setDisabled(false);
    }
  }, [orders]);

  return (
    <Container className="activities">
      <Card className="activities__card_table">
        <CardBody>
          <Table bordered hover responsive striped>
            <thead>
              <tr>
                <th>ID</th>
                <th>Car type</th>
                <th>Discount</th>
                <th>Price</th>
                <th>Customer</th>
                <th>Created At</th>
                <th>Options</th>
              </tr>
            </thead>
            <tbody>
              {orders.map(order => (
                <tr key={order._id}>
                  <th scope="row">{order._id}</th>
                  <td>{order.car_type.split('-').join(' ')}</td>
                  <td>{order.discount}</td>
                  <td>{toTwoDigits(order.price)}</td>
                  <td>{toTwoDigits(order.total_price)}</td>
                  <td>{order.customer}</td>
                  <td>{new Date(order.createdAt).toLocaleString()}</td>
                  <td>{JSON.stringify(order.options, undefined, 2)}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </CardBody>
      </Card>
      {hasMore && (
        <Button disabled={disabled} block color="success" onClick={fetchOrders}>
          Load More
        </Button>
      )}
    </Container>
  );
}

export default Orders;
