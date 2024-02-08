import "./Footer.scss";
import discordSvg from "./assets/discord.svg";

const socialMedias = [
    {
        name: "discord",
        href: "https://discord.gg/URGhN3KG",
        icon: discordSvg,
    }
];

function Footer(){
    const socialMediaIcons = socialMedias.map(({ name, href, icon }) => (
        <a
            key={name}
            className="icon"
            href={href}
            style={{ backgroundImage: `url(${icon})` }}
            target="_blank"
            rel="noreferrer"
        />
    ));

    return (
        <footer className="page-footer">
            <div>還不知道要放什麼的Footer</div>
            <div className="social-medias">
                {socialMediaIcons}
            </div>
        </footer>
    );
}

export default Footer;
