import multer from 'multer';

const storage = multer.memoryStorage();
const upload = multer({
    storage,  
    fileFilter: (req, file, cb) => {
            if (file.mimetype.startsWith('image/')) {
                cb(null, true);
            } else {
                cb(new Error('Only images are allowed'));
            }
        }
});

export default upload;