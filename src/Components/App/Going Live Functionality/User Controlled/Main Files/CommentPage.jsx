import { ChevronDown, Send, User } from 'lucide-react'
import React, { useState, useEffect, useRef } from 'react'
import { useAuth } from '../../../../../Context/authContext';

const CommentPage = ({ isVisible, onClose, commentList, sendComment }) => {
    const [comment, setComment] = useState('');
    const { userId } = useAuth();
    
    // Create a ref for the messages container
    const messagesEndRef = useRef(null);

    const sendingComment = () => {
        if(!comment) return;

        const trimmedComment = comment.trim();
        sendComment(trimmedComment);
        setComment('');
    }

    // Scroll to the bottom whenever the commentList changes
    useEffect(() => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [commentList]); // This will run every time the commentList updates

    const handleKeyDown = (e)=>{
        if(e.key == 'Enter'){
            e.preventDefault(); // Prevents new line on Enter press
            sendingComment(); 
        }
    }

    return (
        <div className={`w-[350px] h-[550px] rounded-2xl border border-gray-200 shadow-xl bg-white font-Outfit transition-all ease-in-out duration-500 flex flex-col ${isVisible ? 'opacity-100 -translate-y-5' : 'opacity-0 translate-y-0 pointer-events-none'}`}>
            {/* Header */}
            <div className='w-full flex justify-between items-center px-5 pt-4 pb-2 border-b border-gray-100'>
                <h1 className='font-Montserrat font-bold text-base text-gray-800'>Comment Section</h1>
                <ChevronDown className='cursor-pointer text-gray-400 hover:text-indigo-400 transition' onClick={onClose} />
            </div>
            
            {/* Messages */}
            <div className='flex-1 w-full flex flex-col gap-3 px-4 py-3 overflow-auto'>
                {commentList && commentList.length > 0 ? commentList.map((c, i) => (
                    c.userId !== userId ? (
                        <div key={c.timestamp + '-' + i} className='flex items-end gap-2'>
                            <div className='h-7 w-7 flex justify-center items-center bg-indigo-100 text-indigo-500 rounded-full shadow-inner'>
                                <User size={16} />
                            </div>
                            <div className='flex-1 flex flex-col'>
                                <span className='pl-2 text-[11px] text-gray-500'>{c.userName}</span>
                                <div className='max-w-[80%] px-3 py-2 bg-indigo-50 text-gray-800 rounded-2xl text-xs shadow-sm'>
                                    <span>{c.message}</span>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div key={c.timestamp + '-' + i} className='flex items-end gap-2 justify-end'>
                            <div className='flex-1 flex flex-col items-end'>
                                <span className='pr-2 text-[11px] text-gray-500'>Me</span>
                                <div className='max-w-[80%] px-3 py-2 bg-indigo-400 text-white rounded-2xl text-xs shadow-sm'>
                                    <span>{c.message}</span>
                                </div>
                            </div>
                            <div className='h-7 w-7 flex justify-center items-center bg-indigo-400 text-white rounded-full shadow-inner'>
                                <User size={16} />
                            </div>
                        </div>
                    )
                )) : 
                <div className='w-full h-full flex flex-col justify-center items-center gap-3'>
                    <div className='text-gray-400'>No comments yet</div>
                </div>
                }

                {/* The div that will be used to scroll to the bottom */}
                <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className='w-full px-4 py-3 border-t border-gray-100 flex gap-2 items-center bg-white'>
                <input value={comment} onChange={(e) => setComment(e.target.value)} type="text" className='h-8 w-full border border-gray-200 rounded-xl text-black text-sm pl-3 outline-none focus:border-indigo-300 transition' placeholder="Type your message..." onKeyDown={handleKeyDown} />
                <button  className='rounded-full cursor-pointer p-2 bg-indigo-400 hover:bg-indigo-500 transition text-white flex items-center justify-center shadow' title="Send" onClick={sendingComment}>
                    <Send size={16}  />
                </button>
            </div>
        </div>
    )
}

export default CommentPage;
