
import React, { useState } from 'react';
import SpinnerComponent from './SpinnerComponent';

interface MessageInputProps {
  onSendMessage: (text: string) => Promise<void>;
  isSending: boolean;
}

const SendIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className || "w-6 h-6"}>
    <path d="M3.478 2.404a.75.75 0 0 0-.926.941l2.432 7.905H13.5a.75.75 0 0 1 0 1.5H4.984l-2.432 7.905a.75.75 0 0 0 .926.94 60.519 60.519 0 0 0 18.445-8.986.75.75 0 0 0 0-1.218A60.517 60.517 0 0 0 3.478 2.404Z" />
  </svg>
);


const MessageInputComponent: React.FC<MessageInputProps> = ({ onSendMessage, isSending }) => {
  const [text, setText] = useState<string>('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (text.trim() && !isSending) {
      await onSendMessage(text.trim());
      setText('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 bg-slate-100 border-t border-slate-300">
      <div className="flex items-center gap-3">
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Type your message..."
          className="flex-grow px-4 py-3 border border-slate-300 rounded-full focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-colors text-textPrimary bg-white"
          disabled={isSending}
        />
        <button
          type="submit"
          disabled={isSending || !text.trim()}
          className="bg-primary hover:bg-blue-600 text-white font-semibold p-3 rounded-full transition-colors duration-150 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center"
        >
          {isSending ? <SpinnerComponent size="w-5 h-5" color="text-white"/> : <SendIcon className="w-5 h-5" />}
        </button>
      </div>
    </form>
  );
};

export default MessageInputComponent;
