export default {
  // The object to be passed as a header for authenticated requests ok aku ganteng maenya sih 
  getAuthHeader() {
    const tokenData = window.localStorage.getItem('access_token')
    const headers = {
      'Accept': 'application/json',
      'Authorization': 'Bearer ' + tokenData
    }
    return headers;
  },
  getAuthData() {
    const data = window.localStorage.getItem('access_data')
    return JSON.parse(data)
  }
}