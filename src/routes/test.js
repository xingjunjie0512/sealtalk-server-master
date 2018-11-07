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


router.post('/mytest', function(req, res, next) {
    return res.status(403).send('aaaaaaaaaaa.');
});
module.exports = router;