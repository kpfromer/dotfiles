"        _           
" __   _(_)_ __ ___  
" \ \ / / | '_ ` _ \ 
"  \ V /| | | | | | |
"   \_/ |_|_| |_| |_|
"                    

set nocompatible "I don't necessarily need Vim to be compatible with Vi
filetype off "Allow for plugins

scriptencoding utf-8
set encoding=utf-8 "Read files as UTF8
set fileencoding=utf-8 "Write new files as UTF8

set tabstop=4 "Tabs should appear to be 4 spaces wide
set softtabstop=4 "When deleting indenting spaces, delete 4 spaces/1 tab at a time
set shiftwidth=4 "Indents should be a tab
set backspace=2 "Make backspace work on indentation, line ends, and insert starts

set relativenumber "Show lines numbers relatively to make calling commands easier

set undofile "Create an undofile when editing to allow for undos
au FocusLost * :wa "Saves all open files whenever focus is lost

set scrolloff=5 "Always keep at least 5 lines below and above the current line unless at beginning or end of file

set autoindent "When creating new lines, copy the indentation of the previous line

set showmode "Always show the mode at the bottom

set clipboard=unnamedplus

set laststatus=2 "Always show a status line
set ruler "Display a ruler at the bottom
set ttyfast "Make drawing smoother

set list "Show whitespace characters
set listchars=tab:▸\ ,eol:¬\,trail:●\,nbsp:⎵ "Set the characters for whitespace

syntax on "Turn on syntax highlighting

"""Make searching and moving behave nicer
set ignorecase
set smartcase
set gdefault
set incsearch
set showmatch
set hlsearch
nnoremap <leader><space> :noh<cr>

"make jk to escape for fast saving/exit
inoremap jk <esc>


"Plugins
call plug#begin('~/.vim/plugged')
Plug 'tpope/vim-fugitive'
Plug 'scrooloose/nerdtree'
Plug 'scrooloose/nerdcommenter'
Plug 'airblade/vim-gitgutter'
Plug 'tpope/vim-surround'
Plug 'sheerun/vim-polyglot'
Plug 'vim-airline/vim-airline'
Plug 'luochen1990/rainbow'
Plug 'morhetz/gruvbox'
"Plug 'arcticicestudio/nord-vim'
call plug#end()
"filetype plugin indent on
set bg=dark
let g:gruvbox_contrast_dark='soft'
colorscheme gruvbox
"colorscheme nord "Set the color scheme to OneDark
