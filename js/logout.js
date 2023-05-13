$(document).ready(function () {
  
    let logout = $('#logout');

    logout.click(function () { //? deconnexion 

        xhr.open('GET', `${url}/logout/${userToken}}`);
        xhr.send();

        xhr.onload = function () {
            if (xhr.status != 200) {
                console.error(`Erreur ${this.status} : ${this.statusText}`);
                return;
            }

            let response = JSON.parse(xhr.response);

            if (response.result.status === 'failure') {
                let logoutMessage = document.createElement('span');
                logoutMessage.textContent = 'Déconnexion ...';
                logoutMessage.classList.add('logoutMessage');
                logout.after(logoutMessage);

                window.localStorage.removeItem(tokenName);

                setTimeout(function () {
                    window.location.href = 'login.html';
                }, 1000);

            } else if (response.result.status === 'done') {
                let logoutMessage = document.createElement('span');
                logoutMessage.textContent = response.result.message;
                logoutMessage.classList.add('logoutMessage');
                logout.before(errorLabel);
            }
        }

        xhr.error = function () {
            console.log(xhr);
        };
       

    })

    
})