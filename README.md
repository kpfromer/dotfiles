# dotfiles

Here are the tools and configurations I use to customize my programming experience.

## Built With

`kdot` - a [custom made](https://github.com/kpfromer/kdot) dotfile manager that uses the `kdot.json` file for linking.

In the past I used  [stow](https://www.gnu.org/software/stow/) to handle installing dot files. [Here is a great article
about using stow](https://codys.club/blog/2015/07/07/managing-your-dotfiles-with-gnu-stow/).


### `kdot` usage

`kdot link bash zsh` to symlink the bash and zsh modules (as defined in the json folder).

`kdot unlink bash zsh` to remove the symlinks in the bash and zsh modules.

`kdot sync bash zsh` to update the symlinks (new files/folders).

TODO: tools that I used, with github links

- [bspwm](https://github.com/baskerville/bspwm)
  - [sxhkd](https://github.com/baskerville/sxhkd)
- [picom (tyrone fork for blur)](https://github.com/tryone144/compton/tree/feature/dual_kawase)
- [polybar](https://github.com/polybar/polybar)
- [rofi](https://github.com/davatorium/rofi)
- [input font](https://input.fontbureau.com/)

## Resources

- [polybar themes](https://github.com/adi1090x/polybar-themes)
- [rofi themes](https://github.com/adi1090x/rofi)
- [bspwm scripts](https://github.com/Chrysostomus/bspwm-scripts)
