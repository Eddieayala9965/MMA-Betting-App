const ChatMessage = ({ message }) => {
  return (
    <div className={`p-4 ${message.user === "gpt" && "chatgpt"}`}>
      <div className="flex ml-10">
        <div
          className={` bg-green-500 rounded-full w-10 h-10 ${
            message.user === "gpt" && "chatgpt"
          }`}
        ></div>
        <div className="p-3 ml-5 mt-1">{message.message}</div>
      </div>
    </div>
  );
};

export default ChatMessage;
