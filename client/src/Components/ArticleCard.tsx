export default function ArticleCard({ article }: any): JSX.Element {
    let date = new Date(article.Date);
    return (
        <div className="card bg-dark border border-primary text-center">
            <div className="card-header">
                {article.User}
            </div>
            <div className="card-body">
                <h5 className="card-title">{article.Title}</h5>
                <p className="card-text">{article.Description}</p>
                <a href={article.URL} className="btn btn-secondary">Pogledaj izvor</a>
            </div>
            <div className="card-footer text-muted">
                {date.getHours()-2}:{date.getMinutes()} {date.getDate()}/{date.getMonth()+1}/{date.getFullYear()}
            </div>
        </div>
    );
}