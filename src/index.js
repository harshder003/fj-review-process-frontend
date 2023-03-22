import React from 'react';
import ReactDOM from 'react-dom/client';
import ErrorPage from "./ErrorPage";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import NeededReviewForms from './routes/NeededReviewForms';
import Root from './routes/Root';
import reportWebVitals from './reportWebVitals';
import ReviewForm from './routes/ReviewForm';
import ProcessDashboard from './routes/ProcessDashboard';
import EndDate from './routes/EndDate';
import ConfirmDate from './routes/ConfirmDate';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/pr-reviews/:userId",
    element: <NeededReviewForms />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/pr-review/:reviewId",
    element: <ReviewForm />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/post_end_date/:_id/:projectId",
    element: <EndDate />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/confirm_end_date/:_id/:projectId",
    element: <ConfirmDate />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/process-stats/",
    element: <ProcessDashboard />,
    errorElement: <ErrorPage />,
  }
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
