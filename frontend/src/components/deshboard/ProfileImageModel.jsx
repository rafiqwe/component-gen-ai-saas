import { useContext, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Camera, X } from "lucide-react";
import { UserDataContext } from "../../contexts/UserContext";
import API from "../../services/api";

const ProfileImageModal = ({ isOpen, onClose, }) => {
  const { user } = useContext(UserDataContext);
  const [preview, setPreview] = useState(user?.avatar || `https://i.pravatar.cc/150?u=${user?.email}`);
  const [selectedFile, setSelectedFile] = useState(null);
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSave = async () => {
    if (!selectedFile) return onClose(); // nothing changed

    const formData = new FormData();
    formData.append("avatar", selectedFile);

    try {
      const res = await API.post("/api/user/upload-avatar", formData);
      if (res.status === 200) {
        onSave(res.data.avatar); // update parent state
        onClose();
      }
    } catch (err) {
      console.error("Upload error:", err);
    }
  };

  if (!isOpen) return null;

  return (
    <motion.div
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="bg-gray-900 rounded-xl p-6 w-full max-w-sm flex flex-col items-center relative"
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        exit={{ scale: 0.8 }}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-400 hover:text-gray-200"
        >
          <X size={20} />
        </button>

        {/* Avatar Preview */}
        <div
          className="relative cursor-pointer group mb-4"
          onClick={() => fileInputRef.current.click()}
        >
          <img
            src={preview}
            alt="Avatar Preview"
            className="w-28 h-28 rounded-full object-cover border-4 border-gray-700"
          />
          <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 rounded-full transition">
            <Camera className="text-white w-6 h-6" />
          </div>
        </div>

        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          className="hidden"
          onChange={handleFileChange}
        />

        {/* Save Button */}
        <button
          onClick={handleSave}
          className="bg-blue-600 hover:bg-blue-700 px-6 py-2 rounded-lg font-medium mt-2 w-full"
        >
          Save Image
        </button>
      </motion.div>
    </motion.div>
  );
};

export default ProfileImageModal;
