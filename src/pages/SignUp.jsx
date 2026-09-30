import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { User, Mail, Lock, Phone, Eye, EyeOff, Check, AlertCircle } from 'lucide-react'
import AuthLayout from '../components/AuthLayout.jsx'
import FormField from '../components/FormField.jsx'
import GoogleMark from '../components/GoogleMark.jsx'
import { useAuth } from '../context/AuthContext.jsx'
import { useToast } from '../context/ToastContext.jsx'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export default function SignUp() {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
  const [agreed, setAgreed] = useState(false)
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
  })
  const [errors, setErrors] = useState({})
  const [formError, setFormError] = useState('')
  const [submitting, setSubmitting] = useState(false)

  const { signup } = useAuth()
  const { notify } = useToast()
  const navigate = useNavigate()

  const update = (e) => {
    const { name, value } = e.target
    setForm((f) => ({ ...f, [name]: value }))
    setErrors((prev) => ({ ...prev, [name]: undefined }))
    setFormError('')
  }

  const validate = () => {
    const next = {}
    if (!form.name.trim()) next.name = 'Enter your full name'
    if (!EMAIL_RE.test(form.email)) next.email = 'Enter a valid email address'
    if (form.password.length < 8) next.password = 'Use at least 8 characters'
    if (form.confirmPassword !== form.password) next.confirmPassword = 'Passwords do not match'
    if (!agreed) next.agreed = 'Please accept the terms to continue'
    setErrors(next)
    return Object.keys(next).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!validate()) return
    setSubmitting(true)
    setFormError('')
    try {
      await signup({
        name: form.name.trim(),
        email: form.email.trim(),
        phone: form.phone.trim() || undefined,
        password: form.password,
      })
      notify('Account created — welcome to StayNest!')
      navigate('/dashboard', { replace: true })
    } catch (err) {
      setFormError(err.message || 'Unable to create your account')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <AuthLayout
      imageUrl="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=1400&auto=format&fit=crop"
      quote="Every trip started with a place that felt right the moment I walked in."
      quoteAuthor="Amara T., StayNest guest since 2022"
    >
      <h1 className="font-display text-3xl font-semibold text-pine">Create your account</h1>
      <p className="text-ink/60 text-sm mt-2 mb-8">
        Join StayNest to book unique stays and save your favorites.
      </p>
      {formError && (
        <div className="flex items-start gap-2 bg-clay-50 border border-clay-100 text-clay-600 text-sm rounded-xl px-3.5 py-3 mb-5">
          <AlertCircle size={17} className="mt-0.5 shrink-0" />
          <span>{formError}</span>
        </div>
      )}

      <form className="space-y-5" onSubmit={handleSubmit} noValidate>
        <FormField
          id="name"
          name="name"
          label="Full name"
          placeholder="Jordan Lee"
          icon={User}
          value={form.name}
          onChange={update}
          error={errors.name}
          autoComplete="name"
        />

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

        <FormField
          id="phone"
          name="phone"
          label="Phone number (optional)"
          type="tel"
          placeholder="+1 555 000 1234"
          icon={Phone}
          value={form.phone}
          onChange={update}
          autoComplete="tel"
        />

        <FormField
          id="password"
          name="password"
          label="Password"
          type={showPassword ? 'text' : 'password'}
          placeholder="Create a password"
          icon={Lock}
          value={form.password}
          onChange={update}
          error={errors.password}
          helperText="Use at least 8 characters."
          autoComplete="new-password"
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

        <FormField
          id="confirm-password"
          name="confirmPassword"
          label="Confirm password"
          type={showConfirm ? 'text' : 'password'}
          placeholder="Re-enter your password"
          icon={Lock}
          value={form.confirmPassword}
          onChange={update}
          error={errors.confirmPassword}
          autoComplete="new-password"
          rightSlot={
            <button
              type="button"
              onClick={() => setShowConfirm((v) => !v)}
              className="text-ink/40 hover:text-ink transition-colors"
              aria-label={showConfirm ? 'Hide password' : 'Show password'}
            >
              {showConfirm ? <EyeOff size={17} /> : <Eye size={17} />}
            </button>
          }
        />

        <div>
          <label className="flex items-start gap-3 cursor-pointer">
            <button
              type="button"
              onClick={() => {
                setAgreed((v) => !v)
                setErrors((prev) => ({ ...prev, agreed: undefined }))
              }}
              aria-pressed={agreed}
              className={`mt-0.5 grid place-items-center w-5 h-5 rounded-md border shrink-0 transition-colors ${
                agreed ? 'bg-pine border-pine' : 'border-pine-100 bg-white'
              }`}
            >
              {agreed && <Check size={13} className="text-ivory" strokeWidth={3} />}
            </button>
            <span className="text-sm text-ink/70">
              I agree to StayNest's{' '}
              <span className="text-pine font-medium underline underline-offset-2">Terms of Service</span>{' '}
              and{' '}
              <span className="text-pine font-medium underline underline-offset-2">Privacy Policy</span>.
            </span>
          </label>
          {errors.agreed && <p className="mt-1.5 text-xs text-clay-600 font-medium">{errors.agreed}</p>}
        </div>

        <button
          type="submit"
          disabled={submitting}
          className="w-full bg-clay hover:bg-clay-600 transition-colors text-white font-semibold text-sm rounded-xl py-3.5 shadow-soft disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {submitting && (
            <span className="w-4 h-4 rounded-full border-2 border-white/40 border-t-white animate-spin" />
          )}
          {submitting ? 'Creating account…' : 'Sign up'}
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
        Already have an account?{' '}
        <Link to="/login" className="text-pine font-semibold hover:underline underline-offset-2">
          Log in
        </Link>
      </p>
    </AuthLayout>
  )
}
