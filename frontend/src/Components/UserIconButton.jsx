import { useEffect, useRef, useState } from "react";
import { FaUserCircle, FaSignInAlt, FaUserPlus,FaSignOutAlt, FaHome } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";
import axios from 'axios'

const UserIconButton = () => {
  const { isAuth } = useAuth();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);

  /* ===== CLOSE ON OUTSIDE CLICK ===== */
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={menuRef} className="fixed top-6 right-6 z-50">
      {/* USER ICON */}
      <button
        onClick={() => setOpen(!open)}
        className="text-gray-300 hover:text-white transition"
      >
        <FaUserCircle size={40} />
      </button>

      {/* DROPDOWN */}
      {open && (
        <div className="absolute right-0 mt-3 w-44 bg-[#020617] border border-gray-800 rounded-xl shadow-xl">
           (
            <>
              <MenuItem
                icon={<FaSignInAlt />}
                text="Login"
                onClick={() => {
                  navigate("/login");
                  setOpen(false);
                }}
              />
              <MenuItem
                icon={<FaUserPlus />}
                text="Sign Up"
                onClick={() => {
                  navigate("/signup");
                  setOpen(false);
                }}
              />
              <MenuItem
                icon={<FaSignOutAlt />}
                text="Log Out"
                onClick={async() => {
                    try{
 await axios.get('https://todointern-1.onrender.com/api/auth/logoutUser')
    toast.success("Logout successfully!")

                  setOpen(false);
                    }
                    catch(err){
   toast.error("Logout failed")
                    }
                 
                }}
              />
              <MenuItem
                icon={<FaHome />}
                text="Home"
                onClick={() => {
                  navigate("/");
                  setOpen(false);
                }}
              />
            </>
          )
        </div>
      )}
    </div>
  );
};

const MenuItem = ({ icon, text, onClick }) => (
  <button
    onClick={onClick}
    className="w-full flex items-center gap-3 px-4 py-3 text-sm text-gray-200 hover:bg-[#0f172a] transition"
  >
    {icon}
    {text}
  </button>
);

export default UserIconButton;
