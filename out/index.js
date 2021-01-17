"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var prompt_1 = __importDefault(require("prompt"));
var stamina = 10;
var panic = 10;
prompt_1.default.start();
prompt_1.default.get(['name'], function (err, result) {
    console.log('> name: ' + result.name);
    printStats();
});
var printStats = function () {
    console.log("> stamina: " + stamina);
    console.log("> panic: " + panic);
};
var rollDice = function () { };
