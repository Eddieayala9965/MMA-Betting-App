import { useLoaderData } from "react-router-dom";
import DeleteBtn from "./DeleteBtn";

export const loader = async () => {
  const url = `http://127.0.0.1:8000/data`;
  const options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  };
  const response = await fetch(url, options);
  const data = await response.json();
  console.log(data);

  return { data: data.data };
};

const ChatLog = () => {
  const { data } = useLoaderData();

  return (
    <>
      <div className="bg-gray-50 min-h-screen p-4">
        {data.map((message, index) => (
          <div
            key={index}
            className="mb-4 bg-white rounded shadow-lg transform transition duration-500 ease-in-out hover:scale-105 w-full md:w-3/4 mx-auto border border-gray-500 rounded-xl"
          >
            <nav>
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center p-4 border-b-2">
                <div className="flex flex-col justify-between items-start space-y-2 w-full">
                  <span className="font-bold text-lg">
                    {message.message_content}
                  </span>
                  <span className="text-gray-500">
                    {message.response_content}
                  </span>
                </div>
                <div className="px-2">
                  <DeleteBtn id={message.message_id} />
                </div>
              </div>
            </nav>
          </div>
        ))}
      </div>
    </>
  );
};

export default ChatLog;
