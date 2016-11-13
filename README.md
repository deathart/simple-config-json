# configJSON
<a href="https://www.npmjs.com/package/configjson"><img src="https://nodei.co/npm/configjson.png?downloads=true" /></a>

Usage : 
```JavaScript
var simple-config-json = require('simple-config-json'),
    option_for_config = {
    Directory : "./option/",
    debug : false
}

var config = new simple-config-json("config1", option_for_config);
```

>//Normal
```JavaScript
console.log("Value for 'test_replace' : " + config.GetLine("test_replace", "deathart"));
console.log("Value for 'test' : " + config.GetLine("test"));
console.log("Value for 'username' : " + config.GetLine("username"));
```

>//Block
```JavaScript
console.log("Value for 'first_block' : " + config.GetBlock("first_block", "block_test"));
console.log("Value for 'deux_block' : " + config.GetBlock("deux_block", "block_test", "deathart"));
```

>//Add line
```JavaScript
config.SelLine({"test_set" : "settings add", "blabla_set" : "blabla_set is OK"});
```

>//Delete line
```JavaScript
config.Del("test_replace");
```