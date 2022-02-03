"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class NoError extends Error {
    constructor(ms) {
        super(ms);
        this.message = ms;
    }
}
exports.default = NoError;
