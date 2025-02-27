import { CommentIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

export const response = defineType({
  name: "response",
  title: "Suggestion Response",
  type: "object",
  icon: CommentIcon,
  fields: [
    defineField({
      name: "name",
      type: "string",
      description: "Name of the user submitting the review or request",
    }),
    defineField({
      name: "email",
      type: "string",
      description: "Email of the user submitting the review or request",
    }),
    defineField({
      name: "question",
      type: "string",
      description: "Question or statement for the response",
    }),
    defineField({
      name: "response",
      type: "text",
      description: "User's response to the questions",
    }),
    defineField({
      name: "createdAt",
      title: "Created At",
      type: "datetime",
      description: "When the response was sent",
    }),
  ],
  preview: {
    select: {
      title: "question",
      author: "name",
    },
    prepare(selection) {
      const { author } = selection as Record<string, string | undefined>;
      return { ...selection, subtitle: author && `by ${author}` };
    },
  },
});
