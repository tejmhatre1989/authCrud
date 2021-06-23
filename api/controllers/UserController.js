import  User  from "../models/User";
import {  err500S, allFieldsRequiredS } from '../services/ErrorFn';
import {sign} from "../services/Jwt";
import passport from "passport";
import { registerUserH } from "../helpers/UserHelper";


export const registerUser = async function (req, res) {
    if (!req.body.firstName || !req.body.middleName || !req.body.lastName || !req.body.emailId || !req.body.password) {

        return allFieldsRequiredS(res);
    }

    registerUserH(req, res, function (err, status, data) {
        if (status) {
            return res.status(200).json({ message:'User Registered', data: data });
        }
    });
}

export const updateUser = async function (req, res) {
    if (!req.body.firstName || !req.body.middleName || !req.body.lastName || !req.body.emailId || !req.body.id) {

        return allFieldsRequiredS(res);
    }

    try {
        let data = {
            firstName: req.body.firstName,
            middleName: req.body.middleName,
            lastName: req.body.lastName,
            emailId: req.body.emailId,
        }
        if (req.body.pwUpdateStatus == '1') {

            let salt = await bcrypt.genSaltSync(10);
            let hash = await bcrypt.hashSync(req.body.password, salt);

            data.password = hash
        }

        await User.updateOne({ _id: req.body.id }, data, {
            // await User.where({ _id: req.body.userId }).updateOne({
            $set: data
        }, function (err, obj) {
            if (err) {
                return err500S(res, err);
            }
            return res.status(200).json({ message: 'User updated successfully', data: obj });
        });
    } catch (err) {
        return err500S(res, err);
    }
}


export const login = async function (req, res) {

    if (!req.body.emailId || !req.body.password) {
        return allFieldsRequiredS(res);
    }

    passport.authenticate("local", async function (err, user, info) {
        if (err || !user) {
            return res.send({
                message: info.message,
                status: info.status
            });
        }

        let maxAge = {
            expires: new Date(Number(new Date()) + 315360000000)
        }

        // Added Await to resolve the cookies issue (by Tej)
        let token = sign(user._id.toString())
        let userData = Buffer.from(JSON.stringify(user), 'ascii').toString('base64');
        await res.cookie("user", userData, maxAge);
        await res.cookie("token", token, maxAge);
        return res.status(200).json({message: 'Login Successfully',user,token, status: true });
        
    })(req, res);

}

export const userDetails = async function (req, res) {
  await User.findById(req.body.id).
        exec(function (error, f) {
            return res.status(200).json({ data: f, status: true });
        });

}

export const deleteUser = async function (req, res) {

         User.findOneAndDelete(req.body.id, function (err, docs) {
            if (err){
                console.log(err)
            }
            else{
                return res.status(200).json({ data: 'User Deleted', status: true });
            }
        });
 
 }

export const logOut = async function (req, res) {
        setTimeout(function () {
            res.clearCookie('user');
            res.clearCookie('token');
            req.logout();
            return res.status(200).json({
                message: "LogOut Successfully",
                status: true
            });
        }, 1000);
}