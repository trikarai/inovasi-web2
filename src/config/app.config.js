let baseUrl = ''
if (process.env.NODE_ENV === 'production') {
   baseUrl = 'https://start.mikti.id/inovasi'
//  baseUrl = 'https://innov.id/inovasi'
  // baseUrl = 'http://103.23.22.223/inovasi'
  // baseUrl = 'https://cors-anywhere.herokuapp.com/https://start.mikti.id/inovasi'
}else {
//   baseUrl = 'https://cors-anywhere.herokuapp.com/http://103.23.22.223/inovasi'
   baseUrl = 'https://cors-anywhere.herokuapp.com/https://start.mikti.id/inovasi'
//   baseUrl = 'https://start.mikti.id/inovasi'
//   baseUrl = 'http://103.23.22.223/inovasi'
}
export const APIENDPOINT = baseUrl