import React, { useCallback, useEffect, useRef, useState } from 'react'
import ReactFlow, { addEdge, Background, Controls, getIncomers, MarkerType, useEdges, useEdgesState, useNodes, useNodesState, useReactFlow, useStore, useStoreApi , getRectOfNodes, useKeyPress, applyNodeChanges, applyEdgeChanges} from 'react-flow-renderer';
import { initialEdges } from '../fakedata';
import '../App.css';
import CustomEdge from '../components/CustomEdge';
import initialNodes from '../data/file.json'
import { useRecoilValue } from 'recoil';
import { file } from '../helpers/stateRecoil';
import TapClick from '../components/TapClick';
import CustomNode from '../components/nodes/CustomNode';
import dagre from 'dagrejs';
import { createGraphLayout } from '../algorithms/layout';
import { v4 as uuid } from 'uuid';
import GroupNode from '../components/nodes/GroupNode';


const edgeTypes = {
  custom: CustomEdge,
};

const nodeTypes = {
  nodeTp: CustomNode,
  groupTp: GroupNode
}

const initBgColor = 'white';

const nodeWidth = 140;
const nodeHeight = 20;

let id = 0;
const getId = () => `dndnode_${id++}`;
const unique_id = uuid();
const small_id = unique_id.slice(0,8)
const selectTypeNode = [
  'nodeTp',
  'default',
]

const ininodes = [
  {
    id: 'A',
    type: 'group',
    position: { x: 0, y: 0 },
    style: {
      width: 170,
      height: 140,
    },
  },
  {
    id: 'A-1',
    type: 'input',
    data: { label: 'Child Node 1' },
    position: { x: 10, y: 10 },
    parentNode: 'A',
    extent: 'parent',
  },
  {
    id: 'A-2',
    data: { label: 'Child Node 2' },
    position: { x: 10, y: 90 },
    parentNode: 'A',
    extent: 'parent',
  },
  {
    id: 'B',
    type: 'output',
    position: { x: -100, y: 200 },
    data: { label: 'Node B' },
  },
  {
    id: 'C',
    type: 'output',
    position: { x: 100, y: 200 },
    data: { label: 'Node C' },
  },
];

const iniedges = [{ id: 'a1-a2', source: 'A-1', target: 'A-2' },
{ id: 'a2-b', source: 'A-2', target: 'B' },
{ id: 'a2-c', source: 'A-2', target: 'C' },];


const bboxSelector = (state) => state.bboxSelector;
const shallow = (state) => state.shallow;

