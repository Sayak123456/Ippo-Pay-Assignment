const router = require('express').Router();
const Password = require('../model/password');

router.post('/save', async (req, res) => {
    try{
        const { text, isStrong, distanceFromStrong } = req.body;
        
        const newPassword = new Password({
            text, isStrong, distanceFromStrong
        });

        await newPassword.save();

        res.json({
            msg: "Save Successfull!",
            newPassword
        });
    } catch (err) {
        return res.status(500).json({msg: err.message});
    }
});

module.exports = router;