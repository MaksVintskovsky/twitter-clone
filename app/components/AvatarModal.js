"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

export default function AvatarModal() {
  const [open, setOpen] = useState(false);
  const [preview, setPreview] = useState(null);
  const [file, setFile] = useState(null);

  // слушаем событие из SidebarUser
  useEffect(() => {
    function handler() {
      setOpen(true);
    }
    window.addEventListener("openAvatarModal", handler);
    return () => window.removeEventListener("openAvatarModal", handler);
  }, []);

  const uploadAvatar = async () => {
    if (!file) return;

    const formData = new FormData();
    formData.append("avatar", file);

    await fetch("/api/user/avatar", {
      method: "POST",
      body: formData,
    });

    setOpen(false);
    window.location.reload(); // обновляем аватар
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-xl w-[320px] shadow-xl relative">

        <h2 className="text-lg font-semibold mb-4">Update Profile Picture</h2>

        {preview && (
          <Image
            src={preview}
            width={200}
            height={200}
            alt="preview"
            className="rounded-full mx-auto mb-4"
          />
        )}

        <input
          type="file"
          accept="image/*"
          onChange={(e) => {
            const f = e.target.files[0];
            setFile(f);
            setPreview(URL.createObjectURL(f));
          }}
        />

        <div className="mt-4 flex justify-end gap-2">
          <button
            onClick={() => setOpen(false)}
            className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300"
          >
            Cancel
          </button>

          <button
            onClick={uploadAvatar}
            className="px-4 py-2 rounded bg-blue-500 text-white hover:bg-blue-600"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
