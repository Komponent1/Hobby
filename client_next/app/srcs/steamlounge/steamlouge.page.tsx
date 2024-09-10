import React, { useCallback, useEffect, useRef } from 'react';
import cytoscape from 'cytoscape';
import { GameAnalysticData } from './dto/game';
import { makeNode } from './analystic/getGameData';

type Props = {
  gameDatas: GameAnalysticData[];
};
const SteamLoungePage: React.FC<Props> = ({gameDatas}) => {
  const cy = useRef(null);
  const container = useRef(null);
  const renderGraph = useCallback(() => {
    const node = makeNode(gameDatas.slice(0, 5));
    
  }, [gameDatas]);

  useEffect(() => {
    if (container.current) {
      const node = makeNode(gameDatas.slice(0, 5));
      cy.current = cytoscape({
        container: container.current,
        elements: node,
        style: [
          {
            selector: 'node',
            style: {
              label: 'data(name)',
              width: '30px',
              height: '30px',
            },
          },
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
