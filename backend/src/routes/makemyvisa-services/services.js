const express = require('express');
const router = express .Router();
const createServiceBasedSchema = require("../../models/serviceModel");
const createServicesCollection= require("../../models/serviceCollection");
const mongoose = require("mongoose");
 router.post('/create/newserviceType/:serviceName',async(req,res)=>{
   try {
      const serviceName = req.params.serviceName;
      const { data,customerId } = req.body;
      const ServiceModel = createServiceBasedSchema(serviceName);
  
      const serviceCollections = await ServiceModel.create({ data,customerId });
      const ServiceCollectionModel = createServicesCollection(serviceName);
     const existingServiceCollection = await ServiceCollectionModel.findOne({serviceTypeName: serviceName});
       if(!existingServiceCollection){
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


 router.get("/getservice/servicename",async(req,res)=>{
   try {
    const { serviceName,customerID} = req.body;
    const db = mongoose.connection;
   const collection = db.collection(serviceName);
    const results = await collection.find({}).toArray();
    const filteredResult = results.filter(doc => doc.customerId.equals(customerID));
    return res.status(200).json(filteredResult);
   } catch (error) {
    return res.status(500).json({message: error.message});
   }

 });
 module.exports =router;