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
              'background-image': 'data(photoUrl)',
              'background-color': '#ddd',
              'background-fit': 'cover',
            },
          },
          {
            selector: 'edge',
            style: {
              width: 'data(weight)',
              'line-color': '#ccc',
              'target-arrow-color': '#ccc',
              'curve-style': 'bezier',
            },
          },
        ],
        layout: {
          name: 'random',
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
