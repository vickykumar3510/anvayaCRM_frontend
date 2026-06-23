import "../App.css"
import { useState } from "react"
import { Link, Navigate, useNavigate } from "react-router-dom"
import { toast } from "react-toastify";

function Login() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  if (localStorage.getItem("adminToken")) {
    return <Navigate to="/dashboard" replace />
  }

  const loginHandler = async () => {
    if (!email || !password) {
      toast.error("Please enter email and password.")
      return
    }

    setLoading(true)
    try {
      const loginAuth = await fetch('https://major-project2-backend-xi.vercel.app/auth/login', {
        method: 'POST',
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email, password })
      })

      const loginData = await loginAuth.json()

      if (loginAuth.ok && loginData.token) {
        localStorage.setItem('adminToken', loginData.token)
        navigate("/dashboard")
        toast.success("Welcome to Anvaya")
      } else if (loginAuth.status === 401) {
        toast.error("Invalid user credentials.")
      } else if (loginAuth.status >= 500) {
        console.error("Login server error:", loginData)
        if (loginData.details?.includes("secretOrPrivateKey")) {
          toast.error("Backend is missing JWT_SECRET. Add it in Vercel env vars and redeploy.")
        } else {
          toast.error(loginData.details || loginData.error || "Server error. Please try again later.")
        }
      } else {
        toast.error(loginData.error || loginData.message || "Login failed.")
      }
    } catch {
      toast.error("Something went wrong. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="auth-page auth-page--login">
      <div className="auth-card">
        <p className="auth-brand">Anvaya</p>
        <h3 className="auth-title">Log in to your account</h3>
        <p className="auth-subtitle">Please enter your details</p>

        <div className="auth-form">
          <div className="auth-field">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={loading}
            />
          </div>

          <div className="auth-field">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={loading}
            />
          </div>

          <div className="auth-actions">
            <button
              className="auth-btn"
              type="button"
              onClick={loginHandler}
              disabled={loading || !email || !password}
            >
              {loading ? "Signing in..." : "Sign In"}
            </button>

            <div className="auth-footer">
              <p className="auth-footer-text">Don&apos;t have an account?</p>
              <Link className="auth-link" to="/signuppage">Sign Up</Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

export default Login
