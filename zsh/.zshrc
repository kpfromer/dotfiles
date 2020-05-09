#           _     
#   _______| |__  
#  |_  / __| '_ \ 
#   / /\__ \ | | |
#  /___|___/_| |_|

source /usr/share/zsh/scripts/zplug/init.zsh

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
alias ls='ls --color=auto'
alias sdn="sudo shutdown -h now"
alias cp="cp -i" # Confirm before overwriting something
alias code="code-insiders"
alias pkg="yay -Q | fzf"

# load the good parts from oh-my-zsh
zplug "lib/completion",      from:oh-my-zsh
zplug "lib/git",             from:oh-my-zsh
zplug "lib/history",         from:oh-my-zsh
zplug "lib/key-bindings",    from:oh-my-zsh
zplug "plugins/docker",      from:oh-my-zsh
zplug "plugins/npm",         from:oh-my-zsh, defer:2
zplug "plugins/yarn",        from:oh-my-zsh, defer:2

# theme
# todo: change to nord theme
zplug "dracula/zsh", use:dracula.zsh-theme

# Install plugins if there are plugins that have not been installed
if ! zplug check --verbose; then
	printf "Install? [y/N]: "
		if read -q; then
		echo; zplug install
	fi
fi
# Then, source plugins and add commands to $PATH
zplug load
