import * as awful from 'awful';
import * as beautiful from 'beautiful';
import * as menubar from 'menubar';
import * as naughty from 'naughty';

import { Client, Screen } from 'awful';
import { launchApps, range } from './utils';

import { config } from './config';
import { forall } from './predicates';
import { isSubset } from './set';
import { option } from './option';
import { table } from 'gears';
import theme from './theme/index';

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

beautiful.init(theme);

launchApps(config.startupApps);

// Signals

// Focus client on hover
client.connect_signal('mouse::enter', (it) => {
  if (awful.client.focus.filter(it)) {
    client.focus = it;
  }
});

const canBeVisibleTogether = (a: Client, b: Client) => {
  return isSubset(a.tags(), b.tags()) || isSubset(b.tags(), a.tags());
};
const neighborsAndSelfFor = (it: Client) => {
  const clients = (it.screen as Screen).clients;
  return clients.filter((t) => canBeVisibleTogether(it, t));
};

const updateBorders = (it: Client) => {
  const neighbors = neighborsAndSelfFor(it);
  if (neighbors.length > 1) {
    const allDontNeedBorders = forall(
      neighbors,
      (it) =>
        it.floating ||
        it.fullscreen ||
        it.maximized ||
        [
          awful.layout.suit.floating,
          awful.layout.suit.max,
          awful.layout.suit.max.fullscreen,
        ].includes(it.first_tag.layout),
    );

    if (allDontNeedBorders) {
      neighbors.forEach((t) => {
        t.border_width = 0;
      });
    } else {
      neighbors.forEach((t) => {
        t.border_width = option(theme.border_width).getOrElse(0);
      });
    }
  } else {
    it.border_width = 0;
  }
};

client.connect_signal('unmanage', (it) => updateBorders(it));
client.connect_signal('unmanage', () =>
  option(mouse.current_client).forEach((it) =>
    it.emit_signal('request::activate', 'previousclientclosed', { raise: false }),
  ),
);
client.connect_signal('tagged', (it) => updateBorders(it));
client.connect_signal('untagged', (it) => updateBorders(it));
client.connect_signal('property::floating', (it) => updateBorders(it));
client.connect_signal('property::maximized', (it) => updateBorders(it));
client.connect_signal('property::fullscreen', (it) => updateBorders(it));

// Setup

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
