import React, { useState } from 'react';
import ReadFile from './ReadFile';
import './style.css';

function Head() {

    const [openView, setOpenView] = useState(false)

    return (
        <div className='head'>
            <div className='head-1'>
                <div className='head-tag' onClick={() =>setOpenView(!openView)}>
                    <h5>File</h5>
                </div>
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