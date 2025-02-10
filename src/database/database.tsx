import { addRxPlugin, createRxDatabase } from "rxdb/plugins/core";
import { RxDBDevModePlugin } from "rxdb/plugins/dev-mode";
import { RxDBQueryBuilderPlugin } from "rxdb/plugins/query-builder";
import { getRxStorageDexie } from "rxdb/plugins/storage-dexie";
import { wrappedValidateAjvStorage } from "rxdb/plugins/validate-ajv";
import { Post } from "@/app/models/models";
import { postsSchema } from "./schema";

if (process.env.NODE_ENV === "development") {
  addRxPlugin(RxDBDevModePlugin);
}

addRxPlugin(RxDBQueryBuilderPlugin);

const initDatabase = async () => {
  const database = await createRxDatabase({
    name: "db-note-app",
    storage: wrappedValidateAjvStorage({
      storage: getRxStorageDexie(),
    }),
  });

  await database.addCollections({
    posts: {
      schema: postsSchema,
    },
  });

  const fetchedData = await fetch("https://jsonplaceholder.typicode.com/posts");
  const posts = await fetchedData.json();
  //ID come as numbers and in schema we can't have ID as number
  const postsWithStrId = posts.map((item: Post) => {
    return { ...item, id: item.id.toString() };
  });

  database.posts.bulkInsert(postsWithStrId);

  return database;
};

export default initDatabase;
