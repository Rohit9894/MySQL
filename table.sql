CREATE TABLE product (
    id int NOT NULL AUTO_INCREMENT,
    name varchar(50) NOT NULL,
    description varchar(255),
    price integer,
    PRIMARY KEY(id)
);
-- created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP