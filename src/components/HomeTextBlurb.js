import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';

import HomeCSS from '../pages/page_css/Home.module.css'
import Blurbs from './component_css/Blurbs.module.css'

import WavesTop from '../images/wavesOpacity.svg'

export const HomeTextBlurbs = (props) => {
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
             <section className={Blurbs.blurb}>
                <img className={HomeCSS.waveDivider} src={WavesTop} alt='Test'/>
                <div className={Blurbs.blurbContainer}>
                    <div className={Blurbs.leftBlurbWrapper}>
                        <div className={Blurbs.blurbBox}>
                            <h2>About Me</h2>
                            <p>{about}</p>
                            <div class={Blurbs.buttonContainer}> {/* Extra Div prevents whole grid cell from being a link */}
                                <Link to="/about">
                                    <button>More</button>
                                </Link>
                            </div>
                        </div>
                    </div>
                    <div className={Blurbs.rightBlurbWrapper}>
                        <div className={Blurbs.blurbBox}>
                            <h2> What the heck?</h2>
                        <p>Here's some more filler text. Aren't I the best software engineer?</p>
                        </div>
                    </div>
                </div>
            </section>
    )
}
