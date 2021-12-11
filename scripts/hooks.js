import { logger } from './logger.js';
import { settings } from './settings.js';
import { scripter } from './scripter.js';

logger.info("Initializing Module");
Hooks.on('init', settings.register);
Hooks.on('ready', scripter.execute_pack);
Hooks.on('getMacroDirectoryEntryContext', scripter.add_context);


/*
  TODO Fixes :
    Macro Execution => Async
    setting module builder => add
    settingsData => change how settings work
    change update scheme to mirror item/note macro

  TODO Ideas : 
    Add context menu to macro bar

  Update Notes :
    Fixed DB issue with the module not building the compendium if it wasn't there.
*/