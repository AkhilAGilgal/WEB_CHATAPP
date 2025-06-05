
export interface User {
  id: string;
  name: string;
}

export interface Room {
  id: string;
  name: string;
  createdBy?: string; 
  createdAt?: number; 
}

export interface Message {
  id: string;
  roomId: string;
  sender: User;
  text: string;
  timestamp: number;
}
