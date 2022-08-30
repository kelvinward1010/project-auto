import React, { useEffect, useState } from 'react';
import './style.css';

function TapClick({ data, updateFuntion, closefn }) {
    const [values, setValues] = useState({
        namenode:'',
        input: '',
        output: ''
    })
    
    useEffect(() => {
        const initialValues = {
            namenode: data?.data?.label,
            input: data?.data?.input,
            output: data?.data?.output
        }
        setValues(initialValues)
    }, [data])

    const handleChange = (e) => {
        const {name,value} = e.target;
        setValues({...values, [name]: value})
        // console.log(values)
    }

    const handleUpdate = () => {
        updateFuntion(values, data?.id)
    }


    return (
        <div
            className='tapclick'
        >
            <h3>Detail A Node</h3>
            {/* <div className='tapclick-value'>
                <span>Id: </span>
                <span style={{
                    background:'black',
                    borderRadius:'5px',
                    padding:'5px',
                    color:'white'
                }}>{data?.id}</span>
            </div> */}
            <div className='tapclick-value'>
                <span>Name Node:</span>
                <input onChange={handleChange} name='namenode' type={'text'} value={values.namenode} />
            </div>
            <div className='tapclick-value'>
                <span>Input:</span>
                <textarea onChange={handleChange} name='input' rows={5} type={'text'} value={values.input} />
            </div>
            <div className='tapclick-value'>
                <span>Output:</span>
                <textarea onChange={handleChange} name='output' rows={5} type={'text'} value={data?.data?.output} />
            </div>
            <div className='tapclick-button'>
                <button onClick={handleUpdate}>Update</button>
            </div>
            <div className='tapclick-close'>
                <button onClick={closefn}>Close</button>
            </div>
        </div>
    )
}

export default TapClick