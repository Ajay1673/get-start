from flask import Flask,send_from_directory,request,render_template
import sqlite3
import json

import os


app = Flask(__name__,static_url_path='/static', static_folder='static',template_folder='static')


@app.get("/")
def home():
    return send_from_directory("static","home.html")


@app.post("/signup")
def register():
    name  = request.form.get("name")
    phone  = request.form.get("phone")
    email  = request.form.get("email")
    password  = request.form.get("password")
    con = sqlite3.connect("cdb.db")
    cur = con.cursor()
    cur.execute(f"insert into customer values('{phone}','{name}','{email}','{password}')")
    con.commit()
    con.close()
    return "user created success"
@app.post("/login")
def login():
    phone  = request.form.get("phone")
    password  = request.form.get("password")
    con = sqlite3.connect("cdb.db")
    cur = con.cursor()
    res = cur.execute(f"select * from customer where phone='{phone}'").fetchone()
    message = ""
    if res==None:
         message = "user does not exist"
    else:
        if(res[3]==password):
            con.commit()
            con.close() 
            return render_template("lhome.html",uid=f"{phone}")
        else:
             message = "worng credentails try again"
    con.commit()
    con.close()
    return message

@app.post("/book")
def booking():
    material  = request.form.get("material")
    color  = request.form.get("color")
    size  = request.form.get("size")
    phone  = request.form.get("uid")
    date  = request.form.get("date")
    file = request.files['mimg']

    file.save(os.path.join("static/public", file.filename))
    con = sqlite3.connect("cdb.db")
    cur = con.cursor()
    print(phone)
    cur.execute(f"insert into book values('{material}','{color}','{size}','{date}','static/public/{file.filename}','{phone}')")
    con.commit()
    con.close()
    return "success all is well"

@app.get("/getorders")
def orders():
    uid = request.args.get("uid")
    con = sqlite3.connect("cdb.db")
    cur = con.cursor()
    res = cur.execute(f"select * from book where phone='{uid}'").fetchall()
    con.commit()
    con.close()
    return json.dumps(res)



if __name__ == "__main__":
    app.run(debug=True,port=80)
