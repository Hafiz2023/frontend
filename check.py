import sqlite3
conn = sqlite3.connect('../instance/account_system.db')
c = conn.cursor()
c.execute("SELECT name, category, image_path FROM product WHERE name LIKE '%Hafiz%'")
print(c.fetchall())
