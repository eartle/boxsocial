var _ = require("underscore");

module.exports = function(lastfm, boxsocial, config) {
    return {
        index: {
            get: function(req, res) {
                var guest = req.session.guest;
                var party = null;
                if (guest) {
                   party = boxsocial.findParty({guest: guest});
                }

                res.render("index", {
                    locals: {
                        guest: req.session.guest,
                        party: party,
                        parties: _.first(boxsocial.parties, 5)
                    }
                });
            }
        },

        content: {
            get: function(req, res) {
                res.render(req.params.page);
            }
        }
    }
};
