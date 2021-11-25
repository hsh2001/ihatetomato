import { join as joinPath } from 'path';

import { deleteEachInDir } from './deleteEachInDir';
import { isFileOrDirExist } from './isFileOrDirExist';

export async function isFlutterProject(pathname: string) {
  return await isFileOrDirExist(
    joinPath(pathname, '.flutter-plugins'),
    joinPath(pathname, '.flutter-plugins-dependencies')
  );
}

export function cleanFlutterProject(pathname: string) {
  return deleteEachInDir(pathname, [
    '.flutter-plugins',
    '.flutter-plugins-dependencies',
    '.dart_tool',
    '.packages',
    '.pub-cache',
    'build',
    'ios/.symlinks',
    'ios/Pods',
    'android/.gradle',
  ]);
}
