import * as awful from 'awful';

import { Client, Screen } from 'awful';
import { ModifierKey, MouseButton } from 'awesomewm.4.3.ts.d';

import { config } from './config';
import { table } from 'gears';

const { modkey } = config;

export const clientKeys = table.join<awful.Key<Client>>(
  awful.key(
    [modkey],
    'f',
    (c) => {
      c.fullscreen = !c.fullscreen;
      c.raise();
    },
    () => {},
    { description: 'toggle fullscreen', group: 'client' },
  ),
  awful.key(
    [modkey],
    'q',
    (c) => {
      c.kill();
    },
    () => {},
    { description: 'kill window', group: 'client' },
  ),
  awful.key(
    [modkey, ModifierKey.Control],
    'space',
    (client) => {
      client.floating = !client.floating;
      client.ontop = false;
      client.raise();
    },
    () => {},
    {
      description: 'toggle floating',
      group: 'client',
    },
  ),
  // awful.key(
  //   [modkey, 'Control'],
  //   'Return',
  //   c => {
  //     // is this depercated
  //     c.swap(awful.ClientInstance .getmaster());
  //   },
  //   () => {},
  //   {description: 'move to master', group: 'client'}
  // ),
  awful.key(
    [modkey],
    'o',
    (c) => {
      c.move_to_screen();
    },
    () => {},
    { description: 'move to screen', group: 'client' },
  ),
  awful.key(
    [modkey],
    't',
    (c) => {
      c.ontop = !c.ontop;
    },
    () => {},
    { description: 'toggle keep on top', group: 'client' },
  ),
  awful.key(
    [modkey],
    'n',
    (c) => {
      c.minimized = true;
    },
    () => {},
    { description: 'minimize', group: 'client' },
  ),
  awful.key(
    [modkey],
    'm',
    (c) => {
      c.maximized = !c.maximized;
      c.raise();
    },
    () => {},
    { description: '(un)maximize', group: 'client' },
  ),
  awful.key(
    [modkey, ModifierKey.Control],
    'm',
    (c) => {
      c.maximized_vertical = !c.maximized_vertical;
      c.raise();
    },
    () => {},
    { description: '(un)maximize vertically', group: 'client' },
  ),
  awful.key(
    [modkey, ModifierKey.Shift],
    'm',
    (c) => {
      c.maximized_horizontal = !c.maximized_horizontal;
      c.raise();
    },
    () => {},
    { description: '(un)maximize horizontally', group: 'client' },
  ),

  // TODO:
  awful.key(
    [modkey],
    'p',
    (c) => {
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
        // awful.placement.bottom_right(c, { margins: { bottom: 60 } });
      }
    },
    () => {},
    { description: 'pin window', group: 'client' },
  ),
);

export const clientButtons = table.join<awful.Button<Client>>(
  awful.button([], MouseButton.Left, (c) => {
    c.emit_signal('request::activate', 'mouse_click', { raise: true });
  }),
  awful.button([modkey], MouseButton.Left, (c) => {
    c.emit_signal('request::activate', 'mouse_click', { raise: true });
    awful.mouse.client.move(c);
  }),
  awful.button([modkey], MouseButton.Right, (c) => {
    c.emit_signal('request::activate', 'mouse_click', { raise: true });
    awful.mouse.client.resize(c);
  }),
);
