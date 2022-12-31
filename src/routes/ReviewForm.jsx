import React from "react";
import { useParams } from "react-router-dom";
import ReviewElement from "../components/ReviewElement";
import { Link } from "react-router-dom";

const ReviewForm = () => {
  const { reviewId } = useParams();
  const [neededReview, setNeededReview] = React.useState({});
  const [reviewFields, setFields] = React.useState([]);
  const [loadingFields, setLoadingFields] = React.useState(false);
  const [loadingReview, setLoadingReview] = React.useState(false);
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [isSubmitted, setIsSubmitted] = React.useState(false);
  const [isError, setIsError] = React.useState(false);

  React.useEffect(() => {
    async function getReviewFields() {
      setLoadingFields(true);
      const response = await fetch(
        `http://3.16.48.61/needed_reviews/fields/${reviewId}/`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          accept: "application/json",
        }
      );
      const data = await response.json();
      setLoadingFields(false);
      return data;
    }

    getReviewFields().then((data) => {
      setFields(data);
      console.log(data);
    });

    async function getNeededForm() {
      setLoadingReview(true);
      const response = await fetch(
        `http://3.16.48.61/needed_reviews/review/${reviewId}/`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();
      setLoadingReview(false);
      return data;
    }

    getNeededForm().then((data) => {
      setNeededReview(data);
      console.log(data);
    });
  }, [reviewId]);

  const dashboardLink = `/pr-reviews/${neededReview.reviewer_id}`;

  const formFields = reviewFields.map((field, index) => (
    <li key={index}>
      <ReviewElement type={field.Type} text={field.Text} />
    </li>
  ));

  async function handleSubmit(event) {
    event.preventDefault();
    setIsSubmitting(true);
    const data = new FormData(event.target);
    const form_fields = Object.fromEntries(data.entries());
    // remove key and value if empty value from json string before sending to backend
    for (const [key, value] of Object.entries(form_fields)) {
      if (value === "") {
        delete form_fields[key];
      }
    }
    const review = {
      form: form_fields,
      type: neededReview["type"],
      reviewer_name: neededReview["reviewer_name"],
      reviewer_id: neededReview["reviewer_id"],
      reviewer_email: neededReview["reviewer_email"],
      employee_name: neededReview["employee_name"],
      employee_id: neededReview["employee_id"],
      employee_email: neededReview["employee_email"],
      submit_date: new Date().toISOString().slice(0, 10),
      needed_review_id: reviewId,
    };

    if (neededReview["project_name"]) {
      review["project_name"] = neededReview["project_name"];
      review["project_id"] = neededReview["project_id"];
    }
    const json = JSON.stringify(review);

    console.log(json);
    const response = await fetch(`http://3.16.48.61/reviews/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: json,
    });
    const responseData = await response.json();
    console.log(responseData);
    if (response.ok) {
      setIsSubmitted(true);
    } else {
      setIsError(true);
    }
    setIsSubmitting(false);
  }

  if (loadingFields || loadingReview) {
    window.scrollTo(0, 0);
    // gold color cards with no info slightly transparent to show loading
    // they will have a pulsing animation
    return (
      <div className="">
        <div className="flex justify-center mt-14">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gold"></div>
        </div>
      </div>
    );
  }

  function getReviewTitle() {
    if (neededReview["type"] === "staff") {
      return (
        <h2 className="text-xl text-center text-white">
          Please complete the following review of {neededReview.employee_name}'s
          performance on the {neededReview.project_name} project over the past 6
          months.
        </h2>
      );
    }
    if (neededReview["type"] === "self") {
      return (
        <h2 className="text-xl text-center text-white">
          Please complete the following self-assessment of your performance over
          the past 6 months.
        </h2>
      );
    }
    if (neededReview["type"] === "partner") {
      return (
        <h2 className="text-xl text-center text-white">
          Please complete the following review of {neededReview.employee_name}'s
          performance on the {neededReview.project_name} project over the past 6
          months.
        </h2>
      );
    }
    if (neededReview["type"] === "manager") {
      return (
        <h2 className="text-xl text-center text-white">
          Please complete the following review of {neededReview.employee_name}'s
          performance on the {neededReview.project_name} project over the past 6
          months.
        </h2>
      );
    }
    if (neededReview["external"]) {
      return (
        <h2 className="text-xl text-center text-white">
          Please complete the following review of {neededReview.employee_name}'s
          performance on the {neededReview.project_name} project over the past 6
          months.
        </h2>
      );
    }
  }

  if (isSubmitted) {
    window.scrollTo(0, 0);
    return (
      <div className="flex flex-col items-center justify-center mt-14">
        <h1 className="text-xl text-center text-gold font-bold w-72 mb-7">
          Thank you for completing the review!
        </h1>
        <Link to={dashboardLink}>
          <button
            className="bg-gold hover:bg-gold-dark text-white font-bold py-2 px-4 rounded hover:shadow-lg hover:-translate-y-1 duration-300 ease-in-out"
            type="submit"
          >
            Back to Dashboard
          </button>
        </Link>
      </div>
    );
  }

  function animatedSubmitButton() {
    if (isSubmitting) {
      return (
        <div className="flex justify-center my-7">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gold"></div>
        </div>
      );
    } else {
      return (
        <div className="flex justify-center my-7">
          <button
            className="bg-gold hover:bg-gold-dark text-white font-bold py-2 px-4 rounded hover:shadow-lg hover:-translate-y-1 duration-300 ease-in-out"
            type="submit"
          >
            Submit
          </button>
        </div>
      );
    }
  }

  function errorAlert() {
    if (isError) {
      return (
        <div
          className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
          role="alert"
        >
          <strong className="font-bold">Error!</strong>
          <span className="block sm:inline">
            {" "}
            There was an error submitting your review.
          </span>
        </div>
      );
    }
  }

  return (
    <div className=" bg-navy min-h-screen">
      <div className="flex justify-between mx-4 mt-4">
        <Link to={dashboardLink}>
          <button
            className="bg-gold hover:bg-gold-dark text-white font-bold py-2 px-4 rounded hover:shadow-lg hover:-translate-y-1 duration-300 ease-in-out"
            type="submit"
          >
            Back to Dashboard
          </button>
        </Link>
        <button className="text-xl font-bold text-center border-2 text-gold rounded-full px-4 py-2 border-navy hover:border-gold">
          {neededReview.reviewer_name}
        </button>
      </div>
      <div className="mx-5 md:mx-40 lg:mx-60">
        <h1 className="text-3xl font-bold text-center mt-12 text-gold">
          {neededReview.title}
        </h1>
        {getReviewTitle()}
        <form className="mt-7" onSubmit={handleSubmit}>
          <ul className="flex flex-col items-stretch justify-center mt-7">
            {formFields}
          </ul>
          {animatedSubmitButton()}
          {errorAlert()}
        </form>
      </div>
    </div>
  );
};

export default ReviewForm;
