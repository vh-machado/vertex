import React, { useEffect, useRef } from 'react';
import { Network } from 'vis-network';
import { Box } from '@chakra-ui/react';
import { Cores } from '../../../assets/Cores';
import { Fontes } from '../../../assets/Fontes';


function GraphView(props) {

  const container = useRef(null);

  /*
  var state = {
    counter: 5,
    graph: {
      nodes: [
        { id: 1, label: 'Node 1', x: 200, y: 0 },
        { id: 2, label: 'Node 2', x: 50, y: 250 },
        { id: 3, label: 'Node 3', x: 300, y: 0 },
        { id: 4, label: 'Node 4', x: 90, y: 100 },
        { id: 5, label: 'Node 5', x: 0, y: 10 },
      ],
      edges: [
        { from: 1, to: 2 },
        { from: 1, to: 3 },
        { from: 2, to: 4 },
        { from: 2, to: 5 },
      ],
    },
  };
  */

  let graph = { ...props.graph };

  const options = {
    autoResize: true,
    height: '100%',
    width: '100%',
    layout: {
      hierarchical: {
        enabled: false,
      },
    },
    edges: {
      arrows: {
        to: {
          enabled: props.orientado,
        },
      },
      font: {
        face: Fontes.principal,
        size: 16,
        color: Cores.mauve,
        strokeWidth: 0,
        align: 'top',
      },
      color: {
        color: Cores.mauve,
        highlight: Cores.lavender_floral,
        hover: Cores.lavender_floral,
        inherit: 'from',
        opacity: 1.0,
      },
      width: 2,
      smooth: {
        enabled: props.curva,
        type: 'straightCross',
      },
    },
    nodes: {
      borderWidth: 1,
      shape: 'circle',
      margin: 8,
      widthConstraint: {
        minimum: 20,
      },
      font: {
        face: Fontes.principal,
        size: 16,
        color: Cores.dark_purple,
      },
      color: {
        border: Cores.amethyst_2,
        background: Cores.lavender_floral,
        highlight: {
          border: Cores.lavender_floral,
          background: Cores.amethyst_2,
        },
        hover: {
          border: Cores.lavender_floral,
          background: Cores.amethyst_2,
        },
      },
    },
    interaction: {
      dragNodes: true,
      hover: true,
      dragView: false,
      zoomView: false,
    },
    
    physics: {
      enabled: true,
      stabilization: true,
    },
    manipulation: {
      enabled: false,
    },
  };

  useEffect(() => {
    const network =
      container.current && new Network(container.current, graph, options);
    network.stabilize();
    
    //grafo = network;
  }, [container, graph.nodes, graph.edges, props.orientado]);


  return (
    <Box h="100%">
      <div ref={container} style={{ height: '100%', width: '100%' }} />
    </Box>
  );
}

export default GraphView;
