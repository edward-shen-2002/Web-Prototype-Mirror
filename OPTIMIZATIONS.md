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

### Excel State

The active sheet is the only important item that's visible. The other sheet states are not being used and are just taking up space. We could compress/serialize the inactive sheets and only decompress/convert back to state when activated.
