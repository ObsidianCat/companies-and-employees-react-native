import fs from 'fs';
import util from 'util';
const readFile = util.promisify(fs.readFile);

const readDir = util.promisify(fs.readdir);

export default async function() {
  const files = await readDir('./data/users');

  const usersResolved = await Promise.all(
    files
      .filter(filename => filename.includes('.json'))
      .map(filename => {
        return readFile(`./data/users/${filename}`, 'utf8');
      })
  );

  return usersResolved.map(user => JSON.parse(user));
}
