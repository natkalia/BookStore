function checkEditor(req, res, next) {
  const { isEditor } = res.locals;
  console.log("from middleware editor state:", isEditor);

  if (!isEditor) return res.status(401).send("Only editor can do that!");

  next();
}

module.exports = checkEditor;
