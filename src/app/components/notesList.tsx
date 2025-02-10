import { RxDocument } from "rxdb";
import { useState } from "react";
import { useRxData, useRxCollection } from "rxdb-hooks";
import { Post } from "@/app/models/models";
import NoteForm from "./noteForm";
import Note from "./note";

export default function NotesList() {
  const [isFormOpen, setFormOpen] = useState(false);
  const [isEditingForm, setEditingForm] = useState(false);
  const [noteEditId, setNoteEditId] = useState("");
  const [noteEditData, setNoteEditData] = useState({});

  const formBtnText = isEditingForm ? "Edit" : "Add";
  const collection = useRxCollection<Post>("posts");

  const {
    result: posts,
    isFetching,
    isExhausted,
    fetchMore,
  } = useRxData<Post>("posts", (collection) => collection.find(), {
    pageSize: 5,
    pagination: "Infinite",
  });

  posts.sort(
    (item1: RxDocument<Post>, item2: RxDocument<Post>): number =>
      Number(item2.id) - Number(item1.id)
  );

  const findDocumentById = (id: string) => {
    if (collection) {
      return collection.findOne({
        selector: {
          id,
        },
      });
    }
  };

  const addNote = (title: string, body: string) => {
    if (collection) {
      collection.insert({
        //The id is generated in such way because we need to sort the array of posts, ideally we need to generate the id using uuidv4()
        id: (Number(posts[0].id) + 1).toString(),
        userId: 1,
        title: title,
        body: body,
      });
    }
  };

  const deleteNote = (id: string): void => {
    findDocumentById(id)?.remove();
  };

  const openNote = (id: string, title: string, body: string): void => {
    setEditingForm(true);
    openNoteForm();
    setNoteEditId(id);
    setNoteEditData({ noteTitle: title, noteBody: body });
  };

  const updateNote = (title: string, body: string): void => {
    findDocumentById(noteEditId)?.patch({
      title,
      body,
    });
  };

  const saveNote = (title: string, body: string) => {
    if (isEditingForm) {
      updateNote(title, body);
    } else {
      addNote(title, body);
    }
  };

  const openNoteForm = () => {
    setFormOpen(true);
  };

  const closeNoteForm = () => {
    setFormOpen(false);
    if (isEditingForm) {
      setEditingForm(false);
      setNoteEditData({});
    }
  };

  if (isFetching) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-3xl italic">loading posts...</p>
      </div>
    );
  }

  return (
    <div className="relative flex flex-col items-center">
      <ul className="flex flex-col items-center">
        {posts?.map(({ id, title, body }) => (
          <Note
            key={id}
            id={id}
            title={title}
            body={body}
            openNote={openNote}
            deleteNote={deleteNote}
          />
        ))}
      </ul>
      <button
        className="fixed top-[30px] right-[30px] bg-amber-500 w-[100px] h-[50px] text-white rounded-md drop-shadow-md"
        onClick={openNoteForm}
      >
        Add
      </button>
      {isFormOpen && (
        <NoteForm
          formBtnText={formBtnText}
          closeForm={closeNoteForm}
          saveNote={saveNote}
          {...noteEditData}
        />
      )}
      {!isExhausted && (
        <button
          onClick={fetchMore}
          className="mb-8 bg-amber-500 w-[200px] h-[50px] text-white rounded-md drop-shadow-md"
        >
          Load more
        </button>
      )}
    </div>
  );
}
