import React from 'react';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import {
  useAddUserDataMutation,
  useDeleteUserDataMutation,
  useGetUsersDataQuery,
} from '../../redux/usersDataApi';

const FormContainer = () => {
  const [stateBtn, setStateBtn] = useState(true);

  const { data } = useGetUsersDataQuery();
  const [addUserData] = useAddUserDataMutation();
  const [deleteUserData] = useDeleteUserDataMutation();

  const inputFirstNameRef = React.createRef();
  const inputSecondNameRef = React.createRef();
  const inputAgeRef = React.createRef();

  const handlerInput = () => {
    inputFirstNameRef.current.value &&
    inputSecondNameRef.current.value &&
    inputAgeRef.current.value
      ? setStateBtn(false)
      : setStateBtn(true);
  };

  const handlerAddUser = async () => {
    const userData = {
      firstName: inputFirstNameRef.current.value,
      secondName: inputSecondNameRef.current.value,
      age: inputAgeRef.current.value,
    };

    inputFirstNameRef.current.value =
      inputSecondNameRef.current.value =
      inputAgeRef.current.value =
        '';

    setStateBtn(true);

    await addUserData(userData);
  };

  const handlerDeleteUser = async () => {
    await deleteUserData('lastUser');
  };

  const handlerDeleteAllUsers = async () => {
    await deleteUserData('allUsers');
  };

  return (
    <Form onInput={handlerInput}>
      <Row className="align-items-center">
        <Col sm={4} className="my-1">
          <Form.Control
            id="inlineFormInputName"
            placeholder="First name"
            ref={inputFirstNameRef}
          />
        </Col>
        <Col sm={4} className="my-1">
          <Form.Control
            id="inlineFormInputName"
            placeholder="Second name"
            ref={inputSecondNameRef}
          />
        </Col>
        <Col sm={2} className="my-1">
          <Form.Control
            id="inlineFormInputName"
            placeholder="Age"
            ref={inputAgeRef}
          />
        </Col>
        <Col xs="auto" className="my-1">
          <Button
            type="button"
            className="btn-success"
            onClick={handlerAddUser}
            disabled={stateBtn}
          >
            Save User
          </Button>
        </Col>
        <Row className="my-2">
          <Col xs="auto" className="my-1">
            <Button
              type="button"
              className="btn-warning"
              onClick={handlerDeleteUser}
              disabled={!data || data.length === 0}
            >
              Delete Last User
            </Button>
          </Col>
          <Col xs="auto" className="my-1">
            <Button
              type="button"
              className="btn-danger"
              disabled={!data || data.length === 0}
              onClick={handlerDeleteAllUsers}
            >
              Delete All Users
            </Button>
          </Col>
        </Row>
      </Row>
    </Form>
  );
};

export default FormContainer;
