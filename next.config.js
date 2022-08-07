module.exports = {
  reactStrictMode: false,
  eslint: {
    dirs: ['src'],
  },
  webpack: (config) => {
    config.module.rules.push({
      test: /\.(glsl|vs|fs|vert|frag)$/,
      use: ['raw-loader', 'glslify-loader'],
    });
    return config;
  },
  async redirects() {
    return [];
  },
  trailingSlash: true,
};
