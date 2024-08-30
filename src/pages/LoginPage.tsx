import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useNavigate, Link } from 'react-router-dom';
import { login } from '../services/api';

const LoginPage: React.FC = () => {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: Yup.object({
      email: Yup.string().email('Invalid email address').required('Email is required'),
      password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
    }),
    onSubmit: async (values) => {
      try {
        const data = await login(values.email, values.password);
        localStorage.setItem('token', data.token);
        navigate('/');
      } catch (error) {
        console.error(error);
      }
    },
  });

  return (
    <form onSubmit={formik.handleSubmit} className="max-w-sm mx-auto p-4 border rounded bg-white">
      <h2 className="text-xl font-bold mb-4">Login</h2>

      <input
        type="email"
        id="email"
        {...formik.getFieldProps('email')}
        placeholder="Email"
        className={`border p-2 mb-4 w-full ${formik.touched.email && formik.errors.email ? 'border-red-500' : ''}`}
      />
      {formik.touched.email && formik.errors.email ? (
        <div className="text-red-500 text-sm mb-4">{formik.errors.email}</div>
      ) : null}

      <input
        type="password"
        id="password"
        {...formik.getFieldProps('password')}
        placeholder="Password"
        className={`border p-2 mb-4 w-full ${formik.touched.password && formik.errors.password ? 'border-red-500' : ''}`}
      />
      {formik.touched.password && formik.errors.password ? (
        <div className="text-red-500 text-sm mb-4">{formik.errors.password}</div>
      ) : null}

      <button type="submit" className="bg-blue-500 text-white p-2 rounded">Login</button>
      <div className="mt-4">
        <p>Don't have an account? <Link to="/register" className="text-blue-500">Register here</Link></p>
      </div>
    </form>
  );
};

export default LoginPage;
