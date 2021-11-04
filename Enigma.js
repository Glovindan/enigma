import {ALPHABET,REFLECTORS,ROTORS,ROTOR_STEP} from "./constants.js";

class Enigma {

    leftRotorType;
    middleRotorType;
    rightRotorType;
    reflectorType;

    leftRotorPosition;
    middleRotorPosition;
    rightRotorPosition;

    constructor(leftRotorType, middleRotorType, rightRotorType, reflectorType, leftRotorPosition = 0, middleRotorPosition = 0, rightRotorPosition = 0) {
        this.leftRotorType = leftRotorType
        this.middleRotorType = middleRotorType
        this.rightRotorType = rightRotorType

        this.reflectorType = reflectorType

        this.leftRotorPosition = leftRotorPosition
        this.middleRotorPosition = middleRotorPosition
        this.rightRotorPosition = rightRotorPosition
    }

    rotateRotor(position) {
        position = (position + 1) % 26;
        return position;
    }

    changeLetter(letter, rotorType, leftRotorPosition, rightRotorPosition) {
        letter = ROTORS[rotorType][(letter + 26 + (leftRotorPosition - rightRotorPosition)) % 26]
        return letter
    }

    changeLetterBackward(letter, rotorType, leftRotorPosition, rightRotorPosition) {
        letter = ROTORS[rotorType].indexOf((letter + 26 - (leftRotorPosition - rightRotorPosition)) % 26);
        return letter
    }

    goForward(letter) {
        //Поворот правого ротора
        this.rightRotorPosition = this.rotateRotor(this.rightRotorPosition);
        //Поворот среднего ротора
        if(ROTOR_STEP[this.rightRotorType].includes(this.rightRotorPosition)) {
            this.middleRotorPosition = this.rotateRotor(this.middleRotorPosition);
        }
        //Поворот левого ротора
        if(ROTOR_STEP[this.middleRotorType].includes(this.middleRotorPosition)) {
            this.leftRotorPosition = this.rotateRotor(this.leftRotorPosition);
        }

        //Преобразование правого ротора
        letter = this.changeLetter(letter, this.rightRotorType, this.rightRotorPosition, 0)
        //Преобразование среднего ротора
        letter = this.changeLetter(letter, this.middleRotorType, this.middleRotorPosition, this.rightRotorPosition)
        //Преобразование левого ротора
        letter = this.changeLetter(letter, this.leftRotorType, this.leftRotorPosition, this.middleRotorPosition)

        //Вывод
        return letter
    }

    goReflector(letter) {
        letter = REFLECTORS[this.reflectorType][(letter - this.leftRotorPosition) % 26]
        return letter
    }
    goBackward(letter) {
        //Преобразования левого ротора
        letter = this.changeLetterBackward(letter, this.leftRotorType, 0, this.leftRotorPosition);
        //Преобразования среднего ротора
        letter = this.changeLetterBackward(letter, this.middleRotorType, this.leftRotorPosition, this.middleRotorPosition);
        //Преобразования правого ротора
        letter = this.changeLetterBackward(letter, this.rightRotorType, this.middleRotorPosition, this.rightRotorPosition);
        //Я запутался но это должно быть так
        letter = (letter + 26 - this.rightRotorPosition) % 26;
        return letter
    }

    runMachine(letterStr) {
        // let answer = "";
        // for (let i = 0; i < stroke.length; i++) {
        //     let letter = ALPHABET.indexOf(stroke[i].toUpperCase());
        //     letter = this.goForward(letter)
        //     letter = this.goReflector(letter)
        //     letter = this. goBackward(letter)
        // }

        let letter = ALPHABET.indexOf(letterStr);
        letter = this.goForward(letter)
        letter = this.goReflector(letter)
        letter = this.goBackward(letter)
        let answer = ALPHABET[letter];
        return answer
    }
}

export {Enigma}
