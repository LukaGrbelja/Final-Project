import { useEffect, useState } from "react";
import ArticleCard from "./ArticleCard";
import axios from "axios";

export default function News(): JSX.Element {
    const [news, setNews] = useState<Array<any>>([]);
    useEffect((): void => {
        axios.get(`http://localhost:3001/newsData/${1}`)
            .then(res => {
                setNews(res.data);
            });
    }, []);
    return (
        <div className="row p-4 bg-dark">
            {
                news.length !== 0 ?
                    news.map(
                        (article: any) =>
                            <div className="col-sm-12 mb-5" key={article.Key}>
                                <ArticleCard article={article} />
                            </div>
                    )
                    :
                    false
            }
        </div>
    );
}