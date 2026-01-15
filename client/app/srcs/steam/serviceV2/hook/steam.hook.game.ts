import { useEffect, useState } from "react";
import { useQueries, useQuery } from "@tanstack/react-query";
import { ownedGamesQuery, playerSummaryQuery } from "../query/steam.query.game";
import { dataFetch, makeGameSet } from "../../utils/steam.util.game";
import { OwnedGames } from "../../dto/steam.dto.api";
import { GameData } from "../../dto/steam.dto.game";

export const useGame = () => {
  const [range, setRange] = useState(0);
  const [steamid, setSteamid] = useState("");
  const {
    data: playerSummary,
    isError: isPlayerSummaryError,
    isPending: isPlayerSummaryPending,
  } = useQuery({
    ...playerSummaryQuery(steamid),
    enabled: steamid.trim() !== "",
  });
  const {
    data: ownedGames,
    isError: isOwnedGamesError,
    isPending: isOwnedGamesPending,
  } = useQuery({
    ...ownedGamesQuery(steamid),
    enabled: steamid.trim() !== "",
  });
  const [gameSet, setGameSet] = useState<OwnedGames[][]>([]);
  const [completeBatches, setCompleteBatches] = useState(0);
  useEffect(() => {
    if (ownedGames) {
      setGameSet(makeGameSet(ownedGames));
    }
  }, [ownedGames]);

  const {
    data,
    isPending: isGameDetailsPending,
    isError: isGameDetailsError,
  } = useQueries({
    queries: gameSet.map((gameChunk, index) => ({
      queryKey: ["gameDetails", steamid, index],
      queryFn: () => dataFetch(gameChunk),
      enabled: index <= completeBatches,
      staleTime: Infinity,
    })),
    combine: (results) => {
      const successCount = results.filter((r) => r.isSuccess).length;
      if (successCount > completeBatches && successCount < gameSet.length) {
        setCompleteBatches(successCount + 1);
      }

      return {
        data: results
          .filter((r) => r.isSuccess && r.data)
          .flatMap((r) => r.data as GameData[]),
        isPending: results.some((r) => r.isPending),
        isError: results.some((r) => r.isError),
        isSuccess: results.every((r) => r.isSuccess),
      };
    },
  });
  useEffect(() => {
    if (gameSet.length > 0) {
      setRange(completeBatches / gameSet.length);
    } else {
      setRange(0);
    }
  }, [gameSet, completeBatches]);

  return {
    playerSummary,
    ownedGames,
    setSteamid,
    gameDetails: data,
    range,
    isPending:
      isPlayerSummaryPending || isOwnedGamesPending || isGameDetailsPending,
    error: isPlayerSummaryError || isOwnedGamesError || isGameDetailsError,
  };
};
