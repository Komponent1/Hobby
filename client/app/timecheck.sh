start_time=$(date '+%s')

pnpm install --no-cache

end_time=$(date '+%s')

diff=$((end_time - start_time))
hour=$((diff / 3600 % 24))
minute=$((diff / 60 % 60))
second=$((diff % 60))

echo "$hour 시간 $minute 분 $second 초"