'use strict';
var fs = require('fs');

module.exports = function (files, params) {
    
    this.file = files;
    this.error = false;
    this.location = params.Directory || "./config/";
    this.ext = params.exts || ".json";
    this.debug = params.debug || false;
    this.loc = this.location + this.file + this.ext;

    try {
        this.data = fs.readFileSync(this.loc);
        if (this.debug == true) {
            console.info('\x1B[31m', "[DEBUG] : " + this.loc + " load success !\r\n content : " + this.data ,'\x1B[0m\r\n');
        }
    } catch (err) {
        this.error = true;
        if (err.code === 'ENOENT') {
            console.log('\x1B[31m', '[ERROR] : config file not found ! (' + this.loc + ')' ,'\x1B[0m\r\n');
        } else {
            console.log('\x1B[31m', '[ERROR] : (' + err + ')' ,'\x1B[0m\r\n');
        }
    }

    this.GetLine = function (Lines, replace = null) {

        if (this.error == false) {
            if (replace != null) {
                if (this.debug == true) {
                    console.info('\x1B[31m', "[DEBUG] : " + JSON.parse(this.data)[Lines].replace('%s', replace) ,'\x1B[0m\r\n');
                }
                return JSON.parse(this.data)[Lines].replace('%s', replace);
            }
            else {
                if (this.debug == true) {
                    console.log('\x1B[31m', "[DEBUG] : " + JSON.parse(this.data)[Lines] ,'\x1B[0m\r\n');
                }
                return JSON.parse(this.data)[Lines];
            }
        }
    }

    this.GetBlock = function (Lines, Block, replace = null) {
        if (this.error == false) {
            if (replace != null) {
                if (this.debug == true) {
                    console.log('\x1B[31m', "[DEBUG] : " + JSON.parse(this.data)[Block][Lines].replace('%s', replace) ,'\x1B[0m\r\n');
                }
                return JSON.parse(this.data)[Block][Lines].replace('%s', replace);
            }
            else {
                if (this.debug == true) {
                    console.log('\x1B[31m', "[DEBUG] : " + JSON.parse(this.data)[Block][Lines] ,'\x1B[0m\r\n');
                }
                return JSON.parse(this.data)[Block][Lines];
            }
        }
    }

    this.SelLine = function (json_value) {
        
        var jsonObj = JSON.parse(this.data);

        for(var i in json_value) {
            jsonObj[i] = json_value[i];
            if (this.debug == true) {
                console.log('\x1B[31m', "[DEBUG] : " + JSON.stringify(json_value) ,'\x1B[0m\r\n');
            }
        }

        fs.writeFileSync(this.loc, JSON.stringify(jsonObj, null, 2));

    }

    this.Del = function (json_value) {

        var jsonObj = JSON.parse(this.data);

        delete jsonObj[json_value];

        fs.writeFile(this.loc, JSON.stringify(jsonObj, null, 2), function(err) {
            if (err != null) {
                if (this.debug == true) {
                    console.log('\x1B[31m', "[DEBUG] : Line " + json_value + " is delete" ,'\x1B[0m\r\n');
                }
            }
            else {
                console.log('\x1B[31m', "[ERROR] : Line " + json_value + " not found" ,'\x1B[0m\r\n');
            }
        });

    }

    return this;

}