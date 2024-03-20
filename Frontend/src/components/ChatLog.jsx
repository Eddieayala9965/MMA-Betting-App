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
      <div>
        {data.map((message, index) => {
          return (
            <div key={index}>
              <ul>
                <li>{message.message_content}</li>
                <li>{message.response_content}</li>
              </ul>
              <DeleteBtn id={message.message_id} />
            </div>
          );
        })}
      </div>
    </>
  );
};

export default ChatLog;
