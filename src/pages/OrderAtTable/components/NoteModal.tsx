// src/components/NoteModal.tsx
import React, { useState } from "react";
import type { ProductResponse } from "../../../types/responses/product.response";

interface NoteModalProps {
  item: ProductResponse;
  currentNote: string;
  onSave: (note: string) => void;
  onClose: () => void;
}

const NoteModal: React.FC<NoteModalProps> = ({ item, currentNote, onSave, onClose }) => {
  const [note, setNote] = useState(currentNote);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-end justify-center z-50">
      <div className="bg-white rounded-t-3xl w-full max-w-lg p-6 animate-slide-up">
        <h3 className="text-xl font-bold text-gray-800 mb-2">Ghi chú cho món</h3>
        <p className="text-gray-600 mb-4">{item.name}</p>
        <textarea
          value={note}
          onChange={(e) => setNote(e.target.value)}
          placeholder="Ví dụ: Ít cay, không đá, thêm rau..."
          className="w-full border border-gray-300 rounded-xl p-3 h-32 focus:outline-none focus:ring-2 focus:ring-amber-500"
        />
        <div className="flex space-x-3 mt-4">
          <button
            onClick={onClose}
            className="flex-1 bg-gray-200 text-gray-800 py-3 rounded-full font-semibold hover:bg-gray-300"
          >
            Hủy
          </button>
          <button
            onClick={() => {
              onSave(note);
              onClose();
            }}
            className="flex-1 bg-amber-600 text-white py-3 rounded-full font-semibold hover:bg-amber-700"
          >
            Lưu
          </button>
        </div>
      </div>
    </div>
  );
};

export default NoteModal;
