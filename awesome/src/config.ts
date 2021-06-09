import * as awful from 'awful';

import { Layout } from 'awful';
import { ModifierKey } from 'awesomewm.4.3.ts.d';

export const config = {
  modkey: ModifierKey.Mod4,

  layouts: [
    awful.layout.suit.spiral.dwindle,
    awful.layout.suit.tile.left,
    awful.layout.suit.floating,
    awful.layout.suit.max,
  ] as Layout[],

  apps: {
    terminal: os.getenv('TERMINAL') ?? 'alacritty',
    // GUI Text Editor
    textEditor: 'code',
    // Terminal based File Editor
    terminalEditor: os.getenv('EDITOR') ?? 'vim',
    // Web browser
    browser: os.getenv('BROWSER') ?? 'google-chrome-stable',
    // GUI File manager
    fileManager: 'nautilus',
    // Network manager
    networkManager: 'nm-connection-editor',
    // Bluetooth manager
    bluetoothManager: 'blueman-manager',
    // Screenshot
    screenshot: 'spectacle --region',
    appLauncher: 'ulauncher',
  },

  startupApps: [
    // Various things
    'kpfromer-startup',
    // Force Composition Pipeline for nvidia
    // 'force-composition-pipeline',
    // Picom (compositor)
    // `picom -b --experimental-backends --dbus --config ${config_dir}configuration/picom.conf`,
    // Load xresources
    'xrdb merge .Xresources',
    // Start audio
    // "start-pulseaudio-x11",
    // Start blue light filter
    // "redshift",
    // Bluetooth tray icon
    'blueberry-tray',
  ],
};
