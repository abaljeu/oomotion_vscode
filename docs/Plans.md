# Plans

- oom directory, oom2 is a clone of this.  It's useful to there look at `backup-before-reset` branch, for changes to be brought into here.
- from that branch I want to carefully bring forward changes.

## C:\dev\opens\oomotion_vscode>git log backup-before-reset

* [ ] Date:   Jun 9 17:02 599e554aac55bb604399f7d128b035991a10a45f
  add keymap
* [ ] Date:   Jun 9 17:01 d3611e061d06783c504b4c69b876e7e0e7055bf5
  Fix toolbar handling when switching modes.
* [ ] Date:   Jun 9 16:13 42bf2458cef6ee76d596c293fb58fa75d38b25ca
  editordata: showing before and after extensions in the current (scope/mode) scale.
  parsing: allow editor to work on filetypes not in the collection of parsers.
* [ ] Date:   Jun 5 12:10 6d8f16b20315e66581d50d3fc6f4499a0530f0bd
  Refactoring selectionsToObjects
* [ ] Date:   Jun 5 11:45 4eae045c308fa372d6a5e56a4e4d0a1c0602d826
  Refactoring mode setup
* [ ] Date:   Jun 4 14:13 5acb57384b82e144ed0d237c8c6ac72a57fb8f30
  Change: mode switch doesn't immediately affect selection.
  Refactor: eliminate move() in the derived classes, as it's now the same everywhere.
* [ ] Date:   Jun 4 13:03 df32d8d78475a2a70ba468ae34af60f773767db5
  Refactored down and upward out.  Testing shows `s` search not behaving.
* [ ] Date:   Jun 4 12:52 272dd84135e87edfa028de3dde0e10caba3ae936
  Refactoring make a leftward and rightward.
* [ ] Date:   Jun 4 11:16 9a8af975315797a599487484f953e9ecfa0bf925
  Refactor: introduce leftward and rightward common functions.
* [ ] Date:   Jun 3 16:37 aecd723f1bafa9cd2a76bbfbdcd17ee6524b3343
  Fix the border drawing function
* [ ] Date:   Jun 3 15:03 049b1977643a30826aecd4b50bf8d97a2695010d
  refactor
* [ ] Date:   Jun 3 14:59 990516b75ecfa47ed3334486bed74f41af83e801
  initial test boxing stuff
* [ ] Date:   Jun 3 14:23 28cc48c91dbd1bb6a3f1515e0ef46a8cb8c4c1fb
  experimental decoration code.
  fix yank compiling, in utils.
* [ ] Date:   Jun 3 13:31 44f4f8b9c38de11d64e59ecb1bd9f5b9967a12f4
  oomotion_overview
* [ ] Date:   Jun 3 12:50 3889a37cd4d88db3e7ffbb3d672ab9677a60a228
  AI generated study of the software.
* [ ] Date:   May 27 16:10 a0e4245fa05dae4ec11fc1909d8fb853f9f5c74f
  introduce utility function
* [ ] Date:   May 27 15:54 5b5c0436b79eda04049e74e6f71b62f2906928cb
  Improve position of cursor after delete operation.  If cursor was
  modified by other means.
* [ ] Date:   May 27 15:49 d91ab88f6981f2a5e5268a53884fd380c60e2e66
  undo last
* [ ] Date:   May 27 15:27 ff4b967d3499a59c12f8d43c88ebad4c928f35ce
  correction
* [ ] Date:   May 27 15:26 54722bc4e9ac2197a1cc74fbf7ba1edd95b31bf6
  Implement visible j for the jk modeswap.
* [ ] Date:   May 27 15:07 229ee6c9da633cd9a8c876f06d5a2f3748750f21
  Output formatted package.json
* [ ] Date:   May 27 14:58 736c4e5586913898b6c98665cf287771a79464f8
  Profile-isolation for debugging.
* [ ] Date:   May 27 13:45 995bf2eb38af1ba5b446949b2c05c73b71083f86
  Remove circular dependencies by separating out action, actionList and types.ts.
* [ ] Date:   May 27 13:09 8fbe09ecb2a06530e450aa6bfd6a3d8037ab6cf5
  Isolated launch environment
* [ ] Date:   May 27 12:39 4195992af3a2b4108bc693034dab030ad9600384
  BUILD isnt quite correct as we have a dependency of vscode.  So
  currently to build the package-json, you have to use VSCode F5.
* [ ] Date:   May 27 12:30 144de6e346147c2affa43a8ff8d2df396db3c28e
  Improving json settings.

## Original

* Date:   Dec 27 2024 15:31 c5f5136c8b284b82701fb9b745e219069c118057
  0.0.3
