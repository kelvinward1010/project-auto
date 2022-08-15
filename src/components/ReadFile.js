import React, { useState } from 'react';
import { read, utils, writeFile } from 'xlsx';
import { Button, ButtonGroup } from '@chakra-ui/react'
import { atom, useRecoilState } from 'recoil';
import { fileState } from '../helpers/atom';

function ReadFile({fn}) {

    // const [data, setData] = useState([]);
    const [data, setData] = useRecoilState(fileState);
    const [file, setFile] = useState({})
    const [error, setError] = useState('');

    const fileUploadButton = () => {
        document.getElementById('fileButton').click();
        document.getElementById('fileButton').onchange = () =>{      
            setFile({fileUploadState:document.getElementById('fileButton').value});
        }
    }

    const handleImport = (e) => {
        const files = e.target.files;
        if (files.length) {
            const file = files[0];
            const reader = new FileReader();
            reader.onload = (event) => {
                const wb = read(event.target.result);
                const sheets = wb.SheetNames;

                if (sheets.length) {
                    const rows = utils.sheet_to_json(wb.Sheets[sheets[0]]);
                    setData(rows)
                }
            }
            reader.readAsArrayBuffer(file);
        }else{
            setError('None File')
        }
    }


    return (
        <>
            <div
                style={{
                    display:"flex",
                    flexDirection:"column",
                }}
                hidden
            >
                <button
                    className='buttonfile'
                    onClick={fileUploadButton}
                >
                    Open File
                    <input 
                        id="fileButton" 
                        type="file" 
                        onChange={handleImport}
                        hidden 
                        name={'file'}
                    />
                </button>
                <span
                    style={{
                        color:'red',
                        fontSize:"6px",
                        marginBottom:"-10px"
                    }}
                >{error}</span>
            </div>
        </>
    )
}

export default ReadFile