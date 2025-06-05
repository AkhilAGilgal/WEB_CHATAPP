
import React, { useEffect, useRef } from 'react';
import { Room, Message, User } from '../types';
import MessageItemComponent from './MessageItemComponent';
import MessageInputComponent from './MessageInputComponent';
import SpinnerComponent from './SpinnerComponent';

interface ChatRoomProps {
  room: Room | null;
  messages: Message[];
  currentUser: User | null;
  onSendMessage: (text: string) => Promise<void>;
  isLoadingMessages: boolean;
  isSendingMessage: boolean;
  errorMessages: string | null;
}

const ChatRoomComponent: React.FC<ChatRoomProps> = ({
  room,
  messages,
  currentUser,
  onSendMessage,
  isLoadingMessages,
  isSendingMessage,
  errorMessages
}) => {
  const messagesEndRef = useRef<null | HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  if (!currentUser) return null; // Should be handled by App's logic usually

  if (!room) {
    return (
      <div className="flex-grow flex flex-col items-center justify-center bg-slate-50 p-4 text-center">
        <img src="https://picsum.photos/seed/chatwelcome/300/200" alt="Welcome illustration" className="rounded-lg shadow-md mb-6" />
        <h2 className="text-2xl font-semibold text-textPrimary mb-2">Welcome to the Chat!</h2>
        <p className="text-textSecondary">Select a room from the sidebar to start chatting, or create a new one.</p>
        <p className="text-xs text-slate-400 mt-4">Let the conversations begin! ✨</p>
      </div>
    );
  }

  return (
    <div className="flex-grow flex flex-col bg-slate-50 h-full">
      {/* Chat Header */}
      <header className="p-4 bg-white border-b border-slate-300 shadow-sm">
        <h2 className="text-xl font-bold text-primary">{room.name}</h2>
        <p className="text-xs text-textSecondary">
          {messages.length} message{messages.length !== 1 ? 's' : ''}
        </p>
      </header>

      {/* Messages Area */}
      <div className="flex-grow p-4 overflow-y-auto space-y-2 scrollbar-thin scrollbar-thumb-slate-400 scrollbar-track-slate-200">
        {isLoadingMessages ? (
          <div className="flex justify-center items-center h-full">
            <SpinnerComponent size="w-12 h-12" color="text-primary"/>
            <p className="ml-3 text-textSecondary">Loading messages...</p>
          </div>
        ) : errorMessages ? (
           <div className="flex flex-col justify-center items-center h-full text-center">
            <p className="text-red-500 text-lg mb-2">Oops! Something went wrong.</p>
            <p className="text-textSecondary">{errorMessages}</p>
            <p className="text-xs text-slate-400 mt-2">Try selecting the room again.</p>
          </div>
        ) : messages.length === 0 ? (
          <div className="flex flex-col justify-center items-center h-full text-center">
             <img src={`https://picsum.photos/seed/${room.id}/200/150`} alt="Empty room" className="rounded-lg shadow-sm mb-4" />
            <p className="text-textSecondary">No messages in this room yet.</p>
            <p className="text-sm text-slate-400">Be the first to say something!</p>
          </div>
        ) : (
          messages.map((msg) => (
            <MessageItemComponent key={msg.id} message={msg} currentUser={currentUser} />
          ))
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Message Input */}
      <MessageInputComponent onSendMessage={onSendMessage} isSending={isSendingMessage} />
    </div>
  );
};

export default ChatRoomComponent;
