module.exports = {
  db: {
    url: "mongodb://localhost:27017/authcrud"
  },
  session: {
    cookie: {
      secure: true,
      maxAge: false //24 * 60 * 60 * 1000 // 24 hours
    }
  },
  port: 2100,
  url: {
    baseUrl: "http://localhost:2100"
  },
  isAuthorized:true,
  debug:true,
};

