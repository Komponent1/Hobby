import React from 'react';
import Image from "next/image";
import { observer } from "mobx-react";
import {GameData} from '../dto/steam.dto.game';
import {useViewData} from '../hooks/steam.hooks.viewData';
import {
  Infobox, Dounutchart, Table, Card, Pagination,
} from '../components';
import { STEAM_LOGO_RATIO } from "../../common/common.constant/common.constant.imageRatio";
import { useAnalyzeTag } from "../hooks/steam.hooks.analyzeTag";
import {useAnalyzeGenres} from '../hooks/steam.hooks.analyzeGenres';
import { TABLE_VIEW_NUM, useGetTable } from "../hooks/steam.hooks.getTable";
import { PlayerSummary } from "../dto/steam.dto.api";
import { Typography } from "../../common/common.components";
import { num2wonComma } from "../utils/steam.util.won";

type Props = {
  owedGameDatas: GameData[];
  playerSummary: PlayerSummary;
};
const SteamViewBoard: React.FC<Props> = observer(({
  owedGameDatas,
  playerSummary,
}) => {
  const {mostPlayedGame, allPlayTime, totalPrice} = useViewData(owedGameDatas);
  const {tagPercentage} = useAnalyzeTag(owedGameDatas);
  const {genrePercentage} = useAnalyzeGenres(owedGameDatas);
  const {gameTable, viewData, setDataIndex} = useGetTable(owedGameDatas);

  return (
    <div className="min-h-screen w-screen grid place-items-center bg-slate-600">
      <div className="absolute top-2">
        <Image src="/steam-logo.png" alt="Steam Logo" layout="fixed" width={1000} height={1000 * STEAM_LOGO_RATIO} className="-rotate-12" />
      </div>
      <div className="absolute top-0 bg-gradient-to-t from-slate-600 to-slate-900 h-screen w-screen grid place-items-center opacity-90" />
      <div className="mt-32 z-30 grid grid-cols-3 px-32">
        <div className="col-span-2 text-white text-4xl font-bold content-center">
          {`${playerSummary.personaname} 분석 결과`}
          <Typography type="p" color="text-gray-200">19세 게임은 정상적인 정보를 확인하지 못할 수 있습니다</Typography>
        </div>
        <div>
          <div className="bg-slate-300 h-[158px] w-[158px] ml-6 flex items-center justify-center">
            <Image
              src={playerSummary.avatarfull}
              alt="Avatar Logo"
              layout="fixed"
              width={150}
              height={150}
            />
          </div>
        </div>
      </div>
      <div className="z-30">
        <div className="w-screen flex flex-row flex-wrap">
          <div className="flex-1 p-6 md:mt-16 grid grid-cols-1 gap-6 xl:grid-cols-4 auto-rows-auto">
            <Card>
              <Infobox title="총 플레이 타임" information={`${Math.floor(allPlayTime / 60)} 시간`} />
            </Card>
            <Card>
              <Infobox title="보유한 게임 수" information={String(owedGameDatas.length)} />
            </Card>
            <Card bgImage={mostPlayedGame.system_data.header_image}>
              <Infobox title="가장 많이 플레이한 게임" information={`${mostPlayedGame.system_data.name} (${Math.floor(mostPlayedGame.personal_data.playtime_forever / 60)} 시간)`} />
            </Card>
            <Card>
              <Infobox title="총 게임 금액" information={`${num2wonComma(totalPrice / 100)} \u20A9`} />
            </Card>
          </div>
        </div>
        <div className="grid grid-cols-1 gap-6 xl:grid-cols-3 p-6">
          <div>
            {tagPercentage[0] && (
              <Card customClass="mb-6">
                <Dounutchart datas={tagPercentage} totalLabel="가장 많이 플레이한 태그" nameKey="tag" />
              </Card>
            )}
            {genrePercentage[0] && (
            <Card>
              <Dounutchart datas={genrePercentage} totalLabel="가장 많이 플레이한 장르" nameKey="description" />
            </Card>
            )}
          </div>
          <div className="col-span-2">
            <Table datas={viewData} />
            <div className="flex justify-center mt-2">
              <Pagination
                totalDatasNum={gameTable.length}
                viewNum={TABLE_VIEW_NUM}
                setDataIndex={setDataIndex}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});
export default SteamViewBoard;
