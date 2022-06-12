import multer from 'multer';
const imageUploadMiddleware = multer({ dest: './' + '/uploads/images' });


export default imageUploadMiddleware;