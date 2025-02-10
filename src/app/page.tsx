"use client";

import initDatabase from "@/database/database";
import { useEffect, useState } from "react";
import { RxDatabase } from "rxdb";
import { Provider } from "rxdb-hooks";
import NotesList from "./components/notesList";

export default function Home() {
  const [db, setDb] = useState<RxDatabase>();

  useEffect(() => {
    initDatabase().then(setDb);
  }, []);

  return (
    <Provider db={db}>
      <NotesList />
    </Provider>
  );
}
