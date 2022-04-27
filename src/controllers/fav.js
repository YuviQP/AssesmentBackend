const Fav = require('../models/fav');
const User = require('../models/users');

exports.create = async (req, res) => {
  try {
    const { body, userId } = req;
    const user = await User.findById(userId);
    if(!user) {
      throw new Error('Usuario inválido.')
    }
    const fav = await Fav.create({ ...body, userId: userId });
    user.favs.push(fav._id);
    await user.save({ validateBeforeSave: false });
    res.status(201).json({ message: 'Fav creado', fav });
  } catch(e) {
    res.status(400).json({ message: e.message });
  }
};

exports.list = async (req, res) => {
    try {
      const { userId } = req;
      const favs = await Fav.find({ userId: userId });
      res.status(200).json({ message: `${favs.length} favs encontrados`, favs })
    } catch(e) {
      res.status(500).json({ message: 'Algo salió mal' })
    }
  };

  exports.show = async (req, res) => {
    const { userId } = req;
    try {
      const favs = await Fav.find({_id:req.params.Id,userId: userId});
      if(!favs) {
        throw new Error('Fav no encontrado')
      }
      res.status(200).json({ message: 'Fav encontrado', favs });
    } catch(e) {
      res.status(400).json({ message: e.message })
    }
  };

  exports.destroy = async (req, res) => {
    const { userId } = req;
    try {
      const favs = await Fav.findOneAndDelete({ _id:req.params.Id, userId: userId });
      if(!favs) {
        res.status(403).json({ message: 'El fav no pudo ser eliminado' });
        return
      }
      res.status(200).json({ message: 'El fav fue borrado', favs });
    } catch(e) {
      res.status(400).json({ message: 'El fav no pudo ser borrado' });
    }
  };