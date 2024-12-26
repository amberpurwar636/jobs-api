const Job = require('../models/Job')
const { StatusCodes } = require('http-status-codes')
const { BadRequestError, NotFoundError,UnauthenticatedError } = require('../errors')

const getalljobs=async(req,res)=>{
    const jobs = await Job.find({ createdBy: req.user.userId }).sort('createdAt')
  res.status(StatusCodes.OK).json({ jobs, count: jobs.length })
}
const createjob=async(req,res)=>{
    req.body.createdBy = req.user.userId
  const job = await Job.create(req.body)
  res.status(StatusCodes.CREATED).json({ job })
}

const getjob=async(req,res)=>{
    //const job=await Job.findOne({createdBy:req.user.userId,company:req.params.company,position:req.params.position})
    const job=await Job.findOne({
        _id:req.params.id,
        createdBy:req.user.userId
    })

    if(!job){
        throw new UnauthenticatedError(`no job found with this details`)
    }
    res.status(StatusCodes.OK).json({job});
}
const updatejob = async (req, res) => {
    const job = await Job.findOneAndUpdate(
      { _id: req.params.id, createdBy: req.user.userId },
      req.body,
      { new: true, runValidators: true }
    );
  
    if (!job) {
      return res.status(404).json({ msg: `No job found with id: ${req.params.id}` });
    }
  
    res.status(200).json({ job });
  };
  
  const deletejob = async (req, res) => {
    const job = await Job.findOneAndDelete({
      _id: req.params.id,
      createdBy: req.user.userId,
    });
  
    if (!job) {
      throw new UnauthenticatedError(`No job found to delete with id: ${req.params.id}`);
    }
  
    res.status(200).send();
  };
  

module.exports={
    getalljobs,
    createjob,
    getjob,
    updatejob,
    deletejob
}

