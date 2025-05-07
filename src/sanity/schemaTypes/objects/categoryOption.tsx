import { BulbOutlineIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

export const categoryOption = defineType({
  name: "categoryoption",
  title: "Category Option",
  type: "object",
  icon: () => <BulbOutlineIcon />,
  fields: [
    defineField({
      name: "title",
      title: "Option Title",
      description: "The title of the option",
      type: "string",
    }),
    defineField({
      name: "question",
      title: "Question",
      description: "Question the user will be asked",
      type: "text",
    }),
  ],
});
