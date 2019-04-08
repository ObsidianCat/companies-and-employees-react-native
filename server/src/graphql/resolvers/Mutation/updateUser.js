import {getUser} from '../../../helpers';
import { UserInputError } from 'apollo-server-koa';
import fs from 'fs';
import util from 'util';
import uuidBase62 from "uuid-base62";
const writeFile = util.promisify(fs.writeFile);

export default async function (root, { user }, { ctx }, info) {
  try{
    const decodedId = uuidBase62.decode(user.id)
    const userFromDb = await getUser(decodedId)
    const updatedUser = Object.assign(userFromDb, user, {id:decodedId})
    await writeFile(`./data/users/${decodedId}.json`, JSON.stringify(updatedUser));

    return updatedUser
  } catch (e) {
    throw new UserInputError(e)
  }
}
