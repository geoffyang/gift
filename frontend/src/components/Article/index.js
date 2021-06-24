
export default function Article({ image, title }) {


    return (
        <li className="article">
            <div className="article__image-wrapper">
                {/* <a href="/api/somewhere"> */}
                    {/* <img src={image} alt="gift" /> */}
                {/* </a> */}
            </div>
            <div className="article__content-wrapper">
                <h1>{title}</h1>
                <h2>{image}</h2>
            </div>
        </li>
    )

}
