import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { PortfolioCard } from './PortfolioCard';

import PortfolioCSS from './component_css/Portfolio.module.css'

/* It may be nice to take these from built-in variables to
 * seperate .json objects with info, to clean up code? For now,
 * since there's only 3, this is fine.
 */

import Blender from '../images/ProjectPhotos/blenderProject.png'
import Substitutable from '../images/ProjectPhotos/substitutability.png'
import Teggletop from '../images/ProjectPhotos/teggletop.png'
import portfolioArrow from '../images/ProjectPhotos/portfolioArrow.svg'

export const HomePortfolio = (props) => {
    const blenderLink = 'https://github.com/the-bay-kay/wavetable_terrain_collapse'
    const subLink = 'https://github.com/the-bay-kay/Substitutable-Graph-Learner'
    const teggleLink = 'https://github.com/kuanhenglin/eggmacs'

    return (
        <section class={PortfolioCSS.portfolioSection}>
            <h2>The Portfolio</h2>
            <div class={PortfolioCSS.cardHolder}>
                <img src={portfolioArrow} class={PortfolioCSS.reversed}/>
                <PortfolioCard link={blenderLink} image={Blender}/>
                <PortfolioCard link={subLink} image={Substitutable}/>
                <PortfolioCard link={teggleLink} image={Teggletop}/>
                <img src={portfolioArrow} />
            </div>
        </section>
    )
}