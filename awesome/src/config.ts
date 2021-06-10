import * as awful from 'awful';

import { Client, Layout, Screen } from 'awful';
import { ModifierKey, MouseButton } from 'awesomewm.4.3.ts.d';
import { buildButtons, buildKeys } from './utils';

const modkey = ModifierKey.Mod4;

export const config = {
  modkey,

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

  client: {
    keys: buildKeys<Client>([
      {
        group: 'client',
        keys: [
          {
            modifiers: [modkey],
            key: 'f',
            onPress: (c) => {
              c.fullscreen = !c.fullscreen;
              c.raise();
            },
            description: 'toggle fullscreen',
          },
          {
            modifiers: [modkey],
            key: 'q',
            onPress: (c) => c.kill(),
            description: 'kill window',
          },
          {
            modifiers: [modkey, ModifierKey.Control],
            key: 'space',
            onPress: (client) => {
              client.floating = !client.floating;
              client.ontop = false;
              client.raise();
            },
            description: 'toggle floating',
          },
          {
            modifiers: [modkey],
            key: 't',
            onPress: (c) => (c.ontop = !c.ontop),
            description: 'toggle keep on top',
          },
          {
            modifiers: [modkey],
            key: 'n',
            onPress: (c) => (c.minimized = true),
            description: 'minimize',
          },
          {
            modifiers: [modkey],
            key: 'm',
            onPress: (c) => {
              c.maximized = !c.maximized;
              c.raise();
            },
            description: '(un)maximize',
          },
          {
            modifiers: [modkey],
            key: 'p',
            onPress: (c) => {
              if (c.floating) {
                c.ontop = false;
                c.sticky = false;
                c.floating = false;
              } else {
                c.ontop = true;
                c.sticky = true;
                c.floating = true;

                const { height } = (c.screen as Screen).geometry;
                const newHeight = (1 / 3) * height;
                const newWidth = (16 / 9) * newHeight;

                c.geometry({ x: 0, y: 0, height: newHeight, width: newWidth });
                awful.placement.bottom_right(c, {
                  pretend: false,
                  margins: {
                    top: 0,
                    bottom: 60,
                    left: 0,
                    right: 60,
                  },
                });
              }
            },
            description: 'pin window',
          },
        ],
      },
    ]),

    buttons: buildButtons<Client>([
      {
        modifiers: [],
        button: MouseButton.Left,
        onPress: (c) => c.emit_signal('request::activate', 'mouse_click', { raise: true }),
      },
      {
        modifiers: [modkey],
        button: MouseButton.Left,
        onPress: (c) => {
          c.emit_signal('request::activate', 'mouse_click', { raise: true });
          awful.mouse.client.move(c);
        },
      },
      {
        modifiers: [modkey],
        button: MouseButton.Right,
        onPress: (c) => {
          c.emit_signal('request::activate', 'mouse_click', { raise: true });
          awful.mouse.client.resize(c);
        },
      },
    ]),
  },
};
