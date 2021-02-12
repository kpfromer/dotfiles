#           _     
#   _______| |__  
#  |_  / __| '_ \ 
#   / /\__ \ | | |
#  /___|___/_| |_|

# Starship
eval "$(starship init zsh)"

# Zplug
source /usr/share/zsh/scripts/zplug/init.zsh

# Per system file
source ~/.zsh_custom

# tmp lang fix
export LANG=en_US.UTF-8

# nvm
source /usr/share/nvm/init-nvm.sh

# zsh history
HISTFILE=$HOME/.cache/zhistory
HISTSIZE=1000
SAVEHIST=500

# Colorize older terminal apps (like man)
# Start blinking
export LESS_TERMCAP_mb=$(tput bold; tput setaf 2) # green
# Start bold
export LESS_TERMCAP_md=$(tput bold; tput setaf 2) # green
# Start stand out
export LESS_TERMCAP_so=$(tput bold; tput setaf 3) # yellow
# End standout
export LESS_TERMCAP_se=$(tput rmso; tput sgr0)
# Start underline
export LESS_TERMCAP_us=$(tput smul; tput bold; tput setaf 1) # red
# End bold, blinking, standout, underline
export LESS_TERMCAP_me=$(tput sgr0)


# aliases
alias ls='exa --long --header --icons --sort=type'
alias tree='exa --tree --level 3'
alias sdn="sudo shutdown -h now"
alias cp="cp -i" # Confirm before overwriting something
alias pkg="yay -Q | fzf"
alias yt='youtube-dl --add-metadata -i'
alias cz='git-cz --disable-emoji'
alias cu-vpn='/opt/cisco/anyconnect/bin/vpn' # read more here: https://oit.colorado.edu/tutorial/vpn-setup-and-usage-linux
alias open="nautilus"
alias ocr='ocrmypdf -l eng --rotate-pages --deskew --clean --optimize 1'


# load the good parts from oh-my-zsh
zplug "lib/completion",      from:oh-my-zsh
zplug "lib/history",         from:oh-my-zsh
# zplug "lib/key-bindings",    from:oh-my-zsh
zplug "plugins/docker",      from:oh-my-zsh
zplug "zdharma/fast-syntax-highlighting"
zplug "zsh-users/zsh-autosuggestions"
# Install plugins if there are plugins that have not been installed
if ! zplug check --verbose; then
	printf "Install? [y/N]: "
		if read -q; then
		echo; zplug install
	fi
fi

# Then, source plugins and add commands to $PATH
zplug load

# run neofetch if terminal is interactive
[ -z "$PS1" ] || pfetch

# Allows ctrl+left arrow or ctrl+right arrow to move by words
bindkey '^[[1;5D' backward-word
bindkey '^[[1;5C' forward-word

# School script to jump dirs
source /home/kpfromer/.config/bash_functions/sc.sh

# load miniconda
# [ -f /opt/miniconda3/etc/profile.d/conda.sh ] && source /opt/miniconda3/etc/profile.d/conda.sh
# source /usr/share/nvm/init-nvm.sh
