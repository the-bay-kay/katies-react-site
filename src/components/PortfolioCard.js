import CardCSS from './component_css/Portfolio.module.css'

/* prop args must have the following structure 
 * {
 *      "link" : "https://www.web.site",
 *      "image": "/path/to/img"A
 *  }
 */

export const PortfolioCard = (props) => {
    const link = props.link
    return (
        <div>
            <a href={link}>
                <div class={CardCSS.imageWrapper}>
                    <img src={props.image}/>
                </div>
            </a>
        </div>
    )
}