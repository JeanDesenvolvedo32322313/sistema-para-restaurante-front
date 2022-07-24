import InputMask from 'react-input-mask';


export default function InputComposto({ arrayInputs, select }: any) {

    return (
        <div className="row">
            {
                select === true ?
                    arrayInputs.map((I: any, K: any) => (
                        <div key={K} className={`col-md-${I.colMb}  mb-3`}>
                            <label>{I.label} {I.required && (<span style={{ color: 'red' }}>*</span>)}</label>
                            <select defaultValue={'DEFAULT'} onChange={I.onChange} required={I.required} name={I.name} className="form-control form-control-solid">

                                <option value="DEFAULT" disabled>Selecione ...</option>
                                {
                                    I.options.map((O: any, K: any) => (
                                        <option key={K} value={O.value}>{O.name}</option>
                                    ))
                                }

                            </select>
                        </div>
                    ))
                    :
                    arrayInputs &&
                    arrayInputs.map((I: any, K: any) => (
                        <div key={K} className={`col-md-${I.colMb}  mb-3`}>
                            <label>{I.label} {I.required && (<span style={{ color: 'red' }}>*</span>)}</label>

                            {
                                I.mask ?
                                    (<InputMask name={I.name} type={I.type} mask={I.mask} onChange={I.onChange} value={I.value} required={I.required} autoComplete="off" className='form-control form-control-solid' />)
                                    :
                                    (<input readOnly={I.readOnly == true ? true : false} onChange={I.onChange} value={I.value} required={I.required} name={I.name} autoComplete="off" className="form-control form-control-solid" type={I.type} />)

                            }

                        </div>
                    ))

            }
        </div>

    )
}