import React from "react";
import { useParams } from "react-router-dom";
import Footer from "../components/Footer";



const ConfirmDate = () => {
  const { id, projectId } = useParams();
  const [prevDetails, setPrevDetails] = React.useState({});
  const [loadingFields, setLoadingFields] = React.useState(false);
  const [loadingReview, setLoadingReview] = React.useState(false);
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [isSubmitted, setIsSubmitted] = React.useState(false);
  const [isError, setIsError] = React.useState(false);
  const [endDateError, setEndDateError] = React.useState(false);


  React.useEffect(() => {
    async function getConfirmDate() {
      setLoadingFields(true);
      const response = await fetch(
        `https://api.fjreview.work/confirming_end_date/${id}/${projectId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
          
        }
      );
      const data = await response.json();
      setLoadingFields(false);
      return data;
    }

    getConfirmDate().then((data) => {
      setPrevDetails(data);
      console.log(data);
    });

  }, [id, projectId]);

  // if needed review comes back like this {"success": "false", "message": "XXXXXXXXXXXXXXXXXX"}
  // then return an error message
  // but first check if it has those fields in the needed review before trying to access them
  if (prevDetails.hasOwnProperty("success")) {
    if (prevDetails["success"] === "false") {
      return (
        <div className="bg-navy min-h-screen flex flex-col justify-between">
          <div className="flex flex-col justify-center items-center">
            <h1 className="text-xl text-center text-red-500 font-bold w-72 mb-7 mt-14">
              {prevDetails["message"]}
            </h1>
          </div>
        </div>
      );
    }
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


  if (isSubmitted) {
    window.scrollTo(0, 0);
    return (
      <div className="bg-navy min-h-screen flex flex-col justify-between">
        <div className="flex flex-col justify-center items-center">
          <h1 className="text-xl text-center text-gold font-bold w-72 mb-7 mt-14">
            Thank you for updating!
          </h1>
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
            There was an error submitting your End Date. Note that End Date can only be set to sometime in the future.
          </span>
        </div>
      );
    }
  }


  return (

    <div className="bg-navy min-h-screen flex flex-col justify-between">

      <main className="mx-5 md:mx-40 lg:mx-60 mt-12">
        <p className="text-xl text-center text-white">
          
        End Date Confirmed. You may close the tab now.
          
        </p>
    
      </main>

      <Footer />
    </div>
  );

};

export default ConfirmDate;
