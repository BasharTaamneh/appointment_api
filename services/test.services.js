async function test( params , callback) {
    console.log(params);
    if (params.test == undefined) {
        return callback({
            message: "Test Required"
        });
        
    }
    else {

        return callback(null,  params);
    }
    
    
};

module.exports = {
    test,
}