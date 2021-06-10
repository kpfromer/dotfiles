import * as awful from 'awful';

import { Direction, ModifierKey } from 'awesomewm.4.3.ts.d';
import { filesystem as fs, table } from 'gears';
import { spawn, tag } from 'awful';

import { Screen } from 'awesomewm.4.3.ts.d/awesomewm/awful/screen';
import { config } from './config';
import { option } from './option';

const { modkey } = config;

export const globalKeys = table.join<awful.Key<Screen>>(
  awful.key<Screen>([modkey], 'Prior', tag.viewprev, {
    description: 'view previous',
    group: 'tag',
  }),
  awful.key<Screen>([modkey], 'Next', tag.viewnext, {
    description: 'view next',
    group: 'tag',
  }),
  awful.key<Screen>([modkey], 'Escape', tag.history.restore, {
    description: 'go back',
    group: 'tag',
  }),
  awful.key([modkey], 'Left', () => awful.client.focus.bydirection(Direction.Left), {
    description: 'focus left',
    group: 'client',
  }),
  awful.key([modkey], 'Right', () => awful.client.focus.bydirection(Direction.Right), {
    description: 'focus right',
    group: 'client',
  }),
  awful.key([modkey], 'Up', () => awful.client.focus.bydirection(Direction.Up), {
    description: 'focus up',
    group: 'client',
  }),
  awful.key([modkey], 'Down', () => awful.client.focus.bydirection(Direction.Down), {
    description: 'focus down',
    group: 'client',
  }),
  awful.key(
    [modkey, ModifierKey.Mod1],
    'Left',
    () => awful.client.swap.bydirection(Direction.Left),
    {
      description: 'swap with left client',
      group: 'client',
    },
  ),
  awful.key(
    [modkey, ModifierKey.Mod1],
    'Right',
    () => awful.client.swap.bydirection(Direction.Right),
    {
      description: 'swap with right client',
      group: 'client',
    },
  ),
  awful.key([modkey, ModifierKey.Mod1], 'Up', () => awful.client.swap.bydirection(Direction.Up), {
    description: 'swap with up client',
    group: 'client',
  }),
  awful.key(
    [modkey, ModifierKey.Mod1],
    'Down',
    () => awful.client.swap.bydirection(Direction.Down),
    {
      description: 'swap with down client',
      group: 'client',
    },
  ),
  awful.key(
    [modkey, ModifierKey.Control],
    'Left',
    () => awful.screen.focus_bydirection(Direction.Left, awful.screen.focused() as Screen),
    {
      description: 'focus left screen',
      group: 'screen',
    },
  ),
  awful.key(
    [modkey, ModifierKey.Control],
    'Right',
    () => awful.screen.focus_bydirection(Direction.Right, awful.screen.focused() as Screen),
    {
      description: 'focus right screen',
      group: 'screen',
    },
  ),
  awful.key(
    [modkey, ModifierKey.Control],
    'Up',
    () => awful.screen.focus_bydirection(Direction.Up, awful.screen.focused() as Screen),
    {
      description: 'focus up screen',
      group: 'screen',
    },
  ),
  awful.key(
    [modkey, ModifierKey.Control],
    'Down',
    () => awful.screen.focus_bydirection(Direction.Down, awful.screen.focused() as Screen),
    {
      description: 'focus down screen',
      group: 'screen',
    },
  ),
  awful.key(
    [modkey],
    'Tab',
    () => {
      awful.client.focus.history.previous();
      // option(client.focus).forEach((it) => it.raise());
    },
    { description: 'go back', group: 'client' },
  ),
  awful.key([modkey], 'Return', () => awful.spawn(config.apps.terminal), {
    description: 'open a terminal',
    group: 'launcher',
  }),
  awful.key([modkey, ModifierKey.Control], 'r', awesome.restart, {
    description: 'reload awesome',
    group: 'awesome',
  }),
  awful.key([modkey, ModifierKey.Shift], 'q', () => awesome.quit(), {
    description: 'quit',
    group: 'awesome',
  }),
  awful.key([modkey], '=', () => tag.incmwfact(0.05), {
    description: 'increase master width factor',
    group: 'layout',
  }),
  awful.key([modkey], '-', () => tag.incmwfact(-0.05), {
    description: 'decrease master width factor',
    group: 'layout',
  }),
  awful.key([modkey, ModifierKey.Shift], 'h', () => tag.incnmaster(1, null, true), {
    description: 'increase the number of master clients',
    group: 'layout',
  }),
  awful.key([modkey, ModifierKey.Shift], 'l', () => tag.incnmaster(-1, null, true), {
    description: 'decrease the number of master clients',
    group: 'layout',
  }),
  awful.key([modkey, ModifierKey.Control], 'h', () => tag.incncol(1, null, true), {
    description: 'increase the number of columns',
    group: 'layout',
  }),
  awful.key([modkey, ModifierKey.Control], 'l', () => tag.incncol(-1, null, true), {
    description: 'decrease the number of columns',
    group: 'layout',
  }),
  awful.key([modkey], 'space', () => awful.layout.inc(1), {
    description: 'select next',
    group: 'layout',
  }),
  awful.key([modkey, ModifierKey.Shift], 'space', () => awful.layout.inc(-1), {
    description: 'select previous',
    group: 'layout',
  }),
  awful.key(
    [modkey, ModifierKey.Control],
    'n',
    () =>
      option(awful.client.restore()).forEach((it) =>
        it.emit_signal('request::activate', 'key.unminimize', { raise: true }),
      ),
    { description: 'restore minimized', group: 'client' },
  ),
  // TODO: change to start ulauncher up and toggle
  awful.key([modkey], 'd', () => spawn('ulauncher'), {
    description: 'run prompt',
    group: 'launcher',
  }),
  awful.key(
    [modkey],
    'x',
    () =>
      option(awful.screen.focused()).forEach((it) =>
        awful.prompt.run({
          prompt: 'Run Lua code: ',
          textbox: it.myPromptBox.widget,
          exe_callback: awful.util.eval,
          history_path: `${fs.get_cache_dir()}/history_eval`,
        }),
      ),
    { description: 'lua execute prompt', group: 'awesome' },
  ),
  awful.key([modkey], 'p', () => spawn('rofi -show combi'), {
    description: 'show the menubar',
    group: 'launcher',
  }),
  awful.key([modkey], 'w', () => spawn('google-chrome-stable')),
  awful.key(
    [modkey],
    'u',
    () =>
      option(mouse.current_client).forEach((it) =>
        it.emit_signal('request::activate', 'undermouse', { raise: false }),
      ),
    {
      description: 'focus client under mouse',
      group: 'client',
    },
  ),
);
