//Begin menu-actions.js
var Page = require('./page');
var actions = [];

exports.addAction = function (obj) {
    actions.push(obj);
    if (Page.loaded) exports.applyActions();
    return this;
};

exports.applyActions = function () {
    if (!Page.loggedIn()) return;
    if (!actions.length) return;

    if (!document.getElementById('bp-custom-actions')) {
        $('.navbar-profile-nav .dropdown-menu a[href="/donate"]').parent().find('+ .divider') // Fix for mods
            .after('<li class="divider" id="bp-custom-actions"></li>');
    }

    var html = "";
    actions.forEach(function (action) {
        html += '<li><a href="#" id="' + action.id + '"><i class="fa fa-fw ' + action.icon + '"></i> ' + action.name + '</a></li>';
    });

    $('#bp-custom-actions').before(html);
    actions.forEach(function (action) {
        document.getElementById(action.id).addEventListener('click', function (e) {
            e.preventDefault();
            action.click.call(this);
        }, false);
    });

    actions = [];
};
//End menu-actions.js
