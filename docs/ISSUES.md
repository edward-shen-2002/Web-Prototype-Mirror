# Issues

## Frontend PUBLIC_URL

Currently, the routing on the cloud does not work. If switched to Create-react-app, it will work.

## Async Subscription

Some components that have large resource requirements may not yet be set for unmounting.

## Responsiveness

TODO

## Xlsx-populate

- No support for saved multiple selection (use multiple selection then save the excel file). No work around at the moment.
- Hyperlink call crashes website

## Heavy Loads

Only heavy loads, the application hangs. We could use a web-worker to handle the processing in the background.

## React Window

Scrolling on the top left pane does not work (Could be absolute positioned ... Change to sticky!);

When the width/height of the frozen column/rows is greater than the dimension of the visisble window, the frozen area can be scrolled.

## Excel

- Default theme colours are hard-coded from excel (not really an issue if this never changes). It's possible that we could get the colours from Xlsx-populate and store it as a state: { ...appState, themes: { ... } }

## Context Menu

- Disable context menu on edit mode - probably need another state??

## Edit Input

- Currently, there are issues when input is dependent on sheet. We could put the input on the same level as sheet. Issue: Context menu sticks to edit input and produces bugs