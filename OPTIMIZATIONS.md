# Optimizations

## Redux

### Set State

In many set states, the data is made "immutable" before and after the call for update.

For example,

Make data immutable: eg data = [ ...items ]

Call dispatch function: dispatch(update(data))

The update function is of the form: update = (data) = [ ...data ]

Two spread operators are being called twice, when it is only required once... Fix this in the future

### State Listener

We can directly fetch sheet data by doing sheetData[ activeSheetName ]

### State Modularization

Event Listener is listening to too many state updates.

It's possible that we could categorize and shrink the amount of functions.

## Cell Height and Width

For many functions, we use the _getItemStyle(y, x) method to get the top, left, height, and width of the cell.

We already have height and width provided for us in the redux store.

We can use a simple sum function to get top and left.

This way, we don't rely on the method, which may be costly to perform (unsure).

We also do not have to rely on the sheet ref as a result.

## Excel Appbar

Since we're using popper, which can be moved anywhere, its possible that we can have one popper instead of one every menu
