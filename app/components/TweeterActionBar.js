import { useRef } from "react";
import { FiImage } from "react-icons/fi";
import { MdGif } from "react-icons/md";
import { BsEmojiSmile } from "react-icons/bs";
import { GoLocation } from "react-icons/go";

export default function TweetActions({
  onImageSelect, 
  onGifClick, 
  onEmojiClick, 
  onLocationClick,
}) {
  const fileInputRef = useRef(null);

  const handleImageClick = () => {
    fileInputRef.current.click();
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) onImageSelect(file);
  };

  return (
    <div className="flex items-center gap-4 mt-2">
      {/* Скрытый input */}
      <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        onChange={handleImageChange}
        className="hidden"
      />

      {/* Иконки */}
      <FiImage
        size={22}
        className="text-blue-500 cursor-pointer hover:text-blue-600"
        onClick={handleImageClick}
      />

      <MdGif
        size={28}
        className="text-blue-500 cursor-pointer hover:text-blue-600"
        onClick={onGifClick}
      />

      <BsEmojiSmile
        size={22}
        className="text-blue-500 cursor-pointer hover:text-blue-600"
        onClick={onEmojiClick}
      />

      <GoLocation
        size={22}
        className="text-blue-500 cursor-pointer hover:text-blue-600"
        onClick={onLocationClick}
      />
    </div>
  );
}
