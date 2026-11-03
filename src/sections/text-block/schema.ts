import { createSchema } from "@weaverse/next";

export const schema = createSchema({
    type:'text-block',
    title:'Text block',
    settings: [
        {
            group: 'Content',
            inputs: [
                {
                    type:'text',
                    name:'heading',
                    label:'heading'
                }
            ]
        }
    ],
    presets: {
        heading: "Explore Tech"
    }
})