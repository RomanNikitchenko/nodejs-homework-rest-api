const { Contact } = require('../../models/contact');

const getAll = async (req, res, next) => {
  try {
    const result = await Contact.find({}, "-createdAt -updatedAt"); //в фигурных скобках задаем критерии поиска, в кавычках задаем какие свойства обьекта отображать, -скрывать.
    res.json(result);
  } catch (error) {
    next(error);
  }
};

module.exports = getAll;
