let baseUrl = ''
if (process.env.NODE_ENV === 'production') {
  baseUrl = 'https://start.mikti.id/inovasi'
} else {
  baseUrl = 'https://cors-anywhere.herokuapp.com/https://start.mikti.id/inovasi'
  // baseUrl = 'https://start.mikti.id/inovasi'
}
export const baseUri = baseUrl
