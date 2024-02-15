const express = require('express');
const router = express .Router();
const createServiceBasedSchema = require("../../models/serviceModel");
 router.post('/create/newserviceType/:serviceName',async(req,res)=>{
   try {
      const serviceName = req.params.serviceName;
      const { data } = req.body;
  
      const ServiceModel = createServiceBasedSchema(serviceName);
  
      const serviceCollections = await ServiceModel.create({ data });
      const ServiceCollectionModel = createServicesCollection(serviceName);
     const existingServiceCollection = await ServiceCollectionModel.findOne({serviceTypeName: serviceName});
     if(existingServiceCollection){
      existingServiceCollection.serviceNameCollection.push(serviceCollections._id);
      await existingServiceCollection.save();
     }else{
       const newServiceCollection = await ServiceCollectionModel.create({
        serviceTypeName: serviceName,
        serviceNameCollection:serviceCollections._id
       });
       await newServiceCollection.save();
     }
      return res.status(200).json({ serviceCollections });
    } catch (error) {
      return res.status(500).json({message: error.message});
    }
 });

 module.exports =router;