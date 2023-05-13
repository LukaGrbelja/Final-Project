import { useParams } from "react-router-dom";

export default function Content() {
    const params = useParams();
    return (
        <div className="row p-4 bg-dark">
            <div className="col-sm-5">
                <img src={""} style={{width: "-webkit-fill-available"}} alt="Nema slike"/>
            </div>
        </div>
    );
}