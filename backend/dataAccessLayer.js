const mongoose = require("mongoose");
let Text = require("./models/text.model");
let Picture = require("./models/picture.model");
let Video = require("./models/video.model");
let User = require("./models/user.model");
let UserSession = require("./models/userSession.model");

mongoose.connect("mongodb://127.0.0.1:27017/assets", { useNewUrlParser: true });
const connection = mongoose.connection;

connection.once("open", function() {
  console.log("MongoDB database connection established successfully");
});

module.exports = {
  getAllTextFiles: async => {
    return new Promise((resolve, reject) => {
      Text.find(function(err, assets) {
        if (err) {
          reject("Get All Files : Server Error");
        } else {
          resolve(assets);
        }
      });
    });
  },

  getAllPictureFiles: async => {
    return new Promise((resolve, reject) => {
      Picture.find(function(err, assets) {
        if (err) {
          reject("Get Pictures: Server Error");
        } else {
          resolve(assets);
        }
      });
    });
  },

  getAllVideoFiles: async => {
    return new Promise((resolve, reject) => {
      Video.find(function(err, assets) {
        if (err) {
          reject("Get Videos : Server Error");
        } else {
          resolve(assets);
        }
      });
    });
  },

  getTextFile: async id => {
    return new Promise((resolve, reject) => {
      Text.findById(id, function(err, assets) {
        if (err) {
          reject("Get Text Files : Server Error");
        } else {
          resolve(assets);
        }
      });
    });
  },

  getPictureFile: async id => {
    return new Promise((resolve, reject) => {
      Picture.findById(id, function(err, assets) {
        if (err) {
          reject("Get Picture File : Server Error");
        } else {
          resolve(assets);
        }
      });
    });
  },

  getVideoFile: async id => {
    return new Promise((resolve, reject) => {
      Video.findById(id, function(err, assets) {
        if (err) {
          reject("Get Video File : Server Error");
        } else {
          resolve(assets);
        }
      });
    });
  },

  deletePictureFile: async id => {
    return new Promise((resolve, reject) => {
      Picture.findByIdAndRemove({ _id: id }, function(err, business) {
        if (err) {
          reject("Delete Picture : Server Error");
        } else {
          resolve("Successfully removed Picture file!");
        }
      });
    });
  },

  deleteTextFile: async id => {
    return new Promise((resolve, reject) => {
      Text.findByIdAndRemove({ _id: id }, function(err, business) {
        if (err) {
          reject("Delete Text File : Server Error");
        } else {
          resolve("Successfully removed Text file!");
        }
      });
    });
  },

  deleteVideoFile: async id => {
    return new Promise((resolve, reject) => {
      Video.findByIdAndRemove({ _id: id }, function(err, business) {
        if (err) {
          reject("Delete Video : Server Error");
        } else {
          resolve("Successfully removed Video file!");
        }
      });
    });
  },

  checkoutPicture: async body => {
    return new Promise((resolve, reject) => {
      Picture.findById(body.fileId, function(err, _picture) {
        if (err) {
          reject("Picture Checkout : Server Error");
        } else {
          if (_picture.isCheckedout) {
            resolve(_picture);
          } else {
            Picture.findOneAndUpdate(
              { _id: _picture._id },
              {
                $set: {
                  isCheckedout: true,
                  isCheckedoutBy: body.userId
                }
              },
              { new: true },
              (error, updated) => {
                if (error) {
                  reject(error);
                } else {
                  resolve(updated);
                }
              }
            );
          }
        }
      });
    });
  },

  checkoutText: async body => {
    return new Promise((resolve, reject) => {
      Text.findById(body.fileId, function(err, _text) {
        if (err) {
          reject("Text Checkout : Server Error");
        } else {
          if (_text.isCheckedout) {
            resolve(_text);
          } else {
            Text.findOneAndUpdate(
              { _id: _text._id },
              {
                $set: {
                  isCheckedout: true,
                  isCheckedoutBy: body.userId
                }
              },
              { new: true },
              (error, updated) => {
                if (error) {
                  reject(error);
                } else {
                  resolve(updated);
                }
              }
            );
          }
        }
      });
    });
  },

  checkoutVideo: async body => {
    return new Promise((resolve, reject) => {
      Video.findById(body.fileId, function(err, _video) {
        if (err) {
          reject("Video Checkout : Server Error");
        } else {
          if (_video.isCheckedout) {
            resolve(_video);
          } else {
            Video.findOneAndUpdate(
              { _id: _video._id },
              {
                $set: {
                  isCheckedout: true,
                  isCheckedoutBy: body.userId
                }
              },
              { new: true },
              (error, updated) => {
                if (error) {
                  reject(error);
                } else {
                  resolve(updated);
                }
              }
            );
          }
        }
      });
    });
  },

  editTextFile: async (id, body) => {
    return new Promise((resolve, reject) => {
      let text = new Text(body);

      Text.findByIdAndUpdate(id, { $set: text }, function(err, asset) {
        if (err) {
          reject("Edit Text File : Server Error");
        } else {
          resolve("Successfully updated Text file!");
        }
      });
    });
  },

  editPictureFile: async (id, body) => {
    return new Promise((resolve, reject) => {
      let picture = new Picture(body);

      Picture.findByIdAndUpdate(id, { $set: picture }, function(err, asset) {
        if (err) {
          reject("Edit Picture : Server Error");
        } else {
          resolve("Successfully updated Picture file!");
        }
      });
    });
  },

  editVideoFile: async (id, body) => {
    return new Promise((resolve, reject) => {
      let video = new Video(body);

      Video.findByIdAndUpdate(id, { $set: video }, function(err, asset) {
        if (err) {
          reject("Edit Video : Server Error");
        } else {
          resolve("Successfully updated Video file!");
        }
      });
    });
  },

  addTextFile: async body => {
    return new Promise((resolve, reject) => {
      let text = new Text(body);

      text
        .save()
        .then(asset => {
          resolve({ Text: "Text file added successfully" });
          console.log(asset);
        })
        .catch(err => {
          reject("Adding new Text file failed");
          console.log(err);
        });
    });
  },

  addPictureFile: async body => {
    return new Promise((resolve, reject) => {
      let picture = new Picture(body);

      picture
        .save()
        .then(asset => {
          resolve({ Picture: "Picture file added successfully" });
          console.log(asset);
        })
        .catch(err => {
          reject("Adding new Picture file failed");
          console.log(err);
        });
    });
  },

  addVideoFile: async body => {
    return new Promise((resolve, reject) => {
      let video = new Video(body);

      video
        .save()
        .then(asset => {
          resolve({ Video: "Video file added successfully" });
          console.log(asset);
        })
        .catch(err => {
          reject("Adding new Video file failed");
          console.log(err);
        });
    });
  },

  searchPictureTitleQuery: async term => {
    return new Promise((resolve, reject) => {
      Picture.find({ "newest_version.asset_title": term }, (err, pictures) => {
        if (err) {
          reject(err);
        } else {
          resolve(pictures);
        }
      });
    });
  },

  searchPictureKeywordsQuery: async term => {
    return new Promise((resolve, reject) => {
      Picture.find(
        { "newest_version.asset_keywords": term },
        (err, pictures) => {
          if (err) {
            reject(err);
          } else {
            resolve(pictures);
          }
        }
      );
    });
  },

  searchPictureAuthorQuery: async term => {
    return new Promise((resolve, reject) => {
      Picture.find({ "newest_version.asset_author": term }, (err, pictures) => {
        if (err) {
          reject(err);
        } else {
          resolve(pictures);
        }
      });
    });
  },

  searchTextTitleQuery: async term => {
    return new Promise((resolve, reject) => {
      Text.find({ "newest_version.asset_title": term }, (err, texts) => {
        if (err) {
          reject(err);
        } else {
          resolve(texts);
        }
      });
    });
  },

  searchTextKeywordsQuery: async term => {
    return new Promise((resolve, reject) => {
      Text.find({ "newest_version.asset_keywords": term }, (err, texts) => {
        if (err) {
          reject(err);
        } else {
          resolve(texts);
        }
      });
    });
  },

  searchTextAuthorQuery: async term => {
    return new Promise((resolve, reject) => {
      Text.find({ "newest_version.asset_author": term }, (err, texts) => {
        if (err) {
          reject(err);
        } else {
          resolve(texts);
        }
      });
    });
  },

  searchVideoTitleQuery: async term => {
    return new Promise((resolve, reject) => {
      Video.find({ "newest_version.asset_title": term }, (err, videos) => {
        if (err) {
          reject(err);
        } else {
          resolve(videos);
        }
      });
    });
  },

  searchVideoKeywordsQuery: async term => {
    return new Promise((resolve, reject) => {
      Video.find({ "newest_version.asset_keywords": term }, (err, videos) => {
        if (err) {
          reject(err);
        } else {
          resolve(videos);
        }
      });
    });
  },

  searchVideoAuthorQuery: async term => {
    return new Promise((resolve, reject) => {
      Video.find({ "newest_version.asset_author": term }, (err, videos) => {
        if (err) {
          reject(err);
        } else {
          resolve(videos);
        }
      });
    });
  },

  //AUTHENTICATION //
  signIn: data => {
    return new Promise((resolve, reject) => {
      const { password } = data;
      let { email } = data;

      if (!email) {
        resolve({
          success: false,
          message: "Error: Email cannot be blank!"
        });
      }

      if (!password) {
        resolve({
          success: false,
          message: "Error: Password cannot be blank!"
        });
      }

      email = email.toLowerCase();
      email = email.trim();

      User.find({ email: email }, (err, users) => {
        if (err) {
          reject({
            success: false,
            message: err
          });
        }

        if (users.length != 1) {
          resolve({
            success: false,
            message: "Error: Invalid user!"
          });
        } else {
          const user = users[0];
          if (!user.password === password) {
            resolve({
              success: false,
              message: "Error: Invalid password!"
            });
          }

          const userSession = new UserSession();
          userSession.userId = user._id;
          userSession.save((err, doc) => {
            if (err) {
              reject({
                success: false,
                message: "Error: server error!"
              });
            }
            resolve({
              success: true,
              message: "Successfull - Valid Sign In",
              token: doc._id,
              user: user
            });
          });
        }
      });
    });
  },

  logOut: async (req, res) => {
    return new Promise((resolve, reject) => {
      const { query } = req;
      const { token } = query;

      UserSession.findOneAndUpdate(
        {
          _id: token,
          isDeleted: false
        },
        {
          $set: {
            isDeleted: true
          }
        },
        null,
        (err, sessions) => {
          if (err) {
            reject({
              success: false,
              message: "Error: server error!"
            });
          }
          resolve({
            success: true,
            message: "Successfull - Valid Log Out"
          });
        }
      );
    });
  }
};
