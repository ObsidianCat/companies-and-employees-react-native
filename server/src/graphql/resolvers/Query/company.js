import { getCompany } from '../../../helpers';
import getAllUsers from "../../../helpers/user/getAllUsers";

export default async function company(root, args, { ctx }, info) {
  ctx.users = await getAllUsers()

  return getCompany(args.id);
}
