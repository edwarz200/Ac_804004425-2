@echo off
call InitApp.bat
cd %CD%/inicializadores
call databas_mongod
ping localhost -n 5
Start http://localhost:2000/