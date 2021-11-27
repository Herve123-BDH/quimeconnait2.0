const { isValidObjectId } = require('mongoose');
const UserModel = require('../models/usermodel');

//creer un compte
    module.exports.signUp = async (req, res) => {
        const { nom, email, password, friend, response } = req.body
        try {
            const user = await UserModel.create({ nom, email, password, friend, response })
            res.status(200).json({user: user._id})
        }
        catch (err) {
            res.status(201).send({err:  err})
        }
}
//se connecter
module.exports.signIn = async (req, res) => {
    const { email, password } = req.body
    try {
        const user = await UserModel.login(email, password);
        res.status(200).json({user: user.nom, id: user.id, friendAmrx: user.friendAmrx, friendAmitier: user.friendAmitier})
    }
    catch (err) {
        res.status(201).send({err:  "email  ou mot  de passe incorrect"})
    }
}
//ajouter un utilisateur dans amoureux
module.exports.User = async (req, res) => {
    const friendAmrxs = {friendAmrx: req.body.friendAmrx}
    console.log(friendAmrxs);
    try {
        await UserModel.findOneAndUpdate({ id: req.params.id }, { $push : friendAmrxs})
        res.status(200).json({msg:"cool"})
        }
    
    catch (err){
        return res.status(500).json({ msg: "err"})
    }
}
//ajouter un utilisateur dans amitiers
module.exports.Users = async (req, res) => {
    const friendAmitiers = {friendAmitier: req.body.friendAmitier}
    console.log(friendAmitiers);
    try {
        await UserModel.findOneAndUpdate({ id: req.params.id }, { $push : friendAmitiers})
        res.status(200).json({msg:"cool"})
        }
    
    catch (err){
        return res.status(500).json({ msg: "err"})
    }
}

//ajouter une reponse dans amoureux
module.exports.Ans = async (req, res) => {
    const responseAmrxs = {responseAmrx: [req.body.responseAmrx]}
    console.log(responseAmrxs);
    try {
        await UserModel.findOneAndUpdate({ id: req.params.id }, { $push : responseAmrxs})
        res.status(200).json({msg:cool})
        }
    
    catch (err){
        return res.status(500).json({ msg: err})
    }
}
//ajouter une reponse dans amitier
module.exports.An = async (req, res) => {
    const responseAmitiers = {responseAmitier: [req.body.responseAmitier]}
    console.log(responseAmitiers);
    try {
        await UserModel.findOneAndUpdate({ id: req.params.id }, { $push : responseAmitiers})
        res.status(200).json({msg:cool})
        }
    
    catch (err){
        return res.status(500).json({ msg: err})
    }
}
//recevoir les reponses amoureux
module.exports.Response = async (req, res) => {
    try {
        await UserModel.findOne({
            user: req.params.id
        }).then(profile => {
    if (!profile) {
        return res.status(404).json({ error: "No Profile Found" });
    }
    else {
        res.json(profile.responseAmrx);
    }
    }).catch(err => {
    console.log(err);
    })
    }
    catch(err) {
        return res.status(500).json({msg:err})
    }
}
//recevoir les reponses amtitiers
module.exports.Respond = async (req, res) => {
    try {
        await UserModel.findOne({
            user: req.params.id
        }).then(profile => {
    if (!profile) {
        return res.status(404).json({ error: "No Profile Found" });
    }
    else {
        res.json({reponse: profile.responseAmitier, id:profile._id})
    }
    }).catch(err => {
    console.log(err);
    })
    }
    catch(err) {
        return res.status(500).json({msg:err})
    }
}
//recevoir les utilisateurs
module.exports.friendAmrx= async (req, res) => {
    try {
        await UserModel.findOne({
            user: req.params.id
        }).then(profile => {
    if (!profile) {
        return res.status(404).json({ error: "No Profile Found" });
    }
    else {
        res.json({amrx: profile.friendAmrx, nom:profile.nom});
    }
    }).catch(err => {
    console.log(err);
    })
    }
    catch(err) {
        return res.status(500).json({msg:err})
    }
}
//recevoir les utilisateurs
module.exports.friendAmitier= async (req, res) => {
    try {
        await UserModel.findOne({
            user: req.params.id
        }).then(profile => {
    if (!profile) {
        return res.status(404).json({ error: "No Profile Found" });
    }
    else {
        res.json({amitier: profile.friendAmitier, nom: profile.nom});
    }
    }).catch(err => {
    console.log(err);
    })
    }
    catch(err) {
        return res.status(500).json({msg:err})
    }
}