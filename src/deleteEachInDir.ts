import del from 'del';

import { joinEachPath } from './joinEachPath';

export async function deleteEachInDir(dirPath: string, subpathNames: string[]) {
  await del(joinEachPath(dirPath, subpathNames), {
    force: true,
  });
}
