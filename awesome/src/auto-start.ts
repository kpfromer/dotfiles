import * as awful from "awful";

/**
 * Returns the program name without arguments.
 * converts something like "command --args" -> "command"
 * @param command The command to run with arguments. Like `picom --config /path -vf`
 */
function getProgramName(this: void, command: string): string {
  const firstSpace = command.indexOf(" ");

  const program = firstSpace >= 0 ? command.substring(0, firstSpace) : command;

  return program;
}

const runOnce = function (this: void, command: string) {
  const program = getProgramName(command);

  awful.spawn.easy_async_with_shell(
    `pgrep -u $USER -x ${program} > /dev/null || (${command})`,
    // string.format('pgrep -u $USER -x %s > /dev/null || (%s)', findMe, cmd),
    ({ stderr }) => {
      // if (!stderr || stderr === "" || !config.debug) {
      //   return;
      // }
      // message: stderr, // todo: stderr.replaceAll('%\n', ''),
      // logNotification(stderr, {
      //   app_name: "Start-up Applications",
      //   title: "<b>Oof! Error detected when starting an application!</b>",
      //   timeout: 20,
      //   icon: beautiful.awesome_icon,
      // });
    }
  );
};

export const launchApps = (apps: string[]) =>
  apps.forEach((command) => runOnce(command));
