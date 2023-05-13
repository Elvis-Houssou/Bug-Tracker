$(document).ready(function () {
  let lastActivity = Date.now();

  function resetActivity() {
    lastActivity = Date.now();
  }

  document.addEventListener("mousemove", resetActivity);
  document.addEventListener("keypress", resetActivity);
//   document.addEventListener("onclick", resetActivity);

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
    user.open("GET", `${url}/users/${userToken}`);

    user.send();

    user.onload = function () {
      xhr.open("GET", `${url}/list/${userToken}/${user_id}`);
      xhr.send();
      xhr.onload = function () {
        if (user.status != 200) {
          console.error(`Erreur ${this.status} : ${this.statusText}`);
          return;
        }

        if (xhr.status != 200) {
          console.error(`Erreur ${this.status} : ${this.statusText}`);
          return;
        }

        let rep = JSON.parse(user.response);

        let res = JSON.parse(xhr.response);
        let bug = res.result.bug;

        // console.log(res);
        let allUser = rep.result.user;

        const showUser = allUser.flatMap(function (current) {
          return current;
        });

        let nbrBug = bug.length;

        let nbrBugEnCour = bug.filter((bug) => bug.state == 1).length;
        let nbrBugTraite = bug.filter((bug) => bug.state == 2).length;
        let nbrBugNonTraite = bug.filter((bug) => bug.state == 0).length;

        document.getElementById(
          "bugSpend"
        ).textContent = `${nbrBug} Bugs, ${nbrBugEnCour} en cours, ${nbrBugTraite} traité, ${nbrBugNonTraite} non traité`;

        if (res.result.status === "done" && rep.result.status === "done") {
          let list = res.result.bug;

          //? CRUD DES BUGS DU USER

          list.forEach((e) => {
            let listTable = $("#bug-list");
            let table = document.createElement("tr");
            var bugId = e.id;
            let unix = e.timestamp;
            var date = new Date(unix * 1000);

            table.innerHTML += `<th> <h3> ${e.title} </h3> <h5> ${
              e.description
            } </h5> </th>
                    <th>${date.getDate()}/${date.getMonth()}/${date.getFullYear()} - ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}</th>
                    <th>${showUser[e.user_id]}</th>
                    <th>
                        <select onchange="stateForm('${bugId}', event.target.value)" name="" id="" class="btn btn-primary">
                            ${option(e.state)}  
                        </select>
                    </th>
                    <th> <button class="btn btn-danger" onclick="bugDel(${bugId})" id="delete">Supprimé</button> </th>`;
            listTable.append(table);
            table.append();
          });
        } else if (res.result.status === "failure") {
          console.log(res);
        }
      };
      xhr.error = function () {
        console.log(xhr);
      };
    };
    user.error = function () {
      console.log(user);
    };
  }
});
