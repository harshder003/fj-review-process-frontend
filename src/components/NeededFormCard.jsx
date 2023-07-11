import React from "react";
import { Link } from "react-router-dom";

// a card to represent one required form to fill out. click on the card to go to the form
const NeededFormCard = (props) => {
  function formatDueDate(date) {
    // example input 2022-12-19T18:20:44.650000
    // example output 12/19/2022
    const year = date.substring(0, 4);
    const month = date.substring(5, 7);
    const day = date.substring(8, 10);
    return month + "/" + day + "/" + year;
  }

  function daysUntilDue(date) {
    const currentDate = new Date();
    const dueDate = new Date(date);
    const diffTime = dueDate - currentDate;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  }
  const dueDateText =
    daysUntilDue(props.form.due_date) >= 0
      ? "Due in " +
        daysUntilDue(props.form.due_date) +
        " day(s) on " +
        formatDueDate(props.form.due_date)
      : "Past Due";

  return (
    <>
      <Link to={`/pr-review/${props.form.id}`}>
        <button className="bg-navy border-2 border-gold shadow-md rounded-3xl px-8 pt-6 pb-8 mb-2 flex flex-col my-2 hover:shadow-2xl transition duration-500 ease-in-out transform hover:-translate-y-1 w-full hover:bg-navy-light">
          <h1 className="block text-gold text-2xl font-bold mb-1 text-left">
            {props.form.title}
          </h1>
          {/* due date text in red */}
          <div className="mb-1">
            <p className="block text-red-500 text-sm font-bold mb-2">
              {dueDateText}
            </p>
          </div>
          <div className="mb-4">
            <p className="block text-white text-sm font-bold mb-2 text-left">
              {props.form.description}
            </p>
          </div>
        </button>
      </Link>
    </>
  );
};

export default NeededFormCard;
