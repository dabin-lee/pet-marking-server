var express = require('express');
var router = express.Router();
const { Bookmark } = require('../models/bookmark');
const { Mustgo } = require('../models/mustgo');

router.get('/bookmark', async (req, res, next) => {
    try {
        const bookmark = await Bookmark.find({});
        res.json(bookmark);
    } catch (err) {
        console.error(err);
        next(err);
    }
});

router.delete('/bookmark', async (req, res, next) => {
    try {
        const { _id } = req.body
        // console.log('_id: ', _id);
        const bookmark = await Bookmark.deleteOne({ _id });
        res.status(204).json(bookmark)
    } catch (err) {
        console.error(err);
        next(err);
    }
});


router.post('/bookmark', function (req, res, next) {
    const bookmark = new Bookmark(req.body)
    console.log('bookmark: ', bookmark);

    bookmark.save((err, storeInfo) => {
        // console.log(storeInfo)
        if (err) return res.json({ success: false, err })
        return res.status(200).json({
            success: true,
            message: '북마크 저장 완료.'
        })
    })
});



// 추천장소
router.get('/mustgo', async (req, res, next) => {
    try {
        const mustgo = await Mustgo.find({});
        res.json(mustgo);
    } catch (err) {
        console.error(err);
        next(err);
    }
});

router.post('/mustgo', function (req, res, next) {
    const {
        address_name,
        category_group_code,
        category_name,
        id,
        phone,
        place_name,
        place_url,
        road_address_name,
        place_image,
        mapX,
        mapY
    } = req.body
    const mustgo = new Mustgo(req.body)

    mustgo.save((err, storeInfo) => {
        if (err) return res.json({ success: false, err })
        return res.status(200).json({
            success: true
        })
    })
});



module.exports = router;