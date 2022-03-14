import { createSelector } from '@reduxjs/toolkit';
import { Card, CardBody, Col, Row } from 'reactstrap';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppState } from '../../store/reducer';
import { getFacilityStats, ordersByMonth } from './store/actions';
import { ReactComponent as MoneyIcon } from '../../svg/money.svg';
import { ReactComponent as NumberIcon } from '../../svg/number.svg';
import './index.scss';
import { toTwoDigits } from '../../utils/toTwoDigits';

const userState = createSelector(
  (state: AppState) => state.auth,
  (state: AppState) => state.dashboard,
  (auth, dashboard) => ({ user: auth.user!, ...dashboard })
);

function Dashboard() {
  const dispatch = useDispatch();
  const { user, orders, stat } = useSelector(userState);

  const isCustomer = user.role === 'customer';

  useEffect(() => {
    dispatch(ordersByMonth());
  }, [dispatch]);

  useEffect(() => {
    if (user.role === 'admin') {
      dispatch(getFacilityStats());
    }
  }, [dispatch, user.role]);

  return (
    <div className="customer-dashboard">
      <Row className="icons">
        <Col md={{ size: 6 }}>
          <Card>
            <CardBody>
              <MoneyIcon />
              <p>Money {isCustomer ? 'spent' : 'earned'}</p>
              <p>
                {toTwoDigits(isCustomer ? user.money_spent : stat.money_earned)}
              </p>
            </CardBody>
          </Card>
        </Col>
        <Col md={{ size: 6 }}>
          <Card>
            <CardBody>
              <NumberIcon />
              <p>Orders</p>
              <p>
                {isCustomer ? user.number_of_orders : stat.number_of_customers}
              </p>
            </CardBody>
          </Card>
        </Col>
      </Row>
      {!isCustomer && (
        <Row className="icons">
          <Col md={{ size: 6 }}>
            <Card>
              <CardBody>
                <MoneyIcon />
                <p>Money discount</p>
                <p>{toTwoDigits(stat.money_discount)}</p>
              </CardBody>
            </Card>
          </Col>
          <Col md={{ size: 6 }}>
            <Card>
              <CardBody>
                <NumberIcon />
                <p>Discounts</p>
                <p>{stat.number_of_given_discounts}</p>
              </CardBody>
            </Card>
          </Col>
        </Row>
      )}
      <Col>
        <Card>
          <CardBody>
            <ResponsiveContainer>
              <AreaChart
                width={500}
                height={400}
                data={orders}
                margin={{
                  top: 10,
                  right: 30,
                  left: 0,
                  bottom: 0,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Area
                  type="monotone"
                  dataKey="Number of Orders"
                  stroke="#8884d8"
                  fill="#8884d8"
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardBody>
        </Card>
      </Col>
    </div>
  );
}

export default Dashboard;
