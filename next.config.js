module.exports = {
  reactStrictMode: true,
  webpack: (config) => {
    config.module.rules.push({
      test: /\.(glsl|vs|fs|vert|frag)$/,
      use: ['raw-loader', 'glslify-loader'],
    });
    return config;
  },
  async redirects() {
    return [
      {
        source: '/',
        destination: '/trailer#main',
        permanent: true,
      },
    ]
  },
};
