const { User } = require('../../models/user');
const path = require('path');
const fs = require('fs/promises');
const Jimp = require('jimp');

//адрес к папке проекта в которую будем сохранять изображение
const avatarsDir = path.join(__dirname, '../../', 'public', 'avatars'); //C:\Users\User\Desktop\nodejs-homework-rest-api\public\avatars

const updateAvatar = async (req, res, next) => {
  // req.file - объект мидлвары upload, имеет свойства path: и originalname:
  const { path: tempUpload, originalname } = req.file; //переименовываем path: на tempUpload

  // req.user - объект мидлвары auth, имеет свойства _id:
  const { _id: id } = req.user; //переименовываем _id: на id

  const imageName = `${id}_${originalname}`; //id пользователя_оригинальное имя файла(картинки)

  try {
    const resultUpload = path.join(avatarsDir, imageName);

    await fs.rename(tempUpload, resultUpload); //Метод fs.rename() используется для асинхронного переименования файла по указанному старому пути в заданный новый путь. Он перезапишет файл назначения, если он уже существует.

    const image = await Jimp.read(resultUpload);
    image.resize(250, 250);

    const avatarURL = path.join('public', 'avatars', imageName);

    await User.findByIdAndUpdate(req.user._id, { avatarURL }); //в первом параметре находит объект по req.user._id во втором параметре что обновить у этого объекта

    res.json({
      ResponseBody: {
        avatarURL,
      },
    });
  } catch (error) {
    await fs.unlink(tempUpload);
    throw error;
  }
};

module.exports = updateAvatar;
