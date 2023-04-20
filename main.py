from flask import Flask,send_from_directory,request,render_template,redirect,session
import sqlite3
import json

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
    cur.execute(f"insert into customer values('{phone}','{name}','{email}','{address}','{password}')")
    con.commit()
    con.close()
    return redirect("/clogin.html")
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
        if(res[4]==password):
            session["username"] = phone
            return render_template("/lhome.html")
        else:
             message = "wrong credentials try again"
    return message

@app.post("/book")
def booking():
    material  = request.form.get("material")
    color  = request.form.get("color")
    size  = request.form.get("size")
    date  = request.form.get("date")
    file = request.files['mimg']

    file.save(os.path.join("static/public", file.filename))
    con = sqlite3.connect("cdb.db")
    cur = con.cursor()
    cur.execute(f"insert into book values('{material}','{color}','{size}','{date}','static/public/{file.filename}','{session['username']}')")
    con.commit()
    con.close()
    return "success all is well"

@app.get("/getorders")
def orders():
    con = sqlite3.connect("cdb.db")
    cur = con.cursor()
    res = cur.execute(f"select * from book where phone='{session['username']}'").fetchall()
    con.commit()
    con.close()
    return json.dumps(res)

@app.post("/grpbook")
def grpbooking():
    phone = session['username']
    oname = request.form.get("oname")
    # gender = request.form.get("gender")
    dtype = request.form.get("dtype")
    color = request.form.get("color")
    count = request.form.get("count")
    userList = request.form.getlist("userList")
    userSize = request.form.getlist("userSize")
    date = request.form.get("date")
    file = request.files['file']

    print(phone,oname,dtype,color,count,userList,userSize,file.filename)

    # return "success all is well"
    redirect("/static/lhome.html")
    file.save(os.path.join("static/public", file.filename))
    con = sqlite3.connect("cdb.db")
    cur = con.cursor()
    cur.execute(f"insert into book values('{phone}','{oname}','{dtype}','{color}','{count}','{date}','static/public/{file.filename}')")
    con.commit()
    con.close()
    


if __name__ == "__main__":
    app.run(debug=True,port=80)
