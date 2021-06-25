import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux';
import './MainArticle.css'
import Article from '../Article'


export default function MainArticle() {

    const allState = useSelector(state => state)
    const { id } = useParams();
    return (
        <div>
            <div className="main-article__image-wrapper">
                {/* pull id out of state */}
                {/* render with state, no db necessary */}
                
            </div>
            <div className="main-article__content-wrapper">

            </div>
        </div>
        // <Article></Article>
    );
}

