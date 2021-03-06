import * as awful from 'awful';

import { Client, Layout, Screen } from 'awful';
import { Direction, ModifierKey, MouseButton } from 'awesomewm.4.3.ts.d';
import {
  buildButtons,
  buildKeys,
  moveCursorToClient,
  moveCursorToFocus,
  moveTagDirection,
  range,
} from './utils';

import { option } from './option';
import { tag } from 'awful';

const modkey = ModifierKey.Mod4;

const apps = {
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
};

const clientDefs = {
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
};

const globalDefs = {
  // TODO: definitions
  keys: buildKeys<Screen>([
    {
      group: 'awesome',
      keys: [
        {
          modifiers: [modkey, ModifierKey.Control],
          key: 'q',
          onPress: () => awesome.quit(),
          description: 'quit awesome',
        },
        {
          modifiers: [modkey, ModifierKey.Control],
          key: 'r',
          onPress: () => awesome.restart(),
          description: 'reload awesome',
        },
      ],
    },
    {
      group: 'layout',
      keys: [
        {
          modifiers: [modkey],
          key: 'space',
          onPress: () => awful.layout.inc(1),
          description: 'select next layout',
        },
        {
          modifiers: [modkey, ModifierKey.Shift],
          key: 'space',
          onPress: () => awful.layout.inc(-1),
          description: 'select previous layout',
        },
      ],
    },
    {
      group: 'client',
      keys: [
        {
          modifiers: [modkey],
          key: 'Left',
          onPress: () => {
            awful.client.focus.bydirection(Direction.Left);
            moveCursorToFocus();
          },
          description: 'focus left',
        },
        {
          modifiers: [modkey],
          key: 'Right',
          onPress: () => {
            awful.client.focus.bydirection(Direction.Right);
            moveCursorToFocus();
          },
          description: 'focus right',
        },
        {
          modifiers: [modkey],
          key: 'Up',
          onPress: () => {
            awful.client.focus.bydirection(Direction.Up);
            moveCursorToFocus();
          },
          description: 'focus up',
        },
        {
          modifiers: [modkey],
          key: 'Down',
          onPress: () => {
            awful.client.focus.bydirection(Direction.Down);
            moveCursorToFocus();
          },
          description: 'focus down',
        },
        {
          modifiers: [modkey],
          key: 'Tab',
          onPress: () => {
            // TODO: fix:
            awful.client.focus.history.previous();
            option(client.focus).forEach((it) => {
              it.raise();
              moveCursorToClient(it);
            });
          },
          description: 'Focus previously used client',
        },
      ],
    },
    {
      group: 'tag',
      keys: [
        {
          modifiers: [modkey, ModifierKey.Control],
          key: 'Left',
          onPress: () => moveTagDirection('left'),
          description: 'focus left',
        },
        {
          modifiers: [modkey, ModifierKey.Control],
          key: 'Right',
          onPress: () => moveTagDirection('right'),
          description: 'focus right',
        },
      ],
    },
    {
      group: 'apps',
      keys: [
        {
          modifiers: [modkey],
          key: 'w',
          onPress: () => awful.spawn(apps.browser),
          description: 'launch browser',
        },
        {
          modifiers: [modkey],
          key: 'd',
          // TODO: change to start ulauncher up and toggle
          onPress: () => awful.spawn(apps.appLauncher),
          description: 'launch app launcher',
        },
        {
          modifiers: [modkey, ModifierKey.Shift],
          key: 'f',
          onPress: () => awful.spawn(apps.fileManager),
          description: 'open graphical file explorer',
        },
        {
          modifiers: [modkey, ModifierKey.Shift],
          key: 's',
          onPress: () => awful.spawn(apps.screenshot),
          description: 'capture a screenshot',
        },
        {
          modifiers: [modkey],
          key: 'Return',
          onPress: () => awful.spawn(apps.terminal),
          description: 'open a terminal',
        },
        {
          modifiers: [modkey],
          key: 'i',
          onPress: () =>
            awful.spawn(
              'nautilus /home/kpfromer/Documents/cu-classes/sophomore/second-semester/resources',
            ),
          description: 'open textbooks with file explorer',
        },
        {
          modifiers: [modkey],
          key: 'v',
          onPress: () => awful.spawn.with_shell('mpv $(xclip -o)'),
          description: 'Open video from clipboard.',
        },
      ],
    },
    {
      group: 'audio',
      keys: [
        {
          modifiers: [modkey, ModifierKey.Shift],
          key: '-',
          onPress: () => awful.spawn('pulsemixer --change-volume -5'),
          description: 'decrease volume',
        },
        {
          modifiers: [modkey, ModifierKey.Shift],
          key: '=',
          onPress: () => awful.spawn('pulsemixer --change-volume +5'),
          description: 'increase volume',
        },
        {
          modifiers: [modkey, ModifierKey.Shift],
          key: ',',
          onPress: () => awful.spawn('playerctl previous -p spotify'),
          description: 'previous song',
        },
        {
          modifiers: [modkey, ModifierKey.Shift],
          key: '.',
          onPress: () => awful.spawn('playerctl next -p spotify'),
          description: 'next song',
        },
        {
          modifiers: [modkey, ModifierKey.Shift],
          key: 'p',
          onPress: () => awful.spawn('playerctl play-pause -p spotify'),
          description: 'start/stop song',
        },
      ],
    },
  ]),
};

