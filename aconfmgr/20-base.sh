# Packages for system

# TODO: more organization! (group by types in seperate files)

# Must Have

AddPackage base # Minimal package set to define a basic Arch Linux installation
AddPackage grub # GNU GRand Unified Bootloader (2)
AddPackage efibootmgr # Linux user-space application to modify the EFI Boot Manager
AddPackage linux # The Linux kernel and modules
AddPackage linux-firmware # Firmware files for Linux
AddPackage linux-headers # Headers and scripts for building modules for the Linux kernel
AddPackage lvm2 # Logical Volume Manager 2 utilities
AddPackage fakeroot # Tool for simulating superuser privileges
AddPackage m4 # The GNU macro processor
AddPackage pacman-contrib # Contributed scripts and tools for pacman systems
AddPackage os-prober # Utility to detect other OSes on a set of drives

# System Tools

AddPackage gdb # The GNU Debugger
AddPackage xdg-user-dirs # Manage user directories like ~/Desktop and ~/Music
AddPackage xdg-user-dirs-gtk # Creates user dirs and asks to relocalize them
AddPackage binutils # A set of programs to assemble and manipulate binary and object files
AddPackage man-db # A utility for reading man pages
AddPackage pkgconf # Package compiler and linker metadata toolkit

# Make Tools

AddPackage make # GNU make utility to maintain groups of programs
AddPackage gcc # The GNU Compiler Collection - C and C++ frontends
AddPackage autoconf # A GNU tool for automatically configuring source code
AddPackage automake # A GNU tool for automatically creating Makefiles
AddPackage docker # Pack, ship and run any application as a lightweight container
AddPackage docker-compose # Fast, isolated development environments using Docker

# CLI Tools

AddPackage sudo # Give certain users the ability to run some commands as root
AddPackage git # the fast distributed version control system
AddPackage vim # Vi Improved, a highly configurable, improved version of the vi text editor
AddPackage unrar # The RAR uncompression program
AddPackage unzip # For extracting and viewing files in .zip archives
AddPackage wget # Network utility to retrieve files from the Web
AddPackage which # A utility to show the full path of commands

# Software Tooling

## Rust

AddPackage rustup # The Rust toolchain installer

## Javascript/Typescript/Nodejs

AddPackage --foreign nvm # Node Version Manager - Simple bash script to manage multiple active node.js versions

## Java

AddPackage jdk11-openjdk # OpenJDK Java 11 development kit

## Scala

AddPackage sbt # The interactive build tool
AddPackage scala # A Java-interoperable language with object-oriented and functional features


################################

# TODO: rest

AddPackage amd-ucode # Microcode update image for AMD CPUs
AddPackage android-file-transfer # Android MTP client with minimalistic UI
AddPackage baobab # A graphical directory tree analyzer
AddPackage biber # A Unicode-capable BibTeX replacement for biblatex users
AddPackage bison # The GNU general-purpose parser generator
AddPackage bpytop # Resource monitor that shows usage and stats for processor, memory, disks, network and processes

AddPackage capitaine-cursors # An x-cursor theme inspired by macOS and based on KDE Breeze
AddPackage cheese # Take photos and videos with your webcam, with fun graphical effects
AddPackage cronie # Daemon that runs specified programs at scheduled times and related tools
AddPackage dash # POSIX compliant shell that aims to be as small as possible
AddPackage dialog # A tool to display dialog boxes from shell scripts


AddPackage dosfstools # DOS filesystem utilities
AddPackage dunst # Customizable and lightweight notification-daemon

AddPackage eog # Eye of Gnome
AddPackage epiphany # A GNOME web browser based on the WebKit rendering engine
AddPackage evince # Document viewer (PDF, PostScript, XPS, djvu, dvi, tiff, cbr, cbz, cb7, cbt)

AddPackage exfat-utils # Utilities for exFAT file system



AddPackage file-roller # Create and modify archives

AddPackage flatpak # Linux application sandboxing and distribution framework (formerly xdg-app)
AddPackage flex # A tool for generating text-scanning programs
AddPackage fzf # Command-line fuzzy finder
AddPackage garcon # Implementation of the freedesktop.org menu specification

AddPackage gdm # Display manager and login screen
AddPackage gdmap # Tool to inspect the used space of folders.
AddPackage geckodriver # Proxy for using W3C WebDriver-compatible clients to interact with Gecko-based browsers.
AddPackage gedit # GNOME Text Editor

