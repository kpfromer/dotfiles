#!/usr/bin/env bash

# sc = school utility
function sc() {
  dir=/home/kpfromer/Documents/cu-classes/sophomore/second-semester

  case "$1" in 
    start)
      case "$2" in 
        data)
          cd $dir/data-science
          # exec run.sh
          ./run.sh
          ;;
        ppl)
          cd $dir/ppl
          # exec start
          ./start
          ;;
        *)
          echo "Unknown value"
          # exit 1
      esac
      ;;
    *)
      cd $dir
      ;;
  esac
}