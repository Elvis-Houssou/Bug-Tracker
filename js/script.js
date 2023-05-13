// register
let xhr = new XMLHttpRequest();

let user = new XMLHttpRequest();

let state = new XMLHttpRequest();

let remove = new XMLHttpRequest();

let url = new URL('http://greenvelvet.alwaysdata.net/bugTracker/api/');

let user_id, username, password, passwordConfirm, userToken;

const tokenName = 'BugTracker';

$(document).ready(function () {

    //! stocke les valeurs de la clé dans des variables
    if(window.localStorage.getItem(tokenName)) {
        [user_id, username, password, userToken] = window.localStorage.getItem(tokenName).split('_');

        
    };

})
