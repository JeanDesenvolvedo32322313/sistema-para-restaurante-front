import { Link } from "react-router-dom";

interface INaveg {
    name?: string;
    Icon?: any;
    LinksNames?: any;
}

export default function NavegacaoComposta({ name, Icon, LinksNames }: INaveg) {

    return (
        <>
            <a className="nav-link collapsed" style={{ cursor: "pointer" }} data-bs-toggle="collapse"
                data-bs-target={`#collapse${name?.split(" ").join("")}`} aria-expanded="false"
                aria-controls={`collapse${name?.split(" ").join("")}`}>
                <div className="nav-link-icon">
                    <Icon style={{ fontSize: 14 }} />
                </div>
                {name}
                <div className="sidenav-collapse-arrow">
                    <i className="fas fa-angle-down"></i>
                </div>
            </a>
            <div className="collapse" id={`collapse${name?.split(" ").join("")}`} data-bs-parent="#accordionSidenav">
                <nav className="sidenav-menu-nested nav accordion" id="accordionSidenavPages">

                    {
                        LinksNames.map((l: any, k: any) => (
                            <Link key={k} className="nav-link" to={`${l.to}`} >{l.name}</Link>
                        ))
                    }

                </nav>
            </div>
        </>
    )
} 