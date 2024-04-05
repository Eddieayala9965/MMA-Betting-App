const ChatMessage = ({ message }) => {
  const userImg = "/img/man-white.png";
  const gptImg = "/img/robot3.png";
  const userName = localStorage.getItem("name");

  return (
    <div className="p-4">
      <div className="flex ml-10">
        <img
          className="w-8 h-8 rounded-full"
          src={message.user === "gpt" ? gptImg : userImg}
          alt={message.user === "gpt" ? "The CageSage" : userName}
        />
        <div className="flex flex-col w-full max-w-[320px] leading-1.5 p-4 border-gray-200 bg-gray-100 rounded-e-xl rounded-es-xl dark:bg-gray-700">
          <div className="flex items-center space-x-2 rtl:space-x-reverse">
            <span className="text-sm font-semibold text-gray-900 dark:text-white">
              {message.user === "gpt" ? "The CageSage" : userName}
            </span>
            <span className="text-sm font-normal text-gray-500 dark:text-gray-400"></span>
          </div>
          <p className="text-sm font-normal py-2.5 text-gray-900 dark:text-white">
            {message.message}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ChatMessage;
