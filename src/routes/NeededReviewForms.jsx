import React from "react";
import "../input.css";
import NeededFormCard from "../components/NeededFormCard";
import { useParams } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";

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
        `https://api.fjreview.work/needed_reviews/${userId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
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
    return (
      <div className="bg-navy min-h-screen flex flex-col justify-between">
        <div className="flex justify-center mt-14">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gold"></div>
        </div>
      </div>
    );
  }
  return (
    <div className="bg-navy min-h-screen flex flex-col justify-between">
      <div>
        <Header profileName={neededForms[0]?.reviewer_name} />
        <main id="detail" className="">
          <div className="mx-5 md:mx-16 lg:mx-72">
            <h1 className="text-gold text-3xl font-bold text-center mt-12">
              Performance Review Dashboard
            </h1>
            {getInstructions()}
            <ul className="flex flex-col items-stretch justify-center mt-7 ">
              {formCards}
            </ul>
          </div>
        </main>
      </div>
      <Footer />
    </div>
  );
}

export default NeededReviewForms;
