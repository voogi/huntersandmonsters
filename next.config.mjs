/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: '/',
        destination: '/battlefield',
        permanent: true, // Állítsd true-ra, ha állandó átirányítást szeretnél (301-es HTTP státuszkód)
      },
    ];
  },
};

export default nextConfig;
