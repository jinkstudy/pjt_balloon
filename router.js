const express = require('express');
const router = express.Router();
const mysql = require('mysql');
var bodyParser = require('body-parser')
const session = require('express-session');

const cors = require('cors');
const corsOptions = {
    origin: true,
    credentials: true
};

router.use(cors(corsOptions));
router.use(session({
    secret: 'balloon',
    resave: false,
    saveUninitialized: true
}))

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

const Chat = require('./model/chats');

// const MongoClient = require('mongodb').MongoClient;
// const assert = require('assert');

//몽구스 연결
var mongoose = require('mongoose');

// CONNECT TO MONGODB SERVER
var db = mongoose.connection;
db.on('error', console.error);
db.once('open', function () {
    // CONNECTED TO MONGODB SERVER
    console.log("Connected to mongod server");
});

mongoose.connect(`mongodb://localhost:27017/admin`, { dbName: 'mongochat' }, (error) => {
    if (error) {
        console.log('몽고디비 연결 에러', error);
    } else {
        console.log('몽고디비 연결 성공');
    }
});

// 몽고 db에서 chatList 가져오기

router.get('/api/chats/:member', function (req, res) {
    console.log(req.params.member)
    Chat.find({ users: req.params.member }, function (err, chats) {
        if (err) return res.status(500).send({ error: 'database failure' });
        console.log(chats)
        res.json(chats);
    })
});

//몽고db에 새로운 chatList 입력하기
router.post('/api/newChats', function (req, res) {
    var chat = new Chat();
    chat.room_id = req.body.room_name;
    chat.users = req.body.users;
    chat.messages = [];

    chat.save(function (err) {
        if (err) {
            console.error(err);
            res.json({ result: 0 });
            return;
        }

        res.json({ result: 1 });

    });
});

//몽고db에 messages Update하기
router.put('/api/messageUpdate/:room_id', function (req, res) {


    Chat.update({ room_id: req.params.room_id }, { $push: { messages: { user: req.body.user, message: req.body.message, date: new Date() } } }, (err, output) => {
        if (err) res.status(500).json({ error: 'database failure' });
        // console.log(output);
        if (!output.n) return res.status(404).json({ error: 'book not found' });
        res.json({ message: 'chat updated' });
    })
});






router.get('/', (req, res) => {
    res.send('server is up and running');
});

//mysql연결
var mysqlConnection = mysql.createConnection(
    {
        host: 'localhost', //'192.168.0.117'
        user: 'balloon',
        password: 'balloon',
        database: 'balloonDB'

    }
);

mysqlConnection.connect((err) => {
    if (!err) {
        console.log('Mysql DB connetion succeeded');
    } else {
        console.log('failed:', JSON.stringify(err, undefined, 2))
    }
})


// DB에서 회원 id가 포함된 주소록 멤버 아이디 가져오기 
router.get('/getmember', (req, res) => {
    mysqlConnection.query(`SELECT member_id, project_id FROM project_members WHERE project_id ='201911031025-1'`,
        (err, rows, fields) => {
            if (err) {
                console.log(err)
            }
            else {
                const address = rows
                res.json(rows)
                // console.log(addressList)
            }
        })
})



// DB에서 회원 id가 포함된 주소록 멤버 아이디 가져오기 
router.get('/getAddress/:projectid', (req, res) => {
    // console.log(row.project_id)
    mysqlConnection.query(`select distinct pm.project_id as project_id,
                             p.name as project_name, 
                             pm.member_id as member_id,
                             m.name as member_name
                             from project_members as pm 
                             join projects as p 
                             on pm.project_id = p.id 
                             join members as m 
                             on m.id=pm.member_id 
                             where pm.project_id=?`, [req.params.projectid], (err, rows, fields) => {
        if (err) {
            console.log(err)
        }
        else {

            console.log(rows)
            res.send(rows)
            // let address = {}
            // let members = []
            // fullList.map(member => {

            //     members.push({ member_id: member.member_id, member_name: member.member_name })
            //     address = { project_name: member.project_name, members: members }


            // })
            // console.log(address)

        }

    })

}

)





//DB에서 회원id가 포함된 Project List 가져오기
router.get('/projectList/:memberid', (req, res) => {
    mysqlConnection.query(`SELECT distinct 
    pm.project_id as id, p.name as name , p.image_id  as image
    from project_members as pm 
    JOIN projects as p
    on pm.project_id = p.id
    where pm.member_id = ?;`
        , [req.params.memberid], (err, rows, fields) => {

            if (!err) {
                const projects = rows
                let projectList = []


                projects.map(project => {
                    projectList.push(
                        { project_id: project.id, project_name: project.name, project_image: project.image })
                })

                res.json(projectList)
                //console.log(projectList)

            }
        })

})


// DB 에서 kanbanList 가져오기. 
router.get('/kanbanList/:project_id', (req, res) => {
    mysqlConnection.query('SELECT * FROM kanbancards where project_id=?', [req.params.project_id], (err, rows, fields) => {
        if (!err) {
            let kanbans = rows
            let kanbanList = []
            let listID = 0
            let category = []

            // 가져온 kanbanList 원하는 JSon으로 재구성
            kanbans.map((kanban, index) => {
                // console.log(kanban)
                if (kanbanList.length === 0) {
                    // console.log(index, "=>0일때 수행")
                    kanbanList.push({
                        category: kanban.category,
                        id: `list-${listID}`,
                        cards: [{
                            title: kanban.title,
                            id: `card-${kanban.id}`,
                            content: kanban.content
                        }]
                    })
                    listID += 1

                    category.push(kanban.category)
                } else if (kanbanList.length !== 0) {

                    for (const element of kanbanList) {
                        //console.log(element)
                        //새로운 Category인 경우, List 추가.
                        if (!(category.includes(kanban.category))) {
                            category.push(kanban.category)

                            //console.log(index, "=>", element.category, kanban.ctegory, "=>새로운 category")
                            kanbanList.push({
                                category: kanban.category,
                                id: `list-${listID}`,
                                cards: [{
                                    title: kanban.title,
                                    id: `card-${kanban.id}`,
                                    content: kanban.content
                                }]
                            })
                            listID += 1
                            break;
                            // 기존 Category 하위 카드 cards에 card 추가하기.
                        } else if ((category.includes(kanban.category)) && (element.category === kanban.category)) {
                            //console.log(index, "=>같다 수행")
                            element.cards.push({
                                title: kanban.title,
                                id: `card-${kanban.id}`,
                                content: kanban.content
                            })
                        }


                    }
                    //console.log(category)
                }



            })
            res.json(kanbanList)
            // console.log(kanbanList)
        } else
            console.log(err)




    })

})

