const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const dal = require("./dataAccessLayer");
const assetRoutes = express.Router();
const PORT = 4000;

app.use(cors());
app.use(bodyParser.json());
require("./LogIn/signin")(app);

assetRoutes.route("/text").get(async function(req, res) {
  try {
    const data = await dal.getAllTextFiles();
    res.status(200).json(data);
  } catch (error) {
    console.log(error);
    res.status(400).json({
      error: "Get Text Files - Server Error"
    });
  }
});

assetRoutes.route("/picture").get(async function(req, res) {
  try {
    const data = await dal.getAllPictureFiles();
    res.status(200).json(data);
  } catch (error) {
    console.log(error);
    res.status(400).json({
      error: "Get Pictures - Server Error"
    });
  }
});

assetRoutes.route("/video").get(async function(req, res) {
  try {
    const data = await dal.getAllVideoFiles();
    res.status(200).json(data);
  } catch (error) {
    console.log(error);
    res.status(400).json({
      error: "Get Videos - Server Error"
    });
  }
});

assetRoutes.route("/text/:id").get(async function(req, res) {
  try {
    const data = await dal.getTextFile(req.params.id);
    res.status(200).json(data);
  } catch (error) {
    console.log(error);
    res.status(400).json({
      error: "Get Text - Server Error"
    });
  }
});

assetRoutes.route("/picture/:id").get(async function(req, res) {
  try {
    const data = await dal.getPictureFile(req.params.id);
    res.status(200).json(data);
  } catch (error) {
    console.log(error);
    res.status(400).json({
      error: "Get Picture - Server Error"
    });
  }
});

assetRoutes.route("/video/:id").get(async function(req, res) {
  try {
    const data = await dal.getVideoFile(req.params.id);
    res.status(200).json(data);
  } catch (error) {
    console.log(error);
    res.status(400).json({
      error: "Get Video - Server Error"
    });
  }
});

assetRoutes.route("/picture/delete/:id").delete(async function(req, res) {
  try {
    const data = await dal.deletePictureFile(req.params.id, req.body);
    res.status(200).json(data);
  } catch (error) {
    console.log(error);
    res.status(400).json({
      error: "Delete Picture - Server Error"
    });
  }
});

assetRoutes.route("/text/delete/:id").delete(async function(req, res) {
  try {
    const data = await dal.deleteTextFile(req.params.id, req.body);
    res.status(200).json(data);
  } catch (error) {
    console.log(error);
    res.status(400).json({
      error: "Delete Text - Server Error"
    });
  }
});

assetRoutes.route("/video/delete/:id").delete(async function(req, res) {
  try {
    const data = await dal.deleteVideoFile(req.params.id, req.body);
    res.status(200).json(data);
  } catch (error) {
    console.log(error);
    res.status(400).json({
      error: "Delete Video - Server Error"
    });
  }
});

assetRoutes.route("/picture/checkout/").put(async function(req, res) {
  try {
    const data = await dal.checkoutPicture(req.body);
    res.status(200).json(data);
  } catch (error) {
    console.log(error);
    res.status(400).json({
      error: "Picture Checkout : Server Error"
    });
  }
});

assetRoutes.route("/text/checkout/").put(async function(req, res) {
  try {
    const data = await dal.checkoutText(req.body);
    res.status(200).json(data);
  } catch (error) {
    console.log(error);
    res.status(400).json({
      error: "Text Checkout : Server Error"
    });
  }
});

assetRoutes.route("/video/checkout/").put(async function(req, res) {
  try {
    const data = await dal.checkoutVideo(req.body);
    res.status(200).json(data);
  } catch (error) {
    console.log(error);
    res.status(400).json({
      error: "Video Checkout : Server Error"
    });
  }
});

assetRoutes.route("/text/edit/").post(async function(req, res) {
  try {
    const data = await dal.editTextFile(req.body._id, req.body);
    res.status(200).json(data);
  } catch (error) {
    console.log(error);
    res.status(400).json({
      error: "Edit Text - Server Error"
    });
  }
});

assetRoutes.route("/picture/edit/").post(async function(req, res) {
  try {
    const data = await dal.editPictureFile(req.body._id, req.body);
    res.status(200).json(data);
  } catch (error) {
    console.log(error);
    res.status(400).json({
      error: "Edit Picture - Server Error"
    });
  }
});

assetRoutes.route("/video/edit/").post(async function(req, res) {
  try {
    const data = await dal.editVideoFile(req.body._id, req.body);
    res.status(200).json(data);
  } catch (error) {
    console.log(error);
    res.status(400).json({
      error: "Edit Video - Server Error"
    });
  }
});

