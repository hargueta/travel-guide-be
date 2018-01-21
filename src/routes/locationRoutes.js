var express = require('express')
var router = express.Router()

var Location = require('../model/location-model')

router.get('/locations', function(request, response) {
    var currPage = request.query.currentPage || 1
    var limit = parseInt(request.query.limit)

    Location.find()
        .limit(limit)
        .skip((limit * currPage) - limit)
        .exec(function(err, locations) {
            Location.count().exec(function(err, count) {
                if(err) response.json({error: err})
                console.log(count)
                response.json({locations: locations, currentPage: currPage, count: count})
            })
        })
})

module.exports = router
