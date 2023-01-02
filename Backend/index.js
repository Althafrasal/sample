const mysql = require('mysql')
const express = require('express')
const app = express();
const bodyparser = require('body-parser');
var cors = require('cors')
app.use(bodyparser.urlencoded({ extended: false }))
app.use(bodyparser.json());

app.use(cors())


var mysqlConnection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'zain'

})
mysqlConnection.connect((err) => {
    if (!err) {
        console.log('db is connected');
    }
    else {
        console.log('db connection failed');
    }
})
app.get('/get', function (req, res) {
    mysqlConnection.query('select * from tenantadmins WHERE status=1;', (err, result) => {
        if (err) {
            res.send(err);
        }
        else {
            res.json({ result: result });
        }
    })
});

app.get('/inactive', function (req, res) {
    mysqlConnection.query('SELECT *FROM tenantadmins WHERE status=0;', (err, result) => {
        if (err) {
            ressend(err);
        }
        else {
            res.json({ result: result })
        }
    })
})



app.post('/register', (req, res) => {
    let fullName = req.body.fullName;
    let email = req.body.email;
    let phonenumber = req.body.phonenumber;
    let name = req.body.userName;
    let edit = req.body.editTenant;
    let del = req.body.delete;
    let status = req.body.status;
    let password = req.body.password

    let sql = 'INSERT INTO tenantadmins(fullName,email,phonenumber,userName,password,editTenant,deleteTenant,status)values(?,?,?,?,?,?,?,?)';
    mysqlConnection.query(sql, [fullName, email, phonenumber, name, password, edit, del, status], (err, result) => {
        if (err) {
            console.log(err);
        }
        res.json({ result: result })

    })

})
app.get('/get/:id', (req, res) => {
    mysqlConnection.query('SELECT *FROM tenantadmins WHERE id=?', [id = req.params.id], (err, result) => {
        if (err) {
            res.send(err);
        }
        if (result) {
            res.send({
                data: result
            })
        }
        else {
            res.send({
                message: "data not found"
            })
        }
    })

})
app.put('/update/:id', (req, res) => {
    let id = req.params.id;
    let fullName = req.body.fullName;
    let email = req.body.email;
    let phonenumber = req.body.phonenumber;
    let name = req.body.userName;
    let edit = req.body.editTenant;
    let del = req.body.deleteTenant;
    let status = req.body.status;
    let password = req.body.password;
    console.log(id, fullName, email, phonenumber, name, edit, del, status, password);

    if (status == true) {
        status = 1
    }
    else {
        status = 0
    }
        if (edit == true) {
            edit = 1
              }
        else {
             edit = 0
             }
    if (del == true) {
        del = 1
    }
    else {
        del = 0
    }
    // status = (status == 'true') ? 1 : 0;
    // edit = (edit == 'true') ? 1 : 0;
    // del = (del == 'true') ? 1 : 0;
    let updateQuery = `UPDATE tenantadmins SET fullName="${fullName}",email="${email}",phonenumber="${phonenumber}",userName="${name}",password="${password}",editTenant="${edit}",deleteTenant="${del}",status="${status}" WHERE id="${id}"`;
    console.log(updateQuery)

    mysqlConnection.query(updateQuery, (err, result) => {
        if (err) {
            res.json({
                status: 400,
                message: err
            })
        }

        else {
            res.json({
                status: 200,
                message: result
            })
        }

    })
})



// tenant apis
// ADD NEW TENANT
app.post('/tenant', (req, res) => {
    let tenantName = req.body.tenantName;
    let status=req.body.status;
    let extensions = req.body.extensions;
    let dispatcher = req.body.dispatcher;
    let domainName = req.body.domainName;
    let server = req.body.server;
    let defaultAddress = req.body.defaultAddress;
    let billingAddress = req.body.billingAddress;

    let sql = 'INSERT INTO tenant_table(TenantName,No_Of_extensions,dispatcher,DomainName,server,default_address,billing_address,status)values(?,?,?,?,?,?,?,?)';
    mysqlConnection.query(sql, [tenantName, extensions, dispatcher, domainName, server, defaultAddress, billingAddress,status], (err, result) => {
        if (err) {
            console.log(err);
        }
        res.json({ result: result, message: "data added" })

    })

})
// GET ACTIVE TENANT LIST
app.get('/getTenant', function (req, res) {
    mysqlConnection.query('select * from tenant_table WHERE status=1;', (err, result) => {
        if (err) {
            res.send(err);
        }
        else {
            res.json({ result: result });
        }
    })
});

// GET INACTIVE TENANTS
app.get('/getinActive', function (req, res) {
    mysqlConnection.query('select * from tenant_table WHERE status=0;', (err, result) => {
        if (err) {
            res.send(err);
        }
        else {
            res.json({ result: result });
        }
    })
});
// get a tenant
app.get('/tenant/:id', (req, res) => {
    mysqlConnection.query('SELECT * FROM tenant_table WHERE id=?', [id = req.params.id], (err, result) => {
        if (err) {
            res.send(err);
        }
        if (result) {
            res.send({
                data: result
            })
        }
        else {
            res.send({
                message: "data not found"
            })
        }
    })

})

// update
app.put('/updateTenant/:id', (req, res) => {
    let id = req.params.id;
    let tenantName = req.body.tenantName;
    let status=req.body.status;
    let extensions = req.body.extensions;
    let dispatcher = req.body.dispatcher;
    let domainName = req.body.domainName;
    let server = req.body.server;
    let defaultAddress = req.body.defaultAddress;
    let billingAddress = req.body.billingAddress;

    if (status == true) {
        status = 1
    }
    else {
        status = 0
    }
    console.log(id, tenantName, extensions, dispatcher, domainName, server, defaultAddress, billingAddress,status);
    let updateQuery = `UPDATE tenant_table SET TenantName="${tenantName}",status="${status}",No_Of_extensions="${extensions}",dispatcher="${dispatcher}",DomainName="${domainName}",server="${server}",default_address="${defaultAddress}",billing_address="${billingAddress}" WHERE id="${id}"`;
    console.log(updateQuery)

    mysqlConnection.query(updateQuery, (err, result) => {
        if (err) {
            res.json({
                status: 400,
                message: err
            })
        }

        else {
            res.json({
                status: 200,
                message: result
            })
        }

    })
})
app.listen(3000);