function Main() {

  const filehere = useRecoilValue(file)
  const [nodes, setNodes ] = useState(ininodes);
  const [edges, setEdges] = useState(iniedges);
  const reactFlowWrapper = useRef(null);
  const SHIFTKEYS = useKeyPress('Shift');

  const [isOpen, setIsOpen] = useState(false)
  const [valueNode, setValueNode] = useState('');
  const reactFlowInstance = useReactFlow();
  const store = useStoreApi();
  const selectedNodes = Array.from(nodes).filter((n) => n.selected);
  const tt = getRectOfNodes(selectedNodes)


  const {getNode} = useReactFlow();
  const allNodes = useNodes();
  const allEdges = useEdges();
  console.log(allNodes)


  const onNodeClick = (event,node) => {
    event.preventDefault();
    setIsOpen(true)
    setValueNode(node)
    console.log(node)
  }

  // const dataEdge = [];
  // const testdata = [];
  // const dataOutput = [];
  // const dataInput = [];
  // const dataOutput2 = [];
  // const dataInput2 = [];


  // for(let i=0;i<nodes?.length;i++){
  //   console.log(nodes[i]?.data?.input?.split(/[',']+/))
  //   // console.log(nodes[i]?.data?.output?.split(/[',']+/))
  //   for(let j=i+1;j<nodes?.length;j++){
  //     // const th1 = nodes[i]?.data?.output?.split(/[,]/)?.forEach((item) => console.log(item))
  //     // const th2 = nodes[j]?.data?.input?.split(/[ ,]+ /)?.forEach((item) => console.log(item))
  //     // if(allNodes[i]?.data?.output===allNodes[j]?.data?.input){
  //     //   dataEdge.push(Object(allNodes[i]),Object(allNodes[j]))
  //     // }
  //     // console.log(nodes[i]?.data?.output?.split(/[,]/))
  //     if(nodes[i]?.data?.output?.split(/[',']/)?.some(x => x ===nodes[j]?.data?.input)){
  //       dataEdge.push(Object(nodes[i]),Object(nodes[j]))
  //       console.log('ok')
  //     }
  //     if(nodes[j]?.data?.input?.split(/[',']/)?.some(x => x ===nodes[i]?.data?.output)){
  //       dataEdge.push(Object(nodes[j]),Object(nodes[i]))
  //       console.log('ok 2')
  //     }
  //     if(nodes[i]?.data?.output===nodes[j]?.data?.input){
  //       dataEdge.push(Object(nodes[i]),Object(nodes[j]))
  //     }
  //     if(nodes[j]?.data?.output===nodes[i]?.data?.input){
  //       dataEdge.push(Object(nodes[j]),Object(nodes[i]))
  //     }

  //     // if(th1===th2){
  //     //   dataEdge.push(Object(allNodes[i]),Object(allNodes[j]))
  //     // }
  //     // if(dataOutput1?.length > 1 || dataInput1?.length > 1){
  //     //   for(let ii = 0; ii< dataOutput1?.length; ii++){
  //     //     for(let jj = 0; jj< dataInput1?.length; jj++){
  //     //       if(dataOutput1[ii] == dataInput1[jj]){
  //     //         dataEdge.push(Object(allNodes[i]),Object(allNodes[j]))
  //     //       }
  //     //     }
  //     //   }
  //     // }
  //   }
  // }


  // if(dataEdge.length === 0){
  //   console.log('None file')
  // }
  // for(let m = 0; m < dataEdge?.length -1; m+=2){
  //   var l = [...dataEdge?.slice(m,m+2)]
  //   testdata.push(l)
  // }



  // useEffect(() => {
   

  //   if(allNodes?.length > 0){
  //     setEdges(testdata?.map((item) =>
  //     ({
  //       id: String(`edge-${item?.map((item) => item?.id)}`),
  //       target: String(`${item?.map((item) => item?.id)}`).split(',')[1],
  //       source: String(`${item?.map((item) => item?.id)}`).split(',')[0],
  //       animated: true,
  //       style: { stroke: 'white' },
  //       markerEnd: {
  //         type: MarkerType.ArrowClosed,
  //       },
  //     })
  //   ))}
  // },[nodes])

  const handleUpdate = (e,id) => {
    setNodes((nds) => 
      nds.map((node) => {
        if(node.id === id){
          node.data = {...node.data, label: e.namenode}
        }
        return node
      })
    )
  }

  const handleClose = () => {
    setIsOpen(false)
  }


  const handleCreateGroup = () => {
    if(selectedNodes?.length > 1 && SHIFTKEYS === true){
      const newNodeGroup = {
        id: getId(),
        data: { label: `node group-${getId()}` },
        type: 'groupTp',
        position: {x: tt.x, y: tt.y},
        style: { backgroundColor: 'rgba(0,89,220,.08)', width: Number(tt.width), height: Number(tt.height), paddingTop: '20px', color:'black', zIndex:1 }
      }
      setNodes([...nodes, newNodeGroup])
      selectedNodes?.forEach(item => {
        setNodes(nds => nds.map(node => node.id === item.id ? ({...node,style:{zIndex: 999},position: {x: 0, y: 0},parentNode: newNodeGroup.id, extent: 'parent'}): node))
      })
    }
  }
  

  const onNodesChange = useCallback(
    (changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
    [setNodes]
  );
  const onEdgesChange = useCallback(
    (changes) => setEdges((eds) => applyEdgeChanges(changes, eds)),
    [setEdges]
  );


  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge({ ...params, animated: true, style: { stroke: 'black' } }, eds)),
    []
  );

  useEffect(() => {
    if(filehere.length > 0) {
      let nodes = filehere.map((item) => (
        {
          id: String(item.name),
          type: 'nodeTp',
          data: { 
            label: `${item.name}`, 
            input: `${item.input}`,
            output: `${item.output}`,
            inof:`${item.input_name}`,
            typenode: `${item.op_type}`
          },
          position: {x: 0, y: 0},
        }
      ));
      let edges = [];
      if (Array.isArray(filehere)) {
        filehere?.forEach((item)=> {
          let inputs = item.input_name?.split(",");
          if(inputs) inputs.forEach((input)=> {
            if(!nodes.find((node)=> {return node.id == input;})) {
              nodes.push({
                  id: String(input),
                  type: `nodeTp`,
                  data: { 
                    label: input, 
                    input: null,
                  },
                  position: {x: 0, y: 0},
              })
            }
          })
        })

        filehere?.forEach((item)=> {
          let outputName = item.name;
          if (item.input_name) {
            let inputs = item.input_name?.split(",");
            inputs.forEach((input) => {
              edges.push({
                id: String(`edge-${input}-${outputName}`),
                target: outputName,
                source: input,
                animated: true,
                type: 'step',
                style: { stroke: 'black' },
                markerEnd: {
                  type: MarkerType.ArrowClosed,
                },
              })
            })
          }
        })
      }
      
      (async () => {
        const res = await createGraphLayout(
          nodes,
          edges
        );
        setNodes(res.nodes)
        setEdges(res.edges)
      })()
    }
  }, [filehere])

  return (
    <div
      className='main'
    >
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onMouseUp={handleCreateGroup}
        id='test'
        panOnScroll={true}
        nodeTypes={nodeTypes}
        onNodeClick={onNodeClick}
        attributionPosition="top-right"
        style={{ background: initBgColor, maxHeight: "100%", overflow: "scroll" }}
        fitView
      >
        <Controls />
        <Background/>
        {}
      </ReactFlow>
      {isOpen && <TapClick 
        data={valueNode} updateFuntion={handleUpdate} 
        closefn={handleClose}
        />}
    </div>
  )
}

export default Main