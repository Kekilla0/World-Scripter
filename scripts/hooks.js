import { logger } from './logger.js';
import { settings } from './settings.js';
import { scripter } from './scripter.js';

logger.info("Initializing Module");

//CONFIG.debug.hooks = true;

Hooks.on('init', settings.register);
Hooks.on('ready', scripter.execute_pack);
Hooks.on('getMacroDirectoryEntryContext', (html, options) =>scripter.add_context("MacroDirectory", options));
Hooks.on('getHotbarEntryContext', (html, options) => scripter.add_context("HotBar", options));


/*
  TODO Fixes :
    Macro Execution => Async
    setting module builder => add
    settingsData => change how settings work
    change update scheme to mirror item/note macro

  TODO Ideas : 

  Update Notes : 
    Added context menu to macro hot bar
    Updated compatibility for 9.X
*/