const tagDefs = {
  keys: range(1, 9).flatMap((tagName) =>
    buildKeys<Screen>([
      {
        group: 'tag',
        keys: [
          {
            modifiers: [modkey],
            key: `#${tagName + 9}`,
            onPress: () =>
              option(awful.screen.focused())
                .andThen((it) => it.tags[tagName - 1])
                .forEach((it) => it.view_only()),
            description: `toggle view of only tag #${tagName}`,
          },
          {
            modifiers: [modkey, ModifierKey.Control],
            key: `#${tagName + 9}`,
            onPress: () =>
              option(awful.screen.focused())
                .andThen((it) => it.tags[tagName - 1])
                .forEach(tag.viewtoggle),
            description: `toggle view of tag #${tagName}`,
          },
          {
            modifiers: [modkey, ModifierKey.Shift],
            key: `#${tagName + 9}`,
            onPress: () =>
              option(awful.screen.focused())
                .andThen((it) => it.tags[tagName - 1])
                .zipMap(option(client.focus))((t, c) => c.move_to_tag(t)),
            description: `move focused client to tag #${tagName}`,
          },
          {
            modifiers: [modkey, ModifierKey.Shift, ModifierKey.Control],
            key: `#${tagName + 9}`,
            onPress: () =>
              option(awful.screen.focused())
                .andThen((it) => it.tags[tagName - 1])
                .zipMap(option(client.focus))((t, c) => c.toggle_tag(t)),
            description: `toggle focused client on tag #${tagName}`,
          },
        ],
      },
    ]),
  ),
};

export const config = {
  modkey,
  apps,

  layouts: [
    awful.layout.suit.spiral.dwindle,
    awful.layout.suit.tile.left,
    awful.layout.suit.floating,
    awful.layout.suit.max,
  ] as Layout[],

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
    'picom --experimental-backends --dbus',
  ],

  rules: [
    {
      rule: {},
      properties: {
        // border_width: beautiful.border_width,
        // border_color: beautiful.border_normal,
        focus: awful.client.focus.filter,
        raise: true,
        keys: clientDefs.keys,
        buttons: clientDefs.buttons,
        screen: awful.screen.preferred,
        placement: awful.placement.no_offscreen,
      },
    },
    {
      rule: {
        floating: true,
      },
      properties: {
        border_width: 0,
      },
    },
    {
      rule_any: {
        type: ['dialog'],
        class: [
          'Wicd-client.py',
          'calendar.google.com',
          'Blueman-manager',
          'Sxiv',
          'Caja',
          'org.gnome.Nautilus',
          'Org.gnome.Nautilus',
          'gcr-prompter',
          'Zoom',
        ],
        name: ['Chat'],
      },
      properties: {
        focus: true,
        floating: true,
        above: true,
        titlebars_enabled: true,
        placement: awful.placement.centered,
      },
    },
    {
      rule_any: {
        class: ['ulauncher', 'Ulauncher'],
        name: ['Ulauncher - Application Launcher'],
      },
      properties: {
        focus: true,
        floating: true,
        above: true,
        titlebars_enabled: false,
        placement: awful.placement.centered,
      },
    },
    {
      rule_any: { type: ['normal', 'dialog'] },
      properties: { titlebars_enabled: true },
    },
  ],

  global: globalDefs,
  client: clientDefs,
  tags: tagDefs,
};
