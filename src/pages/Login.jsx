import { useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { Mail, Lock, Eye, EyeOff, AlertCircle } from 'lucide-react'
import AuthLayout from '../components/AuthLayout.jsx'
import FormField from '../components/FormField.jsx'
import GoogleMark from '../components/GoogleMark.jsx'
import { useAuth } from '../context/AuthContext.jsx'
import { useToast } from '../context/ToastContext.jsx'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export default function Login() {
  const [showPassword, setShowPassword] = useState(false)
  const [form, setForm] = useState({ email: '', password: '' })
  const [errors, setErrors] = useState({})
  const [formError, setFormError] = useState('')
  const [submitting, setSubmitting] = useState(false)

  const { login } = useAuth()
  const { notify } = useToast()
  const navigate = useNavigate()
  const location = useLocation()
  const from = location.state?.from || '/dashboard'

  const update = (e) => {
    const { name, value } = e.target
    setForm((f) => ({ ...f, [name]: value }))
    setErrors((prev) => ({ ...prev, [name]: undefined }))
    setFormError('')
  }

  const validate = () => {
    const next = {}
    if (!EMAIL_RE.test(form.email)) next.email = 'Enter a valid email address'
    if (!form.password) next.password = 'Enter your password'
    setErrors(next)
    return Object.keys(next).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!validate()) return
    setSubmitting(true)
    setFormError('')
    try {
      await login({ email: form.email.trim(), password: form.password })
      notify('Welcome back!')
      navigate(from, { replace: true })
    } catch (err) {
      setFormError(err.message || 'Unable to log in')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <AuthLayout
      imageUrl="https://images.unsplash.com/photo-1467269204594-9661b134dd2b?q=80&w=1400&auto=format&fit=crop"
      quote="I book through StayNest before I book flights. The stays are half the reason to go."
      quoteAuthor="Marcus O., StayNest guest since 2021"
    >
      <h1 className="font-display text-3xl font-semibold text-pine">Welcome back</h1>
      <p className="text-ink/60 text-sm mt-2 mb-8">
        Log in to manage your trips and saved stays.
      </p>

      {formError && (
        <div className="flex items-start gap-2 bg-clay-50 border border-clay-100 text-clay-600 text-sm rounded-xl px-3.5 py-3 mb-5">
          <AlertCircle size={17} className="mt-0.5 shrink-0" />
          <span>{formError}</span>
        </div>
      )}

      <form className="space-y-5" onSubmit={handleSubmit} noValidate>
        <FormField
          id="email"
          name="email"
          label="Email"
          type="email"
          placeholder="you@example.com"
          icon={Mail}
          value={form.email}
          onChange={update}
          error={errors.email}
          autoComplete="email"
        />

        <div>
          <FormField
            id="password"
            name="password"
            label="Password"
            type={showPassword ? 'text' : 'password'}
            placeholder="Enter your password"
            icon={Lock}
            value={form.password}
            onChange={update}
            error={errors.password}
            autoComplete="current-password"
            rightSlot={
              <button
                type="button"
                onClick={() => setShowPassword((v) => !v)}
                className="text-ink/40 hover:text-ink transition-colors"
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? <EyeOff size={17} /> : <Eye size={17} />}
              </button>
            }
          />
          <div className="flex justify-end mt-2">
            <button
              type="button"
              className="text-sm text-pine font-medium hover:underline underline-offset-2"
            >
              Forgot password?
            </button>
          </div>
        </div>

        <button
          type="submit"
          disabled={submitting}
          className="w-full bg-clay hover:bg-clay-600 transition-colors text-white font-semibold text-sm rounded-xl py-3.5 shadow-soft disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {submitting && (
            <span className="w-4 h-4 rounded-full border-2 border-white/40 border-t-white animate-spin" />
          )}
          {submitting ? 'Logging in…' : 'Log in'}
        </button>
      </form>

      <div className="flex items-center gap-3 my-6">
        <div className="h-px bg-pine-100 flex-1" />
        <span className="text-xs text-ink/40 font-medium">or</span>
        <div className="h-px bg-pine-100 flex-1" />
      </div>

      <button
        type="button"
        className="w-full flex items-center justify-center gap-3 border border-pine-100 rounded-xl py-3.5 text-sm font-semibold text-ink hover:bg-sage/50 transition-colors"
      >
        <GoogleMark />
        Continue with Google
      </button>

      <p className="text-center text-sm text-ink/60 mt-8">
        Don't have an account?{' '}
        <Link to="/signup" className="text-pine font-semibold hover:underline underline-offset-2">
          Sign up
        </Link>
      </p>
    </AuthLayout>
  )
}
