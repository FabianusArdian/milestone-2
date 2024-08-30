import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { register } from '../services/api';

const RegisterPage: React.FC = () => {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      avatar: '',
    },
    validationSchema: Yup.object({
      name: Yup.string().required('Name is required'),
      email: Yup.string().email('Invalid email address').required('Email is required'),
      password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref('password'), undefined], 'Passwords must match')  
        .required('Confirm Password is required'),
      avatar: Yup.string().url('Invalid URL').required('Avatar URL is required'),
    }),
    onSubmit: async (values) => {
      try {
        await register(values);
        navigate('/login');
      } catch (error) {
        console.error(error);
      }
    },
  });

  return (
    <form onSubmit={formik.handleSubmit} className="max-w-sm mx-auto p-4 border rounded bg-white">
      <h2 className="text-xl font-bold mb-4">Register</h2>

      <input
        type="text"
        id="name"
        {...formik.getFieldProps('name')}
        placeholder="Name"
        className={`border p-2 mb-4 w-full ${formik.touched.name && formik.errors.name ? 'border-red-500' : ''}`}
      />
      {formik.touched.name && formik.errors.name ? (
        <div className="text-red-500 text-sm mb-4">{formik.errors.name}</div>
      ) : null}

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

      <input
        type="password"
        id="confirmPassword"
        {...formik.getFieldProps('confirmPassword')}
        placeholder="Confirm Password"
        className={`border p-2 mb-4 w-full ${formik.touched.confirmPassword && formik.errors.confirmPassword ? 'border-red-500' : ''}`}
      />
      {formik.touched.confirmPassword && formik.errors.confirmPassword ? (
        <div className="text-red-500 text-sm mb-4">{formik.errors.confirmPassword}</div>
      ) : null}

      <input
        type="text"
        id="avatar"
        {...formik.getFieldProps('avatar')}
        placeholder="Avatar URL"
        className={`border p-2 mb-4 w-full ${formik.touched.avatar && formik.errors.avatar ? 'border-red-500' : ''}`}
      />
      {formik.touched.avatar && formik.errors.avatar ? (
        <div className="text-red-500 text-sm mb-4">{formik.errors.avatar}</div>
      ) : null}

      <button type="submit" className="bg-blue-500 text-white p-2 rounded">Register</button>
    </form>
  );
};

export default RegisterPage;
