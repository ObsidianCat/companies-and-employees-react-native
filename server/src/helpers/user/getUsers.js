import {getUser} from "..";

export default async function(ids){
  let listOfUsers = [];

  if (ids) {
    listOfUsers = ids.map(id => getUser(id));
  }

  return listOfUsers;
}
