var router = {};

router.init = function (app) {
    app.get('/', function (req, res) {
        console.log(req.query.test);
        res.render('index', {});
    });
};

exports.init = router.init;
