import { createSelector } from '@reduxjs/toolkit';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Col,
  Container,
  Row,
} from 'reactstrap';
import Select, { SingleValue } from 'react-select';
import { useNavigate } from 'react-router-dom';
import { AppState } from '../../store/reducer';
import { getPrograms } from '../programs/store/actions';
import { CarType } from '../orders/store/types';
import { makeOrder } from '../orders/store/actions';
import { getMe } from '../auth/store/actions';
import { orderActions } from '../orders/store/slice';
import './index.scss';

type OptionType = {
  name: string;
  price: number;
  _id: string;
};

const selector = createSelector(
  (state: AppState) => state.programs.programs,
  (state: AppState) => state.auth.user?.number_of_orders,
  (state: AppState) => state.orders.message,
  (programs, number_of_orders, message) => ({
    programs,
    numberOfOrders: number_of_orders,
    message,
  })
);

function CreateOrder() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [car, setCar] = useState<CarType>('sedan');
  const [options, setOptions] = useState<OptionType[]>([]);
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const { programs, numberOfOrders, message } = useSelector(selector);

  const price = options.reduce((prev, curr) => prev + curr.price, 0);
  const totalOrders = numberOfOrders! + 1;
  const shouldDiscount = totalOrders % 10 === 0;
  const total = shouldDiscount ? price - price * 0.1 : price;

  const changeSelectedCar = (
    val: SingleValue<{ label: string; value: string }>
  ) => {
    setOptions([]);
    setSelectedOptions([]);
    setCar(val!.value as CarType);
  };

  const addOption = (data: OptionType) => () => {
    setOptions(prev => [...prev, data]);
    setSelectedOptions(prev => [...prev, data._id]);
  };

  const removeOption = (id: string) => () => {
    setOptions(prev => prev.filter(v => v._id !== id));
    setSelectedOptions(prev => prev.filter(v => v !== id));
  };

  const onSubmit = () => {
    dispatch(
      makeOrder({
        price,
        total_price: total,
        discount: shouldDiscount ? 10 : 0,
        car_type: car,
        options: options.map(option => ({
          name: option.name,
          price: option.price,
        })),
      })
    );
  };

  useEffect(() => {
    dispatch(getPrograms());
  }, [dispatch]);

  useEffect(() => {
    if (message) {
      dispatch(orderActions.resetMessage());
      dispatch(getMe());
      navigate('/orders');
    }
  }, [message, dispatch, navigate]);

  return (
    <Container className="order-wrapper">
      <Row>
        <Col sm={{ size: 12 }}>
          <Card>
            <CardHeader>Select car type</CardHeader>
            <CardBody>
              <Select
                classNamePrefix="list"
                data-testid="select"
                defaultValue={{ value: 'sedan', label: 'Sedan' }}
                options={[
                  { value: 'sedan', label: 'Sedan' },
                  { value: 'suv', label: 'Suv' },
                  { value: 'pickup', label: 'Pickup' },
                  { value: 'mini_bus', label: 'Mini Bus' },
                ]}
                onChange={changeSelectedCar}
              />
            </CardBody>
          </Card>
        </Col>
      </Row>
      {car && (
        <Row>
          {programs.map((program, index) => (
            <Col
              className="program-wrapper"
              key={program._id}
              sm={{ size: 12 }}
            >
              <Card>
                <CardHeader>{program.name}</CardHeader>
                <CardBody>
                  {program.options.map((option, i) => {
                    const data = {
                      name: option.name,
                      price: option.price + option[car],
                      _id: option._id,
                    };
                    return (
                      <div key={option._id} style={{ marginBottom: '1rem' }}>
                        {option.name} - price {option.price} - additional price{' '}
                        {option[car]}
                        {!selectedOptions.includes(option._id) ? (
                          <Button
                            className="margin-left"
                            color="success"
                            onClick={addOption(data)}
                            data-testid={`add-option-${index}-${i}`}
                          >
                            Add option
                          </Button>
                        ) : (
                          <Button
                            className="margin-left"
                            color="danger"
                            onClick={removeOption(option._id)}
                            data-testid={`remove-option-${index}-${i}`}
                          >
                            Remove option
                          </Button>
                        )}
                      </div>
                    );
                  })}
                </CardBody>
              </Card>
            </Col>
          ))}
        </Row>
      )}
      {car && options.length > 0 && (
        <>
          <div>
            <p>Price: {price}</p>
            {shouldDiscount && (
              <>
                <p>Discount 10%</p>
                <p>Total {total}</p>
              </>
            )}
          </div>
          <Button
            className="submit"
            color="success"
            block
            onClick={onSubmit}
            data-testid="submit"
          >
            Order
          </Button>
        </>
      )}
    </Container>
  );
}

export default CreateOrder;
