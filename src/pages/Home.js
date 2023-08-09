import { HomeTextBlurbs } from '../components/HomeTextBlurb.js'

import HomeCSS from './page_css/Home.module.css'

import heroPhoto from '../images/CenterSplash/HeroPhoto.JPEG'

export function Home() {
    document.title = "Home";
    
    return (
        <div>
            {/* Main Hero Splash*/}
            <section className={HomeCSS.hero}>
                <h1>Software Engineer, Linguist, Artist</h1>
                <div className={HomeCSS.heroImageWrapper}>
                    <img className= {HomeCSS.splashImage} src={heroPhoto} alt='Main Box' />
                </div>
            </section>
            {/* Info Blurb */}
            <div className={HomeCSS.sectionBuffer}/>
            <HomeTextBlurbs /> 
            {/* Portfolio */}
            {/* Contact Me */}
        </div>

    );
}

