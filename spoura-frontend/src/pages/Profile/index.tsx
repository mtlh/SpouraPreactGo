import { useState } from "preact/hooks";
import { UserProp } from "../../components/types";
import { TargetedEvent } from "preact/compat";
import { getCookiesWithValue } from "../../components/Auth";

export default function Profile({user, setuser}: UserProp) {

  console.log(user)

  const [signupEmail, setSignupEmail] = useState("");
  const [signupPassword, setSignupPassword] = useState("");
  const [signupConfirmPassword, setSignupConfirmPassword] = useState("");
  const HandleSignup = (e: TargetedEvent) => {
    e.preventDefault();
    if (signupPassword !== signupConfirmPassword) {
      alert("Passwords do not match");
      return;
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
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      location.reload();
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
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      location.reload();
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
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
    })
    .catch((error) => {
      console.error(error);
    });
  }

  return (
    <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6 max-w-7xl mx-auto">
          <h1 className="font-extrabold text-transparent text-7xl bg-clip-text bg-gradient-to-r from-blue-500 to-blue-900 py-8">
                Hi {user.Nickname}!
          </h1>
          {user.Email ?
            <>
              <div className="flex items-center gap-4">
                <h1 className="font-semibold text-lg md:text-xl">Order History</h1>
              </div><div className="border shadow-sm rounded-lg p-2">
                  <table class="w-full">
                    <thead>
                      <tr>
                        <th class="w-[100px]">Order</th>
                        <th class="min-w-[150px]">Product</th>
                        <th class="hidden md:table-cell">Quantity</th>
                        <th class="hidden md:table-cell">Date</th>
                        <th class="text-right">Total</th>
                      </tr>
                    </thead>
                    <tbody class="divide-y divide-gray-200 m-auto text-center">
                    </tbody>
                  </table>
                </div><div className="flex items-center gap-4">
                  <h1 className="font-semibold text-lg md:text-xl">Personal Information</h1>
                </div><div className="border shadow-sm rounded-lg p-4">
                  <div className="grid gap-4">
                    {/* <div className="grid gap-1">
                    <p htmlFor="name">Name</p>
                    <input disabled id="name" value="Sophia Anderson" />
                  </div>
                  <div className="grid gap-1">
                    <p htmlFor="email">Email</p>
                    <input disabled id="email" value="sophia@example.com" />
                  </div>
                  <div className="grid gap-1">
                    <p htmlFor="address">Shipping Address</p>
                    <textarea
                      className="rounded-md border border-gray-300 bg-white px-3 py-2 text-sm shadow-sm transition-colors focus:border-[#1e2a3a] focus:outline-none focus:ring-1 focus:ring-[#1e2a3a] dark:border-[#1e2a3a] dark:bg-[#1e2a3a] dark:text-gray-50"
                      disabled
                      id="address"
                      rows={3}
                    >
                      1234 Main St. Anytown, CA 12345
                    </textarea>
                  </div> */}
                  </div>
                </div>
            </>
          :
            <>
              <h1 className="font-semibold text-lg md:text-xl">Login/Signup</h1>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <form className="flex flex-col gap-4" onSubmit={HandleLogin}>
                  {/* @ts-ignore */}
                  <input type="text" placeholder="Email" value={loginEmail} onChange={(e) => setLoginEmail(e.target.value)} />
                  {/* @ts-ignore */}
                  <input type="password" placeholder="Password" value={loginPassword} onChange={(e) => setLoginPassword(e.target.value)} />
                  <button type="submit">Login</button>
                </form>
                <form className="flex flex-col gap-4" onSubmit={HandleSignup}>
                  {/* @ts-ignore */}
                  <input type="text" placeholder="Email" value={signupEmail} onChange={(e) => setSignupEmail(e.target.value)} />
                  {/* @ts-ignore */}
                  <input type="password" placeholder="Password" value={signupPassword} onChange={(e) => setSignupPassword(e.target.value)} />
                  {/* @ts-ignore */}
                  <input type="password" placeholder="Confirm Password" value={signupConfirmPassword} onChange={(e) => setSignupConfirmPassword(e.target.value)} />
                  <button type="submit">Signup</button>
                </form>
                <button onClick={HandleLogout}>Logout</button>
              </div>
            </>
          }
        </main>
  );
}