import HomeCSS from './page_css/Home.module.css'
import heroRectangle from '../images/CenterSplash/HeroRectangle.svg'
import heroPhoto from '../images/CenterSplash/HeroPhoto.JPEG'

export function Home() {
    document.title = "Home";


    /* Webpage order:
     * Hero / Header
     * Splash / "About Me"
     * Portfolio: Should be a separate component!
     * MessageMe: Also, should be separate component
     */
    return (
       <div className={HomeCSS.hero}>
            <h1>Software Engineer, Linguist, Artist</h1>
            <div className={HomeCSS.heroImageWrapper}>
                <img className= {HomeCSS.splashImage} src={heroPhoto} alt='Main Image Box' />
            </div>
       </div>
    );
}

/*

                <img className={HomeCSS.centerImage} src={heroPhoto} alt='Main Image Box' />
                <img className={HomeCSS.centerImage} src={heroRectangle} alt='Main Image Box' />
*/