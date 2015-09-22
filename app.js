/**
 * This is an example of a basic node.js script that performs
 * the Implicit Grant oAuth2 flow to authenticate against
 * the Spotify Accounts.
 *
 * For more information, read
 * https://developer.spotify.com/web-api/authorization-guide/#implicit_grant_flow
 */
//
//var express = require('express'); // Express web server framework
//var app = express();
//app.use(express.static(__dirname + '/public'));
//console.log('Listening on 8888');
//app.listen(8888);


/**
 * Generates a random string containing numbers and letters
 * @param  {number} length The length of the string
 * @return {string} The generated string
 */

(function () {

    function generateRandomString(length) {
        var text = '';
        var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

        for (var i = 0; i < length; i++) {
            text += possible.charAt(Math.floor(Math.random() * possible.length));
        }
        return text;
    }

    function getHashParams() {
        var hashParams = {};
        var e, r = /([^&;=]+)=?([^&;]*)/g,
            q = window.location.hash.substring(1);
        while (e = r.exec(q)) {
            hashParams[e[1]] = decodeURIComponent(e[2]);
        }
        console.log(hashParams);
        return hashParams;
    }


    function authorizeUser() {
        var client_id = '03ffe0cac0a0401aa6673c3cf6d02ced'; // Your client id
        var redirect_uri = 'http://localhost:8888/'; // Your redirect uri

        var state = generateRandomString(16);
        localStorage.setItem(stateKey, state);

        var scope = 'playlist-read-private playlist-modify-public';

        var url = 'https://accounts.spotify.com/authorize';
        url += '?response_type=token';
        url += '&client_id=' + encodeURIComponent(client_id);
        url += '&scope=' + encodeURIComponent(scope);
        url += '&redirect_uri=' + encodeURIComponent(redirect_uri);
        url += '&state=' + encodeURIComponent(state);

        window.location = url;
    }

    var stateKey = 'spotify_auth_state';

    var params = getHashParams();

    var access_token = params.access_token,
        state = params.state,
        storedState = localStorage.getItem(stateKey);

    if (access_token && (state === null || state !== storedState)) {
        alert('There was an error during the authentication');
    } else {
        localStorage.removeItem(stateKey);
        if (access_token) {
            $.ajax({
                url: 'https://api.spotify.com/v1/me',
                headers: {
                    'Authorization': 'Bearer ' + access_token
                },
                success: function (response) {
                    userProfilePlaceholder.innerHTML = userProfileTemplate(response);

                    //                        $('#login').hide();
                    //                        $('#loggedin').show();
                }
            });
        } else {
            //                $('#login').show();
            //                $('#loggedin').hide();
        }
    }



})();