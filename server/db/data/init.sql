GRANT ALL PRIVILEGES ON DATABASE test TO seo2im;

\c test;

CREATE TABLE users(
  id        VARCHAR(100)  NOT NULL  PRIMARY KEY,
  src       TEXT          NOT NULL,
  github    VARCHAR(100)  NOT NULL
);

CREATE TABLE article(
  ID            SERIAL        NOT NULL  PRIMARY KEY,
  title         TEXT          NOT NULL,
  publish_date  VARCHAR(100)  NOT NULL,
  update_date   VARCHAR(100)  NOT NULL,
  user_id       VARCHAR(100)  NOT NULL  REFERENCES users(id),
  path          TEXT          NOT NULL,
  next_id       INTEGER,
  prev_id       INTEGER,
  src           TEXT
);

CREATE TABLE tag
(
	id    SERIAL        PRIMARY KEY,
	name  VARCHAR(100)  NOT NULL,
  color VARCHAR(20)   NOT NULL
);

CREATE TABLE article_tag
(
	article_id  INTEGER NOT NULL,
	tag_id      INTEGER NOT NULL,
	PRIMARY KEY (article_id, tag_id),
	CONSTRAINT  fk_article_id FOREIGN KEY (article_id)  REFERENCES article (id) MATCH SIMPLE ON UPDATE NO ACTION ON DELETE NO ACTION,
	CONSTRAINT  fk_tag_id     FOREIGN KEY (tag_id)      REFERENCES tag (id)     MATCH SIMPLE ON UPDATE NO ACTION ON DELETE NO ACTION
);
