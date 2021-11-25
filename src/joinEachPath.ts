import { join as joinPath } from 'path';

export function joinEachPath(dirname: string, subpathNames: string[]) {
  return subpathNames.map((pathname) => joinPath(dirname, pathname));
}
