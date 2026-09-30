export default function FormField({
  id,
  label,
  type = 'text',
  placeholder,
  icon: Icon,
  rightSlot,
  helperText,
  value,
  onChange,
  name,
  error,
  autoComplete,
  required,
}) {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-ink mb-1.5">
        {label}
      </label>
      <div className="relative">
        {Icon && (
          <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-ink/40">
            <Icon size={17} />
          </span>
        )}
        <input
          id={id}
          name={name}
          type={type}
          value={value}
          onChange={onChange}
          autoComplete={autoComplete}
          required={required}
          aria-invalid={!!error}
          aria-describedby={error ? `${id}-error` : undefined}
          placeholder={placeholder}
          className={`w-full rounded-xl border bg-white text-sm text-ink placeholder:text-ink/35
            py-3 ${Icon ? 'pl-11' : 'pl-4'} ${rightSlot ? 'pr-11' : 'pr-4'}
            outline-none transition-shadow
            ${
              error
                ? 'border-clay focus:border-clay focus:ring-2 focus:ring-clay/15'
                : 'border-pine-100 focus:border-pine focus:ring-2 focus:ring-pine/15'
            }`}
        />
        {rightSlot && (
          <span className="absolute right-3.5 top-1/2 -translate-y-1/2">{rightSlot}</span>
        )}
      </div>
      {error ? (
        <p id={`${id}-error`} className="mt-1.5 text-xs text-clay-600 font-medium">
          {error}
        </p>
      ) : (
        helperText && <p className="mt-1.5 text-xs text-ink/50">{helperText}</p>
      )}
    </div>
  )
}
