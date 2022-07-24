import loadingb from "../assets/img/loadingBlack.svg";
import loadingw from "../assets/img/loadingWhite.svg";

interface ILoading {
    color?: any
    position?: any;
    top?: boolean;
}

export default function Loading({ color, top }: ILoading) {
    return (
        <div style={{ position: "absolute", zIndex: 312312, display: "flex", justifyContent: "center", alignItems: "center", width: "100%", marginTop: top ? 32 : 0 }}>
            {
                color === 'black' ?
                    (<img src={loadingb} width="90" height="90" alt="loading" />) :
                    color === 'white' ?
                        (<img src={loadingw} width="90" height="90" alt="loading" />) :
                        ''
            }
        </div>

    )
}