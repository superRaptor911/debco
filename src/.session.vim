let SessionLoad = 1
let s:so_save = &g:so | let s:siso_save = &g:siso | setg so=0 siso=0 | setl so=-1 siso=-1
let v:this_session=expand("<sfile>:p")
silent only
silent tabonly
cd ~/program/dapps/decbo/src
if expand('%') == '' && !&modified && line('$') <= 1 && getline(1) == ''
  let s:wipebuf = bufnr('%')
endif
set shortmess=aoO
argglobal
%argdel
edit ~/program/dapps/decbo/src/components/BookRoom.jsx
argglobal
balt pages/AddRoom.jsx
let s:l = 9 - ((8 * winheight(0) + 22) / 45)
if s:l < 1 | let s:l = 1 | endif
keepjumps exe s:l
normal! zt
keepjumps 9
normal! 0
tabnext 1
badd +37 App.js
badd +26 pages/AddRoom.jsx
badd +90 api/api.js
badd +4 webInit.js
badd +47 components/RoomCard.jsx
badd +88 pages/Dashboard.jsx
badd +17 components/LatestRooms.jsx
badd +75 pages/Register.jsx
badd +2 pages/Home.jsx
badd +37 api/arcanaAuth.js
badd +22 pages/GithApp.jsx
badd +10 pages/ArcanaRedirect.jsx
badd +10 store.js
badd +9 ~/program/dapps/decbo/src/components/BookRoom.jsx
if exists('s:wipebuf') && len(win_findbuf(s:wipebuf)) == 0 && getbufvar(s:wipebuf, '&buftype') isnot# 'terminal'
  silent exe 'bwipe ' . s:wipebuf
endif
unlet! s:wipebuf
set winheight=1 winwidth=20 shortmess=filnxtToOFc
let s:sx = expand("<sfile>:p:r")."x.vim"
if filereadable(s:sx)
  exe "source " . fnameescape(s:sx)
endif
let &g:so = s:so_save | let &g:siso = s:siso_save
set hlsearch
nohlsearch
doautoall SessionLoadPost
unlet SessionLoad
" vim: set ft=vim :
