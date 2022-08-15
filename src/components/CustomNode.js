import { Box, Image } from '@chakra-ui/react';
import React, { memo } from 'react'
import { Handle } from 'react-flow-renderer';
import './style.css';

function CustomNode({data,isConnectable,id}) {
    return (
        <>
            <Handle
                type='target'
                position='top'
                className='inputHandle'
                isConnectable={isConnectable}
                onConnect={(params) => console.log('handle Connect', params)}
            />
            <>
                <Box bg={'white'} maxW={'sm'} borderWidth='1px' borderRadius={'lg'}>
                    {/* <Image src='https://pbs.twimg.com/media/E-NOGVEWUAQX60Q.jpg' alt='' /> */}
                    <Box p='6'>
                    <p>{id}</p>
                    {/* <p>This is Input: {data.input}</p>
                    <p>This is Output: {data.output}</p> */}
                    </Box>
                </Box>
            </>
            <Handle
                type='source'
                position='bottom'
                className='outputHandle'
                isConnectable={isConnectable}
                onConnect={(params) => console.log('handle Connect', params)}
            />
        </>
    )
}

export default memo(CustomNode)

