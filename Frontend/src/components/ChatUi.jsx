const ChatUi = () => {
  return (
    <div className="flex max-w-full ml-0 mr-0 pl-0 pr-0 text-white text-center bg-color-dark-grey h-screen">
      <aside className="sidemenu bg-color-greyblack">
        <div className=" p-4 border rounded-md hover:bg-opacity-50 transition duration-300 ease-in-out hover:bg-white border-white text-left ">
          <span className="pl-2 pr-2 ">&#43;</span>
          New Chat
        </div>
      </aside>
      <section className="flex-1 relative">
        <div className="chat-log p-4 h-screen text-left">
          <div className=" chat-message p-4">
            <div className="flex ml-10">
              <div className="chat-avatar bg-white rounded-full w-10 h-10"></div>
              <div className="message p-3 ml-5 mt-1">hello world</div>
            </div>
          </div>
          <div className=" chat-message-ai p-4">
            <div className="flex ml-10">
              <div className="chat-avatar bg-green-400 rounded-full w-10 h-10"></div>
              <div className="message p-3 ml-5 mt-1">Ai</div>
            </div>
          </div>
        </div>
        <div className="p-3 absolute top-auto bottom-0 left-0 right-0">
          <textarea
            className="bg-slate-800 border-none border w-90 border-transparent rounded-lg outline-none p-3 text-color-white text-lg"
            name=""
            id=""
            rows="1"
            placeholder="Type your message here..."
          ></textarea>
        </div>
      </section>
    </div>
  );
};

export default ChatUi;
