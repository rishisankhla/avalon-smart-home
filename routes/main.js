// The main.js file of your application
module.exports = function(app) {

    // get method to redirect to home page
    app.get("/",function(req, res){
        res.redirect("/home");
    });

    //written get method to render home page
    app.get("/home", function (req,res) {
        res.render("home.html");
    });

    //written get method to render add-device page
    app.get("/adddevice", function (req,res) {
        res.render("adddevice.html");
    });

    //written get method to render device-status page
    app.get("/devicestatus", function (req,res) {
        let sqlquery = "SELECT * FROM avalon_data";

        //sending all the data entries through mysql server
        db.query(sqlquery, (err, result) => { 
            if (err) {
            res.redirect("/");
            }
            res.render("devicestatus.html", {availabledata: result}); //rendering page with EJS template data variable
            });
    });

    //Here we have written get method to render control-device page
    app.get("/controldevice", function (req,res) {
        let sqlquery = "SELECT * FROM avalon_data";

        //sending all the data entries through mysql server
        db.query(sqlquery, (err, result) => {
            if (err) {
            res.redirect("/");
            }
            res.render("controldevice.html", {availabledata: result}); //rendering page with EJS template data variable
            });
    });

    //Here we have written get method to render delete-device page
    app.get("/deletedevice", function (req,res) {
        let sqlquery = "SELECT * FROM avalon_data";

        //sending all the data entries through mysql server
        db.query(sqlquery, (err, result) => {
            if (err) {
            res.redirect("/");
            }
            res.render("deletedevice.html", {availabledata: result}); //rendering page with EJS template data variable
            });
    });

    // get method to render to about page
    app.get("/about", function (req,res) {
        res.render("about.html");
    });

    // here we have written post method to complete form action of add decive page  
    app.post("/adddevice1", function (req,res) {

        //converting value to int type(where necessary) to pass-on to our avalon databases
        var o_temp = req.body.device_temperature;
        if(o_temp != "null")
        {
            o_temp = parseInt(req.body.device_temperature);
        }

        //converting value to int type(where necessary) to pass-on to our avalon databases
        var o_vol = req.body.device_volume;
        if(o_vol != "null")
        {
            o_vol = parseInt(req.body.device_volume);
        }

        //converting value to int type(where necessary) to pass-on to our avalon databases
        var o_bri = req.body.device_brightness;
        if(o_bri != "null")
        {
            o_bri = parseInt(req.body.device_brightness);
        }

        //converting value to int type(where necessary) to pass-on to our avalon databases
        var o_spe = req.body.device_speed;
        if(o_spe != "null")
        {
            o_spe = parseInt(req.body.device_speed);
        }

        //converting value to int type(where necessary) to pass-on to our avalon databases
        var o_timer = req.body.device_timer;
        if(o_timer != "null")
        {
            o_timer = parseInt(req.body.device_timer);
        }

        //performing insert operation for "light" category type
        if(req.body.type_selector=="light")
        {
            let sqlquery = "INSERT INTO avalon_data (name,type,on_off,brightness,color) VALUES (?,?,?,?,?)";
            let our_l =[req.body.device_name,req.body.type_selector,req.body.on_off,
                        o_bri,req.body.device_color];
                
            //passing our insert query to mysql server
            db.query(sqlquery,our_l, (err, result) => {
                if (err) {
                console.log(err);
                }
                else{
                    console.log("added sucessfully");
                    res.redirect("/home"); //and then finally redirecting back to home page
                }
            });
        }
        
        //performing insert operation for "audio" category type
        if(req.body.type_selector=="audio")
        {
            let sqlquery = "INSERT INTO avalon_data (name,type,on_off,volume,song) VALUES (?,?,?,?,?)";
            let our_l =[req.body.device_name,req.body.type_selector,req.body.on_off,
                        o_vol,req.body.device_song];

            //passing our insert query to mysql server
            db.query(sqlquery,our_l, (err, result) => {
                if (err) {
                console.log(err);
                }
                else{
                    console.log("added sucessfully"); 
                    res.redirect("/home"); //and then finally redirecting back to home page
                }
            });
        }

        //performing insert operation for "kitchen" category type
        if(req.body.type_selector=="kitchen")
        {
            let sqlquery = "INSERT INTO avalon_data (name,type,on_off,temp,timer) VALUES (?,?,?,?,?)";
            let our_l =[req.body.device_name,req.body.type_selector,req.body.on_off,
                        o_temp,o_timer];

            //passing our insert query to mysql server
            db.query(sqlquery,our_l, (err, result) => {
                if (err) {
                console.log(err);
                }
                else{
                    console.log("added sucessfully");
                    res.redirect("/home"); //and then finally redirecting back to home page
                }
            });
        }

        //performing insert operation for "fan" category type
        if(req.body.type_selector=="fan")
        {
            let sqlquery = "INSERT INTO avalon_data (name,type,on_off,speed,direction) VALUES (?,?,?,?,?)";
            let our_l =[req.body.device_name,req.body.type_selector,req.body.on_off,
                        o_spe,req.body.device_direction];

            //passing our insert query to mysql server
            db.query(sqlquery,our_l, (err, result) => {
                if (err) {
                console.log(err);
                }
                else{
                    console.log("added sucessfully");
                    res.redirect("/home"); //and then finally redirecting back to home page
                }
            });
        }

        //performing insert operation for "heater" category type
        if(req.body.type_selector=="heater")
        {
            let sqlquery = "INSERT INTO avalon_data (name,type,on_off,temp,speed) VALUES (?,?,?,?,?)";
            let our_l =[req.body.device_name,req.body.type_selector,req.body.on_off,
                        o_temp,o_spe];

            //passing our insert query to mysql server
            db.query(sqlquery,our_l, (err, result) => {
                if (err) {
                console.log(err);
                }
                else{
                    console.log("added sucessfully");
                    res.redirect("/home"); //and then finally redirecting back to home page
                }
            });
        }
    });  

    //here we have wrtting get method to complete form action of decive status page 
    app.get("/devicestatus1", function (req, res) {

        //searching in the database
        let sqlquery = "SELECT * FROM avalon_data WHERE id=?";

        // execute sql query
        let our_st = String(req.query.device_selector);
        our_st = our_st.replace('id number ','');

        //passing our select query to mysql server
        db.query(sqlquery,[parseInt(our_st)], (err, result) => {
        if (err) {
        console.log(err);
        }
        console.log("status shown sucessfully");
        res.render("list.html", {available_data: result}); //rendering page with EJS template data variable
        });
    });

    //here we have wrtting post method to complete form action of delete decive page 
    app.post("/deletedevice1", function (req, res) {

        //searching in the database
        let sqlquery = "DELETE FROM avalon_data WHERE id=?";
        
        // execute sql query
        let our_st = req.body.delete_device_selector;
        our_st = our_st.replace('id number ','');

        //passing our delete query to mysql server
        db.query(sqlquery,[parseInt(our_st)], (err, result) => {
        if (err) {
        console.log(err);
        }
        else{
            console.log("deleted sucessfully");
            res.redirect("/home"); //and then finally redirecting back to home page
        }
        });
    });

    //here we have wrtting post method to complete form action of control decive page
    app.post("/controldevice1", function (req, res) {

        // declaring necessary variables to perform update query
        let our_st = req.body.control_device_selector;
        our_st = our_st.replace('id number ','');
        var on__off = req.body.on_off;
        var final_list = [];
        var current_typ = req.body.control_device_selector.split("(")[1].split(")")[0];
        var sqlquery = "";

        //writing the sql query and creating template list for "kitchen" category type
        if(current_typ == 'kitchen')
        {
            sqlquery = "UPDATE avalon_data SET on_off = ?, temp = ?, timer = ? WHERE id = ?";
            final_list = [on__off,parseInt(req.body.temp),parseInt(req.body.timer),parseInt(our_st)];
        }

        //writing the sql query and creating template list for "fan" category type
        if(current_typ == 'fan')
        {
            sqlquery = "UPDATE avalon_data SET on_off = ?, speed = ?, direction = ? WHERE id = ?";
            final_list = [on__off,parseInt(req.body.speed),req.body.direction,parseInt(our_st)];
        }

        //writing the sql query and creating template list for "light" category type
        if(current_typ == 'light')
        {
            sqlquery = "UPDATE avalon_data SET on_off = ?, brightness = ?, color = ? WHERE id = ?";
            final_list = [on__off,parseInt(req.body.brightness),req.body.color,parseInt(our_st)];
        }

        //writing the sql query and creating template list for "heater" category type
        if(current_typ == 'heater')
        {
            sqlquery = "UPDATE avalon_data SET on_off = ?, temp = ?, speed = ? WHERE id = ?";
            final_list = [on__off,parseInt(req.body.temp),parseInt(req.body.speed),parseInt(our_st)];
        }

        //writing the sql query and creating template list for "audio" category type
        if(current_typ == 'audio')
        {
            sqlquery = "UPDATE avalon_data SET on_off = ?, volume = ?, song = ? WHERE id = ?";
            final_list = [on__off,parseInt(req.body.volume),req.body.song,parseInt(our_st)];
        }

        //passing our update query to mysql server
        db.query(sqlquery,final_list, (err, result) => {
        if (err) {
        console.log(err);
        }
        else{
            console.log("Updated sucessfully"); 
            res.redirect("/home"); //and then finally redirecting back to home page
        }
        });
    });
}