import React, { useState, useEffect, useCallback } from 'react';

// New, more relevant Compass SVG Logo as a Data URI.
const logoSvg = 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgd2lkdGg9IjMwMCIgaGVpZ2h0PSIzMDAiPgo8cGF0aCBkPSJNMCAwIEMxMC45NTQxODY5MyA4LjE3MDM0MDkzIDE4LjQzNjE3NDI0IDIwLjg0MTAxMTYxIDIwLjUxOTUzMTI1IDM0LjM3NSBDMjEuOTExMDU0MDkgNTEuNTkyNzc1OTkgMTcuNDU5Mjc0MjUgNjYuMzYxMTM5NzIgNi4yOTI5Njg3NSA3OS43MzA0Njg3NSBDMi41NTk0OTc5NiA4My40MjU3NzggLTMuNDc0NzU0MjUgODkgLTkgODkgQy05LjMzIDg5LjY2IC05LjY2IDkwLjMyIC0xMCA5MSBDLTExLjk4IDg2LjA1IC0xMy45NiA4MS4xIC0xNiA3NiBDLTE0LjY1OTM3NSA3NS4wMSAtMTMuMzE4NzUgNzQuMDIgLTExLjkzNzUgNzMgQy0zLjgyNTAzODAzIDY2LjYyMjI3ODMyIDEuODE0Mjg0NTMgNjAuMzMzNjQ4OSA0IDUwIEM1LjE2NDcxOTY4IDM4Ljc3MzA2MjkyIDMuNjkwMTcxNCAyOS4yMjg2ODczNiAtMi41NjI1IDE5Ljc1IEMtOS4wODAyNDkyMiAxMS43NTQ2NzUzOSAtMTkuMTMxMjMzMDQgNi44MjU0ODgyNCAtMjkuMzA4NTkzNzUgNS43NTc4MTI1IEMtMzkuOTAwNzMzNjQgNS40MjczODE3OSAtNDguNDYyOTI0MDggOC43NDI2NDM5MyAtNTcgMTUgQy02NC44Nzg3OTIzMSAyMi44Nzg3OTIzMSAtNjguMDc3NzU0NDMgMzEuNjU0NDU4MTMgLTY4LjMxMjUgNDIuNjg3NSBDLTY4LjI0NDA5NTMyIDUyLjAxOTg1MjcyIC02NS4yNDU2NTg3NSA1OC41MDYyMDE3OSAtNjAgNjYgQy02MCA2Ni42NiAtNjAgNjcuMzIgLTYwIDY4IEMtNTkuMTU1MDE5NTMgNjguNDExODU1NDcgLTU5LjE1NTAxOTUzIDY4LjQxMTg1NTQ3IC01OC4yOTI5Njg3NSA2OC44MzIwMzEyNSBDLTQ3Ljc1NjQwNDE0IDc0LjE5OTAzNzc1IC00Ny43NTY0MDQxNCA3NC4xOTkwMzc3NSAtNDUuNjg3NSA3OS4xMjUgQy00Ni4zMzYxNTIxMSA4Ny4xNjgyODYxNSAtNDguNjk4MTc1MTcgOTUuNTUzODE5NDEgLTU1IDEwMSBDLTU3LjY3NDk5MTE3IDEwMi40NTM4MTQ0NyAtNjAuNDIzODk3NDIgMTAzLjQzMDIwMjM3IC02My4zMTI1IDEwNC4zNzUgQy02NC4wNTMwNjY0MSAxMDQuNjM0MTAxNTYgLTY0Ljc5MzYzMjgxIDEwNC44OTMyMDMxMyAtNjUuNTU2NjQwNjIgMTA1LjE2MDE1NjI1IEMtNjcuMzY1MzE1MzMgMTA1Ljc5MDI3NTE4IC02OS4xODE5MjY0NyAxMDYuMzk3NTM2MTUgLTcxIDEwNyBDLTczLjM5NTQyNTgzIDEwMi40MTg0NTczOSAtNzUuNTA4Mjk3MzQgOTcuOTcyMzQyMiAtNzcgOTMgQy03Mi4wNTc3MDgxIDkwLjQ4NTUwMDYxIC02Ny4xMTgyMzQxIDg4LjEzMjU5NzU0IC02MiA4NiBDLTYzLjQ1NDA2MjUgODUuMTMzNzUgLTYzLjQ1NDA2MjUgODUuMTMzNzUgLTY0LjkzNzUgODQuMjUgQy03NS42MzI1MDY1MSA3Ni41NDg3Mjc1NyAtODEuODExNDM5MTMgNjMuNzU4NDk2MDQgLTg0LjM3NSA1MS4xMjUgQy04Ni41OTk5NjExIDM0Ljc1ODY5OTYyIC04Mi4wMzQ2Nzk5MyAyMS41NDgyMzc3MSAtNzIuNzg1MTU2MjUgOC4yNTM5MDYyNSBDLTU1LjE1NTQzMTEgLTE0LjU5OTQ0MTE3IC0yMi4yNzExODkyNCAtMTUuMDMwNjI4NDQgMCAwIFogIiBmaWxsPSIjRTBFQUVGIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgxODIsMTE5KSIvPgo8cGF0aCBkPSJNMCAwIEMwLjk5IDAgMS45OCAwIDMgMCBDMyAwLjY2IDMgMS4zMiAzIDIgQzUuMzEgMiA3LjYyIDIgMTAgMiBDMTAgMi42NiAxMCAzLjMyIDEwIDQgQzExLjMyIDQgMTIuNjQgNCAxNCA0IEMxNC4zMyA1LjMyIDE0LjY2IDYuNjQgMTUgOCBDMTUuOTkgOCAxNi45OCA4IDE4IDggQzE5LjAxMjU5NjE5IDExLjM2OTkyMDEzIDE5LjE2NTU1NjA5IDE0LjQ4ODk3NDgxIDE5LjE4NzUgMTggQzE5LjIwMTY3OTY5IDE5LjAzMTI1IDE5LjIxNTg1OTM4IDIwLjA2MjUgMTkuMjMwNDY4NzUgMjEuMTI1IEMxOS4wMDI3Njk0NyAyMy45NjU0NTIwMyAxOC40NjUwNDA2MSAyNS41OTEwNzk0OCAxNyAyOCBDMTYuMzQgMjggMTUuNjggMjggMTUgMjggQzE1IDI4LjY2IDE1IDI5LjMyIDE1IDMwIEMxNC4zNCAzMCAxMy42OCAzMCAxMyAzMCBDMTMgMzAuNjYgMTMgMzEuMzIgMTMgMzIgQzExLjY4IDMyIDEwLjM2IDMyIDkgMzIgQzkgMzIuNjYgOSAzMy4zMiA5IDM0IEM1LjM3IDM0IDEuNzQgMzQgLTIgMzQgQy0yIDMzLjM0IC0yIDMyLjY4IC0yIDMyIEMtMy4zMiAzMiAtNC42NCAzMiAtNiAzMiBDLTYgMzEuMzQgLTYgMzAuNjggLTYgMzAgQy02Ljk5IDMwIC03Ljk4IDMwIC05IDMwIEMtMTIuNDE4ODU5NjQgMjMuMTAzNTg3ODYgLTEzLjg5MTk5NDUxIDE3LjU5NDYyNTg1IC0xMiAxMCBDLTExLjM3NjE4NDE3IDguNjQ2MDg4NjIgLTEwLjcyMDkxNjU3IDcuMzA0Nzk5NDIgLTEwIDYgQy05LjM0IDYgLTguNjggNiAtOCA2IEMtOCA1LjM0IC04IDQuNjggLTggNCBDLTYuMzUgNCAtNC43IDQgLTMgNCBDLTMgMy4zNCAtMyAyLjY4IC0zIDIgQy0yLjAxIDIgLTEuMDIgMiAwIDIgQzAgMS4zNCAwIDAuNjggMCAwIFogIiBmaWxsPSIjMzJCMTRBIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgxNDYsNzIpIi8+CjxwYXRoIGQ9Ik0wIDAgQzAuOTkgMCAxLjk4IDAgMyAwIEMzIDAuNjYgMyAxLjMyIDMgMiBDNS4zMSAyIDcuNjIgMiAxMCAyIEMxMCAyLjk5IDEwIDMuOTggMTAgNSBDMTAuNjYgNS4zMyAxMS4zMiA1LjY2IDEyIDYgQzMuNTg1IDYuNDk1IDMuNTg1IDYuNDk1IC01IDcgQy01Ljk5IDkuMzEgLTYuOTggMTEuNjIgLTggMTQgQy04LjY2IDE0IC05LjMyIDE0IC0xMCAxNCBDLTEwIDE2LjY0IC0xMCAxOS4yOCAtMTAgMjIgQy05LjM0IDIyIC04LjY4IDIyIC04IDIyIEMtNy4zNCAyMi42NiAtNi42OCAyMy4zMiAtNiAyNCBDLTQuNjggMjQgLTMuMzYgMjQgLTIgMjQgQy0yIDI0LjY2IC0yIDI1LjMyIC0yIDI2IEMwLjY0IDI2IDMuMjggMjYgNiAyNiBDNiAyNi42NiA2IDI3LjMyIDYgMjggQzcuMjU4MTI1IDI3LjkzODEyNSA4LjUxNjI1IDI3Ljg3NjI1IDkuODEyNSAyNy44MTI1IEMxMC44NzQwNDI5NyAyNy43NjAyOTI5NyAxMC44NzQwNDI5NyAyNy43NjAyOTI5NyAxMS45NTcwMzEyNSAyNy43MDcwMzEyNSBDMTQuMjEwMzMwNjggMjcuMTI4Mzk0MTMgMTQuMjEwMzMwNjggMjcuMTI4Mzk0MTMgMTUuNzUgMjQuODQzNzUgQzE3LjE5ODY2Njk5IDIxLjU0ODAzMjU5IDE3LjMwNTU5NDk5IDE5LjI2OTcxNDY4IDE3LjE4NzUgMTUuNjg3NSBDMTcuMTYwNDI5NjkgMTQuNjE4ODY3MTkgMTcuMTMzMzU5MzcgMTMuNTUwMjM0MzggMTcuMTA1NDY4NzUgMTIuNDQ5MjE4NzUgQzE3LjA1MzI2MTcyIDExLjIzNjg1NTQ3IDE3LjA1MzI2MTcyIDExLjIzNjg1NTQ3IDE3IDEwIEMxNi4zNCAxMCAxNS42OCAxMCAxNSAxMCBDMTUgOS4zNCAxNSA4LjY4IDE1IDggQzE1Ljk5IDggMTYuOTggOCAxOCA4IEMxOS4wMTI1OTYxOSAxMS4zNjk5MjAxMyAxOS4xNjU1NTYwOSAxNC40ODg5NzQ4MSAxOS4xODc1IDE4IEMxOS4yMDE2Nzk2OSAxOS4wMzEyNSAxOS4yMTU4NTkzOCAyMC4wNjI1IDE5LjIzMDQ2ODc1IDIxLjEyNSBDMTkuMDAyNzY5NDcgMjMuOTY1NDUyMDMgMTguNDY1MDQwNjEgMjUuNTkxMDc5NDggMTcgMjggQzE2LjM0IDI4IDE1LjY4IDI4IDE1IDI4IEMxNSAyOC42NiAxNSAyOS4zMiAxNSAzMCBDMTQuMzQgMzAgMTMuNjggMzAgMTMgMzAgQzEzIDMwLjY2IDEzIDMxLjMyIDEzIDMyIEMxMS42OCAzMiAxMC4zNiAzMiA5IDMyIEM5IDMyLjY2IDkgMzMuMzIgOSAzNCBDNS4zNyAzNCAxLjc0IDM0IC0yIDM0IEMtMiAzMy4zNCAtMiAzMi42OCAtMiAzMiBDLTMuMzIgMzIgLTQuNjQgMzIgLTYgMzIgQy02IDMxLjM0IC02IDMwLjY4IC02IDMwIEMtNi45OSAzMCAtNy45OCAzMCAtOSAzMCBDLTEyLjQxODg1OTY0IDIzLjEwMzU4Nzg2IC0xMy44OTE5OTQ1MSAxNy41OTQ2MjU4NSAtMTIgMTAgQy0xMS4zNzYxODQxNyA4LjY0NjA4ODYyIC0xMC43MjA5MTY1NyA3LjMwNDc5OTQyIC0xMCA2IEMtOS4zNCA2IC04LjY4IDYgLTggNiBDLTggNS4zNCAtOCA0LjY4IC04IDQgQy02LjM1IDQgLTQuNyA0IC0zIDQgQy0zIDMuMzQgLTMgMi42OCAtMyAyIEMtMi4wMSAyIC0xLjAyIDIgMCAyIEMwIDEuMzQgMCAwLjY4IDAgMCBaICIgZmlsbD0iIzE4NkQzMSIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMTQ2LDcyKSIvPgo8cGF0aCBkPSJNMCAwIEMwLjI4ODc1IDAuNTk4MTI1IDAuNTc3NSAxLjE5NjI1IDAuODc1IDEuODEyNSBDMi4wNDc0MjAyNiA0LjE5MzI3NzkyIDIuMDQ3NDIwMjYgNC4xOTMyNzc5MiA0IDcgQzMuNjcgNy42NiAzLjM0IDguMzIgMyA5IEM1Ljk3IDkuNDk1IDUuOTcgOS40OTUgOSAxMCBDOC41ODAyIDE0Ljg5NzY2NjYxIDYuNjg2MDgzNjIgMTYuODYyOTA3NTUgMyAyMCBDLTQuMTUwNjg0OTMgMjUgLTQuMTUwNjg0OTMgMjUgLTcgMjUgQy03LjMzIDI1LjY2IC03LjY2IDI2LjMyIC04IDI3IEMtOS45OCAyMi4wNSAtMTEuOTYgMTcuMSAtMTQgMTIgQy0xMi42MTgxMjUgMTAuOTQ4MTI1IC0xMS4yMzYyNSA5Ljg5NjI1IC05LjgxMjUgOC44MTI1IEMtNi4yNzIxMjIyMyA2LjA2NTA3NzUgLTMuMDY1MTg3NTcgMy4yNjI5NDE2MSAwIDAgWiAiIGZpbGw9IiNFOEYzRjciIHRyYW5zZm9ybT0idHJhbnNsYXRlKDE4MCwxODMpIi8+CjxwYXRoIGQ9Ik0wIDAgQzMuOTYgMCA3LjkyIDAgMTIgMCBDMTIgMC42NiAxMiAxLjMyIDEyIDIgQzEyLjY2IDIgMTMuMzIgMiAxNCAyIEMxNCAyLjY2IDE0IDMuMzIgMTQgNCBDMTUuMzIgNCAxNi42NCA0IDE4IDQgQzE4IDQuNjYgMTggNS4zMiAxOCA2IEMxOC42NiA2IDE5LjMyIDYgMjAgNiBDMjAgNi42NiAyMCA3LjMyIDIwIDggQzIwLjk5IDggMjEuOTggOCAyMyA4IEMyMyA4LjY2IDIzIDkuMzIgMjMgMTAgQzIzLjY2IDEwIDI0LjMyIDEwIDI1IDEwIEMyNy4wMzQzNTUzMSAxMy43Mjk2NTEzOSAyOCAxNS42NjkwNTA0MiAyOCAyMCBDMjguNjYgMjAgMjkuMzIgMjAgMzAgMjAgQzMwLjMzIDIzLjMgMzAuNjYgMjYuNiAzMSAzMCBDMjkuMzUgMjkuNjcgMjcuNyAyOS4zNCAyNiAyOSBDMjUuMzQgMjYuMDMgMjQuNjggMjMuMDYgMjQgMjAgQzIzLjM0IDIwIDIyLjY4IDIwIDIyIDIwIEMyMS41NjY4NzUgMTguODY1NjI1IDIxLjEzMzc1IDE3LjczMTI1IDIwLjY4NzUgMTYuNTYyNSBDMjAuMTMwNjI1IDE1LjM4Njg3NSAxOS41NzM3NSAxNC4yMTEyNSAxOSAxMyBDMTguMDEgMTIuNjcgMTcuMDIgMTIuMzQgMTYgMTIgQzE2IDExLjM0IDE2IDEwLjY4IDE2IDEwIEMxNS4zNCAxMCAxNC42OCAxMCAxNCAxMCBDMTQgOS4zNCAxNCA4LjY4IDE0IDggQzEzLjAxIDggMTIuMDIgOCAxMSA4IEMxMSA3LjM0IDExIDYuNjggMTEgNiBDOC4wMyA2IDUuMDYgNiAyIDYgQzIgNS4zNCAyIDQuNjggMiA0IEMxLjM0IDQgMC42OCA0IDAgNCBDMCAyLjY4IDAgMS4zNiAwIDAgWiAiIGZpbGw9IiMzNTc0NTEiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDE1MSwxMzApIi8+CjxwYXRoIGQ9Ik0wIDAgQzUuMDg5Mzg4MTEgMS41OTA0MzM3OSA4Ljg3NDU2NjQzIDQuNzQ0Njk1MSAxMyA4IEMxMi42NyA4Ljk5IDEyLjM0IDkuOTggMTIgMTEgQzEwLjY4IDEwLjAxIDkuMzYgOS4wMiA4IDggQzggOC42NiA4IDkuMzIgOCAxMCBDNy4zNCAxMCA2LjY4IDEwIDYgMTAgQzUuNjcgOC42OCA1LjM0IDcuMzYgNSA2IEM0LjAxIDYuNDk1IDQuMDEgNi40OTUgMyA3IEMzLjk5IDguNDg1IDMuOTkgOC40ODUgNSAxMCBDNC4zNCAxMCAzLjY4IDEwIDMgMTAgQzIuNjcgMTIuOTcgMi4zNCAxNS45NCAyIDE5IEMtMy4zMzMzMzMzMyAxNi4zMzMzMzMzMyAtOC42NjY2NjY2NyAxMy42NjY2NjY2NyAtMTQgMTEgQy0xMy4wMSAxMC42NyAtMTIuMDIgMTAuMzQgLTExIDEwIEMtMTEgOS4zNCAtMTEgOC42OCAtMTEgOCBDLTEwLjM0IDggLTkuNjggOCAtOSA4IEMtOSA3LjM0IC05IDYuNjggLTkgNiBDLTguMzQgNiAtNy42OCA2IC03IDYgQy02LjY3IDUuMDEgLTYuMzQgNC4wMiAtNiAzIEMtNC4wMiAyLjY3IC0yLjA0IDIuMzQgMCAyIEMwIDEuMzQgMCAwLjY4IDAgMCBaICIgZmlsbD0iI0RCRTZFQiIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMTc0LDExNSkiLz4KPHBhdGggZD0iTTAgMCBDMC43NjMxMjUgMC4zNTA2MjUgMS41MjYyNSAwLjcwMTI1IDIuMzEyNSAxLjA2MjUgQzUuMDQ3NTkzNzkgMi4zMjM2MDg4NCA1LjA0NzU5Mzc5IDIuMzIzNjA4ODQgOCAxIEM5LjgxMDgwNDc5IDUuNDczNzUzMDEgMTAuNDg1NjIxOTggOC4zNTc0MzEzMSA5IDEzIEM3LjE2MzcyODkzIDE1LjgwNzgxNjE1IDUuMTQxNjMxOCAxOC40MTk1NjI5MSAzIDIxIEMtMC44NzUgMTkuMjUgLTAuODc1IDE5LjI1IC0yIDE3IEMtMi42NiAxNyAtMy4zMiAxNyAtNCAxNyBDLTQuMTIzNzUgMTYuMzgxMjUgLTQuMjQ3NSAxNS43NjI1IC00LjM3NSAxNS4xMjUgQy00Ljg3MTk3MzU2IDEyLjgwODc5MTY4IC00Ljg3MTk3MzU2IDEyLjgwODc5MTY4IC03IDExIEMtNi4zNCAxMC4wMSAtNS42OCA5LjAyIC01IDggQy01IDguNjYgLTUgOS4zMiAtNSAxMCBDLTIuMzk4MDQ3OTggOC4xMjA2MTYyNyAtMi4zOTgwNDc5OCA4LjEyMDYxNjI3IDAgNiBDLTAuNjYgNS4zNCAtMS4zMiA0LjY4IC0yIDQgQy0xLjM0IDIuNjggLTAuNjggMS4zNiAwIDAgWiAiIGZpbGw9IiNFMEVERjEiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDE4NywxNzUpIi8+CjxwYXRoIGQ9Ik0wIDAgQy0wLjU2NjkyNzAxIDMuMjg4MTc2NjcgLTEuNDU1OTE1NCA0Ljg0NzMxMzAzIC00IDcgQy00Ljk5IDcuNjYgLTUuOTggOC4zMiAtNyA5IEMtNi42NyA5LjY2IC02LjM0IDEwLjMyIC02IDExIEMtNC4zNSAxMSAtMi43IDExIC0xIDExIEMtMSAxMC4zNCAtMSA5LjY4IC0xIDkgQy0wLjM0IDkuMzMgMC4zMiA5LjY2IDEgMTAgQzAuNjcgMTAuOTkgMC4zNCAxMS45OCAwIDEzIEMtMC45OSAxMyAtMS45OCAxMyAtMyAxMyBDLTMgMTMuOTkgLTMgMTQuOTggLTMgMTYgQy00Ljk4IDE2LjY2IC02Ljk2IDE3LjMyIC05IDE4IEMtMTEuMzk1NDI1ODMgMTMuNDE4NDU3MzkgLTEzLjUwODI5NzM0IDguOTcyMzQyMiAtMTUgNCBDLTkuNzcyMjg1MzcgMC45NTg0MjA1OCAtNi4wNzMyODY4OCAtMC41MDYxMDcyNCAwIDAgWiAiIGZpbGw9IiNFREY3RkIiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDEyMCwyMDgpIi8+CjxwYXRoIGQ9Ik0wIDAgQzMuOTYgMCA3LjkyIDAgMTIgMCBDMTIgMC42NiAxMiAxLjMyIDEyIDIgQzEyLjY2IDIgMTMuMzIgMiAxNCAyIEMxNCAyLjY2IDE0IDMuMzIgMTQgNCBDMTUuMzIgNCAxNi42NCA0IDE4IDQgQzE4IDQuNjYgMTggNS4zMiAxOCA2IEMxOC42NiA2IDE5LjMyIDYgMjAgNiBDMjAgNi42NiAyMCA3LjMyIDIwIDggQzIwLjk5IDggMjEuOTggOCAyMyA4IEMyMi42NyA4LjY2IDIyLjM0IDkuMzIgMjIgMTAgQzIxLjAxIDkuNjcgMjAuMDIgOS4zNCAxOSA5IEMxOSA4LjM0IDE5IDcuNjggMTkgNyBDMTguMDEgNy40OTUgMTguMDEgNy40OTUgMTcgOCBDMTcuNjYgOS4zMiAxOC4zMiAxMC42NCAxOSAxMiBDMTguMDEgMTIgMTcuMDIgMTIgMTYgMTIgQzE2IDExLjM0IDE2IDEwLjY4IDE2IDEwIEMxNS4zNCAxMCAxNC42OCAxMCAxNCAxMCBDMTQgOS4zNCAxNCA4LjY4IDE0IDggQzEzLjAxIDggMTIuMDIgOCAxMSA4IEMxMSA3LjM0IDExIDYuNjggMTEgNiBDOC4wMyA2IDUuMDYgNiAyIDYgQzIgNS4zNCAyIDQuNjggMiA0IEMxLjM0IDQgMC42OCA0IDAgNCBDMCAyLjY4IDAgMS4zNiAwIDAgWiAiIGZpbGw9IiMyNzVBM0MiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDE1MSwxMzApIi8+CjxwYXRoIGQ9Ik0wIDAgQzAuOTkgMCAxLjk4IDAgMyAwIEMzIDAuNjYgMyAxLjMyIDMgMiBDNS4zMSAyIDcuNjIgMiAxMCAyIEMxMCAyLjk5IDEwIDMuOTggMTAgNSBDMTAuNjYgNS4zMyAxMS4zMiA1LjY2IDEyIDYgQzEwLjgwNzYxNzE5IDYuMDM3MzgyODEgOS42MTUyMzQzOCA2LjA3NDc2NTYyIDguMzg2NzE4NzUgNi4xMTMyODEyNSBDNi44MjAyODEgNi4xNzg5NDAzMiA1LjI1Mzg3NjE2IDYuMjQ1Mzg3NjggMy42ODc1IDYuMzEyNSBDMi45MDE4MTY0MSA2LjMzNTA1ODU5IDIuMTE2MTMyODEgNi4zNTc2MTcxOSAxLjMwNjY0MDYyIDYuMzgwODU5MzggQzAuNTQ5MzE2NDEgNi40MTYzMDg1OSAtMC4yMDgwMDc4MSA2LjQ1MTc1NzgxIC0wLjk4ODI4MTI1IDYuNDg4MjgxMjUgQy0yLjAzMzAyNjEyIDYuNTI3NTU3MzcgLTIuMDMzMDI2MTIgNi41Mjc1NTczNyAtMy4wOTg4NzY5NSA2LjU2NzYyNjk1IEMtNS40OTM1MDM1OSA3LjExMjIzNzY4IC02LjQzMjcyNTQ3IDguMTU4MjkxNjIgLTggMTAgQy04LjMzIDkuNjcgLTguNjYgOS4zNCAtOSA5IEMtMTAuNDE2MzQ4MzMgMTEuODMyNjk2NjYgLTEwLjM0NjMwMDUgMTQuNDc0NjY0MzggLTEwLjU2MjUgMTcuNjI1IEMtMTAuNjQ2Mjg5MDYgMTguODEzNTE1NjMgLTEwLjczMDA3ODEzIDIwLjAwMjAzMTI1IC0xMC44MTY0MDYyNSAyMS4yMjY1NjI1IEMtMTAuODc2OTkyMTkgMjIuMTQxNzk2ODcgLTEwLjkzNzU3ODEyIDIzLjA1NzAzMTI1IC0xMSAyNCBDLTEyLjkzODE4NTk3IDIwLjc3OTYyOTQ3IC0xMy4xODAwMDkyOSAxOC43MTE2NTkxNCAtMTIuNzUgMTUgQy0xMi42NjIzNDM3NSAxNC4xNTQzNzUgLTEyLjU3NDY4NzUgMTMuMzA4NzUgLTEyLjQ4NDM3NSAxMi40Mzc1IEMtMTEuOTk3NDc0OTkgOS45ODcyOTM0OSAtMTEuMjIzMTc4ODMgOC4xNjU2MjgxIC0xMCA2IEMtOS4zNCA2IC04LjY4IDYgLTggNiBDLTggNS4zNCAtOCA0LjY4IC04IDQgQy02LjM1IDQgLTQuNyA0IC0zIDQgQy0zIDMuMzQgLTMgMi42OCAtMyAyIEMtMi4wMSAyIC0xLjAyIDIgMCAyIEMwIDEuMzQgMCAwLjY4IDAgMCBaICIgZmlsbD0iIzI5NkQ0MiIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMTQ2LDcyKSIvPgo8cGF0aCBkPSJNMCAwIEMwLjMzIDAgMC42NiAwIDEgMCBDMC44ODU0MTMwNyAxLjQzODM2NzUxIDAuNzU3OTA4ODQgMi44NzU3MDk2NiAwLjYyNSA0LjMxMjUgQzAuNTU1MzkwNjMgNS4xMTMwMDc4MSAwLjQ4NTc4MTI1IDUuOTEzNTE1NjMgMC40MTQwNjI1IDYuNzM4MjgxMjUgQzAgOSAwIDkgLTIgMTIgQy0yIDExLjAxIC0yIDEwLjAyIC0yIDkgQy0yLjY2IDguNjcgLTMuMzIgOC4zNCAtNCA4IEMtNC4zMyA3LjY3IC00LjY2IDcuMzQgLTUgNyBDLTYuNTMyMDI3MDYgNy4yNTE5NTkwOCAtOC4wNTI1NzEyOCA3LjU3NTk2Nzc3IC05LjU2MjUgNy45Mzc1IEMtMTAuODAxOTMzNTkgOC4yMjk0NzI2NiAtMTAuODAxOTMzNTkgOC4yMjk0NzI2NiAtMTIuMDY2NDA2MjUgOC41MjczNDM3NSBDLTEyLjcwNDQ5MjE5IDguNjgzMzIwMzEgLTEzLjM0MjU3ODEzIDguODM5Mjk2ODggLTE0IDkgQy0xNC4zMyA4LjM0IC0xNC42NiA3LjY4IC0xNSA3IEMtMTQuMzQgNyAtMTMuNjggNyAtMTMgNyBDLTEyLjY3IDYuMzQgLTEyLjM0IDUuNjggLTEyIDUgQy0xMiA1LjY2IC0xMiA2LjMyIC0xMiA3IEMtMTEuNDAxODc1IDYuNTA1IC0xMC44MDM3NSA2LjAxIC0xMC4xODc1IDUuNSBDLTggNCAtOCA0IC01IDQgQy00LjY3IDMuMzQgLTQuMzQgMi42OCAtNCAyIEMtMi42OCAyLjMzIC0xLjM2IDIuNjYgMCAzIEMwIDIuMDEgMCAxLjAyIDAgMCBaICIgZmlsbD0iI0NFREJERiIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMTM1LDE5NykiLz4KPHBhdGggZD0iTTAgMCBDMC45OSAwIDEuOTggMCAzIDAgQzMgMC42NiAzIDEuMzIgMyAyIEM0LjQyMzEyNSAyLjEyMzc1IDQuNDIzMTI1IDIuMTIzNzUgNS44NzUgMi4yNSBDOSAzIDkgMyAxMC4zNzUgNC44MTI1IEMxMSA3IDExIDcgMTEgMTEgQzEwLjAxIDExLjMzIDkuMDIgMTEuNjYgOCAxMiBDNy42NTk2ODc1IDExLjE2NDY4NzUgNy42NTk2ODc1IDExLjE2NDY4NzUgNy4zMTI1IDEwLjMxMjUgQzYuMDE1MjM1NTIgNy43ODgwODc4MyA2LjAxNTIzNTUyIDcuNzg4MDg3ODMgMy40Mzc1IDUuNDM3NSBDMSAzIDEgMyAwIDAgWiAiIGZpbGw9IiMzQzg0NTciIHRyYW5zZm9ybT0idHJhbnNsYXRlKDE2NywxMzcpIi8+CjxwYXRoIGQ9Ik0wIDAgQzEuMDYyNSAxLjgxMjUgMS4wNjI1IDEuODEyNSAyIDQgQzEuNjcgNC45OSAxLjM0IDUuOTggMSA3IEMwLjM0IDcgLTAuMzIgNyAtMSA3IEMtMSA5LjY0IC0xIDEyLjI4IC0xIDE1IEMtMC4zNCAxNSAwLjMyIDE1IDEgMTUgQzEuOTkgMTcuMzEgMi45OCAxOS42MiA0IDIyIEMxIDIwLjUgMSAyMC41IC0yIDE5IEMtMi4wNTQxMTEyNCAxNi41ODMwMzEyOCAtMi4wOTM3MjI3OCAxNC4xNjcyODIxMyAtMi4xMjUgMTEuNzUgQy0yLjE0MTc1NzgxIDExLjA2ODA4NTk0IC0yLjE1ODUxNTYzIDEwLjM4NjE3MTg4IC0yLjE3NTc4MTI1IDkuNjgzNTkzNzUgQy0yLjIxMjEzNDgyIDUuOTM5MTc2NSAtMi4wNzk0NDM0OSAzLjE3NjQ3MjczIDAgMCBaICIgZmlsbD0iIzQwOTg1RiIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMTM3LDc5KSIvPgo8cGF0aCBkPSJNMCAwIEMxLjk4IDAgMy45NiAwIDYgMCBDMy43MTQ5NzE0OSAzLjQyNzU0Mjc2IDIuODYxNjUzNjYgMy44ODQ0MTExNyAtMSA1IEMtNC42ODc1IDUuMjUgLTQuNjg3NSA1LjI1IC04IDUgQy04LjY2IDQuMzQgLTkuMzIgMy42OCAtMTAgMyBDLTkgMiAtOSAyIC02LjkzMzU5Mzc1IDEuOTAyMzQzNzUgQy01LjY5ODAyNzM0IDEuOTE5NzQ2MDkgLTUuNjk4MDI3MzQgMS45MTk3NDYwOSAtNC40Mzc1IDEuOTM3NSBDLTMuNjExMjEwOTQgMS45NDY1MjM0NCAtMi43ODQ5MjE4OCAxLjk1NTU0Njg3IC0xLjkzMzU5Mzc1IDEuOTY0ODQzNzUgQy0xLjI5NTUwNzgxIDEuOTc2NDQ1MzEgLTAuNjU3NDIxODggMS45ODgwNDY4NyAwIDIgQzAgMS4zNCAwIDAuNjggMCAwIFogIiBmaWxsPSIjNDI5MjVBIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgxNTMsMTAwKSIvPgo8cGF0aCBkPSJNMCAwIEMwLjk5IDAuMzMgMS45OCAwLjY2IDMgMSBDMi42NyAyLjY1IDIuMzQgNC4zIDIgNiBDMS42NyA2IDEuMzQgNiAxIDYgQzAuOTUxMDE1NjIgNi42MjY0ODQzNyAwLjkwMjAzMTI1IDcuMjUyOTY4NzUgMC44NTE1NjI1IDcuODk4NDM3NSBDMC43NzY3OTY4OCA4LjcxNTcwMzEzIDAuNzAyMDMxMjUgOS41MzI5Njg3NSAwLjYyNSAxMC4zNzUgQzAuNTU1MzkwNjMgMTEuMTg3MTA5MzggMC40ODU3ODEyNSAxMS45OTkyMTg3NSAwLjQxNDA2MjUgMTIuODM1OTM3NSBDMCAxNSAwIDE1IC0yIDE3IEMtMi44Nzg5MDYyNSAxMC44NDc2NTYyNSAtMi44Nzg5MDYyNSAxMC44NDc2NTYyNSAtMyA5IEMtMi42NyA4LjY3IC0yLjM0IDguMzQgLTIgOCBDLTEuODM1IDYuODQ1IC0xLjY3IDUuNjkgLTEuNSA0LjUgQy0xIDEgLTEgMSAwIDAgWiAiIGZpbGw9IiNFRkY2RjkiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDE5MCwxNDQpIi8+CjxwYXRoIGQ9Ik0wIDAgQzEuOTggMC42NiAzLjk2IDEuMzIgNiAyIEM1LjY3IDMuNjUgNS4zNCA1LjMgNSA3IEM0LjAxIDcuMzMgMy4wMiA3LjY2IDIgOCBDMS42NyA3LjM0IDEuMzQgNi42OCAxIDYgQzAuMDEgNS4zNCAtMC45OCA0LjY4IC0yIDQgQy0xLjM0IDIuNjggLTAuNjggMS4zNiAwIDAgWiAiIGZpbGw9IiNFQ0Y3RkIiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDE4NywxNzUpIi8+CjxwYXRoIGQ9Ik0wIDAgQzAuNjE4NzUgMC42NiAxLjIzNzUgMS4zMiAxLjg3NSAyIEMzLjc1NjM3NDI3IDQuMjI4NDU0OSAzLjc1NjM3NDI3IDQuMjI4NDU0OSA2IDQgQzYuMzMgMy4zNCA2LjY2IDIuNjggNyAyIEM2LjY3IDYuMjkgNi4zNCAxMC41OCA2IDE1IEMzLjg3NDkxNzU2IDExLjgxMjM3NjM1IDMuNDk3OTgzNyA5LjczNDg3Nzc3IDMgNiBDMi4zNCA2IDEuNjggNiAxIDYgQzAuNjcgNC4wMiAwLjM0IDIuMDQgMCAwIFogIiBmaWxsPSIjMUI1NjMzIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgxNzIsMTQ0KSIvPgo8cGF0aCBkPSJNMCAwIEMwLjY2IDAuMzMgMS4zMiAwLjY2IDIgMSBDMS4wMSAyLjk4IDAuMDIgNC45NiAtMSA3IEMtMS43MjE4NzUgNi43OTM3NSAtMi40NDM3NSA2LjU4NzUgLTMuMTg3NSA2LjM3NSBDLTYuNDQ2NDE1ODUgNS45NDA0Nzc4OSAtOC4wODMwNDUwNCA2LjU4MzE5MzMxIC0xMSA4IEMtNy43MTY0NDYzOCA0LjMyMjQxOTk1IC00LjM3MjIxNzYzIDIuMTg2MTA4ODIgMCAwIFogIiBmaWxsPSIjQzRDN0Q0IiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgxMjgsMTEzKSIvPgo8cGF0aCBkPSJNMCAwIEMxLjMyIDAgMi42NCAwIDQgMCBDNCAxLjY1IDQgMy4zIDQgNSBDNS45OCA1LjY2IDcuOTYgNi4zMiAxMCA3IEM3Ljg2MTQ1MTUgOS4xMzg1NDg1IDYuODY3MjQ2ODYgOS40MjY1NTA2MyA0IDEwIEMzLjMyODQ1MDY3IDguNzEwODY1MTMgMi42NjI5MTE0MSA3LjQxODU5Nzk2IDIgNi4xMjUgQzEuNjI4NzUgNS40MDU3MDMxMyAxLjI1NzUgNC42ODY0MDYyNSAwLjg3NSAzLjk0NTMxMjUgQzAgMiAwIDIgMCAwIFogIiBmaWxsPSIjQkNCRUNDIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgxMDcsMjE2KSIvPgo8cGF0aCBkPSJNMCAwIEMwIDEuNjY2NjY2NjcgMCAzLjMzMzMzMzMzIDAgNSBDLTAuNjYgNSAtMS4zMiA1IC0yIDUgQy0yIDUuOTkgLTIgNi45OCAtMiA4IEMtMi42NiA4IC0zLjMyIDggLTQgOCBDLTUuMTI1IDMuMjUgLTUuMTI1IDMuMjUgLTQgMSBDLTQuOTkgMC42NyAtNS45OCAwLjM0IC03IDAgQy0zLjk4OTY4MjU2IC0wLjkzNDIzNjQ1IC0zLjEzMzQ5NzMyIC0xLjA0NDQ5OTExIDAgMCBaICIgZmlsbD0iI0VDRjdGQSIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMTMzLDIwNCkiLz4KPHBhdGggZD0iTTAgMCBDMC45OSAwLjQ5NSAwLjk5IDAuNDk1IDIgMSBDMiAxLjY2IDIgMi4zMiAyIDMgQzIuNjYgMyAzLjMyIDMgNCAzIEM0LjkzMzg1ODE2IDUuODAxNTc0NDggNS4xNjM1NDU5NSA3LjY1NDQ3ODAzIDUuMTg3NSAxMC41NjI1IEM1LjIwMTY3OTY5IDExLjM0NzUzOTA2IDUuMjE1ODU5MzggMTIuMTMyNTc4MTIgNS4yMzA0Njg3NSAxMi45NDE0MDYyNSBDNSAxNSA1IDE1IDMgMTcgQzIuODY3MjI2NTYgMTYuMTA3OTY4NzUgMi43MzQ0NTMxMiAxNS4yMTU5Mzc1IDIuNTk3NjU2MjUgMTQuMjk2ODc1IEMyLjQyMTA1NDY5IDEzLjEyNjQwNjI1IDIuMjQ0NDUzMTMgMTEuOTU1OTM3NSAyLjA2MjUgMTAuNzUgQzEuODg4NDc2NTYgOS41ODk4NDM3NSAxLjcxNDQ1MzEzIDguNDI5Njg3NSAxLjUzNTE1NjI1IDcuMjM0Mzc1IEMxLjEyNzIyNjQgNC43Njg5MzAzOSAwLjY2MDk4Njk3IDIuNDA1NzU0MzggMCAwIFogIiBmaWxsPSIjNDc5RjYyIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgxNTksNzkpIi8+CjxwYXRoIGQ9Ik0wIDAgQzMuMzU1OTU4MjggMC41OTkyNzgyNiA1LjM3ODAxMjI2IDEuODQ2MjI0MzYgOCA0IEM3LjY3IDQuOTkgNy4zNCA1Ljk4IDcgNyBDNS42OCA2LjAxIDQuMzYgNS4wMiAzIDQgQzMgNC42NiAzIDUuMzIgMyA2IEMyLjM0IDYgMS42OCA2IDEgNiBDMC42NyA0LjAyIDAuMzQgMi4wNCAwIDAgWiAiIGZpbGw9IiNDRkQ3REUiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDE3OSwxMTkpIi8+CjxwYXRoIGQ9Ik0wIDAgQzAuMzMgMC42NiAwLjY2IDEuMzIgMSAyIEMwLjM0IDIgLTAuMzIgMiAtMSAyIEMtMC42NyAzLjMyIC0wLjM0IDQuNjQgMCA2IEMtMC42NiA2IC0xLjMyIDYgLTIgNiBDLTIuMzMgNy4zMiAtMi42NiA4LjY0IC0zIDEwIEMtNSA3IC01IDcgLTYgNCBDLTQuMDIgMi42OCAtMi4wNCAxLjM2IDAgMCBaICIgZmlsbD0iI0JGQzREMCIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMTcyLDE5MSkiLz4KPHBhdGggZD0iTTAgMCBDMC4yODg3NSAwLjU5ODEyNSAwLjU3NzUgMS4xOTYyNSAwLjg3NSAxLjgxMjUgQzIuMDQ3NDIwMjYgNC4xOTMyNzc5MiAyLjA0NzQyMDI2IDQuMTkzMjc3OTIgNCA3IEMxIDcgMSA3IC0wLjkzNzUgNi4zNzUgQy0zLjU5NTY5MjI5IDUuODkxNjkyMzEgLTQuNjgyNDM3NjcgNi43MzIzNTYzIC03IDggQy02LjAyMTMzNjYyIDYuODUzNzM2NzggLTUuMDQyMDU0MTMgNS43MDgwMDIxMiAtNC4wNjI1IDQuNTYyNSBDLTMuNTE3MjI2NTYgMy45MjQ0MTQwNiAtMi45NzE5NTMxMiAzLjI4NjMyODEzIC0yLjQxMDE1NjI1IDIuNjI4OTA2MjUgQy0xLjYzMjA0MzA1IDEuNzMwMDg4NTEgLTAuODQwNjM0NzIgMC44NDA2MzQ3MiAwIDAgWiAiIGZpbGw9IiNCNkJDQzgiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDE4MCwxODMpIi8+CjxwYXRoIGQ9Ik0wIDAgQzMuOTYgMCA3LjkyIDAgMTIgMCBDMTIgMC42NiAxMiAxLjMyIDEyIDIgQzEyLjY2IDIgMTMuMzIgMiAxNCAyIEMxMy42NyAyLjY2IDEzLjM0IDMuMzIgMTMgNCBDOS4zNyAzLjAxIDUuNzQgMi4wMiAyIDEgQzIgMS45OSAyIDIuOTggMiA0IEMxLjM0IDQgMC42OCA0IDAgNCBDMCAyLjY4IDAgMS4zNiAwIDAgWiAiIGZpbGw9IiMwQzM4MjYiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDE1MSwxMzApIi8+CjxwYXRoIGQ9Ik0wIDAgQzAuNjYgMC4zMyAxLjMyIDAuNjYgMiAxIEMxLjAxIDEuNjYgMC4wMiAyLjMyIC0xIDMgQy0yLjE5MjMyNjEzIDUuMDUwMDM5NTUgLTIuMTkyMzI2MTMgNS4wNTAwMzk1NSAtMyA3IEMtMyA2LjM0IC0zIDUuNjggLTMgNSBDLTQuOTggNS45OSAtNC45OCA1Ljk5IC03IDcgQy03LjMzIDYuMDEgLTcuNjYgNS4wMiAtOCA0IEMtNi43MTM0OTI5NCAzLjMwMjg5MjY5IC01LjQyMDU5MzM1IDIuNjE3NTcxMjQgLTQuMTI1IDEuOTM3NSBDLTMuNDA1NzAzMTMgMS41NTQ2NDg0NCAtMi42ODY0MDYyNSAxLjE3MTc5Njg4IC0xLjk0NTMxMjUgMC43NzczNDM3NSBDLTEuMzAzMzU5MzcgMC41MjA4MjAzMSAtMC42NjE0MDYyNSAwLjI2NDI5Njg4IDAgMCBaICIgZmlsbD0iI0JEQkVDRCIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMTEzLDIwOCkiLz4KPHBhdGggZD0iTTAgMCBDMCAxLjY1IDAgMy4zIDAgNSBDLTAuNjYgNSAtMS4zMiA1IC0yIDUgQy0yLjMzIDYuMzIgLTIuNjYgNy42NCAtMyA5IEMtMy42NiA4LjM0IC00LjMyIDcuNjggLTUgNyBDLTQuODEyNSA0LjUgLTQuODEyNSA0LjUgLTQgMiBDLTEgMCAtMSAwIDAgMCBaICIgZmlsbD0iI0YwRjVGQiIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMTAzLDE1NCkiLz4KPHBhdGggZD0iTTAgMCBDMi45NyAwLjMzIDUuOTQgMC42NiA5IDEgQzUuMjUgNCA1LjI1IDQgMyA0IEMyLjY3IDQuNjYgMi4zNCA1LjMyIDIgNiBDMS4zNCA0LjAyIDAuNjggMi4wNCAwIDAgWiAiIGZpbGw9IiNCOEJBQzgiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDE3MCwyMDQpIi8+CjxwYXRoIGQ9Ik0wIDAgQzcuNzUgMC43NSA3Ljc1IDAuNzUgMTAgMyBDNi43IDMgMy40IDMgMCAzIEMwIDIuMDEgMCAxLjAyIDAgMCBaICIgZmlsbD0iIzRCOUU2RiIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMTUzLDEzMSkiLz4KPHBhdGggZD0iTTAgMCBDMS4xNDQ2ODc1IDAuNDk1IDEuMTQ0Njg3NSAwLjQ5NSAyLjMxMjUgMSBDNC45OTA2OTEzNSAyLjE3NDM2Njg2IDQuOTkwNjkxMzUgMi4xNzQzNjY4NiA4IDIgQzcuNjcgMy4zMiA3LjM0IDQuNjQgNyA2IEM2LjAxIDYgNS4wMiA2IDQgNiBDNCA1LjM0IDQgNC42OCA0IDQgQzMuMDEgNCAyLjAyIDQgMSA0IEMwLjY3IDIuNjggMC4zNCAxLjM2IDAgMCBaICIgZmlsbD0iIzI3NjA0MCIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMTM2LDk4KSIvPgo8cGF0aCBkPSJNMCAwIEMwLjk5IDAgMS45OCAwIDMgMCBDMyAwLjY2IDMgMS4zMiAzIDIgQzUuMzEgMiA3LjYyIDIgMTAgMiBDMTAgMi42NiAxMCAzLjMyIDEwIDQgQzUuNzEgNCAxLjQyIDQgLTMgNCBDLTMgMy4zNCAtMyAyLjY4IC0zIDIgQy0yLjAxIDIgLTEuMDIgMiAwIDIgQzAgMS4zNCAwIDAuNjggMCAwIFogIiBmaWxsPSIjMEYzNzJEIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgxNDYsNzIpIi8+CjxwYXRoIGQ9Ik0wIDAgQzEuOTggMC40OTUgMS45OCAwLjQ5NSA0IDEgQzQgMi4zMiA0IDMuNjQgNCA1IEMzLjAxIDUgMi4wMiA1IDEgNSBDMC4zNCA0LjAxIC0wLjMyIDMuMDIgLTEgMiBDLTAuNjcgMS4zNCAtMC4zNCAwLjY4IDAgMCBaICIgZmlsbD0iI0NERDJEQSIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMTE2LDE5OCkiLz4KPHBhdGggZD0iTTAgMCBDMC4zMyAxLjMyIDAuNjYgMi42NCAxIDQgQy0xLjMxIDQuMzMgLTMuNjIgNC42NiAtNiA1IEMtNS42NyAzLjY4IC01LjM0IDIuMzYgLTUgMSBDLTMuMzUgMC42NyAtMS43IDAuMzQgMCAwIFogIiBmaWxsPSIjRUFGN0Y5IiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgxMzQsMTk2KSIvPgo8cGF0aCBkPSJNMCAwIEMyLjUwMjk4NDM0IDIuOTM4Mjg1OTcgMy40NjkzMDkzOSA1LjE3OTAyNzYxIDQgOSBDMS41MjUgOC4wMSAxLjUyNSA4LjAxIC0xIDcgQy0wLjY3IDQuNjkgLTAuMzQgMi4zOCAwIDAgWiAiIGZpbGw9IiNDQkNFREIiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDE5NiwxMzcpIi8+CjxwYXRoIGQ9Ik0wIDAgQzAuMzMgMCAwLjY2IDAgMSAwIEMwLjg4NTQxMzA3IDEuNDM4MzY3NTEgMC43NTc5MDg4NCAyLjg3NTcwOTY2IDAuNjI1IDQuMzEyNSBDMC41NTUzOTA2MyA1LjExMzAwNzgxIDAuNDg1NzgxMjUgNS45MTM1MTU2MyAwLjQxNDA2MjUgNi43MzgyODEyNSBDMCA5IDAgOSAtMiAxMiBDLTIgMTEuMDEgLTIgMTAuMDIgLTIgOSBDLTIuNjYgOC42NyAtMy4zMiA4LjM0IC00IDggQy0zLjI4ODQzNzUgNy4xMzM3NSAtMy4yODg0Mzc1IDcuMTMzNzUgLTIuNTYyNSA2LjI1IEMtMS4wNTE1MTMzIDQuMDc0MTc5MTYgLTAuNDU5NjM4NDkgMi41NzM5NzU1MiAwIDAgWiAiIGZpbGw9IiNCN0I3QzciIHRyYW5zZm9ybT0idHJhbnNsYXRlKDEzNSwxOTcpIi8+CjxwYXRoIGQ9Ik0wIDAgQzIuOTYxNzUxMjMgMC42MTI3NzYxMiA0LjM4MDU4NzgzIDEuMjUzNzI1MjIgNyAzIEM3IDQuMzIgNyA1LjY0IDcgNyBDNi4zNCA3IDUuNjggNyA1IDcgQzMuNzEwOTM3NSA1LjQ2ODc1IDMuNzEwOTM3NSA1LjQ2ODc1IDIuMzc1IDMuNSBDMS43MDU5NzY1NiAyLjUyNTQ2ODc1IDEuNzA1OTc2NTYgMi41MjU0Njg3NSAxLjAyMzQzNzUgMS41MzEyNSBDMC42ODU3MDMxMyAxLjAyNTkzNzUgMC4zNDc5Njg3NSAwLjUyMDYyNSAwIDAgWiAiIGZpbGw9IiNDMkM1RDEiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDEwOCwxOTMpIi8+CjxwYXRoIGQ9Ik0wIDAgQzIgMyAyIDMgMS42MjUgNS4xODc1IEMxLjQxODc1IDUuNzg1NjI1IDEuMjEyNSA2LjM4Mzc1IDEgNyBDMS42NiA3LjMzIDIuMzIgNy42NiAzIDggQzEuMDIgOC45OSAxLjAyIDguOTkgLTEgMTAgQy0xLjEyNSAzLjM3NSAtMS4xMjUgMy4zNzUgMCAwIFogIiBmaWxsPSIjQkRCRENGIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSg5OSwxNDcpIi8+CjxwYXRoIGQ9Ik0wIDAgQzEuNTgyNDY3MDcgLTAuMDgxNTM5MzMgMy4xNjYxNjI3MyAtMC4xMzk0MzU1NyA0Ljc1IC0wLjE4NzUgQzYuMDcyNTc4MTMgLTAuMjM5NzA3MDMgNi4wNzI1NzgxMyAtMC4yMzk3MDcwMyA3LjQyMTg3NSAtMC4yOTI5Njg3NSBDMTAuNDQ2NzE1ODMgMC4wNTA3NjMxNiAxMS43NTU4MzYwMiAxLjAwMjI3NDU5IDE0IDMgQzEyLjAyIDMgMTAuMDQgMyA4IDMgQzggMi4zNCA4IDEuNjggOCAxIEM1LjM2IDEgMi43MiAxIDAgMSBDMCAwLjY3IDAgMC4zNCAwIDAgWiAiIGZpbGw9IiM0Rjk3NkMiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDE0NCw3NSkiLz4KPHBhdGggZD0iTTAgMCBDMS4zMiAwIDIuNjQgMCA0IDAgQzMuMzQgMi4zMSAyLjY4IDQuNjIgMiA3IEMwLjQzNzUgNS43NSAwLjQzNzUgNS43NSAtMSA0IEMtMC42ODc1IDEuODEyNSAtMC42ODc1IDEuODEyNSAwIDAgWiAiIGZpbGw9IiNDNEM5RDYiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDE5NiwxNzcpIi8+CjxwYXRoIGQ9Ik0wIDAgQzAuOTkgMC4zMyAxLjk4IDAuNjYgMyAxIEMyLjY3IDIuOTggMi4zNCA0Ljk2IDIgNyBDMS4wMSA3IDAuMDIgNyAtMSA3IEMtMiA0IC0yIDQgLTEuMDYyNSAxLjgxMjUgQy0wLjUzNjU2MjUgMC45MTUzMTI1IC0wLjUzNjU2MjUgMC45MTUzMTI1IDAgMCBaICIgZmlsbD0iI0VERjRGQSIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMTg5LDEyOSkiLz4KPHBhdGggZD0iTTAgMCBDLTIuMzYyOTI2NTYgMi41MjU4ODcwMiAtMy42NjQ2MjUxMSAzLjg4ODIwODM3IC03IDUgQy03IDMuNjggLTcgMi4zNiAtNyAxIEMtNC41MzcyMTE5OSAtMC4yMzEzOTQgLTIuNzIwNDk0NSAtMC4wNzE1OTE5NiAwIDAgWiAiIGZpbGw9IiNCQ0JEQ0MiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDE4NiwyMDApIi8+CjxwYXRoIGQ9Ik0wIDAgQzAuNjYgMC42NiAxLjMyIDEuMzIgMiAyIEMxLjM0IDMuOTggMC42OCA1Ljk2IDAgOCBDLTAuOTkgOCAtMS45OCA4IC0zIDggQy0xLjEyNSAyLjI1IC0xLjEyNSAyLjI1IDAgMCBaICIgZmlsbD0iI0VBRjVGNyIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMTEwLDEyOCkiLz4KPHBhdGggZD0iTTAgMCBDLTEuNjI1IDEuNTYyNSAtMS42MjUgMS41NjI1IC00IDMgQy03LjI1IDIuNjg3NSAtNy4yNSAyLjY4NzUgLTEwIDIgQy02LjM1NTgyMjYgLTAuNDI5NDUxNiAtNC4yODc1ODcyOCAtMC4xNjE3OTU3NSAwIDAgWiAiIGZpbGw9IiNDNkM5RDUiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDE0MCwxMTEpIi8+CjxwYXRoIGQ9Ik0wIDAgQzAuOTkgMCAxLjk4IDAgMyAwIEM0LjIwNzc1NTggMy42MjMyNjczOSAzLjU0MzExMTI4IDQuNjQxNDYzNjkgMiA4IEMxLjY3IDggMS4zNCA4IDEgOCBDMSA2LjAyIDEgNC4wNCAxIDIgQzAuMzQgMS42NyAtMC4zMiAxLjM0IC0xIDEgQy0wLjY3IDAuNjcgLTAuMzQgMC4zNCAwIDAgWiAiIGZpbGw9IiNFQ0Y2RkEiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDExNCwxMzcpIi8+Cjwvc3ZnPgo=';