AddPackage grilo-plugins # A collection of plugins for the Grilo framework
AddPackage groff # GNU troff text-formatting system

AddPackage gtk-engine-murrine # GTK2 engine to make your desktop look like a 'murrina', an italian word meaning the art glass works done by Venicians glass blowers.
AddPackage gucharmap # Gnome Unicode Charmap
AddPackage gvfs-afc # Virtual filesystem implementation for GIO (AFC backend; Apple mobile devices)
AddPackage gvfs-goa # Virtual filesystem implementation for GIO (Gnome Online Accounts backend; cloud storage)
AddPackage gvfs-google # Virtual filesystem implementation for GIO (Google Drive backend)
AddPackage gvfs-gphoto2 # Virtual filesystem implementation for GIO (gphoto2 backend; PTP camera, MTP media player)
AddPackage gvfs-mtp # Virtual filesystem implementation for GIO (MTP backend; Android, media player)
AddPackage gvfs-nfs # Virtual filesystem implementation for GIO (NFS backend)
AddPackage gvfs-smb # Virtual filesystem implementation for GIO (SMB/CIFS backend; Windows client)

AddPackage i3-gaps # A fork of i3wm tiling window manager with more features, including gaps
AddPackage kcharselect # Character Selector
AddPackage ksnip # Qt-based screenshot tool that provides many annotation features
AddPackage libreoffice-fresh # LibreOffice branch which contains new features and program enhancements
AddPackage libtool # A generic library support script
AddPackage lightdm # A lightweight display manager
AddPackage lightdm-gtk-greeter # GTK+ greeter for LightDM
AddPackage mono # Free implementation of the .NET platform including runtime and compiler
AddPackage mtools # A collection of utilities to access MS-DOS disks
AddPackage neofetch # A CLI system information tool written in BASH that supports displaying images.
AddPackage nitrogen # Background browser and setter for X windows
AddPackage nmap # Utility for network discovery and security auditing
AddPackage nomacs # A Qt image viewer
AddPackage openresolv # resolv.conf management framework (resolvconf)
AddPackage orca # Screen reader for individuals who are blind or visually impaired
AddPackage parole # Modern media player based on the GStreamer framework
AddPackage patch # A utility to apply patch files to original sources
AddPackage pdfgrep # A tool to search text in PDF files
AddPackage rofi # A window switcher, application launcher and dmenu replacement
AddPackage rygel # UPnP AV MediaServer and MediaRenderer
AddPackage sxhkd # Simple X hotkey daemon
AddPackage syncthing # Open Source Continuous Replication / Cluster Synchronization Thing
AddPackage tesseract-data-eng # Tesseract OCR data (eng)
AddPackage texinfo # GNU documentation system for on-line information and printed output
AddPackage tk # A windowing toolkit for use with tcl
AddPackage tokei # A blazingly fast CLOC (Count Lines Of Code) program
AddPackage totem # Movie player for the GNOME desktop based on GStreamer
AddPackage tracker # Desktop-neutral user information store, search tool and indexer
AddPackage tracker-miners # Collection of data extractors for Tracker/Nepomuk
AddPackage tumbler # D-Bus service for applications to request thumbnails
AddPackage unoconv # Libreoffice-based document converter







# Sun Jun  6 04:45:02 PM MDT 2021 - Unknown foreign packages



AddPackage --foreign candy-icons-git # Sweet gradient icons
AddPackage --foreign chrome-gnome-shell # Native browser connector for integration with extensions.gnome.org




AddPackage --foreign gallery-dl-git # Command-line program to download image-galleries and collections from several image hosting sites (git)
AddPackage --foreign jmtpfs # FUSE and libmtp based filesystem for accessing MTP (Media Transfer Protocol) devices
AddPackage --foreign lf # A terminal file manager inspred by ranger written in Go
AddPackage --foreign lightdm-settings # A configuration tool for the LightDM display manager
AddPackage --foreign lightdm-slick-greeter # A slick-looking LightDM greeter
AddPackage --foreign nerdfetch # A POSIX fetch using NerdFonts
AddPackage --foreign obsidian-appimage # Obsidian is a powerful knowledge base that works on top of a local folder of plain text Markdown files
AddPackage --foreign ocrmypdf # A tool to add an OCR text layer to scanned PDF files, allowing them to be searched
AddPackage --foreign pfetch # A pretty system information tool written in POSIX sh.
AddPackage --foreign picom-jonaburg-git # jonaburg's picom fork with tryone144's dual_kawase blur and ibhagwan's rounded corners, an X compositor (compton's fork)