assetRoutes.route("/addText").post(async function(req, res) {
  try {
    const data = await dal.addTextFile(req.body);
    res.status(200).json(data);
  } catch (error) {
    console.log(error);
    res.status(400).json({
      error: "Add Text - Server Error"
    });
  }
});

assetRoutes.route("/addPicture").post(async function(req, res) {
  try {
    const data = await dal.addPictureFile(req.body);
    res.status(200).json(data);
  } catch (error) {
    console.log(error);
    res.status(400).json({
      error: "Add Picture - Server Error"
    });
  }
});

assetRoutes.route("/addVideo").post(async function(req, res) {
  try {
    const data = await dal.addVideoFile(req.body);
    res.status(200).json(data);
  } catch (error) {
    console.log(error);
    res.status(400).json({
      error: "Add Video - Server Error"
    });
  }
});

assetRoutes
  .route("/searchPictureTitleQuery/:searchTerm")
  .get(async function(req, res) {
    try {
      const { searchTerm } = req.params;
      const data = await dal.searchPictureTitleQuery(searchTerm);
      res.status(200).json(data);
    } catch (error) {
      console.log(error);
      res.status(400).json({
        error: "Search Picture Title - Server Error"
      });
    }
  });

assetRoutes
  .route("/searchPictureKeywordsQuery/:searchTerm")
  .get(async function(req, res) {
    try {
      const { searchTerm } = req.params;
      const data = await dal.searchPictureKeywordsQuery(searchTerm);
      res.status(200).json(data);
    } catch (error) {
      console.log(error);
      res.status(400).json({
        error: "Search Picture Keywords - Server Error"
      });
    }
  });

assetRoutes
  .route("/searchPictureAuthorQuery/:searchTerm")
  .get(async function(req, res) {
    try {
      const { searchTerm } = req.params;
      const data = await dal.searchPictureAuthorQuery(searchTerm);
      res.status(200).json(data);
    } catch (error) {
      console.log(error);
      res.status(400).json({
        error: "Search Picture Author - Server Error"
      });
    }
  });

assetRoutes
  .route("/searchTextTitleQuery/:searchTerm")
  .get(async function(req, res) {
    try {
      const { searchTerm } = req.params;
      const data = await dal.searchTextTitleQuery(searchTerm);
      res.status(200).json(data);
    } catch (error) {
      console.log(error);
      res.status(400).json({
        error: "Search Text Title - Server Error"
      });
    }
  });

assetRoutes
  .route("/searchTextKeywordsQuery/:searchTerm")
  .get(async function(req, res) {
    try {
      const { searchTerm } = req.params;
      const data = await dal.searchTextKeywordsQuery(searchTerm);
      res.status(200).json(data);
    } catch (error) {
      console.log(error);
      res.status(400).json({
        error: "Search Text Keywords - Server Error"
      });
    }
  });

assetRoutes
  .route("/searchTextAuthorQuery/:searchTerm")
  .get(async function(req, res) {
    try {
      const { searchTerm } = req.params;
      const data = await dal.searchTextAuthorQuery(searchTerm);
      res.status(200).json(data);
    } catch (error) {
      console.log(error);
      res.status(400).json({
        error: "Search Text Author - Server Error"
      });
    }
  });

assetRoutes
  .route("/searchVideoTitleQuery/:searchTerm")
  .get(async function(req, res) {
    try {
      const { searchTerm } = req.params;
      const data = await dal.searchVideoTitleQuery(searchTerm);
      res.status(200).json(data);
    } catch (error) {
      console.log(error);
      res.status(400).json({
        error: "Search Video Title - Server Error"
      });
    }
  });

assetRoutes
  .route("/searchVideoKeywordsQuery/:searchTerm")
  .get(async function(req, res) {
    try {
      const { searchTerm } = req.params;
      const data = await dal.searchVideoKeywordsQuery(searchTerm);
      res.status(200).json(data);
    } catch (error) {
      console.log(error);
      res.status(400).json({
        error: "Search Video Keywords - Server Error"
      });
    }
  });

assetRoutes
  .route("/searchVideoAuthorQuery/:searchTerm")
  .get(async function(req, res) {
    try {
      const { searchTerm } = req.params;
      const data = await dal.searchVideoAuthorQuery(searchTerm);
      res.status(200).json(data);
    } catch (error) {
      console.log(error);
      res.status(400).json({
        error: "Search Video Author - Server Error"
      });
    }
  });

app.use("/assets", assetRoutes);

app.listen(PORT, function() {
  console.log("Server is running on Port: " + PORT);
});
