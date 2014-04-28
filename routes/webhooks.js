var express = require('express');
var router = express.Router();

var Client = require('node-rest-client').Client;

// configure basic http auth for every request
var options_auth={user:"admin",password:"abcd.1234"};

client = new Client(options_auth);

var issueUrl = "http://jira.cypay.me/rest/api/2/issue/${issueId}/comment";

var patten = "refs #[a-zA-Z0-9]*-[0-9]*";




router.get('/', function(req, res) {
  console.log(req.param);
  //解析json
  //调用jira rest api
  res.send('this is a hook');
});

router.post('/', function(req, res) {
  //解析json
  var commits = req.body.commits;
  for (var i = 0; i <commits.length; i ++) {
    commit = commits[i];
    var message = commit.message;
    var url = commit.url;
    console.log(message + ", " + url);
    var issueids = getJiraIssueId(message);
    if (issueids == null) {
      continue;
    }
    console.log(issueids);

    for (var j = 0; j < issueids.length; j ++) {
      //调用jira rest api
      var id = issueids[j];
      var _data = '{"body": "updated in gitlab: ' + url + ', comment:' + message + '"}';
      var args ={
        path:{"issueId": id},
        headers:{"Content-Type":"application/json"},
        data:_data
      };
      console.log(id);
      console.log(_data);
      console.log(args);
      client.post(issueUrl, args, function(data, response){
        console.log(data);
      });
    }
  }
  res.send('this is a hook');
});

//message中可能有多个refs #PMSYS-9之类的注释
function getJiraIssueId(message) {
  var tmp = message.match(patten);
  if (null == tmp || tmp.length <= 0) {
    return null;
  }
  var issueids = new Array();
  for (var i = 0; i <tmp.length; i ++) {
    issueids[i] = tmp[i].substring(6, tmp[i].length);
  };
  return issueids;
}

module.exports = router;
