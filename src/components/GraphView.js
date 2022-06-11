import Graph from 'react-graph-vis';
import React, { useState } from 'react';
import { Cores } from '../assets/Cores';

function randomColor() {
  const red = Math.floor(Math.random() * 256)
    .toString(16)
    .padStart(2, '0');
  const green = Math.floor(Math.random() * 256)
    .toString(16)
    .padStart(2, '0');
  const blue = Math.floor(Math.random() * 256)
    .toString(16)
    .padStart(2, '0');
  return `#${red}${green}${blue}`;
}

function GraphView(props) {
  const options = {
    autoResize: true,
    height: '100%',
    width: '100%',
    layout: {
      hierarchical: 
      {
        enabled: props.hierarquico,
      },
    },
    edges: {
      arrows: {
        to: {
          enabled: props.orientado,
        },
      },
      color: 'white',
      width: 1,
      smooth: {
        enabled: props.curva,
        type: 'curvedCW',
      },
    },
    nodes: {
      shape: 'circle',
    },
    interaction: {
      dragNodes: true,
      dragView: false,
      zoomView: false,
    },
    physics:{
      enabled: false,
      stabilization: true,
    },
    
  };

  const colorNode = Cores.lavender_floral;
  const createNode = (x, y) => {
    //const color = randomColor();

    setState(({ graph: { nodes, edges }, counter, ...rest }) => {
      const id = counter + 1;
      const from = Math.floor(Math.random() * (counter - 1)) + 1;
      return {
        graph: {
          nodes: [...nodes, { id, label: `Node ${id}`, colorNode, x, y }],
          edges: [...edges, { from, to: id }],
        },
        counter: id,
        ...rest,
      };
    });
  };
  const [state, setState] = useState({
    counter: 5,
    graph: {
      nodes: props.nodes,
      edges: props.edges,
    },
    events: {
      select: ({ nodes, edges }) => {
        console.log('Selected nodes:');
        console.log(nodes);
        console.log('Selected edges:');
        console.log(edges);
        alert('Selected node: ' + nodes);
      },
      doubleClick: ({ pointer: { canvas } }) => {
        createNode(canvas.x, canvas.y);
      },
    },
  });
  const { graph, events } = state;
  return (
    <Graph
      graph={graph}
      options={options}
      events={events}
      style={{ height: '100%', width: '100%'}}
    />
  );
}

export default GraphView;
