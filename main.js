import {Enigma} from "./Enigma.js";
import {ALPHABET,ROTORS_NAMES,REFLECTORS_NAMES} from "./constants.js";
let enigmaConfig = {
    reflectorType : 0,
    rotorsTypes: [0,0,0],
    rotorsPositions: [0,0,0]
}



let configure = document.querySelectorAll("div.wrapper");

//Конфигурирование типов роторов и рефлектора
let typeConfigure = configure[0];
//Изменение рефлектора : инкремент
typeConfigure.children[0].children[0].addEventListener("click",() => {
    enigmaConfig.reflectorType = (enigmaConfig.reflectorType + 1) % 2;

    typeConfigure.children[0].children[1].innerText = REFLECTORS_NAMES[enigmaConfig.reflectorType];
})
//Изменение рефлектора : декремент
typeConfigure.children[0].children[2].addEventListener("click",() => {
    enigmaConfig.reflectorType = (enigmaConfig.reflectorType + 2 - 1) % 2;

    typeConfigure.children[0].children[1].innerText = REFLECTORS_NAMES[enigmaConfig.reflectorType];
})

for (let index = 1; index < typeConfigure.children.length; index++) {
    let rotorIndex = index - 1;
    //Изменение ротора : инкремент
    typeConfigure.children[index].children[0].addEventListener("click",() => {
        enigmaConfig.rotorsTypes[rotorIndex] = (enigmaConfig.rotorsTypes[rotorIndex] + 1) % 8;
        typeConfigure.children[index].children[1].innerText = ROTORS_NAMES[enigmaConfig.rotorsTypes[rotorIndex]];
    })
    //Изменение ротора : декремент
    typeConfigure.children[index].children[2].addEventListener("click",() => {
        enigmaConfig.rotorsTypes[rotorIndex] = (enigmaConfig.rotorsTypes[rotorIndex] + 8 - 1) % 8;
        typeConfigure.children[index].children[1].innerText = ROTORS_NAMES[enigmaConfig.rotorsTypes[rotorIndex]];
    })
}

//Конфигурирование начальных позиций роторов
let positionConfigure = configure[1];
for (let index = 0; index < positionConfigure.children.length; index++) {
    //Изменение позиции ротора : инкремент
    positionConfigure.children[index].children[0].addEventListener("click",() => {
        enigmaConfig.rotorsPositions[index] = (enigmaConfig.rotorsPositions[index] + 1) % 26;

        positionConfigure
            .children[index].children[1].innerText = ALPHABET[enigmaConfig.rotorsPositions[index]];
    })
    //Изменение позиции ротора : декремент
    positionConfigure.children[index].children[2].addEventListener("click",() => {
        enigmaConfig.rotorsPositions[index] = (enigmaConfig.rotorsPositions[index] + 26 - 1) % 26;

        positionConfigure.children[index].children[1].innerText = ALPHABET[enigmaConfig.rotorsPositions[index]];
    })
}

let input = document.getElementById("input");
let runButton = document.getElementById("run-button");
let result = document.getElementById("result");
runButton.addEventListener("click", () => {
    const enigma = new Enigma(
        enigmaConfig.rotorsTypes[0],
        enigmaConfig.rotorsTypes[1],
        enigmaConfig.rotorsTypes[2],
        enigmaConfig.reflectorType,
        enigmaConfig.rotorsPositions[0],
        enigmaConfig.rotorsPositions[1],
        enigmaConfig.rotorsPositions[2])

    result.innerText = enigma.runMachine(input.value);
})
// let enigma = new Enigma(0,1,2);
// console.log(enigma.runMachine("FUCK YOU"));
// enigma = new Enigma(0,1,2);
// console.log(enigma.runMachine("EVEH ZKL"));