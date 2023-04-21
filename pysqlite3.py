import sqlite3


con = sqlite3.connect("cdb.db")
cur = con.cursor()
# res = cur.execute(" PRAGMA table_info('bulkbook') ")
# res = cur.execute("ALTER TABLE customer ADD COLUMN address ;")
# res = cur.execute("create table(Phone PRIMARY KEY,order_name,gender,color,dress_count INTEGER,userList,userSize);")
# res =cur.execute("SELECT name FROM sqlite_master WHERE type='table';")
# res = cur.execute("DROP table bulkorder;")
# res = cur.execute("DELETE FROM customer WHERE phone='9361410824';")
res = cur.execute("SELECT * FROM bulkorder;")
# res = cur.execute("Create table bulkbook(phone,order_name,material_image,dress_type,color,dress_count,date)")
# res = cur.execute("Create table bulkorder(phone,name,size)")


print(res.fetchall())
con.commit()
con.close()