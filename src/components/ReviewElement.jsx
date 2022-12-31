import React from "react";

const ReviewElement = (props) => {
  const type = props.type;
  const text = props.text;

  if (type === "Title") {
    return (
      <div className="mb-4">
        <label>
          <h1 className="text-2xl font-bold text-gold mb-2">{text}</h1>
        </label>
      </div>
    );
  }

  if (type === "Paragraph") {
    return (
      <div className="mb-4">
        <label>
          <p className="text-white mb-2">{text}</p>
        </label>
      </div>
    );
  }

  if (type === "Short Answer") {
    return (
      <div className="mb-4 text-white">
        <label>
          <p className="mb-2">{text}</p>
        </label>
        <textarea
          name={text}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline resize-y border-gold bg-navy"
          placeholder="Enter your answer here"
          rows="2"
          required
        />
      </div>
    );
  }

  const commentName = "comment: " + text;
  const HMLName = "HML: " + text;

  if (type === "HMLComment Answer") {
    return (
      <div className="mb-4">
        <label>
          <p className="text-white mb-2">{text}</p>
        </label>
        {/* Horizontal option either L M or H
        as well as an optional comment box,
        The input value will be stored as a string in the database example "H: This is a comment" 
        */}
        <div className="flex flex-row mb-4 items-center text-gray">
          <input
            type="radio"
            id="H"
            name={HMLName}
            value="H"
            className="form-radio text-gold focus:border-gold focus:outline-none focus:shadow-outline border-gold bg-navy"
            required
          />
          <label className=" ml-2 mr-4" for="">
            High
          </label>
          <input
            type="radio"
            id="M"
            name={HMLName}
            value="M"
            className="form-radio text-gold focus:border-gold focus:outline-none focus:shadow-outline border-gold bg-navy"
            required
          />
          <label className=" ml-2 mr-4" for="">
            Medium
          </label>
          <input
            type="radio"
            id="L"
            name={HMLName}
            value="L"
            className="form-radio text-gold focus:border-gold focus:outline-none focus:shadow-outline border-gold bg-navy"
            required
          />
          <label className="ml-2 mr-4" for="">
            Low
          </label>
          {/* if no comment included by user don't put in form data */}
          {/* scales vertically to show all text when out of space*/}
          <textarea
            name={commentName}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline resize-y border-gold bg-navy"
            placeholder="Optional Comment"
            rows="1"
          />
        </div>
      </div>
    );
  }

  return <div></div>;
};

export default ReviewElement;
