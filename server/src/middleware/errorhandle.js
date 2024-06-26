//errror middleware 
// eslint-disable-next-line no-unused-vars

function errorHandler (err, req, res, next) {
    const status = err.status | 500;
    const message = err.message || 'Internal Server Error';
    const extraDetail = err.extraDetails | "error from backend";
    console.log(err);
    if(!res.headersSent) {
        res.status(status).json({
            success: false,
            status,
            message,
            extraDetails: extraDetail
            });
            };
            if(res.headersSent){
                return next(err);
              };
        }
   
//    return res.status(500).json({error: err})

//   }
module.exports  = errorHandler;