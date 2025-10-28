import { CirclePlus } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import logo from '../../../../../assets/Images/Logo/LOGO.png'
import Slogan from '../../../../Messages/Slogan.jsx'

const ShareLink = ({presentationId, onClose}) => {
    const [link, setLink] = useState(`https://quizify-jlg9.onrender.com/Join/UserControlledQuiz/Live/${presentationId}`);
    const[show,setShow] = useState(false);

    useEffect(() => {
        setLink(`https://quizify-jlg9.onrender.com/Join/UserControlledQuiz/Live/${presentationId}`);
    }, [presentationId]);

    const copyLink = () => {
        navigator.clipboard.writeText(link).then(() => {
            
            setShow(true);
            setTimeout(() => {
                setShow(false);
            }, 2000);
        }).catch((err) => {
            console.error("Failed to copy link: ", err);
        });
        
    }
  return (
    <div className=' w-screen h-screen fixed flex justify-center items-center transition-all duration-500 ease-out inset-0 bg-black/40 z-50 '>
        <div className='bg-white p-4 w-[35%] border-white rounded-2xl shadow-lg'>
            <div>
                <div className='font-Montserrat font-bold flex justify-between'>
                    <h1>Share this Presentation</h1>
                    <CirclePlus className='rotate-45 cursor-pointer' onClick={onClose}/>
                </div>

                <div className='flex justify-center items-center gap-2 mt-8'>
                    <input type="text" className='h-6 text-xs pl-1 w-[80%] font-Outfit border border-stone-200 rounded-md bg-stone-200 ' value={link} />
                    <button className='text-sm cursor-pointer font-Outfit p-1 bg-black rounded-md text-white pl-2 pr-2' onClick={copyLink}>Copy</button>
                </div>


                <div className='w-[100%] mt-10 flex justify-center mb-5 items-center'>
                    <div className='w-[90%] h-2 border-t border-t-stone-400'></div>
                </div>

                <div className='w-full justify-center items-center flex'>
                    <img src={logo} className='w-32' alt="" />
                </div>
            </div>
        </div>
        <div>
            <div className={`absolute top-[80%] left-[50%] flex justify-center items-center gap-2 ${show?"flex":"hidden"}`}>
                <Slogan  status={true}   details='Copied!'   />
            </div>
        </div>
    </div>
  )
}

export default ShareLink
