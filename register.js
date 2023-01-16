//registration method
import { register } from './Apicookies'

const form = document.getElementById("registration-form");
form.addEventListener("submit", async (event) => {
  event.preventDefault();
  const username = document.getElementById("username").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const data = { username, email, password };
  await register(data)
});

