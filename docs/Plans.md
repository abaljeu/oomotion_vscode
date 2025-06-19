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
* [x] Date:   May 27 15:07 229ee6c9da633cd9a8c876f06d5a2f3748750f21
  Output formatted package.json
* [x] Date:   May 27 14:58 736c4e5586913898b6c98665cf287771a79464f8
  Profile-isolation for debugging.
* [ ] Date:   May 27 13:45 995bf2eb38af1ba5b446949b2c05c73b71083f86
  Remove circular dependencies by separating out action, actionList and types.ts.
* [x] Date:   May 27 13:09 8fbe09ecb2a06530e450aa6bfd6a3d8037ab6cf5
  Isolated launch environment
* [ ] Date:   May 27 12:39 4195992af3a2b4108bc693034dab030ad9600384
  BUILD isnt quite correct as we have a dependency of vscode.  So
  currently to build the package-json, you have to use VSCode F5.
* [x] Date:   May 27 12:30 144de6e346147c2affa43a8ff8d2df396db3c28e
  Improving json settings.

## From Before

* [ ] Date:   Dec 27 15:31 c5f5136c8b284b82701fb9b745e219069c118057
  0.0.3
* [ ] Date:   Dec 27 15:15 b80dac428ab57869b5af247ed7edc955a2ab226e
  0.0.3
* [ ] Date:   Dec 17 12:09 e830500047594e3ce79be2a82f6b475f8363d4a0
  Merge pull request #16 from thuris/patch-1

Update README.md

* [ ] Date:   Dec 17 12:09 c8d4f1c7520d61760f8a691b36ff92441031424c
  Merge pull request #18 from jkelleyrtp/jk/fix-jump-file

Fix file jumping into undefined editors.

* [ ] Date:   Dec 17 12:01 6cc5035556dc8dafdc458c87d677274b9fd45b6d
  Update README.md
* [ ] Date:   Feb 15 05:32 7f46c6a25000bc512b3836c222d705171a015498
  Update README.md
* [ ] Date:   Feb 15 05:26 75c110dd97ec90b7a2ae1da49d70c15c5afcd845
  Update README.md
* [ ] Date:   Jul 1 13:35 3a7670bfab8a8861212e97d19ac71e7f1242a111
  Undo some extra handling
* [ ] Date:   Jul 1 13:34 082cd8ea2dbf775b48981fccfae26598e38c4495
  Fix file jumping
* [ ] Date:   Jan 25 10:42 7fd859669ece40ec74fe9f1a2c6ccfac2c10ebbb
  Update README.md

Makes use of "state" vs "mode" consistent, and clarifies how to switch between states.

* [ ] Date:   Nov 3 03:47 5bf85892790bfd66311a646c423c3ef301baa89c
  Make j k configurable.
* [ ] Date:   Nov 3 03:07 414030cfc4f31373cc9d88d0efc52a4c06b59454
  State change commands.
* [ ] Date:   Oct 11 15:11 0997069667e594e2db90e7d39cd71a2626794acc
  Fix bugs when user use mouse.
* [ ] Date:   Sep 13 00:32 598edd0c442f7648e542d7ff6cf351c5058264a9
  Optimize `Move Up/Down` in `word` mode. Add a icon and keywords
* [ ] Date:   Sep 10 22:21 2c8c464642db7f538b9d98f6888776ae49ddf28c
  Add a gif image to README.md.
* [ ] Date:   Sep 10 22:19 8ec765bfc404393e60ee94add033b527225039e6
  Add a large git image manually.
* [X] Date:   Sep 10 22:14 3730a7ac98a2a10dfe9f66d5bf6f45dac99a0453
  initial commit
