interface NoteProps {
  id: string;
  title: string;
  body: string;
  openNote: (id: string, title: string, body: string) => void;
  deleteNote: (id: string) => void;
}

export default function Note({
  id,
  title,
  body,
  openNote,
  deleteNote,
}: NoteProps) {
  return (
    <li className="my-4 text-center bg-gray-300 w-[70%] p-4 rounded-md drop-shadow-md">
      <h3 className="mb-2 font-semibold">{title}</h3>
      <p className="italic">{body}</p>
      <div className="controllers mt-2 flex justify-center">
        <button
          className="mr-4 bg-sky-500 w-[100px] h-[40px] text-white rounded-md drop-shadow-md"
          onClick={() => openNote(id, title, body)}
        >
          Edit
        </button>
        <button
          className="bg-red-500 text-white rounded-md drop-shadow-md w-[100px] h-[40px]"
          onClick={() => {
            deleteNote(id);
          }}
        >
          Delete
        </button>
      </div>
    </li>
  );
}
