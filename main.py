from flask import Flask,send_from_directory,request,render_template,redirect,session
import sqlite3
import json

import requests as r

import os

app = Flask(__name__,static_url_path='/static', static_folder='static',template_folder='static')

app.secret_key = "ajaywasveryhandsome"

@app.get("/")
def home():
    return send_from_directory("static","home.html")


@app.post("/signup")
def register():
    name  = request.form.get("name")
    phone  = request.form.get("phone")
    email  = request.form.get("email")
    address = request.form.get("address")
    password  = request.form.get("password")
    con = sqlite3.connect("cdb.db")
    cur = con.cursor()
    cur.execute(f"insert into customer values('{phone}','{name}','{email}','{password}','{address}')")
    con.commit()
    con.close()

    user = {
                "username":"ajaynec37@gmail.com",
                "password":"tsqwrfuzpwmjrbpa",
                "emailTo": email,
                "subject":"verifiy your account",
                "text":"Ajay web services"
    }
    result = r.post("https://nodemailapi.onrender.com/sendgamil",json=user,params={
        "Content-Type": "application/json"
    })
    print(result.text)

    return redirect("/static/clogin.html")

@app.post("/login")
def login():
    phone  = request.form.get("phone")
    password  = request.form.get("password")
    con = sqlite3.connect("cdb.db")
    cur = con.cursor()
    res = cur.execute(f"select * from customer where phone='{phone}'").fetchone()
    con.commit()
    con.close() 
    message = ""
    if res==None:
         message = "user does not exist"
    else:
        if(res[3]==password):
            session["username"] = phone
            return render_template("/lhome.html")
        else:
             message = "wrong credentials try again"
    return message

@app.post("/alogin")
def aLogin():
    phone  = request.form.get("phone")
    password  = request.form.get("password")
    if(phone=='7092209817' and password=='12345'):
        return render_template("/ahome.html")
    else:
        message = "wrong credentials try again"
    return message


@app.get("/getorders")
def orders():
    con = sqlite3.connect("cdb.db")
    cur = con.cursor()
    res = cur.execute(f"select * from bulkbook where phone='{session['username']}'").fetchall()

    result = [ ]

    for uid in res:
        res1 = cur.execute(f"select * from bulkorder where cid={uid[0]}").fetchall()
        data = {
            "uid":uid[0],
            "phone":uid[1],
            "orderName":uid[2],
            "image":uid[3],
            "dressType":uid[4],
            "modimage":uid[5],
            "description":uid[6],
            "color":uid[7],
            "count":uid[8],
            "date":uid[9],
            "order_status":uid[10],
            "users":res1
        }
        result.append(data)


    con.commit()
    con.close()
    return result

@app.get("/getallorders")
def allorders():
    con = sqlite3.connect("cdb.db")
    cur = con.cursor()
    res = cur.execute(f"select * from bulkbook").fetchall()

    result = [ ]

    for uid in res:
        res1 = cur.execute(f"select * from bulkorder where cid={uid[0]}").fetchall()
        data = {
            "uid":uid[0],
            "phone":uid[1],
            "orderName":uid[2],
            "image":uid[3],
            "dressType":uid[4],
            "modimage":uid[5],
            "description":uid[6],
            "color":uid[7],
            "count":uid[8],
            "date":uid[9],
            "users":res1
        }
        result.append(data)

    con.commit()
    con.close()
    return result

@app.post("/grpbook")
def grpbooking():
    phone = session['username']
    oname = request.form.get("oname")
    file = request.files['file']
    dtype = request.form.get("dtype")
    modfile = request.files['modfile']
    desc = request.form.get("desc")
    color = request.form.get("color")
    count = request.form.get("count")
    userList = request.form.getlist("userList")
    userSize = request.form.getlist("userSize")
    date = request.form.get("date")

    print(phone,oname,dtype,color,count,userList,userSize,file.filename)

    # return "success all is well"
    # redirect("/static/lhome.html")
    file.save(os.path.join("static/public", file.filename))
    modfile.save(os.path.join("static/public", modfile.filename))

    con = sqlite3.connect("cdb.db")
    cur = con.cursor()
    try:
        cur.execute(f"insert into bulkbook(phone,order_name,material_image,dress_type,model_image,description,color,dress_count,date,order_status) values('{phone}','{oname}','{file.filename}','{dtype}','{modfile.filename}','{desc}','{color}','{count}','{date}','pending')")
        primaryKey = len(cur.execute("select * from bulkbook").fetchall()) + 1
        for i,j in zip(userList,userSize):
            cur.execute(f"insert into bulkorder values('{primaryKey}','{i}','{j}')")
    except Exception as e:
        print(e)
    finally:
        con.commit()
        con.close()
    return redirect("/static/lhome.html")
    
@app.get("/getcustomers")
def customer():
    con = sqlite3.connect("cdb.db")
    cur = con.cursor()
    res = cur.execute(f"select * from customer").fetchall()

    result = [ ]

    for uid in res:
        data = { "name":uid[1], "phone":uid[0], "email":uid[2], "address":uid[4] }
        result.append(data)

    con.commit()
    con.close()
    return result

@app.post("/updatestatus")
def update_status():
    uid = int(request.json.get("uid"))
    message = request.json.get("msg")

    con = sqlite3.connect("cdb.db")
    cur = con.cursor()
    res = cur.execute(f"UPDATE bulkbook SET order_status='{message}' WHERE cid={uid};").fetchall()


    con.commit()
    con.close()
    return "success"


if __name__ == "__main__":
    app.run(debug=True,port=80)
