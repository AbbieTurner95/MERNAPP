const dal = require("../dataAccessLayer");

module.exports = app => {
  app.post("/auth/signin", async function(req, res) {
    try {
      const data = await dal.signIn(req.body);
      res.status(200).json(data);
    } catch (error) {
      console.log(error);
      res.status(400).json({
        error: "Sign In : Server Error"
      });
    }
  });

  app.get("/auth/logout", async function(req, res) {
    try {
      const data = await dal.logOut(req, res);
      res.status(200).json(data);
    } catch (error) {
      console.log(error);
      res.status(400).json({
        error: "Log Out :  Server Error"
      });
    }
  });
};
