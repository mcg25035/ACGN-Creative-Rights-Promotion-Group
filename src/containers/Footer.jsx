/* eslint-disable semi */
import "./Footer.scss";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSquareFacebook, faSquareInstagram, faXTwitter, faDiscord } from '@fortawesome/free-brands-svg-icons'

const socialMedias = [
    {
        name: "Discord",
        href: "https://discord.gg/URGhN3KG",
        icon: faDiscord,
    },
    {
        name: "Twitter",
        href: "https://twitter.com/ACGNCRPA",
        icon: faXTwitter,
    },
    {
        name: "Facebook",
        href: "https://www.facebook.com/ACGNCRPA",
        icon: faSquareFacebook,
    },
    {
        name: "Instagram",
        href: "/",
        icon: faSquareInstagram,
    }
];

function linkIcon(name, href, icon){
    return <a key={name} href={href} target="_blank" rel="noreferrer">
        <FontAwesomeIcon icon={icon} />
    </a>
}

function Footer(){
    const socialMediaIcons = socialMedias.map(({ name, href, icon }) => {
        return linkIcon(name, href, icon)
    });

    return (
        <footer className="page-footer">
            <div className="social-medias">
                {socialMediaIcons}
            </div>
            <p>
                ACGN創作權益推動小組
            </p>
            <p>
                version 0.1.0
            </p>
        </footer>
    );
}

export default Footer;
