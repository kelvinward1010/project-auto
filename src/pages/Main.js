import React, { useCallback, useEffect, useState } from 'react'
import ReactFlow, { addEdge, Background, Controls, getIncomers, MarkerType, useEdges, useEdgesState, useNodes, useNodesState, useReactFlow } from 'react-flow-renderer';
import { initialEdges } from '../fakedata';
import '../App.css';
import CustomEdge from '../components/CustomEdge';
import initialNodes from '../data/file.json'
import { useRecoilValue } from 'recoil';
import { file } from '../helpers/stateRecoil';
import TapClick from '../components/TapClick';
import CustomNode from '../components/CustomNode';
import dagre from 'dagrejs';
import { createGraphLayout } from '../algorithms/layout';

const edgeTypes = {
  custom: CustomEdge,
};

const nodeTypes = {
  nodeTp: CustomNode
}

const initBgColor = 'black';

const nodeWidth = 140;
const nodeHeight = 20;



// const dagreGraph = new dagre.graphlib.Graph();
// dagreGraph.setDefaultEdgeLabel(() => ({}));

// const getLayoutedElements = (nodes, edges, direction = 'LR') => {
//   const isHorizontal = direction === 'LR';
//   dagreGraph.setGraph({ rankdir: direction });

//   nodes.forEach((node) => {
//     dagreGraph.setNode(node.id, { width: nodeWidth, height: nodeHeight });
//   });

//   edges.forEach((edge) => {
//     dagreGraph.setEdge(edge.source, edge.target);
//   });

//   dagre.layout(dagreGraph);

//   nodes.forEach((node) => {
//     const nodeWithPosition = dagreGraph.node(node.id);
//     node.targetPosition = isHorizontal ? 'left' : 'top';
//     node.sourcePosition = isHorizontal ? 'right' : 'bottom';

//     node.position = {
//       x: nodeWithPosition.x - nodeWidth / 2,
//       y: nodeWithPosition.y - nodeHeight / 2,
//     };

//     return node;
//   });

//   return { nodes, edges };
// };

function Main() {

  const filehere = useRecoilValue(file)
  const [nodes, setNodes , onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [isOpen, setIsOpen] = useState(false)


  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge({ ...params, animated: true, style: { stroke: '#fff' } }, eds)),
    []
  );


  useEffect(() => {
    if(filehere.length > 0) {
      let nodes = filehere.map((item) => (
        {
          id: String(item.name),
          type: `nodeTp`,
          data: { 
            label: `${item.name}`, 
            input: `${item.input}`,
            output: `${item.output}`,
            inof:`${item.input_name}`
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
                style: { stroke: 'white' },
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

  const {getNode} = useReactFlow();
  const allNodes = useNodes();
  const allEdges = useEdges();

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

  console.log(allEdges)
  console.log(allNodes)


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
        // edgeTypes={edgeTypes}
        panOnScroll={true}
        nodeTypes={nodeTypes}
        // onNodeClick={affterClick}
        onClick={() => setIsOpen(!isOpen)}
        style={{ background: initBgColor, maxHeight: "100%", overflow: "scroll" }}
        fitView
      >
        <Controls />
        <Background />
      </ReactFlow>
      {/* {isOpen && <TapClick />} */}
    </div>
  )
}

export default Main