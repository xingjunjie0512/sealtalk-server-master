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
    return User.findOne({
        where: {
           id:{$and: {a: 1}}
        },
        attributes: ['id']
    }).then(function(user) {
        var results;
        if (!user) {
            return res.status(404).send('Unknown user7.');
        }
        results = Utility.encodeResults(user);
        Cache.set("user_" + userId, results);
        return res.send(new APIResult(200, results));
    });
});
module.exports = router;