localStorage.removeItem("chat");
localStorage.removeItem("message");
localStorage.removeItem("to");
localStorage.removeItem("group_messages");
localStorage.removeItem("token");
localStorage.removeItem("groupChat");
localStorage.removeItem("self");
let myForm = document.getElementById("login-form");

myForm.addEventListener("submit", login);

async function login(event) {
  event.preventDefault();

  let form = new FormData(myForm);
  let obj = {};
  for (const [key, value] of form) {
    obj[key] = value;
  }

  try {
    let res = await axios({
      method: "post",
      url: api + "user/login",
      data: obj,
    });

    if (res.status === 200) {
      let token = res.headers.token;
      localStorage.setItem("token", token);
      if (res.data.self) {
        localStorage.setItem("self", res.data.self);
      }
      alert("Login Done");

      window.location = "./friends.html";
    } else {
      alert(res.data.message);
    }
  } catch (err) {
    console.log(err);
  }
}
