import { useEffect, useState } from "react";

interface NoteFormProps {
  noteTitle?: string;
  noteBody?: string;
  formBtnText: string;
  closeForm: () => void;
  saveNote: (title: string, body: string) => void;
}

export default function NoteForm({
  noteTitle = "",
  noteBody = "",
  formBtnText,
  closeForm,
  saveNote,
}: NoteFormProps) {
  const [title, setTitle] = useState(noteTitle);
  const [body, setBody] = useState(noteBody);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  const handleSubmitBtn = () => {
    saveNote(title, body);
    closeForm();

    title && setTitle("");
    body && setBody("");
  };

  return (
    <div className="fixed top-0 left-0 right-0 bottom-0 bg-black/70 flex justify-center items-center h-screen overflow-hidden">
      <div className="flex flex-col bg-gray-500 p-4 rounded-md">
        <button className="text-right text-2xl text-white" onClick={closeForm}>
          X
        </button>
        <label className="flex flex-col text-stone-50 font-semibold">
          Title:
          <input
            className="mb-4 rounded-sm text-black h-[40px]"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </label>

        <label className="flex flex-col text-stone-50 font-semibold">
          Body:
          <textarea
            className="mb-4 rounded-sm text-black w-[300px] h-[100px]"
            value={body}
            onChange={(e) => setBody(e.target.value)}
          />
        </label>
        <button
          disabled={!title || !body}
          className="bg-amber-500 disabled:bg-amber-400/50 text-stone-50 py-2 rounded-sm"
          onClick={handleSubmitBtn}
        >
          {formBtnText}
        </button>
      </div>
    </div>
  );
}
