export const postsSchema = {
  title: "posts schema",
  description: "posts",
  version: 0,
  primaryKey: "id",
  type: "object",
  properties: {
    userId: {
      type: "number",
    },
    id: {
      type: "string",
      maxLength: 100,
    },
    title: {
      type: "string",
    },
    body: {
      type: "string",
    },
  },
  required: ["userId", "id", "title", "body"],
};
