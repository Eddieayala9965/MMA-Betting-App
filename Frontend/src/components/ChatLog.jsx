import { useLoaderData } from "react-router-dom";

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
      <div>
        {data.map((message, index) => {
          return (
            <ul key={index}>
              <li>{message.message_content}</li>
              <li>{message.response_content}</li>
            </ul>
          );
        })}
      </div>
    </>
  );
};

export default ChatLog;
