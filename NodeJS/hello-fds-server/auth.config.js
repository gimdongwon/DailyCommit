module.exports = {
  posts: {
    write: "ownerOnly"
  },
  comments: {
    read: "ifAuthed",
    write: 'ownerOnly'
  }
};
