psql -U seo2im -d test -a -f /docker-entrypoint-initdb.d/init.sql

while true;
do
  pg_dump -U seo2im -d test -Ft -f /backup/`date +%m-%d-%y-%T`-backup.dump;
  echo 'backup';
  sleep 6000;
done;
