import { verify } from "../services/Jwt";
import config from "../../config/config";


/*
Created By: Tej Mhatre
Description: access token validation
*/

export default function (req, res, next) {
    
    if(config.isAuthorized){
        var token;
        //Check if authorization header is present
        if (req.headers && req.headers.authorization) {
            //authorization header is present
            var parts = req.headers.authorization.split(" ");
            if (parts.length == 2) {
                var scheme = parts[0];
                var credentials = parts[1];
                if (/^Bearer$/i.test(scheme)) {
                    token = credentials;
                }
            } else {
                return res.json(401, { err: "Format is Authorization: Bearer [token]" });
            }
        } else {
            //authorization header is not present
            return res.status(401).json({ err: "No Authorization header was found" });
        }
  
        verify(token, function (err, decoded) {
            if (err) {
                return res.json(401, { err: "Invalid token" });
            }
            if(req.cookies.token && token == req.cookies.token){
                req.user = decoded;
                next();
            }else{
                return res.json(401, { err: "Invalid token" });
            }   
        });
     }else{
        next();
     }
    
};
