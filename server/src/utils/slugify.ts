import slugify from "slugify";

export const createSlug = (rawStr: string) => {
  return slugify(rawStr, {
    replacement: "-",
    remove: undefined,
    lower: true,
    strict: true,
    trim: true,
  });
};
