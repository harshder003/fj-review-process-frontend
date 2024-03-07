import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import ReviewElement from "../components/ReviewElement";
import Header from "../components/Header";
import Footer from "../components/Footer";
import staticValue from "../StaticValueContext";

const ReviewForm = () => {
  const { reviewId } = useParams();
  const [neededReview, setNeededReview] = React.useState({});
  const [reviewFields, setFields] = React.useState([]);
  const [loadingFields, setLoadingFields] = React.useState(false);
  const [loadingReview, setLoadingReview] = React.useState(false);
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [isSubmitted, setIsSubmitted] = React.useState(false);
  const [isError, setIsError] = React.useState(false);
  const [neededReviewError, setNeededReviewError] = React.useState(false);

  const navigate = useNavigate();

  React.useEffect(() => {
    async function getReviewFields() {
      setLoadingFields(true);
      const response = await fetch(
        `${staticValue}needed_reviews/fields/${reviewId}`,
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
        `${staticValue}needed_reviews/review/${reviewId}`,
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

  // if needed review comes back like this {"success": "false", "message": "XXXXXXXXXXXXXXXXXX"}
  // then return an error message and a link to the dashboard
  // but first check if it has those fields in the needed review before trying to access them
  if (neededReview.hasOwnProperty("success")) {
    if (neededReview["success"] === "false") {
      return (
        <div className="bg-navy min-h-screen flex flex-col justify-between">
          <div className="flex flex-col justify-center items-center">
            <h1 className="text-xl text-center text-red-500 font-bold w-72 mb-7 mt-14">
              {neededReview["message"]}
            </h1>
          </div>
        </div>
      );
    }
  }

  const dashboardLink = `/pr-reviews/${neededReview.reviewer_id}`;

  const formFields = reviewFields.map((field, index) => (
    <li key={index}>
      <ReviewElement
        type={field.Type}
        text={field.Text}
        mandatory={field.Mandatory === 1}
        index={index}
      />
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
      review["reviewer_project_role"] = neededReview["reviewer_project_role"];
      review["project_id"] = neededReview["project_id"];
    }
    const json = JSON.stringify(review);

    // console.log(json);
    const response = await fetch(`${staticValue}reviews`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "Authorization, Content-Type",
        "Access-Control-Allow-Methods": "POST"
      },
      body: json,
    });
    const responseData = await response.json();
    // console.log(responseData);
    if (response.ok) {
      setIsSubmitted(true);
    } else {
      setIsError(true);
    }
    setIsSubmitting(false);
  }

  if (loadingFields || loadingReview) {
    window.scrollTo(0, 0);
    return (
      <div className="bg-navy min-h-screen flex flex-col justify-between">
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
          Please complete the following review of {neededReview.employee_name}
          's performance on the {neededReview.project_name} project over the
          past 6 months.
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
    if (neededReview["type"] === "external") {
      return (
        <h2 className="text-xl text-center text-white">
          Please complete the following review of {neededReview.employee_name}'s
          performance on the {neededReview.project_name} project over the past 6
          months.
        </h2>
      );
    }
  }

  const getPartnerAnonymousMessage = (
    <h3 className="text-xl text-center text-white mb-2 mt-1 font-bold">
      PLEASE NOTE THAT ALL PARTNER REVIEWS ARE ANONYMOUS.
    </h3>
  );

  function returnToDashboard() {
    // reset the history so that the back button doesn't take you back to the already submitted form
    window.history.replaceState(null, "", dashboardLink);
    window.location.href = dashboardLink;
  }

  if (isSubmitted) {
    window.scrollTo(0, 0);
    return (
      <div className="bg-navy min-h-screen flex flex-col justify-between">
        <div className="flex flex-col justify-center items-center">
          <h1 className="text-xl text-center text-gold font-bold w-72 mb-7 mt-14">
            Thank you for completing the review!
          </h1>
          <button
            className="bg-gold hover:bg-gold-light text-white font-bold py-2 px-4 rounded hover:shadow-lg hover:-translate-y-1 duration-300 ease-in-out"
            type="button"
            onClick={returnToDashboard}
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    );
  }

  function animatedSubmitButton() {
    if (isSubmitting) {
      return (
        <div className="flex justify-center my-10">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-gold"></div>
        </div>
      );
    } else {
      return (
        <div className="flex justify-center my-10">
          <button
            className="bg-gold hover:bg-gold-light text-white font-bold py-2 px-4 rounded hover:shadow-lg hover:-translate-y-1 duration-300 ease-in-out"
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
    <div className="bg-navy min-h-screen flex flex-col justify-between">
      <Header
        profileName={neededReview.reviewer_name}
        dashboardLink={
          // we also want to give a window.confirm to make sure they want to leave
          <button
            className="bg-gold hover:bg-gold-light text-white font-bold py-2 px-4 rounded hover:shadow-lg hover:-translate-y-1 duration-300 ease-in-out"
            type="button"
            onClick={() => {
              if (
                window.confirm(
                  "Are you sure you want to leave? Inputs will not be saved."
                )
              ) {
                navigate(dashboardLink);
              }
            }}
          >
            Dashboard
          </button>
        }
      />

      <main className="mx-5 md:mx-40 lg:mx-60 mt-12">
        {neededReview["type"] === "partner" ? getPartnerAnonymousMessage : null}
        <h1 className="text-3xl font-bold text-center mb-2 text-gold">
          {neededReview.title} - {neededReview.employee_name}
          {neededReview.project_name ? (
            <span> - {neededReview.project_name}</span>
          ) : null}
        </h1>
        {getReviewTitle()}
        <p className="text-center text-red-500 font-bold text-sm mt-2">
          * represents a required field
        </p>
        <form className="mt-7" onSubmit={handleSubmit}>
          <ul className="flex flex-col items-stretch justify-center mt-7">
            {formFields}
          </ul>
          {animatedSubmitButton()}
          {errorAlert()}
        </form>
      </main>

      <Footer />
    </div>
  );
};

export default ReviewForm;
