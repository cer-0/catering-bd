-------------------------------------------------------------------------
-- Creación de tablas para la BD del servicio de catering (Práctica 2) --
-------------------------------------------------------------------------

CREATE TABLE TIPO_PRODUCTO(
    ID NUMBER(1) GENERATED BY DEFAULT AS IDENTITY NOT NULL,
    TIPO VARCHAR(25) NOT NULL,
    CONSTRAINT TIPO_PRODUCTO_PK PRIMARY KEY (ID)
);

CREATE TABLE BILINGUE(
    ID NUMBER(1) GENERATED BY DEFAULT AS IDENTITY NOT NULL,
    BILINGUE NUMBER(1) NOT NULL,
    CONSTRAINT BILINGUE_PK PRIMARY KEY (ID)
);

CREATE TABLE ROL_EMPLEADO(
    ID NUMBER(2) GENERATED BY DEFAULT AS IDENTITY NOT NULL,
    ROL VARCHAR(25) NOT NULL,
    CONSTRAINT ROL_EMPLEADO_PK PRIMARY KEY (ID)
);

CREATE TABLE ESTADO(
    ID NUMBER(2) GENERATED BY DEFAULT AS IDENTITY NOT NULL,
    ESTADO VARCHAR(25) NOT NULL,
    CONSTRAINT ESTADO_PK PRIMARY KEY (ID)
);

CREATE TABLE PRODUCTO(
  CODIGO VARCHAR2(5) NOT NULL,
  NOMBRE VARCHAR2(25) NOT NULL,
  DESCRIPCION VARCHAR2(150),
  CADUCIDAD DATE NOT NULL,
  TIPO_PRODUCTO_ID NUMBER(1) NOT NULL,
  CONSTRAINT PRODUCTO_PK PRIMARY KEY (CODIGO),
  CONSTRAINT PRODUCTO_TIPO_PRODUCTO_FK FOREIGN KEY(TIPO_PRODUCTO_ID)
  REFERENCES TIPO_PRODUCTO(ID)
);

CREATE TABLE DIRECCION(
  ID NUMBER(4) GENERATED BY DEFAULT AS IDENTITY NOT NULL,
  MUNICIPIO VARCHAR2(25) NOT NULL,
  COLONIA VARCHAR2(25) NOT NULL,
  CALLE VARCHAR2(30) NOT NULL,
  CP VARCHAR2(5) NOT NULL,
  NO_EXT VARCHAR2(4) NOT NULL,
  NO_INT VARCHAR2(3),
  ESTADO_ID NUMBER(2) NOT NULL,
  CONSTRAINT DIRECCION_PK PRIMARY KEY (ID),
  CONSTRAINT DIRECCION_ESTADO_FK FOREIGN KEY(ESTADO_ID)
  REFERENCES ESTADO(ID)
);

CREATE TABLE SUCURSAL(
  ID NUMBER(2) GENERATED BY DEFAULT AS IDENTITY NOT NULL,
  NOMBRE VARCHAR2(25) NOT NULL,
  LADA VARCHAR2(2) NOT NULL,
  TELEFONO VARCHAR2(8) NOT NULL,
  DIRECCION_ID NUMBER(4) NOT NULL,
  CONSTRAINT SUCURSAL_PK PRIMARY KEY (ID),
  CONSTRAINT SUCURSAL_DIRECCION_FK FOREIGN KEY(DIRECCION_ID)
  REFERENCES DIRECCION(ID)
);

CREATE TABLE EMPLEADO(
  ID NUMBER(4) GENERATED BY DEFAULT AS IDENTITY NOT NULL,
  NOMBRE VARCHAR2(25) NOT NULL,
  APELLIDO_PATERNO VARCHAR2(25) NOT NULL,
  APELLIDO_MATERNO VARCHAR2(25) NOT NULL,
  CORREO_EMPLEADO VARCHAR2(40) NOT NULL,
  LADA VARCHAR2(2) NOT NULL,
  TELEFONO VARCHAR2(8) NOT NULL,
  ROL_EMPLEADO_ID NUMBER(2) NOT NULL,
  BILINGUE_ID NUMBER(1) NOT NULL,
  SUCURSAL_ID NUMBER(2) NOT NULL,
  CONSTRAINT EMPLEADO_PK PRIMARY KEY (ID),
  CONSTRAINT EMPLEADO_ROL_EMPLEADO_FK FOREIGN KEY(ROL_EMPLEADO_ID)
  REFERENCES ROL_EMPLEADO(ID),
  CONSTRAINT EMPLEADO_BILINGUE_FK FOREIGN KEY(BILINGUE_ID)
  REFERENCES BILINGUE(ID),
  CONSTRAINT EMPLEADO_SUCURSAL_FK FOREIGN KEY(SUCURSAL_ID)
  REFERENCES SUCURSAL(ID)
);

