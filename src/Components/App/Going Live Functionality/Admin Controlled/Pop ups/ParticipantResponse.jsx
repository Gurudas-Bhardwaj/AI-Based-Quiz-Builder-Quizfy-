import React from 'react';
import { ChevronDown } from 'lucide-react';

const ParticipantResponse = ({ isVisible, onClose, participantList = [], participantResponses = [] }) => {
  return (
    <div className={`w-[350px] h-[550px] rounded-2xl border border-gray-200 shadow-xl bg-white font-Outfit transition-all ease-in-out duration-500 flex flex-col ${isVisible ? 'opacity-100 -translate-y-5' : 'opacity-0 translate-y-0 pointer-events-none'}`}>
      {/* Header */}
      <div className='w-full flex justify-between items-center px-5 pt-4 pb-2 border-b border-gray-100'>
        <h1 className='font-Montserrat font-bold text-base text-gray-800'>Participants</h1>
        <ChevronDown className='cursor-pointer text-gray-400 hover:text-indigo-400 transition' onClick={onClose} />
      </div>
      {/* Responses Section */}
      <div className='flex-1 w-full flex flex-col gap-4 px-4 py-3 overflow-auto'>
        <div>
          <h2 className='text-sm font-semibold text-gray-700 mb-2'>Responses By</h2>
          <div className='overflow-auto max-h-[180px] flex flex-col gap-2 pr-1'>
            {participantResponses.length === 0 ? (
              <p className='text-sm text-gray-400'>No responses yet.</p>
            ) : (
              participantResponses.map((r, i) => (
                <div key={r.timestamp + '-' + i} className='flex items-center gap-2 bg-indigo-50 rounded-xl px-3 py-2 shadow-sm'>
                  <span className='bg-indigo-400 text-white rounded-xl px-3 py-1 text-xs font-semibold'>{r.userName}</span>
                  <span className='bg-indigo-100 text-indigo-600 rounded-xl px-2 py-1 text-xs'>Q{(r.questionIndex ?? 0) + 1}</span>
                  <span className='bg-indigo-100 text-indigo-600 rounded-full px-2 py-1 text-xs'>{r.optionLabel ?? (typeof r.optionIndex === 'number' ? String.fromCharCode(65 + r.optionIndex) : '?')}</span>
                  <span className='text-xs text-gray-700'>{r.optionText || ''}</span>
                </div>
              ))
            )}
          </div>
        </div>
        {/* Joined By Section */}
        <div>
          <h2 className='text-sm font-semibold text-gray-700 mb-2'>Joined By</h2>
          <div className={`overflow-auto max-h-[120px] ${participantList.length > 0 ? 'grid grid-cols-3 gap-2' : 'flex justify-center items-center'} pr-1`}>
            {participantList.length === 0 ? (
              <p className='text-sm text-center text-gray-400'>No participants joined yet.</p>
            ) : (
              participantList.map((participant) => (
                <span key={participant.userId} className='bg-indigo-100 text-indigo-600 rounded-xl px-3 py-1 text-xs font-Outfit text-center shadow'>{participant.userName}</span>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ParticipantResponse;
