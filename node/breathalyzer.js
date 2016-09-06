    /* 
     * Breathalyzer 
     */

    var fs          = require('fs');
    var levenshtein = require('fast-levenshtein');

    var breathalyzer = {
        
        DICT_FILE : 'vocabulary.txt',
        
        MAX_INT : 2147483647,
        
        maxWordLenght: 0,
        
        dictionary: [],
        
        cachedWords: [],
        
        
        fillIndexes: function(middleNumber) {
            
                indexesArray = [];

                if (middleNumber === 1) {
                        indexesArray.push(2);
                        return indexesArray;
                }
                
                indexesArray.push(middleNumber);

                for (var i = 1; i < middleNumber; ++i) {
                        if (middleNumber - i > 1) {
                                indexesArray.push(middleNumber - i);
                        }

                        if (middleNumber + i <= this.maxWordLenght) {
                                indexesArray.push(middleNumber + i);
                        } 
                }
                
                return indexesArray;
            
        },
        
        
        addToCache: function(customWord, count) {

                this.cachedWords[customWord] = count;
                
        },
        
        
        distance: function (customWord) {
             
                if (typeof this.cachedWords[customWord] !== 'undefined') {

                        return this.cachedWords[customWord];

                }

                var wordLen = customWord.length;
            
                if (this.isExist(customWord, wordLen)) {
                    
                        this.addToCache(customWord, 0);
                        return 0;
                        
                }
                
                var minDistance = this.MAX_INT;
                var distance    = this.MAX_INT;

                var indexes     = this.fillIndexes(wordLen);
                
                
                for (var key in indexes) {

                        var index = indexes[key];
                        
                        if (typeof this.dictionary[index] === 'undefined') {

                                minDistance = 0;
                                
                                continue;

                        }
                        
                        var offset = Math.abs(wordLen - index);
                        
                        
                        
                        if (distance <= offset) {
                                        
                                break;
                        }
                        
                        var wordCount = this.dictionary[index].length;
                        for (var i = 0; i < wordCount; ++i) {

                                distance = levenshtein.get(customWord, this.dictionary[index][i]);

                                if (distance < minDistance) {
                                        minDistance = distance;
                                }

                                if (distance <= offset) {
                                        
                                        break;
                                }
                        }
                }
                
                this.addToCache(customWord, minDistance);
                
                return minDistance;
             
        },
        
        
        isExist: function (customWord, wordLen) {
            
                exist = false;

                if (typeof this.dictionary[wordLen] !== 'undefined') {
                    
                        var maxCount = this.dictionary[wordLen].length;
                        for (var i=0; i < maxCount; ++i) {

                                if (customWord === this.dictionary[wordLen][i]) {
                                        exist = true;
                                        break;
                                }   

                        }

                }

                return exist;
            
        },
        
        
        readDictionary: function(callback) {
                var filePath = __dirname + '/../' + this.DICT_FILE;
                
                if (!fs.existsSync(filePath)) {
                    
                    var err = 'Dictionary is not exists';
                    callback(err);
                    
                }
                else {
                
                        fs.readFile(filePath, function (err, data) {
                                if (err) throw err;

                                var text    = data.toString();
                                var lines   = text.split('\n');
                                
                                lines.forEach(function(word) {

                                    var length  = word.length;

                                    if(typeof breathalyzer.dictionary[length] === 'undefined') {

                                            breathalyzer.dictionary[length] =  [];

                                            ++ breathalyzer.maxWordLenght;

                                    }

                                    breathalyzer.dictionary[length].push(word);

                                  });

                                  callback(null);

                        });
                        
                }
        }
           
    };


    module.exports = breathalyzer;