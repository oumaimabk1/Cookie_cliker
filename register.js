
//registration method
import { register } from './Apicookies'

const form = document.getElementById("registration-form");
form.addEventListener("submit", async (event) => {
  event.preventDefault();
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const data = { name, email, password };
  await register(data)
});

