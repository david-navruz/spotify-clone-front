export default [
  {
    context: ['/api', '/oauth2', '/login'],  // Paths to proxy
    target: 'http://localhost:8080',         // Redirect requests to this server
    secure: true                             // Only allows HTTPS (may cause issues with HTTP)
  }
]

// proxy configuration for backend. This aims to avoid the browser blocks these requests due to CORS (Cross-Origin Resource Sharing) restrictions.
// A proxy configuration helps by redirecting frontend API requests to the backend without triggering CORS issues.
