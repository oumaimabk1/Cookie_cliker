//login function
export const login = async (data) => {
  try {
    const response = await fetch("http://localhost:3000/auth/login", {
      method: "POST",
      body: JSON.stringify(data),
      headers: { "Content-Type": "application/json" },
    });
   
    if (response.ok) {
      const json = await response.json();
      
      //store token in local storage 
      window.localStorage.setItem('user', JSON.stringify(json.user));

      setTimeout(() => {
        window.location.href = './index.html';
      }, 1000)

    } else {
      throw new Error("Login failed");
    }
  } catch (error) {
    console.error(error);
  }
}

//register function

export const register = async (data) => {
  try {
    const response = await fetch("http://localhost:3000/auth/register", {
      method: "POST",
      body: JSON.stringify(data),
      headers: { "Content-Type": "application/json" },
    });
    if (response.ok) {
      //redirect to login page 
      alert('your are registred successfully')
      setTimeout(() => {
        window.location.href = './login.html';
      }, 2000)

    } else {
      throw new Error("Registration failed");
    }
  } catch (error) {
    console.error(error);
  }
}

//recuperer les multiplicateurs 
export const getMultiplicateur = async () => {
  const multiplicateur = await fetch("http://localhost:3000/multiplicateur");
  const multi = await multiplicateur.json();
  if (multi) {
    return multi
  } else {
    return []
  }
}




export const getOnePlayer = async (id) => {

  const player = await fetch("http://localhost:3000/players/" + id)
  const currentPlayer = await player.json();
  if (currentPlayer) {
    return currentPlayer
  } else {
    return null
  }
}

export const updatecurrentPlayer = async (score,multiplicateur) => {
  let palyer = window.localStorage.getItem("user");
  let currentPlayer = await getOnePlayer(JSON.parse(palyer).id)
  currentPlayer.score = score;
  currentPlayer.multiplicateur[0].map(el => {
   if(el._id === multiplicateur._id){
    el.cost *= 2;
    el.numberOfBuy +=1;
   }
  })
  await updateOnePlayer(currentPlayer)
  
}

export const updateOnePlayer = async (currentPlayer) => {

  const response = await fetch("http://localhost:3000/players/" + currentPlayer._id, {
      method: "PUT",
      body: JSON.stringify(currentPlayer),
      headers: { "Content-Type": "application/json" },
    });
    if(response){
    }else{
      console.log('no')
    }
}