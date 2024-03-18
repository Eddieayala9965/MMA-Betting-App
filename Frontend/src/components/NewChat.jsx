import React, { useState } from "react";

const NewChat = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [conversationId, setConversationId] = useState(null);
  const [messageId, setMessageId] = useState(null);

  const handleCreateConversationAndMessage = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        "http://127.0.0.1:8000/create_conversation_and_message/",
        {
          method: "POST",
        }
      );
      if (!response.ok) {
        throw new Error("Failed to create conversation");
      }

      const { conversation_id, message_id } = await response.json();
      setConversationId(conversation_id);
      setMessageId(message_id);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button onClick={handleCreateConversationAndMessage} disabled={loading}>
      <div className=" p-4 border rounded-md hover:bg-opacity-50 transition duration-300 ease-in-out hover:bg-white border-black text-left ">
        <span className="pl-2 pr-2 ">&#43;</span>
        New Chat
      </div>
    </button>
  );
};

export default NewChat;
