const { Contact } = require('../../models/contact');

const getAll = async (req, res, next) => {
  try {
    const { _id } = req.user;
    const result = await Contact.find({ owner: _id }, '-createdAt -updatedAt').populate("owner", "_id email subscription" ); //в фигурных скобках задаем критерии поиска, в кавычках задаем какие свойства обьекта отображать, -скрывать.
    res.json(result);
  } catch (error) {
    next(error);
  }
};

module.exports = getAll;
