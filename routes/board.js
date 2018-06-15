var express = require('express');
var router = express.Router();

var mysql = require('mysql');
var dbconfig = require('../database.js');
var conn = mysql.createConnection(dbconfig);


router.post('/goBoard',function(req,res,next){//올리기 버튼 클릭 시 ajax 통신하는 부분입니다.
  console.log(req.body);
  var title = req.body.title;
  var contents = req.body.contents;
  var date = req.body.date;
  var sql = 'insert into `postboard` (`title`,`text`,`file_name`,`date`) values (?,?,?,?);';
  var file;
  console.log(__dirname.replace('/routes',''));
  if(req.files){
    console.log(req.files.upload_file);
    file = req.files.upload_file;
    var filename = file.name;
    file.mv(__dirname.replace('/routes','')+'/public/files/'+filename, function(err){
      if(err){
        console.log(err);
      }
      else{
        conn.query(sql,[title,contents,filename,date],function(error,results,fields){
          if(error){
            console.log('failed file save');
            console.log(error);
          }//if
          else{
            res.send({result:'success'});//ajax 통신이 성공하면 다시 success 메세지를 보냅니다.
          }
        });//query
      }
    });
  }
  else{
    console.log(req.body.upload_file);
    var filename = req.body.upload_file;
    conn.query(sql,[title,contents,filename,date],function(error,results,fields){
      if(error){
        console.log('failed no file save');
        console.log(error);
      }//if
      else{
        res.send({result:'success'});//ajax 통신이 성공하면 다시 success 메세지를 보냅니다.
      }
    });//query
  }


});//router post



module.exports = router;
