import { deleteEachInDir } from './deleteEachInDir';

export async function cleanNodeJsProject(pathname: string) {
  return deleteEachInDir(pathname, ['node_modules', '.next']);
}
