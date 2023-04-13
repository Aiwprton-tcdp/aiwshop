
export const DefaultDate = date => {
  return new Date(date).toLocaleString("de-DE", {
    month: '2-digit',
    year: 'numeric',
    day: '2-digit',
  })
}
