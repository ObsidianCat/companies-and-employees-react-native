import { getAllUsers } from "../../../helpers";

export default async function users(root, args, { ctx }, info) {
  const users = await getAllUsers();
  return args.filter? users.filter((user)=>user.name.includes(args.filter)):users
}
