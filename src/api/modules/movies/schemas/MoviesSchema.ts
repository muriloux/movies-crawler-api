export const moviesSchema = {
  type: "object",
  properties: {
    movies: {
      type: "array",
      items: {
        type: "string",
      },
    },
  },
  required: ["movies"],
};
