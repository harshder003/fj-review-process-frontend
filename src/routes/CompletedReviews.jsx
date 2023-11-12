import React from "react";
import "../input.css";
import CompletedReviewCard from "../components/CompletedReviewCard";
import { useNavigate, useParams } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";

function CompletedReviews() {
  // array of needed forms
  const [completedReviews, setCompletedReviews] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);

  const userId = useParams().userId;
  const navigate = useNavigate();

  // put the needed forms into an array of objects only when the page loads
  React.useEffect(() => {
    async function getNeededForms() {
      setIsLoading(true);
      let sixMonthsAgo = new Date();
      sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);
      const response = await fetch(
        `https://api.fjreview.work/needed_reviews/completed/${userId}?min_date=${sixMonthsAgo.toISOString().slice(0, 10)}`,
        // `http://localhost:3000/needed_reviews/completed/${userId}?min_date=${sixMonthsAgo.toISOString().slice(0, 10)}`,
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
      setCompletedReviews(data);
      console.log(data);
    });
  }, [userId]);

  // create html for each needed form each with new unique key
  const formCards = completedReviews.map((form, index) => (
    <li key={index}>
      <CompletedReviewCard form={form} user_id={userId} />
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
        <Header profileName={completedReviews[0]?.reviewer_name}
          dashboardLink={
            <button
              className="bg-gold hover:bg-gold-light text-white font-bold py-2 px-4 rounded hover:shadow-lg hover:-translate-y-1 duration-300 ease-in-out"
              type="button"
              onClick={() => { navigate(`/pr-reviews/${userId}`); }}
            >
              Dashboard
            </button>
          }
        />
        <main id="detail" className="">
          <div className="mx-5 md:mx-16 lg:mx-72">
            <h1 className="text-gold text-3xl font-bold text-center mt-12">
              Complete Reviews
            </h1>
            <h2 className="text-white text-xl text-center">
              {completedReviews.length === 0 ? "No reviews to display" : ""}
            </h2>

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

export default CompletedReviews;
