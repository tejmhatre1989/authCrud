/**
 * error response service
 * @author :: Tej Mhatre
 */

import config from "../../config/config";

  /*

    Description: response error for 500
    UseAge : err500S(res,err);
  */

 export const err500S = async function (res, err = '') {
   if(config.debug){
      console.log(err);
   }
    return res.status(500).json({
      message: "Internal server error",
      status: false
    });
  }

  /*
    Description: response error for 500
    UseAge : allFieldsRequireds(res);
  */

 export const allFieldsRequiredS = async function (res) {
    return res.status(202).json({
      message: 'All Fields required',
      status: false
    });
  }

  /*
    Description: response error for 400 , bad request
    UseAge : errorFn.err400(res,err);
  */

 export const err400S = async function (res, err = '') {
    return res.status(400).json({
      message: "Bad Request",
      status: false
    });
  }



