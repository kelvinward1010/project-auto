import logo from './logo.svg';
import './App.css';
import ReactFlow, { addEdge, Background, Controls, MarkerType, useEdgesState, useNodesState } from 'react-flow-renderer';
import { useCallback } from 'react';
import CustomEdge from './components/CustomEdge';
import Head from './components/Head';
import Main from './pages/Main';
import TapClick from './components/TapClick';

function App() {


  return (
    <div className="App">
      <div>
        <Head />
        <Main />
      </div>
    </div>
  );
}

export default App;
