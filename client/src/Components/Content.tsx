import { useParams } from "react-router-dom";

export default function Content() {
    const type = useParams();
    console.log(type);
    return (
        <div className="row p-5">
            C
        </div>
    );
}