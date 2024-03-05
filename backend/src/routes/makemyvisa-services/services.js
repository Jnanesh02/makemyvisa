const express = require('express');
const router = express .Router();
const createServiceBasedSchema = require("../../models/serviceModel");
const createServicesCollection= require("../../models/serviceCollection");
const mongoose = require("mongoose");
 router.post('/create/newserviceType/:serviceName',async(req,res)=>{
   try {
      const serviceName = req.params.serviceName;
      const { data,customerID } = req.body;
      const ServiceModel = createServiceBasedSchema(serviceName);
  
      const serviceCollections = await ServiceModel.create({ data,customerID});
      const ServiceCollectionModel = createServicesCollection(serviceName);
     const existingServiceCollection = await ServiceCollectionModel.findOne({serviceTypeName: serviceName});
       if(!existingServiceCollection){
        const newServiceCollection = await ServiceCollectionModel.create({
          serviceTypeName: serviceName,
          serviceNameCollection:serviceCollections._id
         });
         await newServiceCollection.save();
       }
      return res.status(200).json({ message:"successfully Created" });
    } catch (error) {
      return res.status(500).json({message: error.message});
    }
 });

 router.get("/getservices/:servicename",async(req,res)=>{
  try {
   const  serviceName  = req.params.servicename;
   const db = mongoose.connection;
  const collection = db.collection(serviceName);
   const results = await collection.find({}).toArray();
   return res.status(200).json(results);
  } catch (error) {
   return res.status(500).json({message: error.message});
  }

}); router.get("/getservice/:servicename",async(req,res)=>{
   try {
    const  serviceName  = req.params.servicename;
    const { customerID } = req.query;
    const db = mongoose.connection;
   const collection = db.collection(serviceName);
    const results = await collection.find({}).toArray();
    const filteredResult = results.filter(doc => doc.customerID.equals(customerID));
    return res.status(200).json(filteredResult);
   } catch (error) {
    return res.status(500).json({message: error.message});
   }

 });
 module.exports =router;