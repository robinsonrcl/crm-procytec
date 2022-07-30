module.exports = {
  presets: [  
    [
      "@babel/preset-env",
      {
        useBuiltIns: "usage",
        corejs: 3,
      },
    ],
  ],
};

// presets: ["@vue/cli-plugin-babel/preset"],
