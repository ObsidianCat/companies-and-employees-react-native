import { getUser } from '../../../helpers';
import uuidBase62 from "uuid-base62";

export default async function user(root, { id }, { ctx }, info) {
  return getUser(uuidBase62.decode(id));
}
