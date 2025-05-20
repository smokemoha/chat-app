# Chat Status Indicators Web App

A real-time chat application that demonstrates typing and voice recording status indicators similar to WhatsApp and Telegram. This project showcases how these interactive status features work in modern messaging applications.

![Chat Status App Screenshot](/home/ubuntu/screenshots/5173-i6jiawbb9c0zkj3_2025-05-19_04-18-39_2890.webp)

## Tech Stack

This project is built with the following technologies:

- **React 18** - A JavaScript library for building user interfaces
- **TypeScript** - Adds static type definitions to enhance code quality and developer experience
- **Vite** - Next generation frontend tooling for faster development and optimized builds
- **Tailwind CSS** - A utility-first CSS framework for rapid UI development
- **shadcn/ui** - A collection of reusable components built with Radix UI and Tailwind CSS
- **CSS Animations** - Custom animations for typing indicators and recording status

## Features

- **Real-time Typing Indicators** - Shows when a user is typing a message
- **Voice Recording Status** - Displays when a user is recording a voice message
- **Animated Status Indicators** - Visual feedback with animated dots for typing and pulsing icon for recording
- **Responsive Design** - Works on both desktop and mobile devices
- **Simulated Chat Experience** - Demonstrates the full messaging experience with simulated responses

## Project Structure

```
chat-app/
├── public/               # Static assets (images, favicon, etc.)
├── src/                  # Source code directory
│   ├── assets/           # Images, icons, and other static resources
│   ├── components/       # Reusable UI components
│   │   └── ui/           # shadcn/ui components (pre-styled components)
│   ├── hooks/            # Custom React hooks for shared logic
│   ├── lib/              # Utility functions and helper methods
│   ├── App.css           # Main application styles specific to App component
│   ├── App.tsx           # Main application component that renders the chat interface
│   ├── index.css         # Global styles applied to the entire application
│   └── main.tsx          # Entry point that renders the App component to the DOM
├── vite.config.ts        # Vite configuration for build and development settings
├── tsconfig.json         # TypeScript configuration for type checking
├── package.json          # Project dependencies and scripts
├── index.html            # HTML entry point for the application
├── pnpm-lock.yaml        # Lock file for pnpm dependencies (ensures consistent installs)
└── tsconfig.app.json     # Additional TypeScript configuration specific to the app   
```

## How It Works

### Typing Indicator Implementation

The typing indicator is implemented using React state and useEffect hooks:

1. When a user types in the input field, the `isTyping` state is set to true
2. A timeout is set to automatically clear the typing status after 2 seconds of inactivity
3. The typing status triggers a visual indicator with animated dots
4. When the contact sees the user typing, a simulated response is triggered after a random delay

```typescript
// Simplified example from App.tsx
const [isTyping, setIsTyping] = useState(false);
const [typingTimeout, setTypingTimeout] = useState<number | null>(null);

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
```

### Voice Recording Indicator Implementation

The voice recording indicator uses a toggle state and animation:

1. When the microphone button is clicked, the `isRecording` state is toggled
2. The recording status is visually indicated with a pulsing animation
3. The contact is shown a "recording audio" status after a short delay
4. When recording is stopped, a simulated voice message is sent

```typescript
// Simplified example from App.tsx
const [isRecording, setIsRecording] = useState(false);

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
    // ...
  }
};
```

## CSS Animation Details

The typing indicator uses a bouncing animation for the dots:

```css
.dot {
  height: 8px;
  width: 8px;
  margin: 0 1px;
  background-color: var(--typing-dot-color);
  border-radius: 50%;
  display: inline-block;
  animation: bounce 1.4s infinite ease-in-out both;
}

@keyframes bounce {
  0%, 80%, 100% { 
    transform: scale(0);
  } 40% { 
    transform: scale(1.0);
  }
}
```

The recording indicator uses a pulsing animation:

```css
.recording-icon {
  color: var(--recording-color);
  animation: pulse 1.5s infinite;
  margin-right: 4px;
}

@keyframes pulse {
  0% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
  100% {
    opacity: 1;
  }
}
```

## Setup and Installation

1. Clone the repository:
```
git clone https://github.com/smokemoha/chat-app
cd chat-app
```
2. Install dependencies:
   ```
   pnpm install
   ```
3. Start the development server:
   ```
   pnpm run dev
   ```
4. Open your browser and navigate to `http://localhost:5173`

## Building for Production

To create a production build:

```
pnpm run build
```

The build output will be in the `dist` directory.

## Development Notes

- The app uses simulated responses to demonstrate the real-time nature of messaging apps
- In a production environment, this would be connected to a real-time backend using WebSockets or similar technology
- The status indicators are triggered locally but could be integrated with a real-time API

## Future Enhancements

- Add WebSocket integration for true real-time communication
- Implement actual voice recording functionality
- Add user authentication
- Add message persistence with a database
- Implement read receipts and message status indicators

## License

MIT
its free to use 
## Author

Created as a demonstration of real-time status indicators in modern messaging applications, project was created with the curiosity mindset of how the logic actually worked.
