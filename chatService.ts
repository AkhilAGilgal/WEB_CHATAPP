import { User, Room, Message } from '../types';

let mockUsers: User[] = [];
let mockRooms: Room[] = [
  { id: 'general', name: '🚀 General Discussion' },
  { id: 'tech-talk', name: '💻 Tech Talk' },
  { id: 'random', name: '🎉 Random Chats' },
];
let mockMessages: Message[] = [
  { id: 'msg1', roomId: 'general', sender: { id: 'system-1', name: 'System' }, text: 'Welcome to General Discussion! Feel free to chat about anything.', timestamp: Date.now() - 15000 },
  { id: 'msg2', roomId: 'tech-talk', sender: { id: 'system-2', name: 'System' }, text: 'Welcome to Tech Talk! Discuss your favorite technologies here.', timestamp: Date.now() - 8000 },
  { id: 'msg3', roomId: 'random', sender: { id: 'system-3', name: 'System' }, text: 'Welcome to Random! Let the fun begin.', timestamp: Date.now() - 3000 },
];

let messageIdCounter = mockMessages.length + 1;
// Room creation is removed, so roomIdCounter is no longer needed for dynamic creation.

export const chatService = {
  login: async (name: string): Promise<User> => {
    return new Promise((resolve, reject) => {
      if (!name.trim()) {
        reject(new Error("Username cannot be empty."));
        return;
      }
      setTimeout(() => {
        const existingUser = mockUsers.find(u => u.name.toLowerCase() === name.toLowerCase());
        if (existingUser) {
          resolve(existingUser);
          return;
        }
        const newUser: User = { id: `user-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`, name };
        mockUsers.push(newUser);
        resolve(newUser);
      }, 500);
    });
  },

  getRooms: async (): Promise<Room[]> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        // Sort by name if createdAt is not consistently available or relevant
        resolve([...mockRooms].sort((a, b) => a.name.localeCompare(b.name)));
      }, 300);
    });
  },

  // createRoom functionality is removed as per simplification request.
  // createRoom: async (name: string, user: User): Promise<Room> => { ... }

  getMessages: async (roomId: string): Promise<Message[]> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(mockMessages.filter(msg => msg.roomId === roomId).sort((a, b) => a.timestamp - b.timestamp));
      }, 200);
    });
  },

  sendMessage: async (roomId: string, text: string, sender: User): Promise<Message> => {
    return new Promise((resolve, reject) => {
      if (!text.trim()) {
        reject(new Error("Message cannot be empty."));
        return;
      }
      setTimeout(() => {
        const newMessage: Message = {
          id: `msg-${messageIdCounter++}-${Math.random().toString(36).substring(2, 7)}`,
          roomId,
          sender,
          text,
          timestamp: Date.now(),
        };
        mockMessages.push(newMessage);
        resolve(newMessage);
      }, 100);
    });
  },
};
