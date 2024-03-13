import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { Provider } from 'react-redux';
import store from './store/store.js';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { AddBlog, AllBlogs, Blog, EditBlog, Home, Login, Signup } from './pages/index.js';
import { AuthLayout } from './components/index.js';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />
      },
      {
        path: "/login",
        element: (
          <AuthLayout authentication={false}>
            <Login />
          </AuthLayout>
        )
      },
      {
        path: "/signup",
        element: (
          <AuthLayout authentication={false}>
            <Signup />
          </AuthLayout>
        )
      },
      {
        path: "/all-blogs",
        element: (
          <AuthLayout authentication>
            {" "}
            <AllBlogs />
          </AuthLayout>
        )
      },
      {
        path: "/add-blog",
        element: (
          <AuthLayout authentication>
            {" "}
            <AddBlog />
          </AuthLayout>
        )
      },
      {
        path: "/edit-blog/:slug",
        element: (
          <AuthLayout authentication>
            {" "}
            <EditBlog />
          </AuthLayout>
        )
      },
      {
        path: "/blog/:slug",
        element: <Blog />
      }
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
)