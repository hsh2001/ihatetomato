import { promises as fs } from 'fs';

export async function isFileOrDirExist(...pathnameList: string[]) {
  if (pathnameList.length == 0) {
    return false;
  }

  if (pathnameList.length == 1) {
    try {
      await fs.stat(pathnameList[0]);
      return true;
    } catch {
      return false;
    }
  }

  for (const pathname of pathnameList) {
    if (await isFileOrDirExist(pathname)) {
      return true;
    }
  }

  return false;
}
