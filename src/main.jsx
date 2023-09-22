import React from 'react'
import ReactDOM from 'react-dom/client'
import { ChakraProvider } from '@chakra-ui/react'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import "./index.css";
/* existing imports */
import Root, {
  loader as rootLoader,
  action as rootAction
} from "./routes/root";
import Home, { loader as contactLoader} from './routes/Home'
import RequestForm, {
  action as editAction,
} from './routes/request_form'
import ErrorPage from './error-page';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement:<ErrorPage/>,
    loader: rootLoader,
    action: rootAction,
    children: [
      {
        path: "BGAS/:contactId",
        element: <Home />,
        loader: contactLoader,
      },
/*       {
        path: "BGAS/:contactId/request_form",
        element: <RequestForm />,
        loader: contactLoader,
        action: editAction,
      }, */
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ChakraProvider>
    <RouterProvider router={router} />
    </ChakraProvider>
  </React.StrictMode>
);

