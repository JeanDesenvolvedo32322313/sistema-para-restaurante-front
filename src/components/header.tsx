interface IHeader {
    title?: string;
    subtitle?: string;
    Icon: any;
}

export default function Header({ title, subtitle, Icon }: IHeader) {
    return (
        <header className="page-header page-header-dark bg-gradient-primary-to-secondary pb-10">
            <div className="container-xl px-4">
                <div className="page-header-content pt-4">
                    <div className="row align-items-center justify-content-between">
                        <div className="col-auto mt-4">
                            <h1 className="page-header-title">
                                <div className="page-header-icon"><Icon /></div>
                                {title}
                            </h1>
                            <div className="page-header-subtitle">{subtitle}</div>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    )
}