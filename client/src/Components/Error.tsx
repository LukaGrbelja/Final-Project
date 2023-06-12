export default function Error(): JSX.Element {
    return (
        <div className="row p-4 bg-dark">
            <div className="col-sm-12">
                <div className="card bg-dark text-white border-danger text-center">
                    <div className="card-body">
                        <h1 className="card-title">404</h1>
                        <p className="card-text">Stranica ne postoji</p>
                    </div>
                </div>
            </div>
        </div>
    );
}  