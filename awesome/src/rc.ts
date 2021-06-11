import * as awful from 'awful';
import * as beautiful from 'beautiful';
import * as gears from 'gears';
import * as menubar from 'menubar';
import * as naughty from 'naughty';
import * as wibox from 'wibox';

import { AlignCross, AlignX, Index, MouseButton } from 'awesomewm.4.3.ts.d';
import { Client, Layout, Screen, Tag, tag } from 'awful';
import { Widget, layout } from 'wibox';
import { launchApps, range } from './utils';

import { SeparatorOrientation } from 'awesomewm.4.3.ts.d/awesomewm/wibox/widgets';
import { TextboxWidget } from 'awesomewm.4.3.ts.d/awesomewm/wibox/widgets/TextboxWidget';
import { config } from './config';
import { forall } from './predicates';
import { isSubset } from './set';
import { option } from './option';
import { table } from 'gears';
import theme from './theme/index';

const { modkey } = config;

const dpi = beautiful.xresources.apply_dpi;

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

function widgetData<
  T extends Widget,
  D extends Partial<Omit<T, 'children'>> & { children?: R[] },
  R,
>(data: D): { [k in string | Index]: unknown } & D {
  if (data.children) {
    const children = data.children;
    data.children = undefined;
    return gears.table.join(children, data);
  } else {
    return data;
  }
}

function setupWidget<T extends Widget, R>(
  widget: T,
): (data: Partial<Omit<T, 'children'>> & { layout?: Layout; children?: R[] }) => T {
  return (data) => {
    widget.setup(widgetData(data));
    return widget;
  };
}

function mkWidget<
  T extends Widget,
  D extends Partial<Omit<T, 'children'>> &
    ({ children?: R[]; widget: T } | { children?: R[]; layout: wibox.Layout }),
  R,
>(data: D): { [k in string | Index]: unknown } & D {
  return widgetData(data);
}

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

const myTextClock = wibox.container.margin(wibox.widget.textclock('%H:%M'), dpi(5), dpi(5));

const dateTooltip = awful.tooltip({
  objects: [myTextClock],
  timer_function: () => os.date('%A, %d %B %Y'),
});
dateTooltip.margins_leftright = dpi(10);
dateTooltip.margins_topbottom = dpi(5);

const taglistButtons = table.join<awful.Button<Tag>>(
  awful.button([], MouseButton.Left, (it) => it.view_only()),
  awful.button([modkey], MouseButton.Left, (it) =>
    option(client.focus).forEach((t) => t.move_to_tag(it)),
  ),
  awful.button([], MouseButton.Right, tag.viewtoggle),
  awful.button([modkey], MouseButton.Right, (it) =>
    option(client.focus).forEach((t) => t.toggle_tag(it)),
  ),
  awful.button([], MouseButton.ScrollDown, (it) => tag.viewnext(it.screen)),
  awful.button([], MouseButton.ScrollUp, (it) => tag.viewprev(it.screen)),
);

const tasklistButtons = table.join<awful.Button<Client>>(
  awful.button([], MouseButton.Left, (it) => {
    if (it == client.focus) {
      it.minimized = true;
    } else {
      it.emit_signal('request::activate', 'taglist', { raise: true });
    }
  }),
  awful.button([], MouseButton.Right, () => awful.menu.client_list({ theme: { width: 250 } })),
  awful.button([], MouseButton.ScrollUp, () => awful.client.focus.byidx(1)),
  awful.button([], MouseButton.ScrollDown, () => awful.client.focus.byidx(-1)),
);

const sep = () =>
  wibox.widget.separator({
    orientation: SeparatorOrientation.Vertical,
    forced_width: dpi(1),
  });

