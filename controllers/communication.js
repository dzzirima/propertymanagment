import { sendSmsUtil } from "../util/sendSmsUtil.js";


export const sendSms = async (req,res) =>{

    const {phone,message } = req.body
    try {
       let sendingStatus = await sendSmsUtil(phone , message)

       if(sendingStatus){
           return res.status(200).json({
               success:true,
               message:'message was send successfully'
           })
           
       }
        
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:error.message
        })
        
    }

   
};


// {
//     "account_sid": "ACXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
//     "api_version": "2010-04-01",
//     "body": "McAvoy or Stewart? These timelines can get so confusing.",
//     "date_created": "Thu, 30 Jul 2015 20:12:31 +0000",
//     "date_sent": "Thu, 30 Jul 2015 20:12:33 +0000",
//     "date_updated": "Thu, 30 Jul 2015 20:12:33 +0000",
//     "direction": "outbound-api",
//     "error_code": null,
//     "error_message": null,
//     "from": "+15017122661",
//     "messaging_service_sid": "MGXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
//     "num_media": "0",
//     "num_segments": "1",
//     "price": null,
//     "price_unit": null,
//     "sid": "SMXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
//     "status": "sent",
//     "subresource_uris": {
//       "media": "/2010-04-01/Accounts/ACXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX/Messages/SMXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX/Media.json"
//     },
//     "to": "+15558675310",
//     "uri": "/2010-04-01/Accounts/ACXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX/Messages/SMXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX.json"
//   }