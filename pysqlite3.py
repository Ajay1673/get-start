import sqlite3


con = sqlite3.connect("cdb.db")
cur = con.cursor()
# res = cur.execute(" PRAGMA table_info('book') ")
res = cur.execute("select  * from book;")
# res = cur.execute("ALTER TABLE book ADD COLUMN phone ;")


con.commit()
con.close()