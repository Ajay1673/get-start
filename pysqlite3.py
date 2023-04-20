import sqlite3


con = sqlite3.connect("cdb.db")
cur = con.cursor()
res = cur.execute(" PRAGMA table_info('bulkorder') ")
# res = cur.execute("ALTER TABLE customer ADD COLUMN address ;")
# res = cur.execute("create table(Phone PRIMARY KEY,order_name,gender,color,dress_count INTEGER,userList,userSize);")
# res =cur.execute("SELECT name FROM sqlite_master WHERE type='table';")
# res = cur.execute("DELETE FROM customer WHERE phone='9361410824';")
# res = cur.execute("SELECT * FROM customer;")
# cur.execute("Create table bulkbook(phone PRIMARY KEY,order_name,dress_type,color,dress_count,date,path)")
# res = cur.execute("Create table bulkorder(phone,name,size,FOREIGN KEY (phone) REFERENCES bulkbook (phone) )")


print(res.fetchall())
con.commit()
con.close()