const navLinks = [
  { href: '#/', text: 'الرئيسية' },
  { href: '#/jobs', text: 'الوظائف' },
  { href: '#/#about', text: 'من نحن' },
  { href: '#/#services', text: 'خدماتنا' },
  { href: '#/#why-us', text: 'لماذا نحن' },
  { href: '#/#contact', text: 'تواصل معنا' },
];

interface HeaderProps {
  currentTheme: string;
  toggleTheme: () => void;
}

const Header: React.FC<HeaderProps> = ({ currentTheme, toggleTheme }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [activeSection, setActiveSection] = useState('#/');
  const [searchKeyword, setSearchKeyword] = useState('');
  const [searchLocation, setSearchLocation] = useState('');
  
  const getPathFromHash = () => window.location.hash || '#/';

  const checkLoginStatus = useCallback(() => {
    const userProfile = localStorage.getItem('userProfile');
    setIsLoggedIn(!!userProfile);
    const adminStatus = localStorage.getItem('isAdmin') === 'true';
    setIsAdmin(adminStatus);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('userProfile');
    localStorage.removeItem('isAdmin');
    setIsLoggedIn(false);
    setIsAdmin(false);
    setIsMenuOpen(false);
    window.location.hash = '/';
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchKeyword && !searchLocation) return;

    const params = new URLSearchParams();
    if (searchKeyword) {
      params.set('keyword', searchKeyword);
    }
    if (searchLocation) {
      params.set('location', searchLocation);
    }
    
    window.location.hash = `/jobs?${params.toString()}`;
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    let scrollSpyCleanup = () => {};

    const handleLocationChange = () => {
      scrollSpyCleanup(); // Clean up existing scroll listener
      checkLoginStatus();
      setIsMenuOpen(false);
      const currentHash = getPathFromHash();
      const currentPath = currentHash.split('?')[0];
      
      if (currentPath === '#/') {
        // Setup scrollspy for the homepage
        const scrollSpy = () => {
          let currentSectionId = '#/';
          const sections = navLinks.map(l => l.href.startsWith('#/#') ? l.href.substring(3) : null).filter(Boolean);

          for (const id of sections) {
            const section = document.getElementById(id!);
            if (section) {
              const rect = section.getBoundingClientRect();
              if (rect.top <= 100 && rect.bottom >= 100) {
                currentSectionId = `#/#${id}`;
                break;
              }
            }
          }
          
          if (window.scrollY < 200) {
            currentSectionId = '#/';
          } else if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 100) {
            currentSectionId = '#/#contact';
          }
          
          setActiveSection(currentSectionId);
        };
        
        scrollSpy();
        window.addEventListener('scroll', scrollSpy, { passive: true });
        scrollSpyCleanup = () => window.removeEventListener('scroll', scrollSpy);
      } else {
        setActiveSection(currentPath);
        scrollSpyCleanup = () => {};
      }
    };

    handleLocationChange();
    window.addEventListener('hashchange', handleLocationChange);

    return () => {
      scrollSpyCleanup();
      window.removeEventListener('hashchange', handleLocationChange);
    };
  }, [checkLoginStatus]);
  
  const currentPath = getPathFromHash().split('?')[0];
  const isHomePage = currentPath === '#/';
  const isAuthPage = ['#/login', '#/signup', '#/profile', '#/forgot-password'].includes(currentPath);
  const isSolidHeaderPage = isAuthPage || currentPath === '#/jobs' || currentPath.startsWith('#/apply') || currentPath === '#/application-confirmation';
  const headerBgClass = isScrolled || isMenuOpen || isSolidHeaderPage ? 'bg-white/95 dark:bg-gray-800/95 shadow-md backdrop-blur-sm' : 'bg-transparent';

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${headerBgClass}`}>
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-20">
          <a href="#/" className="flex items-center gap-2 flex-shrink-0">
            <img src={logoSvg} alt="Forsa Sfr Logo" className="h-10 w-10" />
            <span className="text-2xl font-bold gradient-text hidden sm:inline">فرصة سفر</span>
          </a>
          
          <div className="hidden lg:flex flex-grow items-center justify-center px-8">
            {isHomePage ? (
              <form onSubmit={handleSearchSubmit} className="w-full max-w-lg flex items-center bg-gray-100 dark:bg-gray-700/80 rounded-full shadow-inner border border-transparent focus-within:border-indigo-500 transition-colors duration-300">
                <input
                  type="text"
                  value={searchKeyword}
                  onChange={(e) => setSearchKeyword(e.target.value)}
                  placeholder="الكلمة المفتاحية..."
                  className="w-1/2 px-5 py-2 bg-transparent focus:outline-none text-gray-700 dark:text-gray-200 placeholder-gray-500 dark:placeholder-gray-400"
                  aria-label="Job keyword"
                />
                <div className="border-l border-gray-300 dark:border-gray-500 h-6"></div>
                <input
                  type="text"
                  value={searchLocation}
                  onChange={(e) => setSearchLocation(e.target.value)}
                  placeholder="الموقع..."
                  className="w-1/2 px-5 py-2 bg-transparent focus:outline-none text-gray-700 dark:text-gray-200 placeholder-gray-500 dark:placeholder-gray-400"
                  aria-label="Job location"
                />
                <button type="submit" className="p-2 mr-1.5 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-full hover:opacity-90 transition-opacity" aria-label="Search jobs">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                </button>
              </form>
            ) : (
              !isAuthPage && (
                <nav className="flex items-center space-x-2">
                  {navLinks.map(link => (
                    <a 
                      key={link.href} 
                      href={link.href} 
                      className={`px-4 py-2 rounded-full font-medium transition-colors duration-300 ${activeSection === link.href ? 'gradient-text font-bold' : 'text-gray-700 hover:text-indigo-600 dark:text-gray-300 dark:hover:text-white'}`}
                    >
                      {link.text}
                    </a>
                  ))}
                </nav>
              )
            )}
          </div>

          <div className="flex items-center flex-shrink-0 gap-x-4">
            {!isHomePage && (
                <a href="#/" className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-300 transition-colors duration-300" aria-label="العودة إلى الرئيسية">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>
                </a>
            )}
             <button onClick={toggleTheme} className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-300 transition-colors duration-300">
                {currentTheme === 'light' ? (
                   <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" /></svg>
                ) : (
                   <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
                )}
            </button>
            <div className="hidden lg:flex items-center space-x-4">
                {isLoggedIn || isAdmin ? (
                  <>
                    {isAdmin ? (
                        <a href="#/admin" className={`px-5 py-2 rounded-full transition duration-300 ${activeSection.startsWith('#/admin') ? 'text-white bg-gradient-to-r from-indigo-600 to-purple-600' : 'text-indigo-600 border border-indigo-600 hover:bg-indigo-50 dark:text-indigo-400 dark:border-indigo-400 dark:hover:bg-gray-700'}`}>لوحة التحكم</a>
                    ) : (
                        <a href="#/profile" className={`px-5 py-2 rounded-full transition duration-300 ${activeSection === '#/profile' ? 'text-white bg-gradient-to-r from-indigo-600 to-purple-600' : 'text-indigo-600 border border-indigo-600 hover:bg-indigo-50 dark:text-indigo-400 dark:border-indigo-400 dark:hover:bg-gray-700'}`}>الملف الشخصي</a>
                    )}
                    <button onClick={handleLogout} className="px-5 py-2 text-white bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 rounded-full transition-transform transform hover:scale-105 duration-300">تسجيل الخروج</button>
                  </>
                ) : (
                  <>
                    <a href="#/login" className={`px-5 py-2 rounded-full transition duration-300 ${activeSection === '#/login' ? 'text-white bg-gradient-to-r from-indigo-600 to-purple-600' : 'text-indigo-600 border border-indigo-600 hover:bg-indigo-50 dark:text-indigo-400 dark:border-indigo-400 dark:hover:bg-gray-700'}`}>تسجيل الدخول</a>
                    <a href="#/signup" className={`px-5 py-2 text-white rounded-full transition-transform transform hover:scale-105 duration-300 ${activeSection === '#/signup' ? 'bg-gradient-to-r from-indigo-700 to-purple-800' : 'bg-gradient-to-r from-indigo-600 to-purple-600'}`}>إنشاء حساب</a>
                  </>
                )}
            </div>
             <div className="lg:hidden">
                <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-gray-800 dark:text-gray-200 focus:outline-none p-2" aria-label="Toggle menu">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16m-7 6h7"}></path>
                  </svg>
                </button>
            </div>
          </div>
        </div>
      </div>
      
      {/* --- Mobile Menu --- */}
      <div className={`
          lg:hidden absolute top-20 left-0 w-full bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm shadow-lg 
          transition-all duration-300 ease-in-out
          ${isMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-5 pointer-events-none'}
      `}>
          <div className="p-4 border-t border-gray-200 dark:border-gray-700">
            <nav className="flex flex-col space-y-2">
              {!isAuthPage && navLinks.map(link => (
                <a 
                  key={link.href} 
                  href={link.href} 
                  className={`p-3 rounded-md text-center ${activeSection === link.href ? 'gradient-text font-bold bg-indigo-50 dark:bg-gray-700' : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600'}`}
                >
                  {link.text}
                </a>
              ))}
              <hr className="my-2 border-gray-200 dark:border-gray-700"/>
              {isLoggedIn || isAdmin ? (
                <div className="flex flex-col space-y-2 pt-2">
                    {isAdmin ? (
                        <a href="#/admin" className={`text-center w-full px-5 py-3 rounded-full transition duration-300 ${activeSection.startsWith('#/admin') ? 'text-white bg-gradient-to-r from-indigo-600 to-purple-600' : 'text-indigo-600 border border-indigo-600 hover:bg-indigo-50 dark:text-indigo-400 dark:border-indigo-400 dark:hover:bg-gray-700'}`}>لوحة التحكم</a>
                    ) : (
                        <a href="#/profile" className={`text-center w-full px-5 py-3 rounded-full transition duration-300 ${activeSection === '#/profile' ? 'text-white bg-gradient-to-r from-indigo-600 to-purple-600' : 'text-indigo-600 border border-indigo-600 hover:bg-indigo-50 dark:text-indigo-400 dark:border-indigo-400 dark:hover:bg-gray-700'}`}>الملف الشخصي</a>
                    )}
                   <button onClick={handleLogout} className="text-center w-full px-5 py-3 text-white bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 rounded-full transition duration-300">تسجيل الخروج</button>
                </div>
              ) : (
                <div className="flex flex-col space-y-2 pt-2">
                  <a href="#/login" className={`text-center w-full px-5 py-3 rounded-full transition duration-300 ${activeSection === '#/login' ? 'text-white bg-gradient-to-r from-indigo-600 to-purple-600' : 'text-indigo-600 border border-indigo-600 hover:bg-indigo-50 dark:text-indigo-400 dark:border-indigo-400 dark:hover:bg-gray-700'}`}>تسجيل الدخول</a>
                  <a href="#/signup" className={`text-center w-full px-5 py-3 text-white rounded-full transition-transform transform hover:scale-105 duration-300 ${activeSection === '#/signup' ? 'bg-gradient-to-r from-indigo-700 to-purple-800' : 'bg-gradient-to-r from-indigo-600 to-purple-600'}`}>إنشاء حساب</a>
                </div>
              )}
            </nav>
          </div>
      </div>
    </header>
  );
};

export default Header;
