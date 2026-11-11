import { createSchema } from "@weaverse/hydrogen/next";

export const schema = createSchema({
  type: "text-block",
  title: "Text block",
  settings: [
    {
      group: "Content",
      inputs: [
        {
          type: "text",
          name: "heading",
          label: "Heading",
          defaultValue: "Explore SoundX",
        },
      ],
    },
  ],
  presets: {
    heading: "Explore SoundX",
  },
});
