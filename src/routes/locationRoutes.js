var express = require('express')
var router = express.Router()

var Location = require('../model/location-model')
var Tags = require('../model/tags-model')

router.get('/filtered', function(request, response) {
    var filterBitmap = request.query.filterBitmap
    var currPage = request.query.currentPage || 1
    var limit = parseInt(request.query.limit)

    if(filterBitmap) {
        filterBitmap = filterBitmap.split('')
    }

    Tags.find({}, function(err, tags) {
        tagsList = tags[0].tags
        tagFilterList = []
        filterBitmap.map((tag, idx) => {
            if(tag === '1') {
                tagFilterList.push(tagsList[idx])
            }
        })
        console.log(tagFilterList)

        var filter = {tags: {$in: tagFilterList}}

        Location.find(filter)
            .limit(limit)
            .skip((limit * currPage) - limit)
            .exec(function(err, locations) {
                Location.count().exec(function(err, count) {
                    if(err) response.json({error: err})
                    response.json({locations: locations, currentPage: currPage, pages: Math.ceil(locations.length / limit)})
                })
            })
    })
})

module.exports = router
