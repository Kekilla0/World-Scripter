import { logger } from './logger.js';
import { settings } from './settings.js';
import { scripter } from './scripter.js';

logger.info("Initializing Module");
Hooks.on('init', settings.register);
Hooks.on('ready', scripter.execute_pack);
Hooks.on('getMacroDirectoryEntryContext', scripter.add_context);


/*
  Fixes :
    Macro Execution => Async
    setting module builder => add
    settingsData => change how settings work
    change update scheme to mirror item/note macro

  Ideas : 
    Add context menu to macro bar
*/