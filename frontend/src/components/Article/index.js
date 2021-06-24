import './Article.css';

export default function Article({ image, title }) {


    return (
        <div className="article">
            <div className="article__image-wrapper">
                {image && <img src={image} alt="product" />}
            </div>
            <div className="article__content-wrapper">
                <h1>{title}</h1>
            </div>
        </div>
    )

}
