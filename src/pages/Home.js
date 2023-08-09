import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';

import HomeCSS from './page_css/Home.module.css'
import WavesTop from '../images/wavesOpacity.svg'
import heroPhoto from '../images/CenterSplash/HeroPhoto.JPEG'

export function Home() {
    document.title = "Home";
    
    const [about, setAbout] = useState('');

    useEffect(() => {
        axios
            .get('http://localhost:5000/content/about')
            .then((response) => {
                /* Take the about page, get a preview of first paragraph */
                let blurb = response.data.body[0].join(' ').substring(0,245);
                let lastWhitespaceIndex = blurb.lastIndexOf(' ');
                setAbout(blurb.substring(0, lastWhitespaceIndex) + '...');
            })
            .catch((error) => {
                setAbout('Error!');
            })
    })
    
        
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
            <section className={HomeCSS.blurb}>
                <img className={HomeCSS.waveDivider} src={WavesTop} alt='Test'/>
                <div className={HomeCSS.blurbContainer}>
                    <div className={HomeCSS.leftBlurbWrapper}>
                        <div className={HomeCSS.blurbBox}>
                            <h2>About Me</h2>
                            <p>{about}</p>
                            <div class={HomeCSS.buttonContainer}> {/* Extra Div prevents whole grid cell from being a link */}
                                <Link to="/about">
                                    <button>More</button>
                                </Link>
                            </div>
                        </div>
                    </div>
                    <div className={HomeCSS.rightBlurbWrapper}>
                        <div className={HomeCSS.blurbBox}>
                            <h2> What the heck?</h2>
                        <p>Here's some more filler text. Aren't I the best software engineer?</p>
                        </div>
                    </div>
                </div>
            </section>
            {/* Portfolio */}
            {/* Contact Me */}
        </div>

    );
}

