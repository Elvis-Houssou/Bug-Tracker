//? supprimer un bug

function bugDel(e) {
    remove.open('GET', `${url}/delete/${userToken}/${e}`);
    remove.send();

    if (confirm("Êtes-vous sûre de vouloir supprimer ce bug ?")) {
        remove.onload = function() {
            if (remove.status != 200) {
                console.error(`Erreur ${this.status} : ${this.statusText}`);
                return;
            }
    
            let resp = JSON.parse(xhr.response);
            // console.log(resp);
    
            if (resp.result.status === 'done') {
    
                location.reload();
    
            }
    
        }
        
    }
    
}