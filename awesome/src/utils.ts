import * as awful from 'awful';

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
