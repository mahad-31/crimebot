import { useState } from "react";

function ChatBox() {
  // Initialize the messages state with a welcome message
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([
    { text: "Welcome to the Crime Bot! How can I assist you today?", sender: "bot" }
  ]);

  const sendMessage = async () => {
    if (input.trim() === "") return;

    const userMessage = { text: input, sender: "user" };
    setMessages([...messages, userMessage]);

    setInput("");

    const response = await fetch("http://localhost:5000/api/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ message: input }),
    });

    const data = await response.json();

    const botMessage = { text: data.response, sender: "bot" };
    setMessages((prevMessages) => [...prevMessages, botMessage]);
    console.log(data.response);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-black to-white p-4">
      <h1 className="text-4xl mb-5 text-White  font-SpaceGrotesk">Crime Bot</h1>
      <div className="w-full max-w-lg p-6 bg-white rounded-lg shadow-lg">
        
        <div className="h-96 md:h-80 lg:h-96 overflow-y-auto mb-4 p-4 bg-gray-200 rounded-lg">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`my-2 flex ${
                msg.sender === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`max-w-xs break-words font-SpaceGrotesk px-4 py-2 rounded-lg ${
                  msg.sender === "user"
                    ? "bg-black text-white"
                    : "bg-gray-300 text-black"
                }`}
              >
                {msg.text}
              </div>
            </div>
          ))}
        </div>
        <div className="flex">
          <input
            type="text"
            className="flex-1 px-4 py-2 border rounded-l-lg"
            placeholder="Enter case details..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          />
          <button
            onClick={sendMessage}
            className="px-4 py-2 bg-black text-white rounded-r-lg hover:bg-yellow-400 hover:text-black transition-colors duration-300"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}

export default ChatBox;
