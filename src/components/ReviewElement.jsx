import React from "react";

const ReviewElement = (props) => {
  const type = props.type;
  const text = props.text;
  const mandatory = props.mandatory;

  const [numAddShortAnswer, setNumAddShortAnswer] = React.useState(0);

  const mandatoryStar = mandatory ? (
    <span className="text-red-500"> *</span>
  ) : (
    <span className="text-white"></span>
  );

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
          <span className="mb-2">{text}</span>
          {mandatoryStar}
        </label>
        <textarea
          name={text}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline resize-y border-gold bg-navy"
          placeholder="Enter your answer here"
          rows="2"
          required={mandatory}
        />
      </div>
    );
  }

  function addShortAnswer() {
    return (
      <ul>
        {Array(numAddShortAnswer)
          .fill()
          .map((_, i) => (
            <li className="flex flex-row mb-4 text-white" key={i}>
              <textarea
                name={text + i}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline resize-y border-gold bg-navy"
                placeholder="Enter your answer here"
                rows="2"
              />
            </li>
          ))}
      </ul>
    );
  }

  if (type === "Add Short Answer") {
    // at least one short answer is required with a plus button to add more short answers
    // the name of the input will be the question text + the number of short answers added
    // you can press the plus to add more answers to the same question
    // only one plus button will be shown at a time
    // use a foreach loop to add more short answer inputs
    return (
      <div className="mb-4 text-white">
        <label>
          <span className="text-white mb-4">{text}</span>
          {mandatoryStar}
        </label>
        <div className="flex flex-row mb-4 mt-2">
          <textarea
            name={text + numAddShortAnswer}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline resize-y border-gold bg-navy"
            placeholder="Enter your answer here"
            rows="2"
            required={mandatory}
          />
        </div>
        <div>{addShortAnswer()}</div>
        {/* put two buttons on the right side of the screen under the last short answer input */}
        <div className="flex flex-row justify-end mb-2 mt-2 items-center text-gray">
          <button
            type="button"
            className="bg-gold text-navy font-bold py-2 px-4 rounded hover:bg-gold-dark hover:text-navy-dark hover:shadow-lg hover:border-gold-dark mx-1"
            onClick={() => setNumAddShortAnswer(numAddShortAnswer + 1)}
          >
            +
          </button>
          <button
            type="button"
            className="bg-gold text-navy font-bold py-2 px-4 rounded hover:bg-gold-dark hover:text-navy-dark hover:shadow-lg hover:border-gold-dark mx-1"
            onClick={
              numAddShortAnswer > 0
                ? () => setNumAddShortAnswer(numAddShortAnswer - 1)
                : null
            }
          >
            -
          </button>
        </div>
      </div>
    );
  }

  const commentName = "Comment: " + text;
  const HMLName = "HML: " + text;

  if (type === "HMLComment Answer") {
    return (
      <div className="mb-4">
        <label>
          <span className="text-white mb-2">{text}</span>
          {mandatoryStar}
        </label>
        {/* Horizontal option either L M or H
        as well as an optional comment box,
        The input value will be stored as a string in the database example "H: This is a comment" 
        */}
        <div className="flex flex-row mb-4 mt-1 items-center text-gray">
          <input
            type="radio"
            id="H"
            name={HMLName}
            value="H"
            className="form-radio text-gold focus:border-gold focus:outline-none focus:shadow-outline border-gold bg-navy"
            required={mandatory}
          />
          <label className=" ml-2 mr-4">High</label>
          <input
            type="radio"
            id="M"
            name={HMLName}
            value="M"
            className="form-radio text-gold focus:border-gold focus:outline-none focus:shadow-outline border-gold bg-navy"
            required={mandatory}
            defaultChecked
          />
          <label className=" ml-2 mr-4">Medium</label>
          <input
            type="radio"
            id="L"
            name={HMLName}
            value="L"
            className="form-radio text-gold focus:border-gold focus:outline-none focus:shadow-outline border-gold bg-navy"
            required={mandatory}
          />
          <label className="ml-2 mr-4">Low</label>
          <input
            type="radio"
            id="Don't Know"
            name={HMLName}
            value="Don't Know"
            className="form-radio text-gold focus:border-gold focus:outline-none focus:shadow-outline border-gold bg-navy"
            required
          />
          <label className="ml-2 mr-4">Don't Know</label>
          {/* if no comment included by user don't put in form data */}
          {/* scales vertically to show all text when out of space*/}
          <textarea
            name={commentName}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline resize-y border-gold bg-navy text-white"
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
