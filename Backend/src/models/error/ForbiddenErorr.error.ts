class ForbiddenError extends Error
{
    public message:string;

    constructor(ms:string)
    {
        super(ms);
        this.message = ms;
    }
}

export default ForbiddenError;