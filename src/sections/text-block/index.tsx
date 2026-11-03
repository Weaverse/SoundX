export default function TextBlock({heading = "Explore tech",}: {heading?: string}) {
    return (
        <h2>{heading}</h2>
    )
}

export {schema} from "./schema"