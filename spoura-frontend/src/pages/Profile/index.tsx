import { useEffect, useState } from "preact/hooks";
import { UserProp } from "../../components/types";
import { TargetedEvent } from "preact/compat";
import { getCookiesWithValue } from "../../components/Auth";
import brand from "../../assets/banner-right-image.png";

export default function Profile({user, setuser}: UserProp) {

  const [isLogin, setIsLogin] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

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
      return;
    }
    setIsLoading(true);
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
      setIsLoading(false);
      if (data === "Signed up.") {
        location.reload();
      } else {
        setErrorMessage(data);
      }
    })
    .catch((error) => {
      setIsLoading(false);
      console.error(error);
    });
  }

  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const HandleLogin = (e: TargetedEvent) => {
    e.preventDefault();
    setIsLoading(true);
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
      setIsLoading(false);
      if (data === "Logged in.") {
        location.reload();
      } else {
        setErrorMessage(data);
      }
    })
    .catch((error) => {
      setIsLoading(false);
      console.error(error);
    });
  }

  const HandleLogout = (e: TargetedEvent) => {
    e.preventDefault();
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
        <main className="min-h-screen bg-base-200 py-8 md:py-12">
          <div className="max-w-7xl mx-auto px-4">
          {user.Email && user.Email !== "null" ?
            <>
              {/* Welcome Header */}
              <div className="card bg-base-100 shadow-xl mb-8">
                <div className="card-body flex-row items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="avatar placeholder">
                      <div className="bg-primary text-primary-content rounded-full w-16">
                        <span className="text-2xl font-bold">{user.Nickname?.charAt(0).toUpperCase() || 'U'}</span>
                      </div>
                    </div>
                    <div>
                      <h1 className="text-2xl md:text-4xl font-bold text-base-content">
                        Hi {user.Nickname}!
                      </h1>
                      <p className="text-base-content/60">{user.Email}</p>
                    </div>
                  </div>
                  <button onClick={HandleLogout} className="btn btn-outline btn-error">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                    </svg>
                    Logout
                  </button>
                </div>
              </div>

              {/* Account Stats - Clickable */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                <a href="#orders" className="card bg-base-100 shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all cursor-pointer">
                  <div className="card-body">
                    <div className="flex items-center gap-3">
                      <div className="btn btn-circle btn-primary">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                        </svg>
                      </div>
                      <div>
                        <p className="text-sm text-base-content/60">Orders</p>
                        <p className="text-2xl font-bold">{order.length}</p>
                      </div>
                    </div>
                  </div>
                </a>
                <a href="/shop" className="card bg-base-100 shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all cursor-pointer">
                  <div className="card-body">
                    <div className="flex items-center gap-3">
                      <div className="btn btn-circle btn-secondary">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                        </svg>
                      </div>
                      <div>
                        <p className="text-sm text-base-content/60">Favourites</p>
                        <p className="text-2xl font-bold">{user.Favourites?.length || 0}</p>
                      </div>
                    </div>
                  </div>
                </a>
                <a href="/cart" className="card bg-base-100 shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all cursor-pointer">
                  <div className="card-body">
                    <div className="flex items-center gap-3">
                      <div className="btn btn-circle btn-accent">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                      </div>
                      <div>
                        <p className="text-sm text-base-content/60">Cart Items</p>
                        <p className="text-2xl font-bold">{user.Cart?.length || 0}</p>
                      </div>
                    </div>
                  </div>
                </a>
              </div>

              {/* Order History */}
              <div className="card bg-base-100 shadow-xl">
                <div className="card-body">
                  <h2 className="card-title text-2xl font-bold text-base-content mb-6">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                    </svg>
                    Order History
                  </h2>

                  {order.length > 0 ? (
                    <div className="overflow-x-auto">
                      <table className="table table-zebra">
                        <thead>
                          <tr>
                            <th>Product</th>
                            <th>Quantity</th>
                            <th>Size</th>
                            <th>Date</th>
                          </tr>
                        </thead>
                        <tbody>
                          {order.map((item) => (
                            <tr key={item.producturlslug}>
                              <td>
                                <a href={"/product/" + item.producturlslug} className="font-medium hover:text-primary transition-colors">
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
                  ) : (
                    <div className="text-center py-12">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-base-content/30" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                      </svg>
                      <h3 className="text-xl font-semibold mt-4">No Orders Yet</h3>
                      <p className="text-base-content/60 mt-2">Start shopping to see your orders here!</p>
                      <div className="mt-6">
                        <a href="/shop" className="btn btn-primary">Browse Shop</a>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </>
          :
            <>
              {/* Login/Signup Card */}
              <div className="card bg-base-100 shadow-2xl max-w-md mx-auto">
                <figure className="px-10 pt-10">
                  <img src={brand} alt="Spoura Logo" className="w-48" />
                </figure>
                <div className="card-body">
                  <h2 className="card-title justify-center text-2xl font-bold text-base-content">
                    {isLogin ? "Welcome Back!" : "Create Account"}
                  </h2>
                  <p className="text-center text-base-content/60 mb-6">
                    {isLogin ? "Log in to access your account" : "Sign up to get started"}
                  </p>

                  {isLogin ? (
                    <form onSubmit={HandleLogin} className="space-y-4">
                      <div className="form-control">
                        <label className="label">
                          <span className="label-text">Email</span>
                        </label>
                        <input
                          type="email"
                          value={loginEmail}
                          onChange={(e) => setLoginEmail(e.target.value)}
                          required
                          className="input input-bordered w-full focus:input-primary"
                          placeholder="you@example.com"
                        />
                      </div>
                      <div className="form-control">
                        <label className="label">
                          <span className="label-text">Password</span>
                        </label>
                        <input
                          type="password"
                          value={loginPassword}
                          onChange={(e) => setLoginPassword(e.target.value)}
                          required
                          className="input input-bordered w-full focus:input-primary"
                          placeholder="Enter your password"
                        />
                      </div>
                      <div className="form-control mt-6">
                        <button type="submit" className="btn btn-primary" disabled={isLoading}>
                          {isLoading ? (
                            <span className="loading loading-spinner loading-sm"></span>
                          ) : (
                            <>
                              Log In
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                              </svg>
                            </>
                          )}
                        </button>
                      </div>
                    </form>
                  ) : (
                    <form onSubmit={HandleSignup} className="space-y-4">
                      <div className="form-control">
                        <label className="label">
                          <span className="label-text">Email</span>
                        </label>
                        <input
                          type="email"
                          value={signupEmail}
                          onChange={(e) => setSignupEmail(e.target.value)}
                          required
                          className="input input-bordered w-full focus:input-primary"
                          placeholder="you@example.com"
                        />
                      </div>
                      <div className="form-control">
                        <label className="label">
                          <span className="label-text">Password</span>
                        </label>
                        <input
                          type="password"
                          value={signupPassword}
                          onChange={(e) => setSignupPassword(e.target.value)}
                          required
                          className="input input-bordered w-full focus:input-primary"
                          placeholder="Create a password"
                        />
                      </div>
                      <div className="form-control">
                        <label className="label">
                          <span className="label-text">Confirm Password</span>
                        </label>
                        <input
                          type="password"
                          value={signupConfirmPassword}
                          onChange={(e) => setSignupConfirmPassword(e.target.value)}
                          required
                          className="input input-bordered w-full focus:input-primary"
                          placeholder="Confirm your password"
                        />
                      </div>
                      <div className="form-control mt-6">
                        <button type="submit" className="btn btn-primary" disabled={isLoading}>
                          {isLoading ? (
                            <span className="loading loading-spinner loading-sm"></span>
                          ) : (
                            <>
                              Sign Up
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                              </svg>
                            </>
                          )}
                        </button>
                      </div>
                    </form>
                  )}

                  {/* Error Message */}
                  {errorMessage && (
                    <div className="alert alert-error mt-4">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span>{errorMessage}</span>
                    </div>
                  )}

                  {/* Toggle Login/Signup */}
                  <div className="divider">OR</div>
                  <p className="text-center text-base-content/70">
                    {isLogin ? "Don't have an account?" : "Already have an account?"}
                    <button
                      className="btn btn-link btn-sm"
                      onClick={() => {
                        setIsLogin(!isLogin);
                        setErrorMessage("");
                      }}
                    >
                      {isLogin ? "Sign Up" : "Log In"}
                    </button>
                  </p>
                </div>
              </div>

              {/* Benefits Card */}
              <div className="card bg-base-100 shadow-xl max-w-md mx-auto mt-6">
                <div className="card-body">
                  <h3 className="font-semibold text-lg">Benefits of having an account:</h3>
                  <ul className="space-y-2 text-base-content/70">
                    <li className="flex items-center gap-2">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-success" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                      Track your orders
                    </li>
                    <li className="flex items-center gap-2">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-success" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                      Save your favourite shoes
                    </li>
                    <li className="flex items-center gap-2">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-success" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                      Faster checkout
                    </li>
                  </ul>
                </div>
              </div>
            </>
          }
          </div>
        </main>
  );
}