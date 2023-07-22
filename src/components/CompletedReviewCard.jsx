import React from "react";

// a card to represent one required form to fill out. click on the card to go to the form
const NeededFormCard = (props) => {


  return (
    <div className="bg-navy border-2 border-gold shadow-md rounded-3xl px-8 pt-6 pb-8 mb-2 flex flex-col my-2 w-full">
      <h1 className="block text-gold text-2xl font-bold mb-1 text-left">
        {props.form.title}
      </h1>
      <div className="mb-4">
        <p className="block text-white text-sm font-bold mb-2 text-left">
          {props.form.description}
        </p>
      </div>
    </div>
  );
};

export default NeededFormCard;
