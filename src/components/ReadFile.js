import React, { useState } from 'react';
import { read, utils, writeFile } from 'xlsx';
import { Button, ButtonGroup } from '@chakra-ui/react'
import { atom, useRecoilState } from 'recoil';
import { fileState } from '../helpers/atom';
import axios from 'axios';

function ReadFile({fn}) {

    // const [data, setData] = useState([]);
    const [data, setData] = useRecoilState(fileState);
    const [file, setFile] = useState({})
    const [error, setError] = useState('');
    const [selectedFile, setSelectedFile] = useState('')

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

    const handleChange = (event) => {
        setSelectedFile(event.target.files[0])
    }

    const handleSubmit =() => {
        const data = new FormData() 
        data.append('file', selectedFile)
        console.warn(selectedFile);
        let url = "http://192.168.1.100:4803/api/upload";
        axios.post(url, data, {})
        .then(res => {
            console.warn(res.data);
            setData(res.data?.output)
        })
    }

    function importData() {
        let input = document.createElement('input');
        input.type = 'file';
        input.onchange = _ => {
          let files =   Array.from(input.files);
          console.log(files);
        };
        input.click();
    }

    console.log(data)


    return (
        <>
            <div
                style={{
                    display:"flex",
                    flexDirection:"column",
                }}
                hidden
            >
                <Button
                    className='buttonfile'
                >
                    Open File
                    <input 
                        id="fileButton" 
                        type="file"
                        //onChange={handleImport}
                        onChange={handleChange}
                        
                        name={'file'}
                    />
                </Button>
               
                <button style={{
                    marginTop: "30px"
                }} onClick={handleSubmit}>Save</button>
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