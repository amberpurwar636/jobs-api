const express=require('express');
const router=express.Router()
const {getalljobs,
    createjob,
    getjob,
    updatejob,
    deletejob}=require('../controllers/jobs')

router.route('/').get(getalljobs).post(createjob);
router.route('/:id').get(getjob).patch(updatejob).delete(deletejob);

module.exports=router;