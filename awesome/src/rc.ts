import * as naughty from "naughty";
import * as awful from "awful";
import * as menubar from "menubar";
import { ModifierKey } from "awesomewm.4.3.ts.d";
import "awful.remote";
import { filesystem as fs, table } from "gears";
import { Screen } from "awesomewm.4.3.ts.d/awesomewm/awful/screen";

if (awesome.startup_errors) {
  naughty.notify({
    preset: naughty.config.presets.critical,
    title: "Oops, there were errors during startup!",
    text: awesome.startup_errors,
  });
}

const terminal = "alacritty";

const modkey = ModifierKey.Mod4;

awful.layout.layouts = [
  awful.layout.suit.floating,
  awful.layout.suit.tile,
  awful.layout.suit.fair,
  awful.layout.suit.max,
  awful.layout.suit.max.fullscreen,
];

menubar.utils.terminal = terminal;

const globalKeys = table.join<awful.Key<Screen>>(
  awful.key([modkey, ModifierKey.Control], "r", awesome.restart, {
    description: "reload awesome",
    group: "awesome",
  })
);

root.keys(globalKeys);
