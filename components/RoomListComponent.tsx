import React from 'react';
import { Room, User } from '../types';
import SpinnerComponent from './SpinnerComponent';

interface RoomListComponentProps {
  rooms: Room[];
  currentUser: User | null;
  selectedRoomId: string | null;
  onSelectRoom: (room: Room) => void;
  isLoadingRooms: boolean;
}

const RoomListComponent: React.FC<RoomListComponentProps> = ({
  rooms,
  currentUser,
  selectedRoomId,
  onSelectRoom,
  isLoadingRooms,
}) => {
  return (
    <div className="w-full md:w-1/4 bg-slate-800 p-4 flex flex-col h-full border-r border-slate-700">
      <div className="mb-6 p-3 bg-slate-700 rounded-lg shadow">
        <h3 className="text-xl font-semibold text-white truncate">
          Hi, <span className="text-primary">{currentUser?.name}</span>!
        </h3>
        <p className="text-xs text-slate-400">Select a room to chat.</p>
      </div>
      
      {/* Room creation form removed */}

      <h4 className="text-lg font-semibold text-white mb-3">Available Rooms</h4>
      {isLoadingRooms ? (
        <div className="flex justify-center items-center h-32">
          <SpinnerComponent color="text-slate-400" />
        </div>
      ) : rooms.length === 0 ? (
         <p className="text-slate-400 text-sm">No rooms available at the moment.</p>
      ) : (
        <ul className="space-y-2 overflow-y-auto flex-grow pr-1 scrollbar-thin scrollbar-thumb-slate-600 scrollbar-track-slate-700">
          {rooms.map((room) => (
            <li key={room.id}>
              <button
                onClick={() => onSelectRoom(room)}
                className={`w-full text-left px-4 py-3 rounded-md transition-all duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-opacity-50
                  ${
                    selectedRoomId === room.id
                      ? 'bg-primary text-white shadow-md scale-105'
                      : 'bg-slate-700 text-slate-200 hover:bg-slate-600 hover:text-white'
                  }
                `}
                aria-pressed={selectedRoomId === room.id}
                aria-label={`Select room ${room.name}`}
              >
                <span className="font-medium">{room.name}</span>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default RoomListComponent;
