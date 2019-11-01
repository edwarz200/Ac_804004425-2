dim Directory
Directory = "C:\Program Files\MongoDB\Server\4.2\bin\mongod.exe"

Set WshShell = CreateObject("WScript.Shell")
WshShell.Run chr(34) & Directory & Chr(34), 0
Set WshShell = Nothing