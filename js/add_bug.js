$(document).ready(function () {
  let lastActivity = Date.now();

  function resetActivity() {
    lastActivity = Date.now();
  }

  document.addEventListener("mousemove", resetActivity);
  document.addEventListener("keypress", resetActivity);
  document.addEventListener("onclick", resetActivity);

  setInterval(() => {
    const now = Date.now();
    const timeSinceLastActivity = now - lastActivity;
    const maxInactivityTime = 1200000; // 20 minutes
    // const maxInactivityTime = 5000; // 30 secondes

    if (timeSinceLastActivity > maxInactivityTime) {
      // L'utilisateur est inactif
      window.localStorage.removeItem(tokenName);
      alert("Vous allez être deconnecté à cause de votre inactivité");
      document.location.href = "login.html";
    }
    else if (timeSinceLastActivity < 1000) {
        // L'événement a été enregistré il y a moins d'une seconde, ignorez-le
        return;
    }
  }, 1000);

  if (!window.localStorage.getItem(tokenName)) {
    //! Vérifie si l'utilisateur est connection via le token du storage
    window.location.href = "login.html";
  } else {
    let add = $("#add-form");
    //? Fonction pour ajouter un bug
    add.submit(function (e) {
      e.preventDefault();
      let title = $("#title").val();
      let description = $("#description").val();

      let data = { title, description };

      xhr.open("POST", `${url}/add/${userToken}/${user_id}`);
      xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
          let response = JSON.parse(xhr.response);
          let bug_id = response.result.id;

          if (response.result.status === "done") {
            console.log(bug_id);
            setTimeout(function () {
              window.location.href = "listBug.html";
            }, 1000);
          }
        }
      };
      xhr.send(JSON.stringify(data));
    });
  }
});
