import './polyfills';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from "./app.module";

// Tiny MCE plugins
import '../../node_modules/tinymce/tinymce.js';
import '../../node_modules/tinymce/themes/modern/theme.js';
import '../../node_modules/tinymce/plugins/advlist/plugin.js';
import '../../node_modules/tinymce/plugins/anchor/plugin.js';
import '../../node_modules/tinymce/plugins/autolink/plugin.js';
import '../../node_modules/tinymce/plugins/autoresize/plugin.js';
import '../../node_modules/tinymce/plugins/bbcode/plugin.js';
import '../../node_modules/tinymce/plugins/charmap/plugin.js';
import '../../node_modules/tinymce/plugins/code/plugin.js';
import '../../node_modules/tinymce/plugins/colorpicker/plugin.js';
import '../../node_modules/tinymce/plugins/contextmenu/plugin.js';
import '../../node_modules/tinymce/plugins/emoticons/plugin.js';
import '../../node_modules/tinymce/plugins/image/plugin.js';
import '../../node_modules/tinymce/plugins/link/plugin.js';
import '../../node_modules/tinymce/plugins/lists/plugin.js';
import '../../node_modules/tinymce/plugins/paste/plugin.js';
import '../../node_modules/tinymce/plugins/print/plugin.js';
import '../../node_modules/tinymce/plugins/preview/plugin.js';
import '../../node_modules/tinymce/plugins/table/plugin.js';

platformBrowserDynamic().bootstrapModule(AppModule);