import React, { useState } from 'react';
import ReadFile from './ReadFile';
import './style.css';

function Head() {

    const [openView, setOpenView] = useState(false)
    const [colorBk, setColorBk] = useState(false)

    const handleThemeBk = () => {
        setColorBk(true)
    }

    return (
        <div className='head'>
            <div className='head-1'>
                <div className='head-tag' onClick={() =>setOpenView(!openView)}>
                    <h5>File</h5>
                </div>
                <button onClick={handleThemeBk}>Change Background</button>
                {openView && 
                    <>
                        <ul className='view-elements'>
                            <li>
                                <ReadFile />
                            </li>
                        </ul>
                    </>
                }
                <div className='head-tag'>
                    <h5>Help</h5>
                </div>
            </div>
            <div className='head-2'>
                demo flow
            </div>
        </div>
    )
}

export default Head