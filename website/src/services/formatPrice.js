export function formatPrice(value, opts) {
    const { locale = 'en-US', currency = 'USD' } = opts
    const formatter = new Intl.NumberFormat(locale, {
      currency,
      style: 'currency',
      maximumFractionDigits: 2,
    })
    return formatter.format(value)
  }