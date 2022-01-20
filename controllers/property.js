
import Property from "../models/Property.js";
import { get_signed_token } from "../util/getsingedtoken.js";
import { sendEmail } from "../util/sendEmail.js";

export const createProperty = async (req, res) => {
  const { 
      type,
      name,
      description,
      numberOfRooms,
      phone,
      address,
      location
        } = req.body


    //**TODO a way to check if the property  exists */
  try {
    const newProperty = await Property.create({
        type,
        name,
        description,
        numberOfRooms,
        phone,
        address,
        location
    });
    res.json({
        "success":"true",
        message:"Property created successfully",
        data:{
            property:newProperty
        }
        

    }).status(200)
  } catch (error) {
      console.log(error)
      res.json({
          success:"false",
          "message":error.message
      }).status(201);
      return

  }

};


export const updateProperty = async (req,res) =>{

    const { _id ,
        type,
        name,
        description,
        numberOfRooms,
        phone,
        address,
        location
        } = req.body

        try {
            await Property.findByIdAndUpdate(
                {_id},
                {$set:{
                    type,
                    name,
                    description,
                    numberOfRooms,
                    phone,
                    address,
                    location
                }
                }
            )
             return res.json({
                success:true,
                message:"Property Updated SuccessFully"
            })
        } catch (error) {
            return res.json({
                success:false,
                message:error.message
            })
            
        }

}

export const deleteProperty = async (req,res) =>{

    let {_id} = req.query
    

    try {
        await Property.findByIdAndDelete(
            {_id},
        )
        return  res.json({
            success:true,
            message:"Property deleted successfully"
        })
        
    } catch (error) {
        return res.json({
            success:false,
            message:"failed to delete",
            error:error.message
        })
    }

}

export const getProperty = async (req,res) =>{

    let foundProperty
    
    try {
        foundProperty = await Property.findOne({
            _id:req.query
        })

        if(!foundProperty){
            return res.json({
                success:false,
                message:"No Property found"
            })
        }

        return res.json({
            success:true,
            message:'Property found',
            data:{
                property:foundProperty
            }
        })
    } catch (error) {
        return res.json({
            success:false,
            message:`${error.message}`
        }) 
    }
}

export const getAllProperties = async (req,res) =>{
    
    try {
        let foundProperties = await Property.find({
            
        })
        return res.json({
            success:true,
            message:'Properties found',
            data:{
                Propertys:foundProperties
            }
        })
    } catch (error) {
        return res.json({
            success:false,
            message:`${error.message}`
        }) 
    }
}

// forget the password




