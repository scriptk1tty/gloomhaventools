//TODO
//change max HP value
//fix dmg math

// global variables
let unitObjArr = [];
let isElite = false;
let idCounter = 0;
const statusArr = ["stun","wound","poison","immobolize","invisible","disarm","muddle","strengthen"];


// delete function
const deleteDiv = (id) =>{
    // select element by id
    const div = document.getElementById("div" + id)

    // remove element
    div.remove();

}

//----------SUBTRACT DAMAGE calculation----------
const damageSubtraction = (id) =>{
    const value = document.getElementById("dmgInput" + id.toString()).value

    for(let i = 0; i < unitObjArr.length; i++){
        if(unitObjArr[i].id == id){
            if(unitObjArr[i].HP < value){
                unitObjArr[i].HP = 0
            }else{
                unitObjArr[i].HP = unitObjArr[i].HP - value;
            }

            // update values in dom
            const hpDiv = document.getElementById("hp"+id);
            const dmgInput = document.getElementById("dmgInput" + id)
            const healthBar = document.getElementById("health" + id)
            const healthBarImage = document.getElementById("healthImage" + id)



            const progressBar = document.querySelector("progress");

            hpDiv.innerHTML = "HP: " + unitObjArr[i].HP;
            dmgInput.value = null;
            healthBar.value = unitObjArr[i].HP
        }
    }
}

// damage calculation
const damageAddition = (id) =>{
    const value = document.getElementById("dmgInput" + id.toString()).value

    for(let i = 0; i < unitObjArr.length; i++){
        if(unitObjArr[i].id == id){
        }if(unitObjArr[i].HP == value){
            unitObjArr[i].HP = value
        }if(unitObjArr[i].HP > value){

    }else{
        unitObjArr[i].HP = unitObjArr[i].HP - (value * -1);
    }


    // update values in dom
    const hpDiv = document.getElementById("hp"+id);
    const dmgInput = document.getElementById("dmgInput" + id)
    const healthBar = document.getElementById("health" + id)
    const healthBarImage = document.getElementById("healthImage" + id)

    const progressBar = document.querySelector("progress");

    hpDiv.innerHTML = "HP: " + unitObjArr[i].HP;
    dmgInput.value = null;
    healthBar.value = unitObjArr[i].HP
}
}

// status function
const updateStatus = (status,id) =>{
    //element.classList.contains(class);
    //element.classList.add("mystyle");
    const button = document.getElementById(status+id);
    if(!button.classList.contains("Active")){
        button.classList.add("Active");
        button.classList.add(status+"Active");
    }else{
        button.classList.remove("Active");
        button.classList.remove(status+"Active")
    }
}
// add render function
const renderNew = (id,unitNum,name,HP) =>{

    const mainDiv = document.createElement('div');
    mainDiv.id = "div" + id;

    if (isElite) {
        mainDiv.className = 'unitCard elite';
    } else {
        mainDiv.className = 'unitCard';
    }


    const deleteButton = document.createElement('button')
    deleteButton.className = 'deleteButton';
    deleteButton.innerHTML = "X";
    deleteButton.onclick = function(){
        deleteDiv(id);
    }

    mainDiv.appendChild(deleteButton);

    const unitName = document.createElement('h4');
    unitName.className= "unitCardName";
    unitName.innerHTML = name + " " + unitNum;
    mainDiv.appendChild(unitName);

    const unitHp = document.createElement("h5");
    unitHp.className = 'hp';
    unitHp.id = "hp" + id;
    unitHp.innerHTML = "HP: " + HP;
    mainDiv.appendChild(unitHp);

    const damageDiv = document.createElement('div');
    damageDiv.className = 'cardDamageDiv';

    const damageInput = document.createElement('input');
    damageInput.className = 'cardDamageInput';
    damageInput.type = 'number';
    damageInput.id = "dmgInput" + id;
    damageInput.min = '0';

    const subtractButton = document.createElement('button');
    subtractButton.className = 'subtractDamageButton';
    subtractButton.innerHTML = "-";
    subtractButton.onclick = function(){
        damageSubtraction(id)
    }

    const damageButton = document.createElement('button');
    damageButton.className = 'addDamageButton';
    damageButton.innerHTML = "+";
    damageButton.onclick = function(){
        damageAddition(id)
    }

    //----------HEALTH BAR----------
    const healthBarImage = document.createElement('progressImage');
    healthBarImage.innerHTML = "<img class='healthImage' src='https://i.imgur.com/Dfx4kPs.png'>";

    const healthBar = document.createElement('progress');
    healthBar.className = 'health';
    healthBar.id = 'health' + id;
    healthBar.value = HP;
    healthBar.max = HP;


    //-----------DAMAGE SECTION----------
    damageDiv.appendChild(healthBarImage);
    damageDiv.appendChild(healthBar);
    damageDiv.appendChild(subtractButton);
    damageDiv.appendChild(damageInput);
    damageDiv.appendChild(damageButton);
    mainDiv.appendChild(damageDiv);


//----------STATUS EFFECT BUTTONS----------
    const buttonsDiv = document.createElement('div');
    buttonsDiv.className = 'buttonsDiv';


    for(let i = 0; i < statusArr.length; i++){
        const status = statusArr[i];
        const statusButton = document.createElement('button');
        statusButton.className = "button "+ status + "Btn";
        statusButton.id = status + id;
        statusButton.onclick = function(){
            updateStatus(status,id);
        }
        buttonsDiv.appendChild(statusButton)
    }


    mainDiv.appendChild(buttonsDiv);



    document.getElementById('middle-container').appendChild(mainDiv);
}

//----------CHECKING IF ELITE----------
var checkbox = document.getElementById('eliteCheckbox');

checkbox.addEventListener('change', function() {
    isElite = this.checked;
});




// add unit button
/*const autoAdd = (name) =>{
  idCounter ++;
  for(let i = 0; i < unitClassArr.length; i++){
    if(name == unitClassArr[i].name){
      const thisUnit = unitClassArr[i];
      const unitObj = {
        id:idCounter,
        unitNum: thisUnit.unitNum,
        name: thisUnit.name,
        HP: thisUnit.HP,
        status:[]
      }
        unitObjArr.push(unitObj)
        renderNew(unitObj.id, unitObj.unitNum,unitObj.name,unitObj.HP)

    }
  }
}
*/




const manualAdd= ()=>{

    idCounter ++
    const hp = parseInt(document.getElementById("hpInput").value);
    const unit = document.getElementById("unitInput").value.toString();
    const unitNum = parseInt(document.getElementById("unitNumInput").value);


    if(hp < 1 || unit.trim() == "" || unitNum < 1){
        return false;
    }

    const unitObj = {
        id: idCounter,
        unitNum: unitNum,
        name: unit,
        HP: hp,
        Status:[]
    }

    unitObjArr.push(unitObj)
    renderNew(unitObj.id, unitObj.unitNum,unitObj.name,unitObj.HP)

}




// event listeners
document.getElementById("addUnitBtn").addEventListener("click",manualAdd);

document.getElementById("hpInput").addEventListener("keyup",function(){
    if (event.keyCode === 13) {
        event.preventDefault();
        document.getElementById("addUnitBtn").click();
    }})
document.getElementById("unitNumInput").addEventListener("keyup",function(){
    if (event.keyCode === 13) {
        event.preventDefault();
        document.getElementById("hpInput").focus()
    }})



document.getElementById("unitInput").addEventListener("keyup",function(){
    if (event.keyCode === 13) {
        event.preventDefault();
        document.getElementById("unitNumInput").focus()
    }})
