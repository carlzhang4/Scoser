//**********************************************************************
exports.register = function(req,res){
    var id=req.query.id;
    var pwd=req.query.pwd;
    var phone=req.query.phone;
    var account_id="0"
    var money="100"
    var db_connection = require('../bin/dbConfig').db_connect();
	db_connection.connect();
	sql='insert into users values(\''+id+'\',\''+phone+'\',\''+pwd+'\',\''+account_id+'\',\''+money+'\')';
    console.log(sql);
    db_connection.query(sql,function(err,rs){
        if(err){
            console.log("insert fail!")
            res.render('register',{layout:null,user_id:id ,state:"fail"});
        }
        else{
            console.log("insert success!")
            res.render('login',{layout:null,user_id:id ,pwd:pwd ,state:"success"});

        }
    })
};
//**********************************************************************
exports.login = function(req,res){
    var id=req.query.id;
    var pwd=req.query.pwd;
    var db_connection = require('../bin/dbConfig').db_connect();
    db_connection.connect();
    sql='select id,account_id from users where id =\''+id+'\' and pwd = \''+pwd+'\'';
    console.log(sql);
    db_connection.query(sql,function(err,rs){
        if(err||!rs[0]){
            console.log("登陆失败")
            console.log(err)
            res.render('login',{layout:null,user_id:id ,pwd:null ,state:"fail"});
        }
        else{
            console.log("登陆成功")
            console.log(rs[0])
            res.cookie("user_id",rs[0].id);
            res.cookie("buyer_account_id",rs[0].account_id);
            res.render('editor',{user_id:rs[0].id})
        }
    })
};
//**********************************************************************
exports.publish = function(req,res){
    var name=req.query.name_publish;
    var description=req.query.description_publish;
    var price=req.query.price_publish;
    var content=req.query.content_publish;
    var author=req.cookies.user_id;
    var author_account_id=req.cookies.buyer_account_id;

    var db_connection = require('../bin/dbConfig').db_connect();
    db_connection.connect();
    sql='insert into market values(\''+name+'\',\''+price+'\',\''+description+'\',\''+content+'\',\''+author+'\',\''+author_account_id+'\')';
    console.log(sql);
    db_connection.query(sql,function(err,rs){
        if(err){
            console.log("发布失败!")
            console.log(err)
            res.render('editor',{state:'fail'});
        }
        else{
            sql='insert into contract values(\''+name+'\',\''+price+'\',\''+description+'\',\''+content+'\',\''+author+'\',\''+author+'\')';
            console.log(sql);
            db_connection.query(sql,function(err,rs){
            if(err){
                console.log("发布失败!")
                console.log(err)
                res.render('editor',{state:'fail'});
            }
            else{
                console.log("发布成功!")
                res.render('editor',{state:'success'})
        }
    })
        }
    })
};
//**********************************************************************
exports.upload = function(req,res){
    var name=req.query.name_upload;
    var description=req.query.description_upload;
    var price=req.query.price_upload;
    var content=req.query.content_upload;
    var author=req.cookies.user_id;
    var author_account_id=req.cookies.buyer_account_id;
    if(req.query.author_upload)
        author=req.query.author_upload;
    var db_connection = require('../bin/dbConfig').db_connect();
    db_connection.connect();
    sql='insert into contract values(\''+name+'\',\''+price+'\',\''+description+'\',\''+content+'\',\''+author+'\',\''+req.cookies.user_id+'\')';
    console.log(sql);
    db_connection.query(sql,function(err,rs){
        if(err){
            console.log("上传失败!")
            console.log(err)
            res.render('editor',{state:'fail'});
        }
        else{
            console.log("上传成功!")
            res.render('editor',{state:'success'})
        }
    })
};
//**********************************************************************
exports.market = function(req,res){
    var db_connection = require('../bin/dbConfig').db_connect();
    db_connection.connect();
    sql='select * from market';
    console.log(sql);
    db_connection.query(sql,function(err,rs){
        if(err){
            console.log("进入商店错误!")
            res.render('404');
        }
        else{
            console.log("打开商店成功")
            res.render('market',{item:rs,account_id:req.cookies.buyer_account_id})
        }
    })
};
//**********************************************************************
exports.storage = function(req,res){
    var db_connection = require('../bin/dbConfig').db_connect();
    db_connection.connect();
    sql='select * from contract where owner_id = \''+req.cookies.user_id+'\'';
    console.log(sql);
    db_connection.query(sql,function(err,rs){
        if(err){
            console.log("进入仓库错误!")
            console.log(err)
            res.render('404');
        }
        else{
            console.log("进入仓库成功!")
            res.render('storage',{item:rs})
        }
    })
};
//**********************************************************************
exports.details = function(req,res){
    var name=req.query.name;
    var author_account_id=req.query.author_account_id;
    var db_connection = require('../bin/dbConfig').db_connect();
    db_connection.connect();
    sql='select * from market where name = \''+name+'\'';
    console.log(sql);
    db_connection.query(sql,function(err,rs){
        if(err){
            console.log("进入详情错误!")
            res.render('404');
        }
        else{
            console.log("打开详情成功")
            res.render('details',{item:rs[0],buyer_account_id:req.cookies.buyer_account_id,author_account_id:author_account_id})
        }
    })
};
//**********************************************************************
exports.storage_det = function(req,res){
    var name=req.query.name;
    var db_connection = require('../bin/dbConfig').db_connect();
    db_connection.connect();
    sql='select * from contract where name = \''+name+'\'';
    console.log(sql);
    db_connection.query(sql,function(err,rs){
        if(err){
            console.log("进入详情错误!")
            res.render('404');
        }
        else{
            console.log("打开详情成功")
            res.render('storage_det',{check_result:"未检查",item:rs[0]})
        }
    })
};
//**********************************************************************
exports.security_check = function(req,res){
    var name=req.query.name;
    var db_connection = require('../bin/dbConfig').db_connect();
    db_connection.connect();

    sql='select * from contract where name = \''+name+'\'';
    console.log(sql);
    db_connection.query(sql,function(err,rs){
        if(err){
            console.log("查询错误!")
            res.render('404');
        }
        else{
            var item=rs[0]
            console.log("查询成功")
            setTimeout(function(){
                sql='insert into secchecks values(\''+name+'\',\''+rs[0].content+'\',\''+"0"+'\',\''+"0"+'\')';
                console.log(sql);
                db_connection.query(sql,function(err,rs){
                            if(err){
                                console.log("插入错误!")
                                res.render('404');
                            }
                            else{
                                console.log("插入成功")
                                setTimeout(function(){
                                    sql='select * from secchecks where id =\''+name+'\' and status = \''+"1"+'\'';
                                    console.log(sql);
                                    db_connection.query(sql,function(err,rs){
                                        if(err){
                                            console.log("检测错误!")
                                            res.render('404');
                                            }
                                                else if(!rs[0]){
                                                    console.log("检测失败")
                                                    sql="delete from secchecks where id=\'"+name+'\'';
                                                    console.log(sql);
                                                    db_connection.query(sql,function(err,rs){
                                                        if(err){
                                                            console.log("删除!")
                                                            res.render('404');
                                                        }
                                                        else{
                                                            console.log("删除成功")
                                                            res.render('storage_det',{check_result:"检查错误",item:item})
                                                    }
                                                    })
                                                }
                                                else {
                                                    console.log("检测成功")
                                                    res.render('storage_det',{check_result:rs[0].result,item:item})
                                                }

                                    })
                                },1000)
                            }
                })
            },3000);
            
        }
    })
};
//**********************************************************************


