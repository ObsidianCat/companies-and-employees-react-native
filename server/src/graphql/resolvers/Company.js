import { getAllUsers } from '../../helpers';

export default {
  employees: async (root, args, { ctx }, info) => {
    let employees = [];
    if (ctx.users) {
      employees = ctx.users.filter(user => {
        return user.company === root.id;
      });
    }

    return employees;
  }
};
