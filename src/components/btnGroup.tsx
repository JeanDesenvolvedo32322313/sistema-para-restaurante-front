
interface IBtnGroup {
    children?: any
}

export default function BtnGroup({ children }: IBtnGroup) {
    return (
        <div className="btn-group btn-group-sm" role="group" >
            {children}
        </div>
    )
} 