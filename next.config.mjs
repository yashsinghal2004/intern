/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      domains: [
        'fakestoreapi.com',
        'storage.googleapis.com' // <- Add this
      ],
    },
  };
  
  export default nextConfig;
  