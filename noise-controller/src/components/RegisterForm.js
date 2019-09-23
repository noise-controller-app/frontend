import React from "react";
import { Form, Field, withFormik } from "formik";
import { Redirect } from 'react-router-dom';
import * as Yup from "yup";
import styled from "styled-components";
import axios from "axios";

const StyledForm = styled(Form)`
    color: green;
    background-color: OldLace;
    width: 30%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin: 5em auto;
    border: 3rem solid green;
    min-height: 45vh;

    @media only screen and (max-width: 992px) { 
        padding: 1em;
    }

`;

const StyledH1 = styled('h1')`
    font-size: 4rem;
    font-weight: 900;
    margin: 0 0.5rem;
    display: flex;
    justify-content: center;

    @media only screen and (max-width: 992px) {
        font-size: 2rem;
        margin: 0 auto;
        margin-top: 1rem;
    }
`;

const StyledH2 = styled('h2')`
    font-size: 3rem;
    font-weight: 600;
    margin: -0.5rem 0.5rem 0 0.5rem;
    display: flex;
    justify-content: center;

    @media only screen and (max-width: 992px) {
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 1.6rem;
        margin: 0 2.5rem;
        margin-top: 1rem;
    }
`;

const Alert = styled('p')`
  min-height: 25px;
  width: 60%;
  color: red;
  font-weight: 600;
  font-style: italic;
`;

const StyledField = styled(Field)`
  height: 1.3rem;
  width: 60%;
  border: 2px solid green;
  margin: 1rem auto;
`;

const StyledSubmitButton = styled(Field)`
  height: 1.3rem;
  width: 30%;
  border: 2px solid black;
  color: white;
  background-color: green;
  margin: 0.5rem auto;

  @media only screen and (max-width: 992px) {
    width: 60%;
}
`;

function UserForm({ touched, errors }) {
  return (
    //Basic form ready to take in a name, email, and password that we will
    // later send to an API in the form fo a POST request.
      <StyledForm>
        <StyledH1>New User?</StyledH1>
        <StyledH2>Sign up is easy!</StyledH2>

        {errors.name && touched.name && <Alert>{errors.name}</Alert>}
        <StyledField name="name" placeholder="Name" />

        {errors.email && touched.email && <Alert>{errors.email}</Alert>}
        <StyledField name="email" placeholder="Email" />

        {errors.password && touched.password && <Alert>{errors.password}</Alert>}
        <StyledField name="password" placeholder="Password" />

        {errors.classroom && touched.classroom && (
          <Alert>{errors.classroom}</Alert>
        )}
        <StyledField name="classroom" placeholder="Classroom Name" />

        <StyledSubmitButton type="submit" name="Submit" placeholder="Submit" />
      </StyledForm>
  );
}

export default withFormik({
  mapPropsToValues: ({ name, email, password, classroom }) => {
    return {
      name: name || "",
      email: email || "",
      password: password || "",
      classroom: classroom || "",
    };
  },

  // This will send our UserForm data to the database.
  // Then, it will redirect the user to a page for the Teachers unique user ID.
  // At the time of writing this code, no POST endpoint has been declared.
  
  handleSubmit(values) {
      axios
        .post('', values)
        .get('API URL')
          .then((res) => {
            return <Redirect to='/teacher/${id}' />
          })
        .catch((err) => {
            alert('Error: {err.message}')
          })
  },

  // Validation Schema controls what guidelines each input field needs.
  validationSchema: Yup.object().shape({
    name: Yup.string()
      .min(6)
      .required(
        "We would love to get to know you better. Maybe just start with your name? :)"
      ),
    email: Yup.string()
      .email("Invalid email address.")
      .required(
        "How are we supposed to send you our newsletter without your email?"
      ),
    password: Yup.string()
      .min(7)
      .required("Password required."),
    classroom: Yup.string().required(
      "C'mon, you're a teacher... You don't have a classroom?"
    )
  })
})(UserForm);