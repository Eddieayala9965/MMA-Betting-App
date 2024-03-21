import { useLoaderData } from "react-router-dom";
import { useState } from "react";

export const loader = async () => {
  const url = "http://localhost:4001/odds";
  const options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  };
  const response = await fetch(url, options);
  const data = await response.json();
  console.log(data);
  return { data };
};

const OddsPage = () => {
  const { data } = useLoaderData();
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
    <div className="flex flex-col align-center justify-center flex-nowrap">
      <h1>Odds Page</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={handleChange}
        />
      </form>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredOdds.map((item, index) => {
          const lastUpdate = item.bookmakers[0].last_update
            ? new Date(item.bookmakers[0].last_update).toLocaleDateString()
            : "";
          const eventDate = new Date(item.commence_time).toLocaleDateString();

          return (
            <div
              key={index}
              className="relative flex bg-clip-border rounded-xl bg-white text-gray-700 shadow-md w-full max-w-[48rem] flex-row m-4"
            >
              <div className="p-6">
                <h6 className="block mb-4 font-sans text-base antialiased font-semibold leading-relaxed tracking-normal text-gray-700 uppercase">
                  {item.away_team} vs {item.home_team}
                </h6>
                <h4 className="block mb-2 font-sans text-2xl antialiased font-semibold leading-snug tracking-normal text-blue-gray-900">
                  {item.bookmakers[0].title}
                </h4>
                <p className="block mb-8 font-sans text-base antialiased font-normal leading-relaxed text-gray-700">
                  Event Date: {eventDate}
                </p>
                <p className="block mb-8 font-sans text-base antialiased font-normal leading-relaxed text-gray-700">
                  Last Update: {lastUpdate}
                </p>
                <p className="block mb-8 font-sans text-base antialiased font-normal leading-relaxed text-gray-700">
                  {item.bookmakers[0].markets[0].outcomes[0].name}:{" "}
                  {item.bookmakers[0].markets[0].outcomes[0].betting_odds}
                </p>
                <p className="block mb-8 font-sans text-base antialiased font-normal leading-relaxed text-gray-700">
                  {item.bookmakers[0].markets[0].outcomes[1].name}:{" "}
                  {item.bookmakers[0].markets[0].outcomes[1].betting_odds}
                </p>
              </div>
              <div className="w-1/3">
                <img
                  src={item.imageSrc} // Replace 'item.imageSrc' with the actual image source from your data
                  alt="card-image"
                  className="object-cover w-full h-full"
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default OddsPage;
