import React from "react";
import { withFormik, Form, Field } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';

const LoginForm = ({errors, touched}) => {
  // make a post request to retrieve a token from the api
  // when you have handled the token, navigate to the BubblePage route
  return (
    <Form className='login-form'>
      <h1>Welcome to the Bubble App!</h1>
      <p>Log In</p>
      <div>
        {touched.userName && errors.userName && <p>{errors.userName}</p>}
        <Field className='field' type='text' name='userName' placeholder='User Name'/>
      </div>
      <div>
        {touched.userPassword && errors.userPassword && <p>{errors.userPassword}</p>}
        <Field className='field' type='password' name='userPassword' placeholder='Password'/>
      </div>
      <button type='submit'>Submit</button>
    </Form>
  );
};

const Login = withFormik({
  mapPropsToValues({ userName, userPassword }) {
    return {
      userName: userName || '',
      userPassword: userPassword || ''
    };
  },

  validationSchema: Yup.object().shape({
    userName: Yup.string()
      .required('User Name is Required'),
    userPassword: Yup.string()
      .required('Password is Required')
  }),

  handleSubmit(values, {props}) {
    axios.post('http://localhost:5000/api/login', {
        username: values.userName,
        password: values.userPassword
    })
    .then(res => {
      localStorage.setItem('token', res.data.payload);
      props.history.push('/bubblePage')
    })
  }
})(LoginForm)

export default Login;
