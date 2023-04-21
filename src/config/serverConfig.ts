export const serverConfig = {
  serverUrl:
    process.env.NODE_ENV === 'development'
      ? 'http://localhost:3000'
      : 'https://mycotrack.onrender.com'
}
