USE RAM;

CREATE TABLE IF NOT EXISTS RAM(
	acuerdo_id VARCHAR(9) PRIMARY KEY,
	nro_acuerdo VARCHAR(9),
	fecha VARCHAR(15),
	detalle VARCHAR(600)
);