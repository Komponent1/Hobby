import React from "react";
import Image from "next/image";
import { observer } from "mobx-react";
import { GameData } from "../dto/steam.dto.game";
import { useViewData } from "../serviceV2/hook/steam.hooks.viewData";
import {
  Dounutchart,
  Table,
  Card,
  Pagination,
  BgBlurImage,
} from "../components";
import { useAnalyzeTag } from "../serviceV2/hook/steam.hooks.analyzeTag";
import { useAnalyzeGenres } from "../serviceV2/hook/steam.hooks.analyzeGenres";
import {
  TABLE_VIEW_NUM,
  useGetTable,
} from "../serviceV2/hook/steam.hooks.getTable";
import { PlayerSummary } from "../dto/steam.dto.api";
import { useAnalyzeUnplayedGame } from "../serviceV2/hook/steam.hooks.analyzePrice";
import Area from "../components/steam.component.area";
import PlayTime from "../components/steam.component.playtime";
import OwnGame from "../components/steam.component.ownGame";
import MostPlayedGame from "../components/steam.component.mostplaytime";
import Price from "../components/steam.component.price";
import UnplayedGame from "../components/steam.component.unplayedprice";

type Props = {
  owedGameDatas: GameData[];
  playerSummary: PlayerSummary;
};
const SteamViewBoard: React.FC<Props> = observer(
  ({ owedGameDatas, playerSummary }) => {
    const { freeMostPlayedGame, paidMostPlayedGame, allPlayTime, totalPrice } =
      useViewData(owedGameDatas);
    const { gameTable, viewData, setDataIndex, sortOrder, sortData } =
      useGetTable(owedGameDatas);
    const { tagPercentage } = useAnalyzeTag(owedGameDatas);
    const { genrePercentage } = useAnalyzeGenres(owedGameDatas);
    const { unplayedGames, unplayedGamesPrice } =
      useAnalyzeUnplayedGame(owedGameDatas);

    return (
      <div className="min-h-screen w-screen grid place-items-center bg-slate-600">
        <BgBlurImage />
        <div className="mt-32 z-30 grid xl:grid-cols-3 grid-cols-1 px-32">
          <div className="xl:col-span-2 text-center xl:text-left text-white text-4xl font-bold content-center">
            {`${playerSummary.personaname} 분석 결과`}
          </div>
          <div>
            <div className="relative bg-slate-300 h-32 w-32 ml-6 flex items-center justify-center border-4 border-slate-600">
              <Image
                src={playerSummary.avatarfull}
                alt="Avatar Logo"
                fill
                className="top-0 left-0 object-cover"
              />
            </div>
          </div>
        </div>
        <div className="z-30">
          <div className="w-screen flex flex-row flex-wrap justify-center items-center">
            <div className="flex-1 p-6 md:mt-16 grid grid-cols-1 gap-6 lg:grid-cols-3 auto-rows-auto max-w-[1368px]">
              <Area backgroundUrl="/icon/steam.svg">
                <PlayTime playTime={allPlayTime} />
              </Area>
              <Area backgroundUrl="/icon/steam.svg">
                <OwnGame ownedGameDatas={owedGameDatas} />
              </Area>
              <Area backgroundUrl="/icon/steam.svg">
                <Price totalPrice={totalPrice} />
              </Area>
              <Area backgroundUrl={freeMostPlayedGame.system_data.header_image}>
                <MostPlayedGame free mostPlayedGame={freeMostPlayedGame} />
              </Area>
              <Area backgroundUrl={paidMostPlayedGame.system_data.header_image}>
                <MostPlayedGame
                  free={false}
                  mostPlayedGame={paidMostPlayedGame}
                />
              </Area>
              <Area
                backgroundUrl={
                  unplayedGames.length > 0
                    ? unplayedGames[0].system_data.header_image
                    : "/icon/steam.svg"
                }
              >
                <UnplayedGame
                  unplayedGames={unplayedGames}
                  totalUnplayedPrice={unplayedGamesPrice}
                />
              </Area>
            </div>
          </div>
          <div className="grid grid-cols-1 gap-6 xl:grid-cols-3 p-6">
            <div>
              {tagPercentage[0] && (
                <Card customClass="mb-6">
                  <Dounutchart
                    datas={tagPercentage}
                    totalLabel="가장 많이 플레이한 태그"
                    nameKey="tag"
                  />
                </Card>
              )}
              {genrePercentage[0] && (
                <Card>
                  <Dounutchart
                    datas={genrePercentage}
                    totalLabel="가장 많이 플레이한 장르"
                    nameKey="description"
                  />
                </Card>
              )}
            </div>
            <div className="xl:col-span-2">
              <Table datas={viewData} sortData={sortData} />
              <div className="flex justify-center mt-2">
                <Pagination
                  sortOrder={sortOrder}
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
  }
);
export default SteamViewBoard;
