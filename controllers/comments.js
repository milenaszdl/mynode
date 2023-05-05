const commentServices = require('../services/servicefordb');
const { ObjectId } = require('mongodb');

async function getAllComments(req, res) {
  let allComments = await commentServices.findComments()
  res.json(allComments)
}

async function getComment(req, res) {
  if (ObjectId.isValid(req.params.id)) {
    let comment = await commentServices.findComment(req.params.id)
    res.json(comment)
  } else {
    res.status(404).send("Object Not Found")
  }
}

function postAddComments(req, res) {
  const commentdate = new Date();
  const { name, comment } = req.body;
  commentServices.insertComment({ name, comment, commentdate });
  res.json()
}

async function getCommentByName (req, res) {
    const apiName = req.query.apiName;
    let comment = await commentServices.findName(apiName);
    if (comment){
      res.json(comment);
    }
    else {
        res.status(404).send("Object Not Found");
    }
}

module.exports = {
  getAllComments,
  postAddComments,
  getComment,
  getCommentByName,
}