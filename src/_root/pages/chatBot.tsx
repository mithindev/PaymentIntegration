import { useState } from 'react';
import ReactMarkdown from 'react-markdown'; 

const ChatBot = () => {
  const [messages, setMessages] = useState([]);
  const [userInput, setUserInput] = useState('');
  const [loading, setLoading] = useState(false); 

  const fetchChatbotResponse = async (input) => {
    try {
      const response = await fetch('http://127.0.0.1:8002/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user_id: 'user123', 
          query: input,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to fetch response from the chatbot');
      }

      const data = await response.json();
      return { botReply: data };
    } catch (error) {
      console.error('Error:', error);
      return { botReply: 'Sorry, something went wrong with the chatbot.' };
    }
  };

  const handleSendMessage = async () => {
    if (userInput.trim() === '') return;

    const newMessages = [...messages, { sender: 'user', text: userInput }];
    setMessages(newMessages);

    setUserInput(''); 
    setLoading(true); 

    const botResponse = await fetchChatbotResponse(userInput);

    setMessages([...newMessages, { sender: 'bot', text: botResponse.botReply }]);
    setLoading(false);
  };

  const handleClearChat = () => {
    setMessages([]); 
  };

  return (
    <div className="h-full flex flex-col justify-between bg-gray-800 w-[95%] mx-auto rounded-lg shadow-lg">
      <div className=" text-white py-3 rounded-t-lg flex justify-between items-center px-4">
        <h1 className="text-xl font-bold">Thottil Chatbot</h1>
        <button
          onClick={handleClearChat}
          className="px-3 py-1 bg-red-500 text-white text-sm font-bold rounded-lg hover:bg-red-600 transition-colors"
        >
          Clear Chat
        </button>
      </div>

      <div
        className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-900 rounded-b-lg"
        style={{ maxHeight: '610px' }} 
      >
        {messages.length === 0 ? (
          <p className="text-center text-gray-400">Start a conversation with ThottilAI...</p>
        ) : (
          messages.map((message, index) => (
            <div
              key={index}
              className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`p-3 rounded-lg max-w-xs break-words ${
                  message.sender === 'user' ? 'bg-green-500 text-white' : 'bg-gray-700 text-white'
                }`}
              >
                {message.sender === 'user' ? (
                  message.text
                ) : (
                  <ReactMarkdown className="prose prose-sm text-white">
                    {message.text}
                  </ReactMarkdown>
                )}
              </div>
            </div>
          ))
        )}
        
        {loading && (
          <div className="flex justify-center">
            <div className="w-8 h-8 border-4 border-t-transparent border-green-500 rounded-full animate-spin"></div>
          </div>
        )}
      </div>

      <div className="flex p-4 bg-gray-700">
        <input
          type="text"
          className="flex-grow p-3 rounded-lg bg-gray-800 text-white outline-none focus:ring-2 focus:ring-green-500"
          placeholder="Type your message..."
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
        />
        <button
          onClick={handleSendMessage}
          className="ml-3 px-4 py-2 bg-green-500 text-white font-bold rounded-lg hover:bg-green-600 transition-colors"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatBot;
