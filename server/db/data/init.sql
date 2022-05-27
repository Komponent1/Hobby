GRANT ALL PRIVILEGES ON DATABASE test TO seo2im;

\c test;

CREATE TABLE Users(
  email     varchar(100)  not null  primary key,
  password  varchar(100)  not null,
  salt      varchar(100)  not null
);

CREATE TABLE Category(
  ID          SERIAL        not null  primary key,
  name        varchar(100)  not null,
  user_email  varchar(100)  not null  REFERENCES Users(email)
);

CREATE TABLE Article(
  ID            SERIAL        not null  primary key,
  title         varchar(100)  not null,
  publish_date  varchar(100)  not null,
  category_id   int           not null  REFERENCES Category(ID),
  user_email    varchar(100)  not null  REFERENCES Users(email),
  path          varchar(100)  not null
);