// 새로운 project 생성하기.
router.post("/newProject", (req, res) => {
    const body = req.body
    let memberid
    //  console.log("server newProject==> body", req)
    mysqlConnection.query("insert into projects(id,name,type,image_id) values (?,?,?,1) ", [body.id, body.name, body.type], (err, result) => {
        if (!err) {
            console.log("projects 입력 성공")
            //res.redirect('/')
        } else {
            console.log(err)
        }
    })
    mysqlConnection.query(" insert into project_members (member_id,project_id) values (?,?) ", [body.userid, body.id], (err, result) => {
        if (!err) {
            console.log("project_members 입력 성공")
            //res.redirect('/')
        } else {
            console.log(err)
        }
    })
    if (body.member) {
        mysqlConnection.query("select id from members where email=?", [body.member], (err, rows, fields) => {
            if (!err) {
                memberid = rows[0].id
                console.log("select", memberid)
                mysqlConnection.query(" insert into project_members (member_id,project_id) values (?,?) ", [memberid, body.id], (err, result) => {
                    if (!err) {
                        console.log("project_members 입력 성공2")
                        //res.redirect('/')
                    } else {
                        console.log(err)
                    }
                })
            } else {
                console.log(err)
            }

        })

        // mysqlConnection.query(" insert into project_members (member_id,project_id) values (?,?) ", [memberid, body.id], (err, result) => {
        //     if (!err) {
        //         console.log("project_members 입력 성공2")
        //         //res.redirect('/')
        //     } else {
        //         console.log(err)
        //     }
        // })
    }


})

// 새로운 card 입력하기
router.post('/newCard', (req, res) => {
    const body = req.body
    //console.log("server newCard==> body", body)
    mysqlConnection.query("insert into kanbancards(category, content, project_id) values (?,?,?)", [body.category, body.content, body.project_id], (err, result) => {
        if (!err) {
            console.log("new card 입력 성공")
            //res.redirect('/')
        } else {
            console.log(err)
        }
    })
})


// 회원가입
router.post('/api/customers', (req, res) => {
    const body = req.body
    //console.log("회원가입 server", body)
    mysqlConnection.query("insert into members(email, password, name) values (?, ?, ?)", [body.email, body.password, body.name], (err, result) => {
        if (!err) {
            console.log('회원가입성공')
        } else {
            console.log(err)
        }
    })
    let settings = "lang\/theme"
    mysqlConnection.query("insert into member_settings(member_email,settings) values (?, ?)", [body.email, settings], (err, result) => {
        if (!err) {
            console.log('설정추가성공')
        } else {
            console.log(err)
        }
    })
})

// 로그인
router.post('/login', (req, res) => {
    const body = req.body
    // 세션 사용
    sess = req.session;
    // 입력한 email이 DB의 members 테이블 있나 확인
    mysqlConnection.query("SELECT * FROM members WHERE email=?", [body.email], (err, rows, fields) => {

        if (!err) {
            let member = rows[0]
            console.log(member)
            // 고객정보가 있으면
            if (member) {

                // 고객정보 password와 입력한 password를 확인
                if (member.password === body.password) {
                    console.log('로그인성공')

                    // email 세션 저장
                    sess.email = body.email;
                    sess.name = member.name;
                    sess.userid = member.id;

                    sess.save(() => {
                        console.log("로그인", sess)
                    })
                    res.json(sess)



                } else {
                    console.log('비밀번호가 일치하지 않습니다')
                    //res.send(false)
                }

            } else {
                console.log('회원이 아닙니다')
                //res.send(false)
            }

        } else {
            console.log(err)
        }
    })


})

//session check
router.get('/api/checksession', (req, res) => {
    sess = req.session;
    if (sess) {
        res.json(sess)
        //console.log("session check", sess)
    }
    // res.sendFile('index.html');
});

// 로그 아웃
router.post('/logout', (req, res) => {
    sess = req.session;
    if (sess.email) {
        req.session.destroy(function (err) {
            if (err) {
                console.log(err);

            } else {
                console.log("logout성공")

            }
        })
    }
})

//setting 값 가져오기
router.get('/getSetting/:email', (req, res) => {
    mysqlConnection.query(`select settings from member_settings where member_email=?`, [req.params.email],
        (err, rows, fields) => {
            if (err) {
                console.log(err)
            }
            else {
                if (rows.length > 0) {
                    let setting = rows[0].settings.split('/')
                    console.log(setting)
                    res.json(setting)
                }


            }
        })
})

//setting 값 변경 시 update 하기
router.put('/updateSetting/:email', (req, res) => {
    mysqlConnection.query(`update member_settings set settings = ? where member_email=?`, [req.body.settings, req.params.email],
        (err, results) => {
            if (err) {
                console.log(err)
            }
            else {
                //console.log(results)
                res.json(results)
            }
        })
})









module.exports = router; 