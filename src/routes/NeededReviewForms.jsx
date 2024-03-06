import React from "react";
import "../input.css";
import NeededFormCard from "../components/NeededFormCard";
import { Link, useParams } from "react-router-dom";
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
        // `https://arsprod.fjreview.work/needed_reviews/${userId}`,
        // `http://localhost:3000/needed_reviews/${userId}`,
        `https://wanted-actively-mustang.ngrok-free.app/needed_reviews/${userId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
             'ngrok-skip-browser-warning': 'true',
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
            <h2 className="text-white text-xl text-center">
              {neededForms.length === 0 ? "You have no reviews to complete ⛱️" : "Please complete the following review forms"}
            </h2>
            <Link
              className="flex justify-center mt-5"
              to={`/completed_reviews/${userId}`}
            >
              <button className="bg-gold hover:bg-gold-light text-white font-bold py-2 px-4 rounded hover:shadow-lg hover:-translate-y-1 duration-300 ease-in-out">
                See Completed Reviews
              </button>
            </Link>
            <h3 className="text-white text-xl text-center mt-5">
              {neededForms.length === 0 ? "" : "Click on a form to complete it"}
            </h3>

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
