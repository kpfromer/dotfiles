# source default system profiles
source /etc/profile

# keyring - xauthority
source /etc/X11/xinit/xinitrc.d/50-systemd-user.sh

# Set our default path
export PATH="$HOME/.yarn/bin:$HOME/.config/scripts:$HOME/.bin:$HOME/.cargo/bin":$PATH

# setup of XDG folder locations
# see more here: https://wiki.archlinux.org/index.php/XDG_Base_Directory
export XDG_CONFIG_HOME="$HOME/.config"
export XDG_CONFIG_DIRS=/usr/etc/xdg:/etc/xdg

# Custom Programs
export TERMINAL="alacritty"
export BROWSER="google-chrome-stable --enable-features=WebUIDarkMode --force-dark-mode"
export EDITOR="vim"
export GUI_EDITOR="code"
export FILE="vifmrun"
export PLAYER="spotify"
