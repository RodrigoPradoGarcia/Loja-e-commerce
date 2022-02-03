"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ForbiddenError extends Error {
    constructor(ms) {
        super(ms);
        this.message = ms;
    }
}
exports.default = ForbiddenError;
