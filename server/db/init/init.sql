GRANT ALL PRIVILEGES ON DATABASE test TO test;

\c test;

CREATE TABLE Users(
  ID        SERIAL        not null  primary key,
  email     varchar(20)   not null  UNIQUE,
  password  varchar(100)  not null,
  salt      varchar(100)  not null
);