awful.screen.connect_for_each_screen((screen) => {
  awful.tag(
    range(1, 9).map((num) => num.toString(10)),
    screen,
    awful.layout.layouts[0],
  );

  gears.wallpaper.maximized(
    '/home/kpfromer/Pictures/ultra-wide/alberto-restifo-BNHcxk1CDdw-unsplash.jpg',
    screen,
  );

  const myPromptBox = awful.widget.prompt();
  screen.myPromptBox = myPromptBox;
  const myLayoutBox = awful.widget.layoutbox(screen);
  screen.myLayoutBox = myLayoutBox;
  myLayoutBox.buttons(
    table.join(
      awful.button([], MouseButton.Left, () => awful.layout.inc(1)),
      awful.button([], MouseButton.Right, () => awful.layout.inc(-1)),
      awful.button([], MouseButton.ScrollDown, () => awful.layout.inc(1)),
      awful.button([], MouseButton.ScrollUp, () => awful.layout.inc(-1)),
    ),
  );

  const myTagList = awful.widget.taglist({
    screen,
    buttons: taglistButtons,
    filter: awful.widget.taglist.filter.all,
    widget_template: mkWidget({
      id: 'background_role',
      children: [
        mkWidget({
          width: dpi(17),
          height: dpi(beautiful.wibar_height),
          strategy: wibox.containers.ConstraintStrategy.Exact,
          widget: wibox.container.constraint,
          children: [
            mkWidget({
              widget: wibox.widget.textbox,
              id: 'index_role',
            }),
          ],
        }),
      ],
      widget: wibox.container.background,
    }),
  });
  screen.myTagList = myTagList;
  const myTaskList = awful.widget.tasklist({
    screen,
    buttons: tasklistButtons,
    filter: awful.widget.tasklist.filter.currenttags,
    widget_template: mkWidget({
      id: 'background_role',
      children: [
        mkWidget({
          children: [
            mkWidget({
              children: [
                mkWidget({
                  left: dpi(7),
                  right: dpi(7),
                  top: dpi(7),
                  bottom: dpi(7),
                  children: [
                    mkWidget({
                      id: 'icon_role',
                      widget: wibox.widget.imagebox,
                    }),
                  ],
                  widget: wibox.container.margin,
                }),
                mkWidget({
                  id: 'text_margin_role',
                  children: [
                    mkWidget({
                      id: 'text_role',
                      widget: wibox.widget.textbox,
                    }),
                  ],
                  widget: wibox.container.margin,
                }),
              ],
              layout: wibox.layout.fixed.horizontal,
              fill_space: true,
            }),
          ],
          widget: wibox.container.place,
          halign: AlignX.Center,
        }),
      ],
      widget: wibox.container.background,
    }),
  });
  screen.myTaskList = myTaskList;

  const myWibox = awful.wibar({
    position: AlignCross.Top,
    screen,
    height: beautiful.wibar_height + beautiful.wibar_bottom_border_size,
  });
  screen.myWibox = myWibox;

  const systrayWidget = wibox.widget.systray();
  const [lSep, rSep] = [sep(), sep()];
  client.connect_signal('manage', () => updateTasklistBordersVisibility());
  client.connect_signal('unmanage', () => updateTasklistBordersVisibility());
  client.connect_signal('tagged', () => updateTasklistBordersVisibility());
  client.connect_signal('untagged', () => updateTasklistBordersVisibility());
  tag.attached_connect_signal(screen, 'property::selected', () =>
    updateTasklistBordersVisibility(),
  );
  tag.attached_connect_signal(screen, 'property::activated', () =>
    updateTasklistBordersVisibility(),
  );
  const updateTasklistBordersVisibility = () => {
    if (screen.selected_tags.flatMap((it) => it.clients()).length == 0) {
      lSep.visible = false;
      rSep.visible = false;
    } else {
      lSep.visible = true;
      rSep.visible = true;
    }
  };
  updateTasklistBordersVisibility();
  systrayWidget.set_base_size(theme.systray_icon_size);
  setupWidget(myWibox)({
    children: [
      mkWidget({
        children: [
          mkWidget({
            children: [
              mkWidget({
                children: [
                  wibox.container.margin(
                    layout.fixed.horizontal(myTagList, myPromptBox),
                    dpi(5),
                    dpi(5),
                  ),
                  wibox.layout.align.horizontal(lSep, myTaskList, rSep),
                  mkWidget({
                    children: [
                      awful.widget.only_on_screen(
                        wibox.container.margin(
                          systrayWidget,
                          dpi(5),
                          0,
                          theme.systray_icon_margin,
                          theme.systray_icon_margin,
                        ),
                      ),
                      // layoutSwitcher.wiboxWidget,
                      sep(),
                      myTextClock,
                      sep(),
                      myLayoutBox,
                    ],
                    layout: layout.fixed.horizontal,
                  }),
                ],
                layout: layout.align.horizontal,
              }),
            ],
            bg: beautiful.bg_normal,
            widget: wibox.container.background,
          }),
        ],
        widget: wibox.container.margin,
        bottom: beautiful.wibar_bottom_border_size,
      }),
    ],
    bg: beautiful.wibar_border_color,
    height: beautiful.wibar_height + beautiful.wibar_bottom_border_size,
    widget: wibox.container.background,
  });
});
