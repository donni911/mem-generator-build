// Основний модуль
import gulp from 'gulp';
// Імпорт шляхів
import { path } from "./gulp/config/path.js"

import { plugins } from "./gulp/config/plugins.js"
// Передаємо значення в глобальну змінну
global.app = {
    isBuild: process.argv.includes('--build'),
    isDev: !process.argv.includes('--build'),
    path: path,
    gulp: gulp,
    plugins: plugins
}
// Імпорт задач
//копіює
import { copy } from './gulp/tasks/copy.js';
//видаляє
import { reset } from './gulp/tasks/reset.js';
import { html } from './gulp/tasks/html.js';
import { server } from './gulp/tasks/server.js';
import { scss } from './gulp/tasks/scss.js';
import { js } from './gulp/tasks/js.js';
import { images } from './gulp/tasks/images.js';
import { otfToTtf, ttfTowoff, fontsStyle } from './gulp/tasks/fonts.js';
import { svgSprive } from './gulp/tasks/svgSprive.js';

import { zip } from './gulp/tasks/zip.js';
import { ftp } from './gulp/tasks/ftp.js';


// Спостерігач за файлами
function watcher() {
    gulp.watch(path.watch.files, copy)
    gulp.watch(path.watch.html, html)
    gulp.watch(path.watch.scss, scss)
    gulp.watch(path.watch.js, js)
    gulp.watch(path.watch.images, images)

}

export { svgSprive }

const fonts = gulp.series(otfToTtf, ttfTowoff, fontsStyle);
const mainTasks = gulp.series( gulp.parallel(copy, html, scss, js, images))
// постройка сценаріїв якшо змінюються файли
const dev = gulp.series(reset, mainTasks, gulp.parallel(watcher, server));
const build = gulp.series(reset, mainTasks);
const deployZIP = gulp.series(reset, mainTasks, zip);
const deployFTP = gulp.series(reset, mainTasks, ftp);
export { dev }
export { build }
export { deployFTP }
export { deployZIP }
// те що відбувається по дефолту
gulp.task('default', dev)