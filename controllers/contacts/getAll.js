const { Contact } = require('../../models/contact');

const getAll = async (req, res, next) => {
  try {
    const { _id } = req.user;
    // пагинации - req.query вытягивает параметры запроса из поисковой строки ?page=2&limit=3
    const { page = 1, limit = 5 } = req.query;
    const skip = (page - 1) * limit
    // .find({ параметр запроса }, '-с черточкой скрыть', {skip: скрыть количество, limit показать: количество})
    const result = await Contact.find({ owner: _id }, '-createdAt -updatedAt', {skip, limit: Number(limit)}).populate("owner", "_id email subscription" );
    res.json(result);
  } catch (error) {
    next(error);
  }
};

module.exports = getAll;
