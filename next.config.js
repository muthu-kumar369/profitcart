/** @type {import('next').NextConfig} */
const nextConfig = {
    env:{
        backend_domain:"http://localhost:4000",
        success:"success",
        error:"error"
    },
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: '**',
                port: '',
                pathname: '**',
            },
        ],
    },
}

module.exports = nextConfig
