import {ALPHABET,REFLECTORS,ROTORS,ROTOR_STEP} from "./constants.js";

class Enigma {

    leftRotorType;
    middleRotorType;
    rightRotorType;
    reflectorType;

    leftRotorPosition;
    middleRotorPosition;
    rightRotorPosition;

    constructor(leftRotorType = 0, middleRotorType = 0, rightRotorType = 0, reflectorType = 0, leftRotorPosition = 0, middleRotorPosition = 0, rightRotorPosition = 0) {
        this.leftRotorType = leftRotorType
        this.middleRotorType = middleRotorType
        this.rightRotorType = rightRotorType

        this.reflectorType = reflectorType

        this.leftRotorPosition = leftRotorPosition
        this.middleRotorPosition = middleRotorPosition
        this.rightRotorPosition = rightRotorPosition
    }
    // setReflectorType(type) {
    //     this.reflectorType = type % 2;
    // }
    //
    // setRotorType(rotorNumber, type) {
    //     const typeMod = type % 8;
    //     switch(rotorNumber) {
    //         case 0: this.leftRotorType = typeMod
    //             return true
    //         case 1: this.middleRotorType = typeMod
    //             return true
    //         case 2: this.rightRotorType = typeMod
    //             return true
    //         default: return false
    //     }
    // }
    //
    // setRotorPosition(rotorNumber, position) {
    //     const positionMod = position % 26;
    //     switch(rotorNumber) {
    //         case 0: this.leftRotorPosition = positionMod
    //             return true
    //         case 1: this.middleRotorPosition = positionMod
    //             return true
    //         case 2: this.rightRotorPosition = positionMod
    //             return true
    //         default: return false
    //     }
    // }

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

        return letter
    }

    goReflector(letter) {
        letter = REFLECTORS[this.reflectorType][(letter + 26 - this.leftRotorPosition) % 26]
        return letter
    }
    goBackward(letter) {
        //Преобразования левого ротора
        letter = this.changeLetterBackward(letter, this.leftRotorType, 0, this.leftRotorPosition);
        //Преобразования среднего ротора
        letter = this.changeLetterBackward(letter, this.middleRotorType, this.leftRotorPosition, this.middleRotorPosition);
        //Преобразования правого ротора
        letter = this.changeLetterBackward(letter, this.rightRotorType, this.middleRotorPosition, this.rightRotorPosition);
        //Вывод
        letter = (letter + 26 - this.rightRotorPosition) % 26;
        return letter
    }

    runMachine(stroke) {
        let answer = "";
        for (let i = 0; i < stroke.length; i++) {
            if(stroke[i] === " ") answer += " "
            else {
                let letter = ALPHABET.indexOf(stroke[i].toUpperCase());
                if (letter === -1) return null;
                letter = this.goForward(letter)
                letter = this.goReflector(letter)
                letter = this.goBackward(letter)
                answer += ALPHABET[letter]
            }
        }
        return answer
    }
}

export {Enigma}
