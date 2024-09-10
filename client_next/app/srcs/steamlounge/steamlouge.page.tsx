import React, { useCallback, useEffect, useRef } from 'react';
import cytoscape from 'cytoscape';
import { GameAnalysticData } from './dto/game';

type Props = {
  gameDatas: GameAnalysticData[];
};
const SteamLoungePage: React.FC<Props> = ({gameDatas}) => {
  const ref = useRef<HTMLDivElement>(null);
  const renderGraph = useCallback(() => {
    cytoscape({
      container: document.getElementById('cy'),
      elements: gameDatas.map((gameData) => ({
        data: {
          id: gameData.appid,
          name: gameData.name,
          photoUrl: gameData.photoUrl,
        },
      })),
      style: [
        {
          selector: 'node',
          style: {
            label: 'data(name)',
            'background-image': 'data(photoUrl)',
            'background-fit': 'cover',
            width: '100px',
            height: '100px',
          },
        },
      ],
      layout: {
        name: 'cose',
        idealEdgeLength: 100,
        nodeOverlap: 20,
        refresh: 20,
        fit: true,
        padding: 30,
        randomize: false,
        componentSpacing: 100,
        nodeRepulsion: 400000,
        edgeElasticity: 100,
        nestingFactor: 5,
        gravity: 80,
        numIter: 1000,
        initialTemp: 200,
        coolingFactor: 0.95,
        minTemp: 1.0,
      },
    });
  }, [gameDatas]);

  useEffect(() => {
    if (!ref || !ref.current) {
      return;
    }
    renderGraph();
  }, [ref, renderGraph]);
  return (
    <div>
      <h1>Steam Lounge</h1>
      <div id="cy" ref={ref} style={{height: 1000}} />
    </div>
  );
};

export default SteamLoungePage;
