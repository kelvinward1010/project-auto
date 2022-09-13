import { CloseIcon } from '@chakra-ui/icons';
import { Box } from '@chakra-ui/react';
import React from 'react'
import { Handle, useReactFlow } from 'react-flow-renderer';
import { useRecoilValue } from 'recoil';
import { file } from '../../helpers/stateRecoil';

function GroupNode({data,isConnectable,id}) {

  const filehere = useRecoilValue(file);
  const reactFlowInstance = useReactFlow();

  const getNodeIdandDeleteNode = (e) => {
      reactFlowInstance.setNodes((nds) =>nds.filter((nd) => !!nd.id && !nd.selected))
  }

  const takeTypeNode = [...filehere?.map((item) => item?.op_type)]
  const unique = takeTypeNode.filter((v, i, a) => a.indexOf(v) === i);

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
          <Box color={'white'} maxW={'sm'} borderWidth='1px' borderRadius={'lg'}>
              <Box maxW={'sm'}>
              <p
                style={{
                    marginTop: "-20px",
                    backgroundColor:'white',
                    padding:"5px 0",
                    borderRadius:"5px",
                    color:"black"
                }}
              >{data.label}</p>
              </Box>
              {/* <p>This is Input: {data.input}</p>
              <p>This is Output: {data.output}</p> */}
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

export default GroupNode