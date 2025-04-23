function getEndScreenTemplate(){
    return `
    <div class="flex">
    <div><h2 id="right-answers" class="h2">Du hast <b>${rightAnswersCounter}</b> von <b>${questions.length}</b> Fragen richtig beantwortet!</h2></div>
    <div><img src="./img/trophy.png" class="width100"></div>
    <div class="d-grid gap-2 col-6 mx-auto">
    <button onclick="reload()" class="btn btn-primary restart" type="button">RESTART</button>
    </div>
    </div>
    `
}