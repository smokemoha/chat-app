import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [messages, setMessages] = useState<{id: number, text: string, sender: 'user' | 'contact'}[]>([
    {id: 1, text: "Hey there!", sender: 'contact'},
    {id: 2, text: "Hi! How are you?", sender: 'user'},
    {id: 3, text: "I'm doing well, thanks for asking!", sender: 'contact'}
  ]);
  
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [typingTimeout, setTypingTimeout] = useState<number | null>(null);
  const [showContactStatus, setShowContactStatus] = useState(false);
  const [contactStatus, setContactStatus] = useState<'typing' | 'recording' | null>(null);

  // Simulate contact typing or recording when user types or records
  useEffect(() => {
    if (isTyping || isRecording) {
      // Wait a bit before showing contact status
      const delay = Math.random() * 2000 + 1000; // 1-3 seconds
      const timer = setTimeout(() => {
        setShowContactStatus(true);
        setContactStatus(isTyping ? 'typing' : 'recording');
      }, delay);
      
      return () => clearTimeout(timer);
    }
  }, [isTyping, isRecording]);

  // Handle input change and trigger typing indicator
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputText(e.target.value);
    
    // Clear any existing timeout
    if (typingTimeout) {
      clearTimeout(typingTimeout);
    }
    
    // Set typing status
    setIsTyping(true);
    
    // Set a timeout to clear typing status after 2 seconds of inactivity
    const timeout = window.setTimeout(() => {
      setIsTyping(false);
    }, 2000);
    
    setTypingTimeout(timeout as unknown as number);
  };

  // Handle send message
  const handleSendMessage = () => {
    if (inputText.trim()) {
      const newMessage = {
        id: messages.length + 1,
        text: inputText,
        sender: 'user' as const
      };
      
      setMessages([...messages, newMessage]);
      setInputText('');
      setIsTyping(false);
      
      // Simulate contact response
      setTimeout(() => {
        setShowContactStatus(false);
        setContactStatus(null);
        
        // After a delay, add a response message
        setTimeout(() => {
          const responseMessage = {
            id: messages.length + 2,
            text: "I see your message! Thanks for testing this app.",
            sender: 'contact' as const
          };
          setMessages(prev => [...prev, responseMessage]);
        }, 1500);
      }, 1000);
    }
  };

  // Handle voice recording
  const handleRecordVoice = () => {
    setIsRecording(!isRecording);
    setIsTyping(false);
    
    if (!isRecording) {
      // Started recording
      // In a real app, this would trigger actual recording
    } else {
      // Stopped recording, simulate sending a voice message
      const newMessage = {
        id: messages.length + 1,
        text: "🎤 Voice message",
        sender: 'user' as const
      };
      
      setMessages([...messages, newMessage]);
      
      // Simulate contact response
      setTimeout(() => {
        setShowContactStatus(false);
        setContactStatus(null);
        
        setTimeout(() => {
          const responseMessage = {
            id: messages.length + 2,
            text: "I received your voice message!",
            sender: 'contact' as const
          };
          setMessages(prev => [...prev, responseMessage]);
        }, 1500);
      }, 1000);
    }
  };

  // Handle key press (Enter to send)
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  return (
    <div className="chat-app">
      <header className="chat-header">
        <div className="contact-info">
          <div className="contact-avatar">
            <span>👤</span>
          </div>
          <div className="contact-name">Sadisu</div>
        </div>
      </header>
      
      <div className="chat-messages">
        {messages.map(message => (
          <div 
            key={message.id} 
            className={`message ${message.sender === 'user' ? 'user-message' : 'contact-message'}`}
          >
            {message.text}
          </div>
        ))}
        
        {/* Status indicators */}
        {showContactStatus && contactStatus && (
          <div className="status-indicator">
            {contactStatus === 'typing' ? (
              <div className="typing-indicator">
                <span className="dot"></span>
                <span className="dot"></span>
                <span className="dot"></span>
                <div className="typing-text">Contact is typing...</div>
              </div>
            ) : (
              <div className="recording-indicator">
                <span className="recording-icon">🎤</span>
                <div className="recording-text">Contact is recording audio...</div>
              </div>
            )}
          </div>
        )}
      </div>
      
      <div className="chat-input">
        {/* Your status indicators */}
        {isTyping && (
          <div className="your-status">You are typing...</div>
        )}
        {isRecording && (
          <div className="your-status recording">Recording voice message... 🎤</div>
        )}
        
        <div className="input-container">
          <input
            type="text"
            value={inputText}
            onChange={handleInputChange}
            onKeyPress={handleKeyPress}
            placeholder="Type a message..."
            disabled={isRecording}
          />
          <button 
            className={`voice-button ${isRecording ? 'recording' : ''}`} 
            onClick={handleRecordVoice}
          >
            {isRecording ? '■' : '🎤'}
          </button>
          <button 
            className="send-button" 
            onClick={handleSendMessage}
            disabled={!inputText.trim() && !isRecording}
          >
            ➤
          </button>
        </div>
      </div>
    </div>
  )
}

export default App
