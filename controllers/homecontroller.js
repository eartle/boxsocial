var _ = require("underscore"),
    cutils = require("./cutils");

module.exports = function(lastfm, boxsocial, config) {
    function properCase(text) {
        return text.replace(/\w\S*/g, function(txt){
            return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
        });
    }

    return {
        index: {
            get: function(req, res) {
                var guest = req.session.guest,
                    party = guest ? boxsocial.findParty({ guest: guest }) : null;

                res.render("index", {
                    guest: req.session.guest,
                    currentParty: party,
                    parties: boxsocial.getTopParties(5),
                    title: config.longTitle
                });
            }
        },

        content: {
            get: function(req, res) {
                res.render(req.params.page, {
                    guest: req.session ? req.session.guest : null,
                    title: cutils.title(properCase(req.params.page),
                        config.shortTitle)
                });
            }
        }
    }
};
