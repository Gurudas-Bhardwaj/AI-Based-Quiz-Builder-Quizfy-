import React, { useState } from 'react';
import { FaCross } from 'react-icons/fa';
import { ImCross } from 'react-icons/im';
import { MdAdminPanelSettings } from 'react-icons/md';

const AddAdmin = ({ AddAdminFun, listOfAdmin, deleteAddedAdmin }) => {
  const [email, setEmail] = useState("");
  const [selected, setSelected] = useState(false);

  // ✅ Enable submit only if checkbox is selected AND email ends with @gmail.com
  const canSubmit = selected && email.trim().endsWith("@gmail.com");

  const check = () => {
    if (!canSubmit) return;
    AddAdminFun(email);
    setEmail("");       // Clear email field after submission
    setSelected(false); // Reset checkbox
  };

  return (
    <div className="w-full lg:w-[24%] h-full hidden sm:flex justify-center">
      <div className="w-full flex justify-center rounded-2xl h-full items-center">
        <div className="bg-white h-[97%] mr-3 pb-10 overflow-auto mt-6 border border-stone-300 rounded-2xl w-full hidden lg:flex flex-col">
          
          {/* Admin Panel Header */}
          <div>
            <h1 className="flex font-Outfit pt-3 pl-2 font-semibold items-center text-indigo-400 text-2xl gap-2">
              <MdAdminPanelSettings /> Admin Panel:
            </h1>
          </div>

          {/* List of Admins */}
          <div className="font-Outfit min-h-[280px] w-full pt-4 pl-4">
            <div className="w-full h-full flex flex-col gap-4">
              <h1 className="font-semibold text-indigo-400">Admins Other than you:</h1>
              <div className="w-full h-[90%] overflow-auto flex flex-col gap-3">
                {listOfAdmin && listOfAdmin.length > 0 ? (
                  listOfAdmin.map((admin, index) => (
                    <div
                      key={index}
                      className="flex justify-between items-center bg-stone-50 p-3 rounded-lg shadow-sm border border-stone-300"
                    >
                      <div className="flex flex-col">
                        <p className="font-Outfit text-sm text-stone-600">{admin.userName}</p>
                        <p className="font-Outfit text-xs text-stone-400">{admin.userGmail}</p>
                      </div>
                      <ImCross
                        size={18}
                        className="cursor-pointer text-red-400 hover:text-red-600"
                        onClick={()=>deleteAddedAdmin(admin.userId, admin._userName)} // Placeholder for delete
                      />
                    </div>
                  ))
                ) : (
                  <p className="text-stone-500 text-sm">No admins found.</p>
                )}
              </div>
            </div>
          </div>

          {/* Separator */}
          <div className="w-[90%] border-t-2 border-stone-300 mt-4 mb-2 h-1 ml-4" />

          {/* Add Admin Form */}
          <div className="w-full pl-4">
            <h1 className="font-semibold font-Outfit text-indigo-400">Add Admin:</h1>
            <div className="pt-3 flex flex-col gap-2">
              
              {/* Email Input */}
              <div className="flex flex-col font-Outfit">
                <label htmlFor="email" className="text-sm pl-1 text-stone-600">Email of Admin:</label>
                <input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  type="email"
                  name="email"
                  id="email"
                  placeholder="admin@gmail.com"
                  className="h-8 w-[90%] pl-2 rounded-2xl bg-stone-200"
                />
              </div>

              {/* Checkbox */}
              <div className="pt-2 pl-2 flex gap-1 items-center">
                <input
                  type="checkbox"
                  onChange={() => setSelected(!selected)}
                  checked={selected}
                  id="permission"
                  className="border mt-1 accent-indigo-400 cursor-pointer hover:accent-indigo-600 rounded-2xl h-4 w-4"
                />
                <label htmlFor="permission" className="cursor-pointer font-Outfit text-sm text-stone-600">
                  I accept to create this person the admin of this presentation!
                </label>
              </div>

              {/* Info Text */}
              <p className="text-sm font-Outfit text-stone-500 mt-2">
                After creating someone admin, they can directly access and manipulate this presentation. The given email must be registered with us.
              </p>

              {/* Submit Button */}
              <div className="w-full flex justify-center items-center mt-2">
                <button
                  onClick={check}
                  disabled={!canSubmit}
                  className={`pt-1 pb-1 pl-5 pr-5 font-Outfit rounded-2xl text-white flex justify-center items-center transition-all duration-200 ${
                    canSubmit ? "bg-indigo-400 hover:bg-indigo-500 cursor-pointer" : "bg-gray-400 cursor-not-allowed"
                  }`}
                >
                  Submit
                </button>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default AddAdmin;
