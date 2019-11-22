# Optimizations

## Redux

In many set states, the data is made "immutable" before and after the call for update.

For example,

Make data immutable: eg data = [ ...items ]

Call dispatch function: dispatch(update(data))

The update function is of the form: update = (data) = [ ...data ]

Two spread operators are being called twice, when it is only required once... Fix this in the future