AddPackage --foreign polybar-git # A fast and easy-to-use status bar

AddPackage --foreign selectdefaultapplication-git # A very simple application that lets you define default applications on Linux in a sane way

AddPackage --foreign snapd # Service and tools for management of snap packages.




AddPackage --foreign toilet # free replacement for the FIGlet utility.
AddPackage --foreign update-grub # Simple wrapper around grub-mkconfig

AddPackage --foreign xinit-xsession # Allows ~/.xinitrc to be run as a session from your display manager
AddPackage --foreign yay # Yet another yogurt. Pacman wrapper and AUR helper written in go.
AddPackage --foreign youtube-dl-git # A small command-line program to download videos from YouTube.com and a few more sites (git version)


# Files

CopyFile /etc/default/ufw
CopyFile /etc/hostname
CopyFile /etc/lightdm/lightdm.conf
CopyFile /etc/lightdm/slick-greeter.conf
CreateLink /etc/localtime ../usr/share/zoneinfo/America/Denver
CreateLink /etc/os-release ../usr/lib/os-release
CopyFile /etc/pacman.d/mirrorlist
CopyFile /etc/pacman.d/mirrorlist.pacnew
CopyFile /etc/pipewire/media-session.d/alsa-monitor.conf.pacnew
CopyFile /etc/pipewire/media-session.d/alsa-monitor.conf.pacsave
CopyFile /etc/pulse/system.pa.pacsave
CopyFile /etc/sysctl.d/99-swappiness.conf
CopyFile /etc/ufw/after.rules
CopyFile /etc/ufw/after6.rules
CopyFile /etc/ufw/ufw.conf
CopyFile /etc/ufw/user.rules
CopyFile /etc/ufw/user6.rules
CopyFile /etc/xdg/reflector/reflector.conf

# Services

