import{Link } from 'react-router-dom'
import './Article.css';

export default function Article({ imageUrl,id, title }) {


    return (
        <div className="article">
            <div className="article__image-wrapper">
                <Link to={`/products/${id}`}>
                    {imageUrl && <img src={imageUrl} alt="product" />}
                </Link>
            </div>
            <div className="article__content-wrapper">
                <h1>{title}</h1>
            </div>
        </div>
    )

}
