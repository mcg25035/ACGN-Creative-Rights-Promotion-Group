import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import {
    createBrowserRouter,
    RouterProvider
} from "react-router-dom";
import './index.css'

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
    }, {
        path: "/about_us",
        element: <App />,
    }, {
        path: "/donate",
        element: <App />,
    }, {
        path: "/working_project",
        element: <App />,
    }, {
        path: "/join_us",
        element: <App />,
    },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>,
)
