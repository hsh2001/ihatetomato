#!/usr/bin/env node


import { promises as fs } from 'fs';
import { homedir } from 'os';
import { join as joinPath } from 'path';

import del from 'del';

import { cleanFlutterProject, isFlutterProject } from './flutter';
import { cleanNodeJsProject } from './nodejs';

function cleanDir(pathname: string) {
  return Promise.all<unknown>([
    isFlutterProject(pathname).then((isFlutter) => {
      isFlutter && cleanFlutterProject(pathname);
    }),

    cleanNodeJsProject(pathname),
  ]);
}

async function cleanDirDeep(pathname: string, deep = 0) {
  const names = await fs.readdir(pathname);
  const pathnameList = names.map((name) => joinPath(pathname, name));

  for (const itemPathName of pathnameList) {
    if (
      [
        'ihatetomato',
        '.Trash',
        '.git',
        'iMovie',
        joinPath(pathname, 'Library'),
        joinPath(pathname, '.config'),
        joinPath(pathname, '.vscode'),
      ].some((ignorePattern) => itemPathName.includes(ignorePattern))
    ) {
      continue;
    }



    const stat = await fs.stat(itemPathName);

    if (stat.isDirectory()) {
      if (deep) {
        console.log(`clean ${itemPathName}`);
        await cleanDir(itemPathName);
      }

      try {
        await cleanDirDeep(itemPathName, deep + 1);
      } catch (error) {
        console.log(error);
      }
    }
  }
}

const homeDirPath = homedir();

console.log('delete cache items...');








del(
  [
    joinPath(homeDirPath, '.npm/_cacache'),
    joinPath(homeDirPath, '.gradle/caches'),
    joinPath(homeDirPath, '.pub-cache'),

  ],
  { force: true,  }
).then(() => {
  cleanDirDeep(homeDirPath);
});
