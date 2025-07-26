import chefClaudeLogo from "../images/chef-icon.png"
export default function Header(){
    return (
        <header className="chef-claude-header">
            <img
                src={chefClaudeLogo}
                alt="Chef Claude Icon"
            />
            <span>
                Chef Claude
            </span>
        </header>
    )
}