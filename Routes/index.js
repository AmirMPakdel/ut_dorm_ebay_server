const Router = require("express").Router();
const AuthRouteHandlers = require("./Authentication");
const PostUtil = require('./PostUtil');
const ImageUtil = require('./ImageUtil');


Router.route("/signin").post(AuthRouteHandlers.sign_in);
Router.route("/signup").post(AuthRouteHandlers.sign_up);
Router.route("/newpost").post(PostUtil.createPost);
Router.route("/getposts").post(PostUtil.getPosts);
Router.route("/getmyposts").post(PostUtil.getMyPosts);
//Router.route("/viewpost").post(PostUtil.viewPost);
Router.route("/editpost").post(PostUtil.editPost);
Router.route("/deletepost").post(PostUtil.deletePost);
Router.route("/getimage").get(ImageUtil.getImage);
Router.route('/postpic').post(ImageUtil.postPic);

module.exports = Router;