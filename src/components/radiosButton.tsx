import React from 'react'

interface IdadosRadios {
    dadosRadios?: any
}

export default function RadiosButton({ dadosRadios }: IdadosRadios) {
    return (
        <>
            {
                dadosRadios.map((D: any, k: any) => (
                    <div key={k} className="form-check form-check-inline">
                        <input required className="form-check-input" type="radio" onChange={D.onChange} name={D.name} value={D.value} />
                        <label className="form-check-label" >{D.label}</label>
                    </div>
                ))
            }
        </>

    )
}