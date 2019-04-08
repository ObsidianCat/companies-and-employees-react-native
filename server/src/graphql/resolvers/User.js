import { getCompany }from "../../helpers";
import { getUsers } from "../../helpers";
import uuidBase62 from 'uuid-base62';

export default {
  id: (root, args, { ctx }, info) => {
    return uuidBase62.encode(root.id)
  },
  friends: async (root, args, { ctx }, info) => {
    return getUsers(root.friends);
  },
  company: async (root, args, { ctx }, info) => {
    if(root.company){
      return getCompany(root.company)
    }
  },
};
