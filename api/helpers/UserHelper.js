/**
 * User Helper
 * @author :: Tej Mhatre
 */

 import  User  from "../models/User";
import {  err500S } from '../services/ErrorFn';
import bcrypt from "bcryptjs";

    /*
      Created By: Tej Mhatre
      Description: Add user
    */

  export const registerUserH = async function (req, res, callback) {
        try {
            await User.create({
                firstName: req.body.firstName,
                middleName: req.body.middleName,
                lastName: req.body.lastName,
                emailId: req.body.emailId,
                password: req.body.password
            }, function (err, data) {
                if (err) {
                    return err500S(res, err);
                }
                callback(err, true, data)
            });
        } catch (err) {
            return err500S(res, err);
        }
    }
    /*
Created By: Tej Mhatre
Description: update user
*/
export const updateUser = async function (req, res, callback) {

        var user = JSON.parse(Buffer.from(req.cookies.user, "base64").toString("ascii"))
        try {
            let data = {
                firstName: req.body.firstName,
                middleName: req.body.middleName,
                lastName: req.body.lastName,
                emailId: req.body.emailId,
                updatedBy: user._id
            }
            if (req.body.pwUpdateStatus == '1') {

                let salt = await bcrypt.genSaltSync(10);
                let hash = await bcrypt.hashSync(req.body.password, salt);

                data.password = hash
            }

            await User.updateOne({ _id: req.body.userId }, data, {
                $set: data
            }, function (err, obj) {
                if (err) {
                    return err500S(res, err);
                }
                callback(err, true, obj)
            });
        } catch (err) {
            return err500S(res, err);
        }
    }

