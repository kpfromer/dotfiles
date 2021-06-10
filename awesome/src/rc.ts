import * as awful from 'awful';
import * as menubar from 'menubar';
import * as naughty from 'naughty';

import { launchApps, range } from './utils';

import { config } from './config';
import { table } from 'gears';

if (awesome.startup_errors) {
  naughty.notify({
    preset: naughty.config.presets.critical,
    title: 'Oops, there were errors during startup!',
    text: awesome.startup_errors,
  });
}

let in_error = false;
awesome.connect_signal('debug::error', (err) => {
  if (!in_error) {
    in_error = true;
    naughty.notify({
      preset: naughty.config.presets.critical,
      title: 'Oops, an error happened!',
      text: err.toString(),
    });
  }
});

launchApps(config.startupApps);

// Focus client on hover
client.connect_signal('mouse::enter', (it) => {
  if (awful.client.focus.filter(it)) {
    client.focus = it;
  }
});

awful.layout.layouts = config.layouts;
menubar.utils.terminal = config.apps.terminal;
awful.rules.rules = config.rules;
root.keys(table.join(config.global.keys, config.tags.keys));

awful.screen.connect_for_each_screen((screen) => {
  awful.tag(
    range(1, 9).map((num) => num.toString(10)),
    screen,
    awful.layout.layouts[0],
  );
});
