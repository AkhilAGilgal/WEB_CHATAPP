
import React from 'react';
import { Message, User } from '../types';

interface MessageItemProps {
  message: Message;
  currentUser: User;
}

const MessageItemComponent: React.FC<MessageItemProps> = ({ message, currentUser }) => {
  const isCurrentUser = message.sender.id === currentUser.id;

  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className={`flex mb-3 ${isCurrentUser ? 'justify-end' : 'justify-start'}`}>
      <div 
        className={`max-w-xs lg:max-w-md px-4 py-3 rounded-xl shadow ${
          isCurrentUser 
            ? 'bg-primary text-white rounded-br-none' 
            : 'bg-slate-200 text-textPrimary rounded-bl-none'
        }`}
      >
        {!isCurrentUser && (
          <p className="text-xs font-semibold text-indigo-500 mb-1">{message.sender.name}</p>
        )}
        <p className="text-sm break-words">{message.text}</p>
        <p 
          className={`text-xs mt-1 ${
            isCurrentUser ? 'text-blue-200 text-right' : 'text-slate-500 text-left'
          }`}
        >
          {formatDate(message.timestamp)}
        </p>
      </div>
    </div>
  );
};

export default MessageItemComponent;
