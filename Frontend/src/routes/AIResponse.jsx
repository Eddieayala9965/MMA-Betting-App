import { useState } from "react";
import { Link } from "react-router-dom";
import ChatMessage from "../components/ChatMessage";

const AIResponse = () => {
  const [input, setInput] = useState("");
  const [chatlog, setChatLog] = useState([
    {
      user: "gpt",
      message: "how can i help you ?",
    },
  ]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newChatLog = [...chatlog, { user: "me", message: input }];
    setChatLog(newChatLog);
    setInput("");

    const fastApi = `${import.meta.env.VITE_FASTAPI_URL}/generate`;
    const response = await fetch(fastApi, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(input),
    });
    const data = await response.json();

    setChatLog([...newChatLog, { user: "gpt", message: data.data }]);
  };

  const handleChange = (e) => {
    setInput(e.target.value);
  };

  const clearChat = () => {
    setChatLog([]);
  };

  return (
    <div className="flex flex-col md:flex-row max-w-full ml-0 mr-0 pl-0 pr-0 text-black text-center bg-color-dark-grey h-screen">
      <aside className="md:w-1/4 bg-color-greyblack">
        <button onClick={clearChat}>
          <div className=" p-4 border rounded-md hover:bg-opacity-50 transition duration-300 ease-in-out hover:bg-white border-black text-left ">
            <span className="pl-2 pr-2 ">&#43;</span>
            New Chat
          </div>
        </button>
        <button className="">
          <Link to={"/chatlog"}>
            <div className=" p-4 border rounded-md hover:bg-opacity-50 transition duration-300 ease-in-out hover:bg-white border-black text-left ">
              <span className="pl-2 pr-2 ">&#43;</span>
              ChatLog
            </div>
          </Link>
        </button>
      </aside>
      <section className="flex-1 relative">
        <div className="chat-log p-4 h-screen text-left overflow-auto scroll-smooth">
          {chatlog.map((message, index) => {
            return <ChatMessage key={index} message={message} />;
          })}

          <div className="chat-message-ai p-4">
            <div className="flex ml-10">
              <div className=" bg-white rounded-full w-10 h-10 flex-shrink-0 flex-grow-0 overflow-hidden"></div>
              <div className="message p-3 ml-5 mt-1"></div>
            </div>
          </div>
        </div>
        <div className="p-3 absolute bottom-0 left-0 right-0">
          <form onSubmit={handleSubmit}>
            <input
              className="bg-gray-200 border-none border w-full md:w-90 border-transparent rounded-lg outline-none p-3 text-color-white text-lg"
              value={input}
              onChange={handleChange}
              placeholder="Type your message here..."
            />
          </form>
        </div>
      </section>
    </div>
  );
};

export default AIResponse;
