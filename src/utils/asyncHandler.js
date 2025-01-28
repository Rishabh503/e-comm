export const asyncHandler = (func) => async (req,res,next)=>{
    try {
        await func(req,res,next)
    } catch (error) {
        console.log("issue in asynchandler in utils :",error);
        next(error)
    }

}

