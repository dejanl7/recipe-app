import './polyfills';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from "./app.module";

// Tiny MCE plugins
import '../../node_modules/tinymce/tinymce.js';
import '../../node_modules/tinymce/themes/modern/theme.js';
import '../../node_modules/tinymce/plugins/charmap/plugin.js';
import '../../node_modules/tinymce/plugins/colorpicker/plugin.js';
import '../../node_modules/tinymce/plugins/contextmenu/plugin.js';
import '../../node_modules/tinymce/plugins/emoticons/plugin.js';
import '../../node_modules/tinymce/plugins/image/plugin.js';
import '../../node_modules/tinymce/plugins/imagetools/plugin.js';
import '../../node_modules/tinymce/plugins/link/plugin.js';
import '../../node_modules/tinymce/plugins/lists/plugin.js';
import '../../node_modules/tinymce/plugins/table/plugin.js';

platformBrowserDynamic().bootstrapModule(AppModule);