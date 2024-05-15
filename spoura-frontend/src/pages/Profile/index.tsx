import { useEffect, useState } from "preact/hooks";
import { UserProp } from "../../components/types";
import { TargetedEvent } from "preact/compat";
import { getCookiesWithValue } from "../../components/Auth";
import brand from "../../assets/banner-right-image.png";

export default function Profile({user, setuser}: UserProp) {

  const [isLogin, setIsLogin] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");


  const [order, setOrder] = useState([]);
  if (user.Email && user.Email !== "null") {
    useEffect(() => {
      fetch("https://spoura-go-api.vercel.app/api/user/order", (
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },  
          body: JSON.stringify({
            email: "abc",
            password: "abc",
            session: getCookiesWithValue("spoura_session")
          })
        }
      ))
      .then((response) => response.json())
      .then((data) => {
        setOrder(data);
      })
      .catch((error) => {
        console.error(error);
      });
    }, []);
  }

  const [signupEmail, setSignupEmail] = useState("");
  const [signupPassword, setSignupPassword] = useState("");
  const [signupConfirmPassword, setSignupConfirmPassword] = useState("");
  const HandleSignup = (e: TargetedEvent) => {
    e.preventDefault();
    if (signupPassword !== signupConfirmPassword) {
      setErrorMessage("Passwords do not match");
    }
    // Request to signup endpoint with email, password, and confirm password
    fetch("https://spoura-go-api.vercel.app/api/user/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },  
      body: JSON.stringify({
        email: signupEmail,
        password: signupPassword,
        session: getCookiesWithValue("spoura_session")
      }),
    })
    .then((response) => response.text())
    .then((data) => {
      if (data === "Signed up.") {
        location.reload();
      } else {
        setErrorMessage(data);
      }
    })
    .catch((error) => {
      console.error(error);
    });
  }

  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const HandleLogin = (e: TargetedEvent) => {
    e.preventDefault();
    // Request to login endpoint with email and password
    fetch("https://spoura-go-api.vercel.app/api/user/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },  
      body: JSON.stringify({
        email: loginEmail,
        password: loginPassword,
        session: getCookiesWithValue("spoura_session")
      })
    })
    .then((response) => response.text())
    .then((data) => {
      if (data === "Logged in.") {
        location.reload();
      } else {
        setErrorMessage(data);
      }
    })
    .catch((error) => {
      console.error(error);
    });
  }

  const HandleLogout = (e: TargetedEvent) => {
    e.preventDefault();
    // Request to login endpoint with email and password
    fetch("https://spoura-go-api.vercel.app/api/user/logout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },  
      body: JSON.stringify({
        email: "xyz",
        password: "xyz",
        session: getCookiesWithValue("spoura_session")
      })
    })
    .then((response) => response.text())
    .then((data) => {
      if (data === "Logged out.") {
        location.reload();
      } else {
        setErrorMessage(data);
      }
    })
    .catch((error) => {
      console.error(error);
    });
  }

  if (!user.ID){
    return <div></div>
  }

  return (
        <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6 max-w-7xl mx-auto">
          {user.Email && user.Email !== "null" ?
            <>
              <h1 className="font-bold text-transparent md:text-7xl text-3xl bg-clip-text bg-gradient-to-r from-blue-500 to-blue-900 md:py-8">
                Hi {user.Nickname}!
              </h1>
              <div className="flex items-center gap-4">
                <h1 className="font-semibold text-lg md:text-xl">Order History</h1>
              </div><div className="border shadow-sm rounded-lg p-2">
                  <table class="w-full">
                    <thead>
                      <tr>
                        <th class="min-w-[150px]">Product</th>
                        <th class="hidden md:table-cell">Quantity</th>
                        <th class="hidden md:table-cell">Size</th>
                        <th class="hidden md:table-cell">Date</th>
                      </tr>
                    </thead>
                    <tbody class="divide-y divide-gray-200 m-auto text-center">
                      {order.map((item) => (
                        <tr key={item.producturlslug}>
                          <td>
                            <a href={"/product/" + item.producturlslug}>
                              {item.producturlslug}
                            </a>
                          </td>
                          <td>{item.quantity}</td>
                          <td>{item.size}</td>
                          <td>{new Date(item.date).toLocaleDateString()}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <button onClick={HandleLogout}>Logout</button>
            </>
          :
            <>
              <div class="sm:mx-auto sm:w-full sm:max-w-sm">
                <img class="mx-auto h-60 w-auto" src={brand} alt="Spoura Logo" />
                {
                  isLogin ?
                  <h2 class="mt-10 text-center text-4xl font-bold leading-9 tracking-tight text-gray-900">Log in to your account.</h2>
                  :
                  <h2 class="mt-10 text-center text-4xl font-bold leading-9 tracking-tight text-gray-900">Sign in to your account.</h2>
                }
              </div>
              <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                { 
                  isLogin ?
                  <form class="space-y-6" onSubmit={HandleLogin}>
                    <div>
                      <label for="email" class="block text-sm font-medium leading-6 text-gray-900">Email address</label>
                      <div class="mt-2">
                        {/* @ts-ignore */}
                        <input id="email" name="email" type="email" autocomplete="email" value={loginEmail} onChange={(e) => setLoginEmail(e.target.value)} required class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 pl-2" />
                      </div>
                    </div>
                    <div>
                      <div class="flex items-center justify-between">
                        <label for="password" class="block text-sm font-medium leading-6 text-gray-900">Password</label>
                      </div>
                      <div class="mt-2">
                        {/* @ts-ignore */}
                        <input id="password" name="password" type="password" autocomplete="current-password" value={loginPassword} onChange={(e) => setLoginPassword(e.target.value)} required class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 pl-2" />
                      </div>
                    </div>
                    <div>
                      <button type="submit" class="flex w-full justify-center rounded-md bg-blue-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Log in</button>
                    </div>
                    <button class="mt-10 text-center text-sm text-blue-600" onClick={()=>setIsLogin(false)}>
                      Want to sign up?
                    </button>
                  </form>
                  :
                  <form class="space-y-6" onSubmit={HandleSignup}>
                    <div>
                      <label for="email" class="block text-sm font-medium leading-6 text-gray-900">Email address</label>
                      <div class="mt-2">
                        {/* @ts-ignore */}
                        <input id="email" name="email" type="email" autocomplete="email" value={signupEmail} onChange={(e) => setSignupEmail(e.target.value)} required class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 pl-2" />
                      </div>
                    </div>
                    <div>
                      <div class="flex items-center justify-between">
                        <label for="password" class="block text-sm font-medium leading-6 text-gray-900">Password</label>
                      </div>
                      <div class="mt-2">
                        {/* @ts-ignore */}
                        <input id="password" name="password" type="password" autocomplete="current-password" value={signupPassword} onChange={(e) => setSignupPassword(e.target.value)} required class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 pl-2" />
                      </div>
                      <div class="flex items-center justify-between">
                        <label for="confirmpassword" class="block text-sm font-medium leading-6 text-gray-900">Confirm Password</label>
                      </div>
                      <div class="mt-2">
                        {/* @ts-ignore */}
                        <input id="confirmpassword" name="confirmpassword" type="password" autocomplete="current-password" value={signupConfirmPassword} onChange={(e) => setSignupConfirmPassword(e.target.value)} required class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 pl-2" />
                      </div>
                    </div>
                    <div>
                      <button type="submit" class="flex w-full justify-center rounded-md bg-blue-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Sign in</button>
                    </div>
                    <button class="mt-10 text-center text-sm text-blue-600" onClick={()=>setIsLogin(true)}>
                      Want to login?
                    </button>
                  </form>
                }
              </div>
              <p class="text-red-500 text-center mt-10">
                {errorMessage}
              </p>
            </>
          }
        </main>
  );
}