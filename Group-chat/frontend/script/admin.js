let addFriends = document.getElementById("admin-add-friend");

let removeFriends = document.getElementById("admin-remove-friend");

window.addEventListener("DOMContentLoaded", loadFriends);

async function loadFriends() {
  let id = localStorage.getItem("groupChat");
  try {
    let res = await axios({
      method: "get",
      url: api + "group/friends/list?id=" + id,
    });

    let friends =
      res.data.data.notFriends != undefined ? res.data.data.notFriends : [];

    let notFriends =
      res.data.data.friends != undefined ? res.data.data.friends : [];

    // Add Friends
    let addFriendsBody = "";
    for (const friend of friends) {
      let tr = ` <tr>
        <td>${friend.name}</td>
        <td><button class="btn btn-primary" value="${friend.id}" onclick="addUser(this)">Add</button></td>
      </tr>`;

      addFriendsBody += tr;
    }
    let addFriendsStructure = `
                        <thead>
                        <th>Friend</th>
                        <th>Add</th>
                        <th>Admin</th>
                    </thead>
                    <tbody>
                        ${addFriendsBody}
                    </tbody>`;

    addFriends.innerHTML = addFriendsStructure;

    // Remove Friend Body

    let removeFriendsBody = "";
    for (const friend of notFriends) {
      let isAdmin = `<td><button class="btn btn-primary" value="${friend.user.id}" onclick="modifyAdmin(this)">Add Admin</button></td>`;
      console.log(friend);
      if (friend.isAdmin === true) {
        isAdmin = `<td><button class="btn btn-danger" value="${friend.user.id}" onclick="modifyAdmin(this)">Remove Admin</button></td>`;
      }

      let tr = ` <tr>
        <td>${friend.user.name}</td>
        <td><button class="btn btn-danger" value="${friend.user.id}" onclick="removeUser(this)">Remove</button></td>
        ${isAdmin}
      </tr>`;

      removeFriendsBody += tr;
    }
    let removeFriendsStructure = `
                        <thead>
                        <th>Friend</th>
                        <th>Remove</th>
                        <th>Admin</th>
                    </thead>
                    <tbody>
                        ${removeFriendsBody}
                    </tbody>`;

    removeFriends.innerHTML = removeFriendsStructure;
  } catch (err) {
    console.log(err);
  }
}

async function removeUser(event) {
  let id = event.value;
  let gId = localStorage.getItem("groupChat");
  try {
    let res = await axios({
      method: "delete",
      url: api + "group/friends/remove",
      data: { groupId: gId, userId: id },
    });

    if (res) {
      window.location.reload();
    }
  } catch (err) {
    console.log(err);
  }
}

async function addUser(event) {
  let id = event.value;
  let gId = localStorage.getItem("groupChat");
  try {
    let res = await axios({
      method: "post",
      url: api + "group/friends/add",
      data: { groupId: gId, userId: id },
    });

    if (res) {
      window.location.reload();
    }
  } catch (err) {
    console.log(err);
  }
}

async function modifyAdmin(event) {
  let id = event.value;
  let gId = localStorage.getItem("groupChat");
  try {
    let res = await axios({
      method: "put",
      url: api + "group/admin/modify/",
      data: { groupId: gId, userId: id },
    });

    if (res) {
      window.location.reload();
    }
  } catch (error) {
    console.log(error);
  }
}
