import { BulbOutlineIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

export const suggestion = defineType({
  name: "suggestion",
  title: "Suggestion",
  type: "document",
  icon: () => <BulbOutlineIcon />,
  fields: [
    defineField({
      name: "name",
      title: "Name",
      description: "The name of the suggestion",
      type: "string",
    }),
    defineField({
      name: "goal",
      title: "Goal",
      type: "string",
      description: "What is the goal/aim of the suggestion?",
    }),
    defineField({
      name: "options",
      title: "Options",
      description: "The options for the suggestion",
      type: "array",
      of: [{ type: "categoryoption" }],
    }),
    defineField({
      name: "responses",
      title: "Responses",
      description: "User responses to different options",
      type: "array",
      of: [{ type: "response" }],
    }),
  ],
});
