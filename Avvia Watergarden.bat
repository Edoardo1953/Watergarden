@echo off
chcp 65001 > nul
title Watergarden Management Sarl - App Portatile
color 0A
cd /d "%~dp0"

echo ======================================================================
echo   Watergarden Management Sarl - Avvio Applicazione Portatile
echo   Holding de Participations - Luxembourg / Bresil
echo ======================================================================
echo.
echo Avvio immediato in corso (nessuna installazione di Python o Node richiesta)...
echo.

powershell -NoProfile -ExecutionPolicy Bypass -File "%~dp0portable_server.ps1" -Port 8089
if %ERRORLEVEL% NEQ 0 (
    echo Apertura diretta nel browser...
    start "" "%~dp0index.html"
)
exit
