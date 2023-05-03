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
  const { name, comment } = req.body;
  commentServices.insertComment({ name, comment });
  res.json()
}

async function getCommentByName (req, res) {
    if (ObjectId.isValid(req.params.name)) {
        let comment = await comment.Services.findName(req.params.name)
        res.json(comment)
    } else {
        res.status(404).send("Object Not Found")
    }
}

module.exports = {
  getAllComments,
  postAddComments,
  getComment,
  getCommentByName,
}