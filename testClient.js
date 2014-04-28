var Client = require('node-rest-client').Client;

// configure basic http auth for every request
var options_auth={user:"admin",password:"abcd.1234"};

client = new Client(options_auth);

var issueUrl = "http://jira.cypay.me/rest/api/2/issue/${issueId}/comment";

args ={
        path:{"issueId":"PMSYS-9"},
        headers:{"Content-Type":"application/json"},//Content-Type: application/json
        data:'{"body": "This is an another test comment for rest api.</br>gitlab:http://git.cypay.me"}'
      };

args.path["issueId"] = "PMSYS-16";
console.log(args.path["issueId"]);

client.post(issueUrl, args, function(data, response){
            // parsed response body as js object
            console.log(data);
            // raw response
            //console.log(response);
});