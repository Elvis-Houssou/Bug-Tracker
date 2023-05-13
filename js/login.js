$(document).ready(function () {

    
    let login = $('#login-form');

    login.submit(function (e) { //? connexion 
        e.preventDefault();
        let username = $('#username').val();
        let password = $('#password').val();

        if (!username && !password) { //! verifie si les mots de passe sont identiques
            let errorLabel = document.createElement('label');
            errorLabel.textContent = "Les champs sont vide";
            errorLabel.classList.add('formError');
            login.before(errorLabel);
        }else{

            xhr.open('GET', `${url}/login/${username}/${password}`);
            xhr.send();

            xhr.onload = function () {
                if (xhr.status != 200) {
                    console.error(`Erreur ${this.status} : ${this.statusText}`);
                }

                let response = JSON.parse(xhr.response);

                if (response.result.status === 'failure') { 
                    let errorLabel = document.createElement('label');
                    errorLabel.textContent = response.result.message;
                    errorLabel.classList.add('formError');
                    login.before(errorLabel);

                } else if (response.result.status === 'done') {
                    let successLabel = document.createElement('label');
                    successLabel.textContent = response.result.message;
                    successLabel.classList.add('successLogin');
                    login.before(successLabel);

                    //! Enregistrement des donnée du user dans le storage
                    window.localStorage.setItem(tokenName, `${response.result.id}_${username}_${password}_${response.result.token}`);

                    //! REDIRECTION
                    setTimeout(function () {
                        window.location.href = 'listBug.html';
                    }, 1000);

                }
            }

            xhr.error = function () {
                console.log(xhr);
            };

        }

        
       

    })

    
})