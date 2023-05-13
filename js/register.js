// let bugTracker = fetch("http://greenvelvet.alwaysdata.net/bugTracker/api/ping");
// console.log(bugTracker);
$(document).ready(function () {

    
    let resgister = $('#register-form');

    resgister.submit(function (e) { //? inscription
        e.preventDefault();
        
        let username = $('#username').val();
        let password = $('#password').val();
        let passwordConfirm = $('#password_confirm').val();

        if (!username && !password) {
            let errorLabel = document.createElement('label');
            errorLabel.textContent = "Les champs sont vide";
            errorLabel.classList.add('formError');
            resgister.before(errorLabel);
        }else if (password == passwordConfirm) {
            
            xhr.open('GET', `${url}/signup/${username}/${password}`);
            xhr.send();

            xhr.onload = function () {
                if (xhr.status != 200) {
                    console.error(`Erreur ${xhr.status} : ${xhr.statusText}`);
                    return;
                }
    
                let response = JSON.parse(xhr.response);
    
                if (response.result.status === 'failure') {
                    console.log(response)
                    let errorLabel = document.createElement('label');
                    errorLabel.textContent = response.result.message;
                    errorLabel.classList.add('formError');
                    resgister.before(errorLabel);
                }
                else if (response.result.status === 'done') {
                    let successLabel = document.createElement('label');
                    successLabel.textContent = response.result.message;
                    successLabel.classList.add('successLogin');
                    resgister.before(successLabel);
    
                    //! Enregistrement des donnée du user dans le storage
                    window.localStorage.setItem(tokenName, `${response.result.id}_${username}_${password}_${response.result.token}`);
    
                    //! REDIRECTION
                    setTimeout(function () {
                        window.location.href = 'login.html';
                    }, 1000);
                }
    
            };

            xhr.error = function () {
                console.log(xhr);
            };
            
        }else{
            let errorLabel = document.createElement('label');
                errorLabel.textContent = "Le mot de passe n'est pas identique";
                errorLabel.classList.add('formError');
                resgister.before(errorLabel);
        }

       

    })

    
})
