const Banner = require("./banner.schema");

const add = (req, res) => {
  const fetchedData = { ...req.body };
  fetchedData.image = {};
  fetchedData.logo = {};
  req.files.forEach((file) => {
    if (file.fieldname === "imageFile") {
      fetchedData.image = {
        name: file.originalname,
        src: file.path,
      };
    } else {
      fetchedData.logo = {
        name: file.originalname,
        src: file.path,
      };
    }
  });

  const data = new Banner(fetchedData);
  data
    .save()
    .then((result) => {
      return res.status(200).json({
        status: true,
        message: "Added data successfully",
        data: result,
      });
    })
    .catch((err) => {
      console.log(err);
      return res.status(500).json({
        status: false,
        message: err,
      });
    });
};

const get = (req, res) => {
  Banner.find()
    .then((result) => {
      return res.status(200).json({
        status: true,
        message: "Added data successfully",
        data: result,
      });
    })
    .catch((err) => {
      console.log(err);
      return res.status(500).json({
        status: false,
        message: err,
      });
    });
};

const getByName = (req, res) => {
  console.log(req.params.name);
  Banner.findOne({ bannerName: req.params.name })
    .then((result) => {
      return res.status(200).json({
        status: true,
        message: "Added data successfully",
        data: result,
      });
    })
    .catch((err) => {
      console.log(err);
      return res.status(500).json({
        status: false,
        message: err,
      });
    });
};

const update = async (req, res) => {
  let data;
  if (req.files) {
    let category = await Banner.findById(req.body.id);
    data = { ...category._doc };
    console.log(data);
    if (parseInt(req.body.index) === 0) {
      console.log("reached here");
      data.image = {
        name: req.files[0].originalname,
        src: req.files[0].path,
      };
    } else {
      data.logo = {
        name: req.files[0].originalname,
        src: req.files[0].path,
      };
    }
  } else {
    data = { ...req.body.data };
  }
  // console.log(data);
  Banner.findOneAndUpdate({ _id: req.body.id }, data, {
    new: true,
  })
    .then((result) => {
      return res.status(200).json({
        status: true,
        message: "Updated data successfully",
        data: result,
      });
    })
    .catch((err) => {
      console.log(err);
      return res.status(500).json({
        status: false,
        message: err,
      });
    });
};

const deletee = (req, res) => {
  Banner.findByIdAndDelete({ _id: req.body._id })
    .then(() => {
      return res.status(200).json({
        status: true,
        message: "Deleted data successfully",
      });
    })
    .catch((err) => {
      console.log(err);
      return res.status(500).json({
        status: false,
        message: err,
      });
    });
};

module.exports = {
  add,
  update,
  get,
  deletee,
  getByName,
};
