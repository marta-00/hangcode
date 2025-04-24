import {words} from "./words.js"

export default function getWord() {
    const randomIndex = Math.floor(Math.random() * words.length);
    return words[randomIndex];
}


export function getFarewell(language){
    const options = [
        `Goodbye ${language}!`,
        `Adiós ${language}!`,
        `Au revoir ${language}!`,
        `R.I.P ${language}!`,
        `Oh no, not ${language}!`,
        `Hasta la vista ${language}!`,
        `The end of ${language}!`,
        `${language} is dead!`,
        `${language} has left the building!`,
        `We'll miss you ${language}!`,
        `Gone but not forgotten ${language}!`,
        `${language} is no more!`,
    ];

    const randomIndex = Math.floor(Math.random() * options.length);
    return options[randomIndex];
}