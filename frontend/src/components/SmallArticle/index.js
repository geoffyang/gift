import { Link } from 'react-router-dom'
import './SmallArticle.css';

export default function SmallArticle({ imageUrl, id, title, shortDescription }) {


    return (
        <div className="small-article__container">
            <div className="small-article__image-wrapper">
                <Link to={`/products/${id}`}>
                    {imageUrl && <img src={imageUrl} alt="product" />}
                </Link>
            </div>
            <div className="small-article__content-wrapper">
                <Link to={`/products/${id}`}>
                    <h1>{title}</h1>
                </Link>
                <div>{shortDescription}</div>
            </div>
        </div>
    )

}
