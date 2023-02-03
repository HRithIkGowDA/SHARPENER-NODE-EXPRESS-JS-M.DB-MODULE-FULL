const bcrypt = require("bcrypt");
const sequelize = require("../utils/database");
const jwt = require("jsonwebtoken");
const { Op } = require("sequelize");
const SECRET_KEY = process.env.SECRET_KEY;

// Models
const Group = sequelize.models.group;
const GroupUser = sequelize.models.groupUser;
const User = sequelize.models.user;
const GroupMessage = sequelize.models.groupMessage;

exports.addGroup = (req, res, next) => {
  let body = req.body;
  let token = req.headers.token;
  if (body !== undefined && token !== undefined) {
    jwt.verify(token, SECRET_KEY, async function (err, decryptToken) {
      let admin = decryptToken.userId;
      let users = body.users;
      let groupName = body.name;

      // First Create Group
      try {
        let group = await Group.create({
          name: groupName,
          creator: admin,
        });

        try {
          users.push(Number(admin));
          for (const user of users) {
            let isAdmin = decryptToken.userId === user ? true : false;
            await GroupUser.create({
              groupId: group.id,
              userId: user,
              admin: isAdmin,
            });
          }

          let groupList = await GroupUser.findAll({
            where: { groupId: group.id },
          });
          res.status(201).json({ status: "success", data: [groupList] });
        } catch (err) {
          res.status(500).json({ status: "error", message: "Server Error" });
        }
      } catch (err) {
        res.status(500).json({ status: "error", message: "Server Error" });
      }
    });
  } else {
    if (body === undefined) {
      res
        .status(205)
        .json({ status: "error", message: "Client needs to resend data" });
    } else {
      res
        .status(205)
        .json({ status: "error", message: "User not logged in yet" });
    }
  }
};

// (req, res, next) => {
//     let body = req.body;
//     let token = req.headers.token;
//     if (body !== undefined && token !== undefined) {
//    jwt.verify(token, SECRET_KEY, async function (err, decryptToken) {});
//     } else {
//       if (body === undefined) {
//         res
//           .status(205)
//           .json({ status: "error", message: "Client needs to resend data" });
//       } else {
//         res
//           .status(205)
//           .json({ status: "error", message: "User not logged in yet" });
//       }
//     }
//   };

// This is return all group associated with particular user.
exports.getUserGroupInformation = (req, res, next) => {
  let body = req.body;
  let token = req.headers.token;
  if (body !== undefined && token !== undefined) {
    jwt.verify(token, SECRET_KEY, async function (err, decryptToken) {
      if (err) {
        res.status(401).json({ status: "error", message: "token is wrong" });
      }
      let user = decryptToken.userId;

      try {
        let group = await GroupUser.findAll({
          include: {
            all: true,
          },
          where: {
            userId: user,
          },
        });

        let responseGroup = [];
        for (const data of group) {
          let id = data.dataValues.groupId;

          let group = await Group.findOne({ where: { id: id } });

          let obj = {};
          obj["group"] = group;
          obj["isAdmin"] = data.admin;
          responseGroup.push(obj);
        }

        res
          .status(200)
          .json({ status: "success", data: { groups: responseGroup } });
      } catch (err) {
        console.log(err);
        res.status(500).json({ status: "error", message: "Server Error" });
      }
    });
  } else {
    if (body === undefined) {
      res
        .status(205)
        .json({ status: "error", message: "Client needs to resend data" });
    } else {
      res
        .status(205)
        .json({ status: "error", message: "User not logged in yet" });
    }
  }
};

// This is return specific group information and it's users.
exports.getSingleGroupInformation = (req, res, next) => {
  let body = req.body;
  let token = req.headers.token;
  let groupId = req.params.id;
  if (body !== undefined && token !== undefined) {
    jwt.verify(token, SECRET_KEY, async function (err, decryptToken) {
      if (err) {
        res.status(401).json({ status: "error", message: "token is wrong" });
      }

      try {
        let groupUsers = await GroupUser.findAll({
          where: {
            groupId: groupId,
          },
        });

        let group = await Group.findOne({ where: { id: groupId } });

        res.status(200).json({
          status: "success",
          data: { group: group, user: groupUsers },
        });
      } catch (err) {
        console.log(err);
        res.status(500).json({ status: "error", message: "Server Error" });
      }
    });
  } else {
    if (body === undefined) {
      res
        .status(205)
        .json({ status: "error", message: "Client needs to resend data" });
    } else {
      res
        .status(205)
        .json({ status: "error", message: "User not logged in yet" });
    }
  }
};

exports.storeMessage = (req, res, next) => {
  let body = req.body;
  let token = req.headers.token;
  if (body !== undefined && token !== undefined) {
    jwt.verify(token, SECRET_KEY, async function (err, decryptToken) {
      if (err) {
        console.log(err);
      }

      let groupId = body.groupId;
      let userId = decryptToken.userId;
      let message = body.message;

      try {
        let messageObj = await GroupMessage.create({
          groupId: groupId,
          message: message,
          userId: userId,
        });

        res
          .status(201)
          .json({ status: "success", data: { id: messageObj.id } });
      } catch (err) {
        res.status(500).json({ status: "error", message: "Server Error" });
      }
    });
  } else {
    if (body === undefined) {
      res
        .status(205)
        .json({ status: "error", message: "Client needs to resend data" });
    } else {
      res
        .status(205)
        .json({ status: "error", message: "User not logged in yet" });
    }
  }
};

