import React from 'react';
import { User } from 'lucide-react';

const JoiningPopup = ({ userName = 'User', userAvatar }) => {
  return (
    <div className="absolute font-Outfit top-6 right-8 z-50 min-w-[180px] max-w-xs px-4 py-3 bg-white border border-gray-200 rounded-xl shadow-lg flex items-center gap-3 animate-fadeInUp">
      {userAvatar ? (
        <img src={userAvatar} alt={userName} className="h-8 w-8 rounded-full object-cover border border-indigo-100" />
      ) : (
        <div className="h-8 w-8 rounded-full bg-indigo-100 flex items-center justify-center">
          <User className="text-indigo-400" size={20} />
        </div>
      )}
      <div className="flex flex-col">
        <span className="font-semibold text-gray-800 text-sm">{userName}</span>
        <span className="text-xs text-gray-500">Just Joined</span>
      </div>
    </div>
  );
};

export default JoiningPopup;
