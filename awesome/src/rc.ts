import * as awful from 'awful';
import * as menubar from 'menubar';
import * as naughty from 'naughty';

import { launchApps, range } from './utils';

import { config } from './config';
import { globalKeys } from './global';
import { table } from 'gears';
import { tagKeys } from './tags';

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

awful.rules.rules = [
  {
    rule: {},
    properties: {
      // border_width: beautiful.border_width,
      // border_color: beautiful.border_normal,
      focus: awful.client.focus.filter,
      raise: true,
      keys: config.client.keys,
      buttons: config.client.buttons,
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
];

root.keys(globalKeys);

root.keys(table.join(globalKeys, tagKeys));

awful.screen.connect_for_each_screen((screen) => {
  awful.tag(
    range(1, 9).map((num) => num.toString(10)),
    screen,
    awful.layout.layouts[0],
  );
});
