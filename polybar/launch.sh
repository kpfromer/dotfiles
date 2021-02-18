#!/usr/bin/env bash

# Terminate already running bar instances
killall -q polybar
# If all your bars have ipc enabled, you can also use 
# polybar-msg cmd quit

# Launch bar1 and bar3
# echo "---" | tee -a /tmp/polybar1.log /tmp/polybar2.log
polybar bar 2>&1 | tee -a /tmp/bar.log & disown
#polybar bar2 2>&1 | tee -a /tmp/polybar2.log & disown

echo "Bars launched..."
