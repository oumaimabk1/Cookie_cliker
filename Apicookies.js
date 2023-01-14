

//login function
export const login = async (data) =>{
    try {
        const response = await fetch("http://localhost:3000/auth/login", {
          method: "POST",
          body: JSON.stringify(data),
          headers: { "Content-Type": "application/json" },
        });
        console.log(response)
        if (response.ok) {
          const json = await response.json();
          //store token in local storage 
          localStorage.setItem('token', json.token);
          //redirect to home page 
          alert('you are logged in')
          setTimeout(()=>{
            window.location.href = '/index.html';
          },1000)
          
        } else {
          throw new Error("Login failed");
        }
      } catch (error) {
        console.error(error);
      }
}

//register function

export const register = async (data)=>{
    try {
      const response = await fetch("http://localhost:3000/auth/register", {
        method: "POST",
        body: JSON.stringify(data),
        headers: { "Content-Type": "application/json" },
      });
      console.log(response)
      if (response.ok) {
        //redirect to login page 
        alert('your are registred successfully')
        setTimeout(()=>{
          window.location.href = './login.html';
        },2000)
        
      } else {
        throw new Error("Registration failed");
      }
    } catch (error) {
      console.error(error);
    }
}