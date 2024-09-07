/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "kapumuyablpuibhumzdj.supabase.co",
        port: "",
        pathname: "/storage/v1/object/public/rooms-imgs/**",
      },
    ],
  },
};

export default nextConfig;
