drop database if exists searchdb;
create database if not exists searchdb;

use searchdb;

DROP TABLE IF EXISTS places;
CREATE TABLE IF NOT EXISTS places (
  id int NOT NULL AUTO_INCREMENT,
  name varchar(128) NOT NULL,
  alias char(3) NOT NULL,
  created_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  UNIQUE KEY places_UK_1 (name,alias),
  KEY places_IDX_1 (name),
  KEY places_IDX_2 (alias),
  KEY places_IDX_4 (created_at),
  KEY places_IDX_5 (updated_at)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

TRUNCATE places;

INSERT INTO places(name, alias) VALUES
('United States', 'USA' ),
('Canada', 'CAN'),
('United Kingdom', 'GBR'),
('France', 'FRA'),
('Germany', 'DEU'),
('Spain', 'ESP'),
('Italy', 'ITA'),
('Australia', 'AUS'),
('Japan', 'JPN'),
('China', 'CHN');

DROP TABLE IF EXISTS trips;
CREATE TABLE IF NOT EXISTS trips (
  id int NOT NULL AUTO_INCREMENT,
  id_origin int NOT NULL,
  id_destiny int NOT NULL,
  available tinyint(1) NOT NULL DEFAULT '0',
  created_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  KEY trips_IDX_1 (id_origin),
  KEY trips_IDX_2 (id_destiny),
  KEY trips_IDX_3 (available),
  KEY trips_IDX_4 (created_at),
  KEY trips_IDX_5 (updated_at),
  CONSTRAINT trips_FK_1 FOREIGN KEY (id_origin) REFERENCES places (id),
  CONSTRAINT trips_FK_2 FOREIGN KEY (id_destiny) REFERENCES places (id)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

truncate trips; 

INSERT INTO trips(id_origin, id_destiny, available) VALUES
(1, 2, 1),
(2, 3, 0),
(3, 4, 1),
(4, 5, 1),
(5, 6, 0),
(6, 7, 1),
(7, 8, 0),
(8, 9, 1),
(9, 10, 1),
(10, 1, 0);


DELIMITER //
CREATE PROCEDURE searchdb.get_available_trips()
begin
	
	select
		t1.id,
		t2.name as origin,
		t3.name as destiny
	from searchdb.trips t1
	inner join searchdb.places t2 on t2.id = t1.id_origin
	inner join searchdb.places t3 on t3.id = t1.id_destiny
	and t1.available = 1;
	
end //

CREATE PROCEDURE searchdb.get_trip_by_preference(
	in p_origin CHAR(3),
	in p_destiny CHAR(3)
)
begin
	
	declare v_id_origin CHAR(3);
	declare v_id_destiny CHAR(3);

	select 
		t1.id
	into 
		v_id_origin
	from searchdb.places t1
	where t1.alias = p_origin
	limit 1;
	
	select 
		t1.id
	into 
		v_id_destiny
	from searchdb.places t1
	where t1.alias = p_destiny
	limit 1;

	select
		t1.id,
		t2.name as origin,
		t3.name as destiny
	from searchdb.trips t1
	inner join searchdb.places t2 on t2.id = t1.id_origin
	inner join searchdb.places t3 on t3.id = t1.id_destiny
	where t1.id_origin = v_id_origin
	and t1.id_destiny = v_id_destiny
	and t1.available = 1;
	
end //
DELIMITER ;
	
drop database if exists reservedb;
create database if not exists reservedb;