CreateLink /etc/systemd/system/bluetooth.target.wants/bluetooth.service /usr/lib/systemd/system/bluetooth.service
CreateLink /etc/systemd/system/dbus-org.bluez.service /usr/lib/systemd/system/bluetooth.service
CreateLink /etc/systemd/system/dbus-org.freedesktop.nm-dispatcher.service /usr/lib/systemd/system/NetworkManager-dispatcher.service
CreateLink /etc/systemd/system/dbus-org.freedesktop.timesync1.service /usr/lib/systemd/system/systemd-timesyncd.service
CreateLink /etc/systemd/system/getty.target.wants/getty@tty1.service /usr/lib/systemd/system/getty@.service
CreateLink /etc/systemd/system/multi-user.target.wants/NetworkManager.service /usr/lib/systemd/system/NetworkManager.service
CreateLink /etc/systemd/system/multi-user.target.wants/docker.service /usr/lib/systemd/system/docker.service
CreateLink /etc/systemd/system/multi-user.target.wants/reflector.service /usr/lib/systemd/system/reflector.service
CreateLink /etc/systemd/system/multi-user.target.wants/remote-fs.target /usr/lib/systemd/system/remote-fs.target
CreateLink /etc/systemd/system/multi-user.target.wants/snapd.service /usr/lib/systemd/system/snapd.service
CreateLink /etc/systemd/system/multi-user.target.wants/sshd.service /usr/lib/systemd/system/sshd.service
CreateLink /etc/systemd/system/multi-user.target.wants/syncthing@kpfromer.service /usr/lib/systemd/system/syncthing@.service
CreateLink /etc/systemd/system/multi-user.target.wants/ufw.service /usr/lib/systemd/system/ufw.service
CreateLink /etc/systemd/system/multi-user.target.wants/var-lib-snapd-snap-core-11081.mount /etc/systemd/system/var-lib-snapd-snap-core-11081.mount
CreateLink /etc/systemd/system/multi-user.target.wants/var-lib-snapd-snap-core-11167.mount /etc/systemd/system/var-lib-snapd-snap-core-11167.mount
CreateLink /etc/systemd/system/multi-user.target.wants/var-lib-snapd-snap-core18-1997.mount /etc/systemd/system/var-lib-snapd-snap-core18-1997.mount
CreateLink /etc/systemd/system/multi-user.target.wants/var-lib-snapd-snap-core18-2066.mount /etc/systemd/system/var-lib-snapd-snap-core18-2066.mount
CreateLink /etc/systemd/system/multi-user.target.wants/var-lib-snapd-snap-core20-1026.mount /etc/systemd/system/var-lib-snapd-snap-core20-1026.mount
CreateLink /etc/systemd/system/multi-user.target.wants/var-lib-snapd-snap-core20-975.mount /etc/systemd/system/var-lib-snapd-snap-core20-975.mount
CreateLink /etc/systemd/system/multi-user.target.wants/var-lib-snapd-snap-discord-128.mount /etc/systemd/system/var-lib-snapd-snap-discord-128.mount
CreateLink /etc/systemd/system/multi-user.target.wants/var-lib-snapd-snap-gnome\\x2d3\\x2d28\\x2d1804-145.mount /etc/systemd/system/var-lib-snapd-snap-gnome\\x2d3\\x2d28\\x2d1804-145.mount
CreateLink /etc/systemd/system/multi-user.target.wants/var-lib-snapd-snap-gtk\\x2dcommon\\x2dthemes-1514.mount /etc/systemd/system/var-lib-snapd-snap-gtk\\x2dcommon\\x2dthemes-1514.mount
CreateLink /etc/systemd/system/multi-user.target.wants/var-lib-snapd-snap-gtk\\x2dcommon\\x2dthemes-1515.mount /etc/systemd/system/var-lib-snapd-snap-gtk\\x2dcommon\\x2dthemes-1515.mount
CreateLink /etc/systemd/system/multi-user.target.wants/var-lib-snapd-snap-spotify-46.mount /etc/systemd/system/var-lib-snapd-snap-spotify-46.mount
CreateLink /etc/systemd/system/multi-user.target.wants/vpnagentd.service /usr/lib/systemd/system/vpnagentd.service
CreateLink /etc/systemd/system/network-online.target.wants/NetworkManager-wait-online.service /usr/lib/systemd/system/NetworkManager-wait-online.service
CreateLink /etc/systemd/system/sysinit.target.wants/systemd-timesyncd.service /usr/lib/systemd/system/systemd-timesyncd.service
CopyFile /etc/systemd/system/var-lib-snapd-snap-core-11081.mount
CopyFile /etc/systemd/system/var-lib-snapd-snap-core-11167.mount
CopyFile /etc/systemd/system/var-lib-snapd-snap-core18-1997.mount
CopyFile /etc/systemd/system/var-lib-snapd-snap-core18-2066.mount
CopyFile /etc/systemd/system/var-lib-snapd-snap-core20-1026.mount
CopyFile /etc/systemd/system/var-lib-snapd-snap-core20-975.mount
CopyFile /etc/systemd/system/var-lib-snapd-snap-discord-128.mount
CopyFile /etc/systemd/system/var-lib-snapd-snap-gnome\\x2d3\\x2d28\\x2d1804-145.mount
CopyFile /etc/systemd/system/var-lib-snapd-snap-gtk\\x2dcommon\\x2dthemes-1514.mount
CopyFile /etc/systemd/system/var-lib-snapd-snap-gtk\\x2dcommon\\x2dthemes-1515.mount
CopyFile /etc/systemd/system/var-lib-snapd-snap-spotify-46.mount
CreateLink /etc/systemd/user/default.target.wants/xdg-user-dirs-update.service /usr/lib/systemd/user/xdg-user-dirs-update.service
CreateLink /etc/systemd/user/pipewire.service.wants/pipewire-media-session.service /usr/lib/systemd/user/pipewire-media-session.service
CreateLink /etc/systemd/user/sockets.target.wants/dirmngr.socket /usr/lib/systemd/user/dirmngr.socket
CreateLink /etc/systemd/user/sockets.target.wants/gpg-agent-browser.socket /usr/lib/systemd/user/gpg-agent-browser.socket
CreateLink /etc/systemd/user/sockets.target.wants/gpg-agent-extra.socket /usr/lib/systemd/user/gpg-agent-extra.socket
CreateLink /etc/systemd/user/sockets.target.wants/gpg-agent-ssh.socket /usr/lib/systemd/user/gpg-agent-ssh.socket
CreateLink /etc/systemd/user/sockets.target.wants/gpg-agent.socket /usr/lib/systemd/user/gpg-agent.socket
CreateLink /etc/systemd/user/sockets.target.wants/p11-kit-server.socket /usr/lib/systemd/user/p11-kit-server.socket
CreateLink /etc/systemd/user/sockets.target.wants/pipewire-pulse.socket /usr/lib/systemd/user/pipewire-pulse.socket
CreateLink /etc/systemd/user/sockets.target.wants/pipewire.socket /usr/lib/systemd/user/pipewire.socket