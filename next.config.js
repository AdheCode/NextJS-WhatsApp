module.exports = {
  reactStrictMode: true,
  images: {
    domains: ['assets.stickpng.com']
  },
  publicRuntimeConfig: {
    // Will be available on both server and client
    api_key: process.env.API_KEY,
  },
}
