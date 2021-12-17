# app.py
from flask import Flask,render_template,request,make_response
import json
import pymysql
app = Flask(__name__,template_folder="templates",static_folder="static",static_url_path="/backend/static")
db = pymysql.connect(host='localhost',user='root',database='industrial_map',passwd='zhd20020708',port=3306)

@app.route('/', methods=['GET','POST'])
def index():
    return render_template('index.html')

@app.route('/register', methods=['GET','POST'])
def register():
    if request.method == 'GET' :
        return render_template('register.html')
    if request.method == 'POST':
        data = json.load(request.get_data(as_text=True))
        cursor = db.cursor()
        sql = "select * from user_account where name='%s'" % data["user_name"]
        cursor.execute(sql)
        if cursor.fetchall():
            return "用户名已存在"
        sql = "select * from user_account where email='%s'" % data["user_mail"]
        cursor.execute(sql)
        if cursor.fetchall():
            return "邮箱已存在"
        sql = "insert into user_account values(null,'{name}','{pw}','{email}','tourist')"
        sql = sql.format(name=data["user_name"],pw=data["user_pw"],email=data['user_mail'])
        cursor.execute(sql)
        db.commit()
        #print("成功")
        msg = {'code': 0}
        return json.dumps(msg)

@app.route('/login', methods=['GET','POST'])
def login():
    if request.method == 'GET':
        return render_template('login.html')
    if request.method == 'POST':
        data = json.load(request.get_data(as_text=True))
        cursor = db.cursor()
        sql = "select password,id from user_account where name='%s'"%data["user_name"]
        cursor.execute(sql)
        account = cursor.fetchone()
        if account:
            if account[0] == data['user_pw']:
                #print("登陆成功")
                msg = {
                    "code": 1,
                    "cookie": {
                        "sessionId": account[1]
                    }
                }
                return json.dumps(msg)
            else:
                return "密码错误"
        else:
            return "用户名不存在"
        db.commit()

@app.route('/imap', methods=['GET','POST'])
def click():
    if request.method == 'GET':
        return render_template("map.html")
    if request.method == 'POST':
        data = json.load(request.get_data(as_text=True))
        cursor = db.cursor()
        if data["en_type"]:
            sql = "select * from enterprise where type='%s'" % data["en_type"]
            cursor.execute(sql)
            enterprises = cursor.fetchall()
            sql = "select * from material where id in " \
                  "(select material from enterprise where type='%s'" % data["en_type"]
            cursor.execute(sql)
            materials = cursor.fetchall()
            msg = {
                'enterprise_info': enterprises,
                'Material': materials
            }
            return json.dumps(msg)
        if data['chosen_material']:
            if data['chosen_province']:
                sql = "select city from enterprise where province='%s'" % data["chosen_province"]
                cursor.execute(sql)
                cities = cursor.fetchall()
            else:
                sql = "select city from enterprise where material = " \
                      "(select id from material where name = '%s')" % data["chosen_material"]
                cursor.execute(sql)
                cities = cursor.fetchall()
            sql = "select * from enterprise where material = " \
                  "(select id from material where name = '%s')" % data["chosen_material"]
            cursor.execute(sql)
            enterprises = cursor.fetchall()
            sql = "select * from material where name = '%s'" % data["chosen_material"]
            cursor.execute(sql)
            materials = cursor.fetchone()
            msg = {
                'cities_name' : cities,
                'enterprise_info' : enterprises,
                'Material' :
                    {
                        'id' : materials[0],
                        'name' : materials[1],
                        'content' : materials[2]
                    }
            }
            return json.dumps(msg)
        else:
            sql = "select city from enterprise where province='%s'" % data["chosen_province"]
            cursor.execute(sql)
            cities = cursor.fetchall()
            sql = "select * from enterprise where province='%s'" % data["chosen_province"]
            cursor.execute(sql)
            enterprises = cursor.fetchall()
            sql = "select * from material where id in " \
                  "(select material from enterprise where province='%s')" % data["chosen_province"]
            cursor.execute(sql)
            materials = cursor.fetchall()
            msg = {
                'cities_name': cities,
                'enterprise_info': enterprises,
                'Material': materials
            }
            return json.dumps(msg)



if __name__ == '__main__':
    app.run('127.0.0.1', port=5000, debug=True)
