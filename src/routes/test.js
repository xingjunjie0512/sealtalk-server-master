var APIResult, Cache, Config, Session, User, Utility, _, co, express, moment, qiniu, ref, regionMap, router, sequelize;

express = require('express');

co = require('co');

_ = require('underscore');

moment = require('moment');

rongCloud = require('rongcloud-sdk');

qiniu = require('qiniu');

Config = require('../conf');

Cache = require('../util/cache');

Session = require('../util/session');

Utility = require('../util/util').Utility;

APIResult = require('../util/util').APIResult;

ref = require('../db'), sequelize = ref[0], User = ref[1];

rongCloud.init(Config.RONGCLOUD_APP_KEY, Config.RONGCLOUD_APP_SECRET);

router = express.Router();

validator = sequelize.Validator;

regionMap = {
    '86': 'zh-CN'
};


router.get('/mytest', function(req, res, next) {
    var str;
    str=req.query.id;
    str = Utility.decodeIds(str);
    //userId = req.params.id;
    //userId = Utility.decodeIds(userId);
    return User.findOne({
        where: {
            id: str
        },
        attributes: ['id', 'passwordHash', 'passwordSalt', 'nickname', 'portraitUri', 'rongCloudToken']
    }).then(function(user) {
        var results;
        if (!user) {

            return res.send(new APIResult(200, str));
            //return res.status(404).send('Unknown user9.');
        }
        results = Utility.encodeResults(user);
        Cache.set("user_" + str, results);
        return res.send(new APIResult(200, results));
    });

});
module.exports = router;