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

We could also put the inactive sheet data in the local storage and transfer it out when needed.

### Sockets

Currently, this is not possible to implement with the time constraints, and may be even too ambitious to attempt. A big benefit is that sockets allow multi-collaboration.

This lifts a lot of the heavy work on the client's machine as the bulk of the work handled by the server. With the server, browser constraints are removed, and full processing power and multi-threading might be possible to utilize. Need to research SSR, socketsk, ...

### Xlsx-populate

Currently, xlsx-populate is used for both input and output of files, which uses the following:

```txt
1. Upload file

- Convert file to Xlsx-populate then convert xlsx into base64

- Save the instance in the server

2. Open file

- Fetch the xlsx base 64 file

- Convert file from base 64 to Xlsx instance

- Extract data from the instance and use as states

3. Save file

- Convert states to Xlsx instance

- Convert Xlsx instance to base 64

4. Output the file

- Convert the xlsx-populate into an excel file, then output it
```

There is something wrong here, especially in step 2.

We do not need to convert Xlsx-populate when uploading to the server as that produces more calculations.

Possible implementation:

```txt
1. Upload file

- Convert file to Xlsx-populate instance

- Convert instance to state objects

- Serialize the object and save it to the server

2. Open file

- Fetch the serialized object from the server

- Deserialize the file and use as state

3. Save file

- Serialize the object state then save to the server

4. Output file

- Convert the object to an xlsx-instance

- Convert the xlsx-instance to an excel file

- Output the file
```
