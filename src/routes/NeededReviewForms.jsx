import React from "react";
import "../input.css";
import NeededFormCard from "../components/NeededFormCard";
import { useParams } from "react-router-dom";

function NeededReviewForms() {
  // array of needed forms
  const [neededForms, setNeededForms] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);

  const userId = useParams().userId;

  // put the needed forms into an array of objects only when the page loads
  React.useEffect(() => {
    async function getNeededForms() {
      setIsLoading(true);
      const response = await fetch(
        `https://3.16.48.61/needed_reviews/${userId}/`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          referrerPolicy: "unsafe_url",
        }
      );
      const data = await response.json();
      setIsLoading(false);
      return data;
    }

    getNeededForms().then((data) => {
      setNeededForms(data);
      console.log(data);
    });
  }, [userId]);

  // create html for each needed form each with new unique key
  const formCards = neededForms.map((form, index) => (
    <li key={index}>
      <NeededFormCard form={form} user_id={userId} />
    </li>
  ));

  function getInstructions() {
    if (neededForms.length === 0) {
      return (
        <h2 className="text-white text-xl text-center">
          You have no reviews to complete ⛱️
        </h2>
      );
    } else {
      return (
        <h2 className="text-white text-xl text-center">
          Please complete the following review forms
        </h2>
      );
    }
  }

  window.scrollTo(0, 0);

  if (isLoading) {
    window.scrollTo(0, 0);
    // gold color cards with no info slightly transparent to show loading
    // they will have a pulsing animation
    return (
      <div className="">
        <div className="flex justify-center mt-14">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gold"></div>
        </div>

        {/* <ul className="flex flex-col items-stretch justify-center mt-7 mx-5 md:mx-44 lg:mx-72">
          <li>
            <div className="bg-gold bg-opacity-50 rounded-lg p-4 mb-4">
              <div className="animate-pulse flex space-x-4">
                <div className="flex-1 space-y-4 py-1">
                  <div className="h-4 bg-gold bg-opacity-50 rounded w-3/4"></div>
                  <div className="space-y-2">
                    <div className="h-4 bg-gold bg-opacity-50 rounded"></div>
                    <div className="h-4 bg-gold bg-opacity-50 rounded w-5/6"></div>
                  </div>
                </div>
              </div>
            </div>
          </li>
          <li>
            <div className="bg-gold bg-opacity-50 rounded-lg p-4">
              <div className="animate-pulse flex space-x-4">
                <div className="flex-1 space-y-4 py-1">
                  <div className="h-4 bg-gold bg-opacity-50 rounded w-3/4"></div>
                  <div className="space-y-2">
                    <div className="h-4 bg-gold bg-opacity-50 rounded"></div>
                    <div className="h-4 bg-gold bg-opacity-50 rounded w-5/6"></div>
                  </div>
                </div>
              </div>
            </div>
          </li>
        </ul> */}
      </div>
    );
  }
  return (
    <>
      {/* profile card */}
      <div className="flex justify-end mx-4 mt-4">
        <button className="text-xl font-bold text-center border-2 text-gold rounded-full px-4 py-2 border-navy hover:border-gold">
          {neededForms[0]?.reviewer_name}
        </button>
      </div>
      <div className="mx-5 md:mx-16 lg:mx-72">
        <h1 className="text-gold text-3xl font-bold text-center mt-12">
          Performance Review Dashboard
        </h1>
        {getInstructions()}
        <ul className="flex flex-col items-stretch justify-center mt-7 ">
          {formCards}
        </ul>
      </div>
    </>
  );
}

export default NeededReviewForms;
