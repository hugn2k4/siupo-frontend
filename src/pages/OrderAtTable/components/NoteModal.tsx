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
    <div className="fixed inset-0 flex items-center justify-center backdrop-blur-sm z-50 p-4" onClick={onClose}>
      <div className="bg-white rounded-2xl w-full max-w-md p-6 shadow-2xl" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-bold text-gray-800">Note for dish</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <p className="text-gray-600 mb-4 font-medium">{item.name}</p>

        <textarea
          value={note}
          onChange={(e) => setNote(e.target.value)}
          placeholder="Example: Less spicy, no ice, extra vegetables..."
          className="w-full border border-gray-300 rounded-xl p-3 h-32 focus:outline-none focus:ring-2 focus:ring-amber-500 resize-none"
          autoFocus
        />

        <div className="flex space-x-3 mt-6">
          <button
            onClick={onClose}
            className="flex-1 bg-gray-200 text-gray-800 py-3 rounded-full font-semibold hover:bg-gray-300 transition"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              onSave(note);
              onClose();
            }}
            className="flex-1 bg-amber-600 text-white py-3 rounded-full font-semibold hover:bg-amber-700 transition"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default NoteModal;
