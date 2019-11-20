# History - Redo and Undo

The issue when working with Xlsx-populate workbook instance and react redux is that they are two different modules which are not initially compatible.

When implementing redux redo/undo, Xlsx-populate will have to be directly computed at each step which causes tedious calculations and is simply impractical (There might be great ways to solve this, which I have not found yet).

However, we can represent the Xlsx-populate workbook as states. With this we will have no issue with redo and undo.

If we need the xlsx instance, we use the state to create the instance or output the file.
