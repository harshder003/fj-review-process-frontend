import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

const ProcessDashboard = () => {
  const [processStats, setProcessStats] = React.useState({});
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState(null);

  React.useEffect(() => {
    async function getProcessStats() {
      setIsLoading(true);
      try {
        // const response = await fetch("https://arsprod.fjreview.work/process_stats", {
        // const response = await fetch("http://localhost:3000/process_stats", {
          const response = await fetch("https://wanted-actively-mustang.ngrok-free.app/process_stats", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
             'ngrok-skip-browser-warning': 'true',
          },
        });
        const data = await response.json();

        if (data.detail) {
          throw data;
        }

        setIsLoading(false);
        return data;
      } catch (error) {
        setIsLoading(false);
        setError(error);
      }
    }

    getProcessStats().then((data) => {
      setProcessStats(data);
      console.log(data);
    });
  }, []);

  // example of processStats object
  // const processStats = {
  //   partner: {
  //     incomplete: 5,
  //     complete: 8,
  //   },
  //   staff: {
  //     incomplete: 0,
  //     complete: 0,
  //   },
  //   self: {
  //     incomplete: 0,
  //     complete: 0,
  //   },
  //   manager: {
  //     incomplete: 0,
  //     complete: 0,
  //   },
  //   total: {
  //     incomplete: 5,
  //     complete: 8,
  //   },
  // };

  if (error !== null) {
    window.scrollTo(0, 0);
    return (
      <div className="bg-navy min-h-screen flex flex-col justify-between">
        <div className="flex justify-center mt-14">
          {/* error message */}
          <div className="text-white text-xl text-center">
            {error.detail}
            <br />
            <br />
            <button
              className="bg-gold text-navy font-bold py-2 px-4 rounded"
              onClick={() => {
                window.location.reload();
                setError(null);
              }}
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

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
        <Header profileName="Admin" />
        <main id="detail" className="">
          <div className="mx-5 md:mx-16 lg:mx-72">
            <h1 className="text-gold text-3xl font-bold text-center mt-12">
              Process Stats
            </h1>

            {/* grid to show the process stats */}

            {/* first header row */}
            <div className="border-2 border-gold rounded-lg my-7">
              <div className="grid grid-cols-5 gap-3 text-center border-b-2 border-gold py-4">
                <div className="text-gold text-xl font-bold text-center">
                  Review Type
                </div>
                <div className="text-gold text-xl font-bold text-center">
                  Incomplete
                </div>
                <div className="text-gold text-xl font-bold text-center">
                  Complete
                </div>
                <div className="text-gold text-xl font-bold text-center">
                  Total
                </div>
                <div className="text-gold text-xl font-bold text-center">
                  % Complete
                </div>
              </div>
              <ul
                className="flex flex-col items-stretch justify-center "
                id="process-stats"
              >
                {Object.keys(processStats).map((key, index) => {
                  const total =
                    processStats[key].incomplete + processStats[key].complete;
                  const percentComplete =
                    (processStats[key].complete / total) * 100;
                  return (
                    <li
                      className="grid grid-cols-5 gap-3  my-4 text-center"
                      key={index}
                    >
                      <div className="text-white text-lg text-center font-bold ">
                        {
                          //capitalize first letter
                          key.charAt(0).toUpperCase() + key.slice(1)
                        }
                      </div>
                      <div className="text-white text-lg text-center">
                        {processStats[key].incomplete}
                      </div>
                      <div className="text-white text-lg text-center">
                        {processStats[key].complete}
                      </div>
                      <div className="text-white text-lg text-center">
                        {total}
                      </div>
                      <div className="text-white text-lg text-center">
                        {
                          // round to 2 decimal places
                          Math.round(percentComplete * 100) / 100
                        }
                        %
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default ProcessDashboard;
