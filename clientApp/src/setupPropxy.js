const {createProxyMiddleware} = require("http-proxy-middleware");

module.exports = function(app) {
  app.use(
    createProxyMiddleware({
      target: "http://localhost:8080",
      secure: false,
      changeOrigin: true
    })
  );

//   app.use(
//     proxy("/addusers", {
//       target: "https://dog.ceo",
//       secure: false,
//       changeOrigin: true
//     })
//   );
};