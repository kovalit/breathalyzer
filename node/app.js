
    var fs              = require('fs');
    var async           = require('async');
    var breathalyzer    = require('./breathalyzer');
    
    var start           = new Date().getTime(); 
    
    
    if (process.argv.length <= 2) {
            console.log("Please enter a valid file name");
            process.exit(-1);
    }
    
    var filePath = __dirname + '/../' + process.argv[2];
    if (!fs.existsSync(filePath)) { 
            console.log("File is not exists");
            process.exit(-1);
    }
    
    console.log('Start calculation');

    async.waterfall([
        
            function(callback) {
                    breathalyzer.readDictionary(callback);   
            },
        
            function(callback) {          

                    var customString = fs.readFileSync(filePath, "utf8");
                    customString = customString.toUpperCase().replace(/^\s*|\s*$/g, '');

                    if (customString.length > 0) {
                            var customWords = customString.split(" ");
                            callback(null, customWords);
                    }   
                    else {
                        var err = 'File is empty';
                        callback(err, customWords);
                    }
                    
             

            },

            function(customWords, callback) {

                    var counter = 0;

                    for (var key in customWords) {  
                            counter += breathalyzer.distance(customWords[key]);  
                    }

                    callback(null, counter);

            }
 
    ], function (err, result) {

            if (err) throw err;

            var end = new Date().getTime() - start;

            console.log('Total count: ' + result);
            console.log('Execute time: ' + Number((end/1000).toFixed(3)) + ' s') ;
       
    });  