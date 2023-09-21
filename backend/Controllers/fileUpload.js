const File = require('../Models/File');
const cloudinary = require("cloudinary").v2;

function isFileTypeSupported(type, supportedTypes){
  return supportedTypes.includes(type);
}

async function uploadToCloudinary(file,folder){
  const options = {folder}
  console.log("temp file path", file.tempFilePath);
  options.resource_type = "auto";
  return await cloudinary.uploader.upload(file.tempFilePath, options);
}


// Video Upload route handler
exports.videoUpload = async (req, res) => {
  try {
    const { name } = req.body;

    const file = req.files.videoFile;

    // validation
    const supportedTypes = ['mp4', 'mov', 'webm'];
    const fileType = file.name.split('.')[1].toLowerCase();
    console.log("File Type --> ", fileType);

    // TODO: add a upper limit of 5 mb for a video
    if (!isFileTypeSupported(fileType, supportedTypes)) {
      return res.status(400).json({
        success: false,
        message: 'File format not supported',
      });
    }

    // file format supported hai
    console.log("uploading to project 1 : ")
    const response = await uploadToCloudinary(file, 'Project1');
    console.log(response);

    // Create a new document in the MongoDB collection
    const fileData = await File.create({
      name,
      videoUrl: response.secure_url,
    });

    res.json({
      success: true,
      videoUrl: response.secure_url,
      message: 'File uploaded successfully',
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ 
      success: false, 
      message: 'An error occurred during file upload' });
  }
};
