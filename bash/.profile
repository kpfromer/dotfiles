# source default system profiles
source /etc/profile

# Set our default path
PATH="/usr/local/sbin:/usr/local/bin:/usr/bin/core_perl:/usr/bin"
export PATH=$(yarn global bin):"$HOME/.config/scripts:$HOME/.config/bspwm/panel:$HOME/.bin":$PATH

# setup of XDG folder locations
# see more here: https://wiki.archlinux.org/index.php/XDG_Base_Directory
export XDG_CONFIG_HOME="$HOME/.config"
export XDG_CONFIG_DIRS=/usr/etc/xdg:/etc/xdg

# Specify where the bspwm socket file will be
export BSPWM_SOCKET="/tmp/bspwm-socket"

# Custom Programs
export TERMINAL="termite"
export BROWSER="google-chrome-stable"
export EDITOR="vim"
export GUI_EDITOR="code-insiders"
export FILE="ranger"
export PLAYER="spotify"

# Load profiles from /etc/profile.d
if test -d /etc/profile.d/; then
	for profile in /etc/profile.d/*.sh; do
		test -r "$profile" && . "$profile"
	done
	unset profile
fi

# Source global bash config
if test "$PS1" && test "$BASH" && test -r /etc/bash.bashrc; then
	. /etc/bash.bashrc
fi