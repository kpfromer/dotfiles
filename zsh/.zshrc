#           _     
#   _______| |__  
#  |_  / __| '_ \ 
#   / /\__ \ | | |
#  /___|___/_| |_|

source /usr/share/zsh/scripts/zplug/init.zsh

# zsh history
HISTFILE=~/.zhistory
HISTSIZE=1000
SAVEHIST=500

# aliases
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
zplug "plugins/virtualenv"   from:oh-my-zsh
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
