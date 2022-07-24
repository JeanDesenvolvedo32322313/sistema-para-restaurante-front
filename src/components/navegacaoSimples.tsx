import { Link } from "react-router-dom";

interface INaveg {
    name?: string;
    Icon?: any;
    link?: string;
}

export default function NavegacaoSimples({ name, Icon, link }: INaveg) {
    return (
        <Link to={`${link}`} className="nav-link">
            <div className="nav-link-icon">
                {
                    Icon &&
                    (<Icon style={{ fontSize: 14 }} />)
                }
            </div>
            {name}
        </Link>
    )
} 