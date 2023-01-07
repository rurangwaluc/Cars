import express from 'express';
import multer from 'multer';
import multerS3 from 'multer-s3';
import aws from 'aws-sdk';
import config from '../config.js';

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/')
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}_${file.originalname}`)
  },
  fileFilter: (req, file, cb) => {
    const ext = path.extname(file.originalname)
    if (ext !== '.jpg' || ext !== '.png') {
      return cb(res.status(400).end('only jpg, png are allowed'), false);
    }
    cb(null, true)
  }
});

const upload = multer({
  storage: storage
}).single("file")


const router = express.Router();

router.post('/',  (req, res) => {
  upload(req, res, err => {
    if (err) {
      return res.json({
        success: false,
        err
      })
    }
    return res.json({
      success: true,
      image: res.req.file.path,
      fileName: res.req.file.filename
    })
  })
});

export default router;
