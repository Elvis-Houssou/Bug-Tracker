function stateForm(bug, news) {

    state.open('GET', `${url}/state/${userToken}/${bug}/${news}`);
    state.send();
    state.onload = function () {
        if (state.status != 200) {
            console.error(`Erreur ${this.status} : ${this.statusText}`);
            return;
        }

        let res = JSON.parse(state.response);
        if (res.result.status =='done') {
            location.reload();
        }
    }
    console.log(bug);
    console.log(news);
}

function option(stateOption){
    switch (stateOption) {
        case '0':
        return `
            <option id="option1" selected value="0">Non traité</option>
            <option id="option2" value="1">En cours</option>
            <option id="option3" value="2">Traité</option>
        `
        case '1':
        return `
            <option id="option2" selected value="1">En cours</option>
            <option id="option1" value="0">Non traité</option>
            <option id="option3" value="2">Traité</option>
        `
        case '2':
        return`
            <option id="option3"selected value="2">Traité</option>
            <option id="option1" value="0">Non traité</option>
            <option id="option2"  value="1">En cours</option>
        `
        default:
            console.log(`Invalid state value: ${element.stateOption}`)
    }
}