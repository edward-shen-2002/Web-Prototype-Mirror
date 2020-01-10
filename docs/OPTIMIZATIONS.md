# Optimizations

## Redux

### Set State

In many set states, the data is made "immutable" before and after the call for update.

For example,

Make data immutable: eg data = [ ...items ]

Call dispatch function: dispatch(update(data))

The update function is of the form: update = (data) = [ ...data ]

Two spread operators are being called twice, when it is only required once... Fix this in the future

### State Modularization

Event Listener is listening to too many state updates.

It's possible that we could categorize and shrink the amount of functions.

### Sockets

Currently, this is not possible to implement with the time constraints, and may be even too ambitious to attempt. A big benefit is that sockets allow multi-collaboration.

This lifts a lot of the heavy work on the client's machine as the bulk of the work handled by the server. With the server, browser constraints are removed, and full processing power and multi-threading might be possible to utilize. Need to research SSR, sockets, ...

### Excel scrolling

On click is blocked while scrolling. This might be possible to change if we adjust scrolling such that the scroll offset is by cell instead of the default behaviour.

[Known Issue and Solution](https://github.com/bvaughn/react-window/issues/128#issuecomment-460166682)

### React Window

[Scrolling Optimizaions](https://github.com/bvaughn/react-window/issues/43)