exports.getAllMessages = (req, res, next) => {
  let token = req.headers.token;
  let group = req.query.id;
  let skip = req.query.skip !== undefined ? req.query.skip : 0;
  if (token !== undefined && group) {
    jwt.verify(token, SECRET_KEY, async function (err, decryptToken) {
      if (err) {
        console.log(err);
      }

      try {
        let messageObj = await Group.findAll({
          include: {
            model: GroupMessage,
            include: { model: User, attributes: ["name", "id"] },
            where: {
              id: {
                [Op.gt]: [skip],
              },
            },
          },
          where: {
            id: group,
          },
        });

        res.status(201).json({
          status: "success",
          data: { message: messageObj, self: decryptToken.userId },
        });
      } catch (err) {
        res.status(500).json({ status: "error", message: "Server Error" });
      }
    });
  } else {
    res
      .status(205)
      .json({ status: "error", message: "User not logged in yet" });
  }
};

exports.groupFriends = (req, res, next) => {
  id = req.query.id;
  token = req.headers.token;
  if (id && token) {
    jwt.verify(token, SECRET_KEY, async function (err, decryptToken) {
      if (err) {
        res.status(205).json({ status: "error", message: "Bad token" });
      }

      let userId = decryptToken.userId;
      try {
        let group = await GroupUser.findAll({
          where: { groupId: id },
        });

        // Lets create friends and none friends list
        let friends = [];
        let notFriends = [];
        let friendsId = [];
        if (group.length > 0) {
          for (const dt of group) {
            let groupUser = dt.dataValues.userId;

            if (Number(groupUser) !== Number(userId)) {
              try {
                let user = await User.findOne({
                  where: { id: groupUser },
                  attributes: ["id", "name"],
                });

                obj = {};
                obj["user"] = user;
                obj["isAdmin"] = dt.dataValues.admin;
                friends.push(obj);
                friendsId.push(user.id);
              } catch (err) {
                res
                  .status(500)
                  .json({ status: "error", message: "Internal server error" });
              }
            }
          }
        }

        try {
          notFriends = await User.findAll({
            where: {
              id: {
                [Op.and]: {
                  [Op.notIn]: friendsId,
                  [Op.not]: userId,
                },
              },
            },
            attributes: ["id", "name"],
          });
        } catch (err) {
          res
            .status(500)
            .json({ status: "error", message: "Internal server error" });
        }
        res.status(200).json({
          status: "success",
          data: { friends: friends, notFriends: notFriends },
        });
      } catch (err) {
        res
          .status(500)
          .json({ status: "error", message: "Internal server error" });
      }
    });
  } else {
    if (!token) {
      res
        .status(403)
        .json({ status: "error", message: "You need to logged in first" });
    }

    res.status(205).json({ status: "error", message: "Can not find group id" });
  }
};

exports.removeGroupUser = (req, res, next) => {
  token = req.headers.token;
  body = req.body;
  if (id && token && body) {
    jwt.verify(token, SECRET_KEY, async function (err, decryptToken) {
      if (err) {
        res.status(205).json({ status: "error", message: "Bad token" });
      }

      try {
        let groupUser = await GroupUser.destroy({
          where: {
            groupId: body.groupId,
            userId: body.userId,
          },
        });

        res.status(201).json({ status: "success" });
      } catch (err) {
        res
          .status(500)
          .json({ status: "error", message: "Internal server error" });
      }
    });
  } else {
    if (!token) {
      res
        .status(403)
        .json({ status: "error", message: "You need to logged in first" });
    }
    if (!body) {
      res.status(205).json({ status: "error", message: "Need to resend data" });
    }
    res.status(205).json({ status: "error", message: "Can not find group id" });
  }
};

exports.addGroupUser = (req, res, next) => {
  token = req.headers.token;
  body = req.body;
  if (id && token && body) {
    jwt.verify(token, SECRET_KEY, async function (err, decryptToken) {
      if (err) {
        res.status(205).json({ status: "error", message: "Bad token" });
      }

      try {
        let groupUser = await GroupUser.create({
          groupId: body.groupId,
          userId: body.userId,
          admin: false,
        });

        res.status(201).json({ status: "success" });
      } catch (err) {
        res
          .status(500)
          .json({ status: "error", message: "Internal server error" });
      }
    });
  } else {
    if (!token) {
      res
        .status(403)
        .json({ status: "error", message: "You need to logged in first" });
    }
    if (!body) {
      res.status(205).json({ status: "error", message: "Need to resend data" });
    }
    res.status(205).json({ status: "error", message: "Can not find group id" });
  }
};

exports.adminModify = (req, res, next) => {
  token = req.headers.token;
  body = req.body;
  if (id && token && body) {
    jwt.verify(token, SECRET_KEY, async function (err, decryptToken) {
      if (err) {
        res.status(205).json({ status: "error", message: "Bad token" });
      }

      try {
        let user = await GroupUser.findOne({
          where: {
            userId: body.userId,
            groupId: body.groupId,
          },
        });

        if (user) {
          user.admin = !user.admin;

          await user.save();
        }

        res.status(201).json({ status: "success" });
      } catch (err) {
        res
          .status(500)
          .json({ status: "error", message: "Internal server error" });
      }
    });
  } else {
    if (!token) {
      res
        .status(403)
        .json({ status: "error", message: "You need to logged in first" });
    }
    if (!body) {
      res.status(205).json({ status: "error", message: "Need to resend data" });
    }
    res.status(205).json({ status: "error", message: "Can not find group id" });
  }
};
