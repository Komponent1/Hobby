import React, { useEffect, useRef } from 'react';
import cytoscape from 'cytoscape';
import { GameAnalysticData } from './dto/game';
import { makeNode } from './analystic/getGameData';

type Props = {
  gameDatas: GameAnalysticData[];
};
const SteamLoungePage: React.FC<Props> = ({gameDatas}) => {
  const cy = useRef(null);
  const container = useRef(null);

  // useEffect(() => {
  //   if (container.current) {
  //     cy.current = cytoscape({
  //       container: container.current,
  //       elements: [
  //         { // node a
  //           data: { id: 'a', label: 'node a' },
  //         },
  //         { // node b
  //           data: { id: 'b', label: 'node b' },
  //         },
  //         {
  //           data: { id: 'c', label: 'node c' },
  //         },
  //         { // edge ab
  //           data: { id: 'ab', source: 'a', target: 'b'},
  //         },
  //       ],
  //       style: [ // the stylesheet for the graph
  //         {
  //           selector: 'node',
  //           style: {
  //             'background-color': '#666',
  //             label: 'data(id)',
  //           },
  //         },

  //         {
  //           selector: 'edge',
  //           style: {
  //             width: 3,
  //             'line-color': '#ccc',
  //             'target-arrow-color': '#ccc',
  //             'target-arrow-shape': 'triangle',
  //             'curve-style': 'bezier',
  //           },
  //         },
  //       ],
  //       layout: {
  //         name: 'grid',
  //         rows: 1,
  //       },
  //     });
  //   }
  // }, []);

  useEffect(() => {
    if (container.current) {
      const node = makeNode(gameDatas);
      cy.current = cytoscape({
        container: container.current,
        elements: node,
        style: [
          {
            selector: 'node',
            style: {
              label: 'data(label)',
              width: '50px',
              height: '50px',
              "background-image": 'data(photoUrl)',
              "background-color": "#ddd",
              "background-fit": "cover",
            },
          },
          {
            selector: 'edge',
            style: {
              width: 3,
              'line-color': '#ccc',
              'target-arrow-color': '#ccc',
              'curve-style': 'bezier',
            },
          }
        ],
        layout: {
          name: 'cose',
        },
      });
    }
  }, []);
  return (
    <div>
      <h1>Steam Lounge</h1>
      <div id="cy" ref={container} style={{height: 1000, width: '100%'}} />
    </div>
  );
};

export default SteamLoungePage;
