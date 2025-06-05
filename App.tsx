import React, { useState, useEffect, useCallback } from 'react';
import { User, Room, Message } from './types';
import { chatService } from './services/chatService';
import LoginComponent from './components/LoginComponent';
import RoomListComponent from './components/RoomListComponent';
import ChatRoomComponent from './components/ChatRoomComponent';
import SpinnerComponent from './components/SpinnerComponent';

const App: React.FC = () => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [rooms, setRooms] = useState<Room[]>([]);
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);

  const [isLoadingLogin, setIsLoadingLogin] = useState<boolean>(false);
  const [loginError, setLoginError] = useState<string | null>(null);

  const [isLoadingRooms, setIsLoadingRooms] = useState<boolean>(false);
  const [roomsError, setRoomsError] = useState<string | null>(null);
  // isCreatingRoom state removed

  const [isLoadingMessages, setIsLoadingMessages] = useState<boolean>(false);
  const [messagesError, setMessagesError] = useState<string | null>(null);
  const [isSendingMessage, setIsSendingMessage] = useState<boolean>(false);

  const handleLogin = useCallback(async (username: string) => {
    setIsLoadingLogin(true);
    setLoginError(null);
    try {
      const user = await chatService.login(username);
      setCurrentUser(user);
    } catch (err) {
      if (err instanceof Error) {
        setLoginError(err.message);
      } else {
        setLoginError('An unknown error occurred during login.');
      }
    } finally {
      setIsLoadingLogin(false);
    }
  }, []);

  const fetchRooms = useCallback(async () => {
    if (!currentUser) return;
    setIsLoadingRooms(true);
    setRoomsError(null);
    try {
      const fetchedRooms = await chatService.getRooms();
      setRooms(fetchedRooms);
      // If no room is selected and rooms are fetched, select the first one by default.
      // This is optional, but improves UX for a simplified app.
      if (fetchedRooms.length > 0 && !selectedRoom) {
        setSelectedRoom(fetchedRooms[0]);
      }
    } catch (err) {
       if (err instanceof Error) {
        setRoomsError(err.message);
      } else {
        setRoomsError('Failed to fetch rooms.');
      }
    } finally {
      setIsLoadingRooms(false);
    }
  }, [currentUser, selectedRoom]); // Added selectedRoom to dependency to avoid re-selecting if one is already chosen

  useEffect(() => {
    if (currentUser) {
      fetchRooms();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentUser]); // fetchRooms is memoized

  const handleSelectRoom = useCallback((room: Room) => {
    setSelectedRoom(room);
    setMessages([]); 
    setMessagesError(null);
  }, []);

  const fetchMessages = useCallback(async () => {
    if (!selectedRoom) return;
    setIsLoadingMessages(true);
    setMessagesError(null);
    try {
      const fetchedMessages = await chatService.getMessages(selectedRoom.id);
      setMessages(fetchedMessages);
    } catch (err) {
      if (err instanceof Error) {
        setMessagesError(err.message);
      } else {
        setMessagesError('Failed to load messages for this room.');
      }
    } finally {
      setIsLoadingMessages(false);
    }
  }, [selectedRoom]);

  useEffect(() => {
    if (selectedRoom) {
      fetchMessages();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedRoom]); // fetchMessages is memoized


  const handleSendMessage = useCallback(async (text: string) => {
    if (!currentUser || !selectedRoom) return;
    setIsSendingMessage(true);
    try {
      const newMessage = await chatService.sendMessage(selectedRoom.id, text, currentUser);
      setMessages((prevMessages) => [...prevMessages, newMessage]);
      setMessagesError(null); // Clear previous send errors on success
    } catch (err) {
      console.error("Failed to send message:", err);
      if (err instanceof Error) {
        setMessagesError(`Failed to send: ${err.message}.`);
      } else {
        setMessagesError('Failed to send message. Please try again.');
      }
    } finally {
      setIsSendingMessage(false);
    }
  }, [currentUser, selectedRoom]);

  // handleCreateRoom and related logic removed

  if (!currentUser) {
    return <LoginComponent onLogin={handleLogin} isLoading={isLoadingLogin} error={loginError} />;
  }
  
  // Simplified initial loading state check
  if (isLoadingRooms && rooms.length === 0) { 
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-slate-900 text-white">
        <SpinnerComponent size="w-16 h-16" />
        <p className="mt-4 text-xl">Loading chat rooms...</p>
      </div>
    );
  }


  return (
    <div className="flex flex-col md:flex-row h-screen antialiased text-textPrimary bg-background">
      <RoomListComponent
        rooms={rooms}
        currentUser={currentUser}
        selectedRoomId={selectedRoom?.id || null}
        onSelectRoom={handleSelectRoom}
        isLoadingRooms={isLoadingRooms}
        // onCreateRoom and isCreatingRoom props removed
      />
      <ChatRoomComponent
        room={selectedRoom}
        messages={messages}
        currentUser={currentUser}
        onSendMessage={handleSendMessage}
        isLoadingMessages={isLoadingMessages}
        isSendingMessage={isSendingMessage}
        errorMessages={messagesError}
      />
       {roomsError && (
        <div 
            className="fixed bottom-4 right-4 bg-red-600 text-white p-3 rounded-lg shadow-xl z-50"
            role="alert"
            aria-live="assertive"
        >
          <p className="font-semibold">Error:</p>
          <p>{roomsError}</p>
        </div>
      )}
    </div>
  );
};

export default App;
