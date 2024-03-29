import React from "react";
import { useParams } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import {staticValue} from "../StaticValueContext";


const EndDate = () => {
  const { id, projectId } = useParams();
  const [prevDetails, setPrevDetails] = React.useState({});
  const [loadingFields, setLoadingFields] = React.useState(false);
  const [loadingReview, setLoadingReview] = React.useState(false);
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [isSubmitted, setIsSubmitted] = React.useState(false);
  const [isError, setIsError] = React.useState(false);
  const [endDateError, setEndDateError] = React.useState(false);


  React.useEffect(() => {
    async function getEndDate() {
      setLoadingFields(true);
      const response = await fetch(
        `${staticValue}get_end_date/${id}/${projectId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            'ngrok-skip-browser-warning': 'true',
          },
          accept: "application/json",
          
        }
      );
      const data = await response.json();
      setLoadingFields(false);
      return data;
    }

    getEndDate().then((data) => {
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


  async function handleSubmit(event) {
    event.preventDefault();
    setIsSubmitting(true);

    const end_date = {
      employee_id: id,
      project_id: projectId,
      end_date: document.getElementById("end").value
    }
    const json = JSON.stringify(end_date);

    console.log(json);
    
    const response = await fetch(`${staticValue}posting_end_date`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
         'ngrok-skip-browser-warning': 'true',
        
      },
      accept: "application/json",
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
          
          Consultant Name: {prevDetails["employee_name"]}<br />
          Project: {prevDetails["project_name"]}<br />
          Current end Date: {prevDetails["end_date"]} <br />  
          
        </p>
        
        <form className="mt-7" onSubmit={handleSubmit}>
          <ul className="flex flex-col items-stretch justify-center mt-7">
            <label for="end" className="flex flex-col items-stretch justify-center mt-7 text-white">Input new end date</label>  
            <input type="date" id="end" min={prevDetails["todays_date"]} ></input>
          </ul>
          
          {animatedSubmitButton()}
          {errorAlert()}
        </form>
      </main>

      <Footer />
    </div>
  );

};

export default EndDate;
