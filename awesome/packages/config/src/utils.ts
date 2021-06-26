import * as awful from 'awful';

import { ModifierKey, MouseButton } from 'awesomewm.4.3.ts.d';

import { Client } from 'awful';
import { option } from './option';
import { table } from 'gears';

/**
 * Returns the program name without arguments.
 * converts something like "command --args" -> "command"
 * @param command The command to run with arguments. Like `picom --config /path -vf`
 */
function getProgramName(this: void, command: string): string {
  const firstSpace = command.indexOf(' ');

  const program = firstSpace >= 0 ? command.substring(0, firstSpace) : command;

  return program;
}

const runOnce = function (this: void, command: string) {
  const program = getProgramName(command);

  awful.spawn.easy_async_with_shell(
    `pgrep -u $USER -x ${program} > /dev/null || (${command})`,
    () => {},
  );
};

export const launchApps = (apps: string[]) => apps.forEach((command) => runOnce(command));

export function range(start: number, endInclusive: number, step = 1): number[] {
  const result = [];
  for (let i = start; i <= endInclusive; i += step) {
    result.push(i);
  }
  return result;
}

export interface KeyItem<T> {
  modifiers: ModifierKey[];
  key: string;
  onPress?: (this: void, item: T) => any;
  onRelease?: (this: void, item: T) => any;
  description?: string;
}

export interface KeyGroups<T> {
  group: string;
  keys: KeyItem<T>[];
}

const emptyFn = () => {};

export function buildKeys<TType>(keyGroups: KeyGroups<TType>[]): awful.Key<TType>[] {
  const keys = keyGroups.flatMap(({ group, keys }) =>
    keys.map(({ modifiers, key, onPress, onRelease, description }) =>
      awful.key<TType>(modifiers, key, onPress ?? emptyFn, onRelease ?? emptyFn, {
        group,
        description,
      }),
    ),
  );

  return table.join<awful.Key<TType>>(...keys);
}

export interface ButtonItem<T> {
  modifiers: ModifierKey[];
  button: MouseButton;
  onPress?: (this: void, item: T) => any;
  onRelease?: (this: void, item: T) => any;
}

export function buildButtons<TType>(buttons: ButtonItem<TType>[]): awful.Button<TType>[] {
  const mapped = buttons.map(({ modifiers, button, onPress, onRelease }) =>
    awful.button<TType>(modifiers, button, onPress ?? emptyFn, onRelease ?? emptyFn),
  );

  return table.join<awful.Button<TType>>(...mapped);
}

function centerCursor(client: Client) {
  const { x, y, width, height } = client.geometry();
  mouse.coords({
    x: x + width / 2,
    y: y + height / 2,
  });
}

export function moveCursorToFocus(): void {
  option(client.focus).andThen(centerCursor);
}

export function moveCursorToClient(client: Client): void {
  centerCursor(client);
}

export function moveTagDirection(direction: 'left' | 'right'): void {
  const screen = awful.screen.focused();
  if (screen !== null) {
    const { selected_tag, tags } = screen;
    if (selected_tag !== null) {
      // Lua is base one
      const currPos = selected_tag.index - 1;

      if (direction === 'left') {
        tags[currPos === 0 ? tags.length - 1 : currPos - 1].view_only();
      } else {
        tags[currPos === tags.length - 1 ? 0 : currPos + 1].view_only();
      }
    }
  }
}
