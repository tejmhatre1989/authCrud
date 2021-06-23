import Todo from "../models/Todo";
import {  err500S, allFieldsRequiredS } from '../services/ErrorFn';


// list the blog items

export async function list(req,res){
    try{
    const user = JSON.parse(Buffer.from(req.cookies.user, "base64").toString("ascii"));
        if(user._id){
            await Todo.find({createdBy:user._id}, function (err, data) {
                if (err){
                    return err500S(res, err);
                }
                return res.status(200).json({
                    status:true,
                    data:data
                })
            });
        }
    } catch (err) {
        return err500S(res, err);
    }
} 


// create blog 

export async function create(req,res){
    try{
        if(!req.body.title && !req.body.description){
            return allFieldsRequiredS(res);
        }
            const user = JSON.parse(Buffer.from(req.cookies.user, "base64").toString("ascii"));
            let data = {
                title:req.body.title,
                description:req.body.description,
                createdBy:user._id,
                updatedBy:user._id
            };
    
            await Todo.create(data, function (err, data) {
                if (err) {
                    return err500S(res, err);
                }
                return res.status(200).json({
                    message:'Blog Created Successfully',
                    data:data
                })
            });



        } catch (err) {
            return err500S(res, err);
        }
}

// edit blog 

export async function edit(req,res){
    try{
        if(!req.body.id && !req.body.title && !req.body.description){
                return allFieldsRequiredS(res);
        }
            const user = JSON.parse(Buffer.from(req.cookies.user, "base64").toString("ascii"));
            let data = {
                title:req.body.title,
                description:req.body.description,
                updatedBy:user._id
            };
            await Todo.updateOne({ _id: req.body.id,createdBy:user._id }, data, {
                $set: data
            }, function (err, obj) {
                if (err) {
                    return err500S(res, err);
                }
                if(obj.nModified == 1){
                    return res.status(200).json({
                        message:'Blog Updated Successfully'
                    });
                }
            });
        } catch (err) {
            return err500S(res, err);
        }
}


// delete blog 

export async function remove(req,res){
    try{
        if(!req.body.id){
            return allFieldsRequiredS(res);
        }
            const user = JSON.parse(Buffer.from(req.cookies.user, "base64").toString("ascii"));

                await Todo.remove({_id:req.body.id,createdBy:user._id}, function (err) {
                    if (err) {
                        return err500S(res, err);
                    }
                        return res.status(200).json({
                            message:'Blog Deleted Successfully'
                        });
                });

        } catch (err) {
            return err500S(res, err);
        }
}