CREATE TABLE PRODUCTO_SUCURSAL(
  PRODUCTO_CODIGO VARCHAR2(5) NOT NULL,
  SUCURSAL_ID NUMBER(2) NOT NULL,
  CANTIDAD NUMBER(6) NOT NULL,
  CONSTRAINT PRODUCTO_SUCURSAL_PK PRIMARY KEY (PRODUCTO_CODIGO, SUCURSAL_ID),
  CONSTRAINT PRODUCTO_SUCURSAL_PRODUCTO_FK FOREIGN KEY(PRODUCTO_CODIGO)
  REFERENCES PRODUCTO(CODIGO),
  CONSTRAINT PRODUCTO_SUCURSAL_SUCURSAL_FK FOREIGN KEY(SUCURSAL_ID)
  REFERENCES SUCURSAL(ID)
);

CREATE TABLE CLIENTE(
  CODIGO VARCHAR2(5) NOT NULL,
  NOMBRE VARCHAR2(25) NOT NULL,
  DESCRIPCION VARCHAR2(150),
  CORREO VARCHAR2(30) NOT NULL,
  LADA VARCHAR2(2) NOT NULL,
  TELEFONO VARCHAR2(8) NOT NULL,
  DIRECCION_ID NUMBER(4) NOT NULL,
  CONSTRAINT CLIENTE_PK PRIMARY KEY (CODIGO),
  CONSTRAINT CLIENTE_DIRECCION_FK FOREIGN KEY(DIRECCION_ID)
  REFERENCES DIRECCION(ID)
);

CREATE TABLE SERVICIO(
  ID NUMBER(5) GENERATED BY DEFAULT AS IDENTITY NOT NULL,
  FECHA_SOLICITUD DATE NOT NULL,
  FECHA_INICIO DATE NOT NULL,
  FECHA_FIN DATE NOT NULL,
  HORA_INICIO TIMESTAMP NOT NULL,
  HORA_FIN TIMESTAMP NOT NULL,
  PRECIO NUMBER(8) NOT NULL,
  DIRECCION_ID NUMBER(4) NOT NULL,
  CLIENTE_CODIGO VARCHAR2(5) NOT NULL,
  SUCURSAL_ID NUMBER(2) NOT NULL,
  CONSTRAINT SERVICIO_PK PRIMARY KEY(ID),
  CONSTRAINT SERVICIO_DIRECCION_FK FOREIGN KEY(DIRECCION_ID)
  REFERENCES DIRECCION(ID),
  CONSTRAINT SERVICIO_CLIENTE_FK FOREIGN KEY(CLIENTE_CODIGO)
  REFERENCES CLIENTE(CODIGO),
  CONSTRAINT SERVICIO_SUCURSAL_FK FOREIGN KEY(SUCURSAL_ID)
  REFERENCES SUCURSAL(ID)
);

CREATE TABLE PRODUCTO_SERVICIO(
  PRODUCTO_CODIGO VARCHAR2(5) NOT NULL,
  SERVICIO_ID NUMBER(5) NOT NULL,
  CANTIDAD NUMBER(6) NOT NULL,
  CONSTRAINT PRODUCTO_SERVICIO_PK PRIMARY KEY (PRODUCTO_CODIGO, SERVICIO_ID),
  CONSTRAINT PRODUCTO_SERVICIO_PRODUCTO_FK FOREIGN KEY(PRODUCTO_CODIGO)
  REFERENCES PRODUCTO(CODIGO),
  CONSTRAINT PRODUCTO_SERVICIO_SERVICIO_FK FOREIGN KEY(SERVICIO_ID)
  REFERENCES SERVICIO(ID)
);