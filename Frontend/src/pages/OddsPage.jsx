// import { useLoaderData } from "react-router-dom";
import { useState } from "react";
import oddsData from "../../data/odds.json";

// export const loader = async () => {
// const url = "http://localhost:4001/odds";
// const options = {
//   method: "GET",
//   headers: {
//     "Content-Type": "application/json",
//   },
// };
// const response = await fetch(url, options);
// const data = await response.json();
// console.log(data);
// return { data };
// };

const OddsPage = () => {
  // const { data } = useLoaderData();
  // console.log(data);
  console.log(oddsData);
  const { odds } = oddsData;
  const data = odds;
  console.log(data);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredOdds = data?.filter((odds) => {
    return odds.bookmakers.some((bookmaker) => {
      return (
        bookmaker.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (bookmaker.last_update &&
          bookmaker.last_update.includes(searchTerm.toLowerCase())) ||
        bookmaker.markets.some((market) => {
          return market.outcomes.some((outcome) => {
            return outcome.name
              .toLowerCase()
              .includes(searchTerm.toLowerCase());
          });
        })
      );
    });
  });

  const handleChange = (e) => {
    setSearchTerm(e.target.value);
  };
  const handleSubmit = (event) => {
    event.preventDefault();
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div className="flex flex-col align-center justify-center flex-nowrap gap-5">
        <h1 className="text-4xl font-bold text-center text-blue-500">
          MMA Odds
        </h1>
        <form
          onSubmit={handleSubmit}
          className="bg-white flex px-4 py-3 border-b border-[#333] focus-within:border-blue-500 overflow-hidden max-w-md mx-auto font-[sans-serif]"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 192.904 192.904"
            width="18px"
            className="fill-gray-600 mr-3"
          >
            <path d="m190.707 180.101-47.078-47.077c11.702-14.072 18.752-32.142 18.752-51.831C162.381 36.423 125.959 0 81.191 0 36.422 0 0 36.423 0 81.193c0 44.767 36.422 81.187 81.191 81.187 19.688 0 37.759-7.049 51.831-18.751l47.079 47.078a7.474 7.474 0 0 0 5.303 2.197 7.498 7.498 0 0 0 5.303-12.803zM15 81.193C15 44.694 44.693 15 81.191 15c36.497 0 66.189 29.694 66.189 66.193 0 36.496-29.692 66.187-66.189 66.187C44.693 147.38 15 117.689 15 81.193z"></path>
          </svg>
          <input
            type="text"
            placeholder="Search Something..."
            value={searchTerm}
            onChange={handleChange}
            className="w-full outline-none text-sm"
          />
        </form>
        <div className="flex flex-col justify-center gap-8 grid grid-cols-1 md:grid-cols-3">
          {filteredOdds.map((item, index) => {
            const lastUpdate = item.bookmakers[0].last_update
              ? new Date(item.bookmakers[0].last_update).toLocaleDateString()
              : "";
            const eventDate = new Date(item.commence_time).toLocaleDateString();

            return (
              <div
                key={index}
                className="relative grid h-auto w-full max-w-[24rem] flex-col items-end justify-center overflow-hidden rounded-xl bg-white bg-clip-border text-center text-gray-700"
              >
                <div
                  className="absolute inset-0 m-0 h-full w-full overflow-hidden rounded-none bg-transparent bg-[url('/img/UFC.jpeg')] bg-cover bg-clip-border bg-center text-gray-700 shadow-lg"
                  style={{ backgroundSize: "cover" }}
                >
                  <div className="absolute inset-0 w-full h-full to-bg-black-10 bg-gradient-to-t from-black/80 via-black/50"></div>
                </div>
                <div className="relative p-6 px-6 py-14 md:px-12">
                  <h2 className="mb-6 block font-sans text-3xl font-semibold leading-[1.5] tracking-normal text-white antialiased">
                    <span className="text-whit font-bold">
                      {item.away_team}
                    </span>{" "}
                    vs{" "}
                    <span className="text-white font-bold">
                      {item.home_team}
                    </span>
                  </h2>
                  <h5 className="block mb-4 font-sans text-lg antialiased font-extrabold leading-snug tracking-normal text-white">
                    {item.bookmakers[0].title}
                  </h5>
                  <p className="block mb-6 font-sans text-base antialiased font-extrabold leading-relaxed text-white">
                    Event Date: {eventDate}
                  </p>
                  <p className="block mb-6 font-sans text-base antialiased font-extrabold leading-relaxed text-white">
                    Last Update: {lastUpdate}
                  </p>
                  <p className="block mb-6 font-sans text-base antialiased font-extrabold leading-relaxed text-white">
                    {item.bookmakers[0].markets[0].outcomes[0].name}:{" "}
                    {item.bookmakers[0].markets[0].outcomes[0].betting_odds}
                  </p>
                  <p className="block mb-6 font-sans text-base antialiased font-extrabold leading-relaxed text-white">
                    {item.bookmakers[0].markets[0].outcomes[1].name}:{" "}
                    {item.bookmakers[0].markets[0].outcomes[1].betting_odds}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default OddsPage;
