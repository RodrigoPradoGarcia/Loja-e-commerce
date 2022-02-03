"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class DatabaseError extends Error {
    constructor(ms) {
        super(ms);
        this.message = ms;
    }
}
exports.default = DatabaseError;
