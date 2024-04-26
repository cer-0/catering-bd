---------------------------------------------------------------------------
-- Creación de usuarios para la BD del servicio de catering (Práctica 1) --
---------------------------------------------------------------------------

show con_name;
alter session set container=xepdb1;
show con_name;

----------------------------
-- Creación de Tablespace --
----------------------------
select tablespace_name from dba_tablespaces;
create tablespace catering
    datafile '/opt/oracle/product/18c/dbhomeXE/dbs/catering.dbf'
    size 100m
    autoextend on next 10m
    maxsize 200m
    online;
select tablespace_name from dba_tablespaces where tablespace_name = 'CATERING';

-------------------------
-- Creación de usuario --
-------------------------
select username from dba_users;
create user elbicho
    identified by 1234
    default tablespace catering
    quota unlimited on catering;
select username from dba_users where username = 'elbicho';

---------------------
-- Creación de rol --
---------------------
select role from dba_roles;
create role desarrollador;
select role from dba_roles where role = 'DESARROLLADOR';

----------------------------
-- Otorgar permisos a rol --
----------------------------
select privilege from dba_sys_privs where grantee = 'DESARROLLADOR';
grant create session,
    create table,
    alter any table,
    drop any table,
    insert any table,
    update any table,
    delete any table,
    select any table,
    create sequence, -- Para crear ids automáticamente
    to desarrollador;
select privilege from dba_sys_privs where grantee = 'DESARROLLADOR';

---------------------------
-- Otorgar rol a usuario --
---------------------------
select privilege from dba_sys_privs where grantee = 'ELBICHO';
grant desarrollador to elbicho;
disconnect;
conn elbicho/1234@localhost:1521/xepdb1
show user;
select granted_role from user_role_privs;
