# app.py
from flask import Flask,render_template,request,jsonify
import json
import pymysql
from flask_cors import CORS

app = Flask(__name__,template_folder="templates",static_folder="static",static_url_path="/backend/static")
app.config["JSON_AS_ASCII"] = False
CORS(app)
db = pymysql.connect(host='localhost',user='root',database='mydb2',passwd='Gly200111202428',port=3306)

@app.route('/', methods=['GET','POST'])
def index():
    return render_template('index.html')

@app.route('/register', methods=['GET','POST'])
def register():
    if request.method == 'GET' :
        return render_template('register.html')
    if request.method == 'POST':
        data = json.loads(request.get_data(as_text=True))
        cursor = db.cursor()
        sql = "select * from user_account where name='%s'" % data["user_name"]
        cursor.execute(sql)
        if cursor.fetchall():
            return {'code': 0,'error':"用户名已存在"}
        sql = "select * from user_account where email='%s'" % data["user_mail"]
        cursor.execute(sql)
        if cursor.fetchall():
            return {'code': 0,'error':"邮箱已存在"}
        sql = "insert into user_account values(null,'{name}','{pw}','{email}','tourist')"
        sql = sql.format(name=data["user_name"],pw=data["user_pwd"],email=data['user_mail'])
        cursor.execute(sql)
        db.commit()
        print("成功")
        msg = {'code': 1}
        return jsonify(msg)

@app.route('/login', methods=['GET','POST'])
def login():
    if request.method == 'GET':
        return render_template('login.html')
    if request.method == 'POST':
        data = json.loads(request.get_data(as_text=True))
        cursor = db.cursor()
        sql = "select password,name,type from user_account where name='%s'"%data["user_name"]
        cursor.execute(sql)
        account = cursor.fetchone()
        if account:
            if account[0] == data['user_pwd']:
                print("登陆成功")
                msg = {
                    "code": 1,
                    "cookie": {
                        "sessionName": account[1],
                        "type": account[2]
                    }
                }
                return jsonify(msg)
            else:
                return "密码错误"
        else:
            return "用户名不存在"
        db.commit()

@app.route('/imap', methods=['GET','POST'])
def click():
    # if request.method == 'GET':
        
    if request.method == 'POST':
        data = json.loads(request.get_data(as_text=True))
        cursor = db.cursor()
        if data['chosen_material']:
            print("1")
            if data['chosen_province']:
                print("10")
                sql = "select city from enterprise where province='%s' and type='%s'" %(data["chosen_province"],data['en_type'])
                cursor.execute(sql)
                cities = cursor.fetchall()
            else:
                print("11")
                sql = "select city from enterprise where type='%s' and en_id in " \
                      "(select en_id from enter_mater where " \
                      "ma_id in (select ma_id from material where ma_name = '%s'))" %(data['en_type'],data["chosen_material"])
                cursor.execute(sql)
                cities = cursor.fetchall()
            sql = "select * from enterprise where type='%s' and en_id in " \
                "(select en_id from enter_mater where " \
                "ma_id in (select ma_id from material where ma_name = '%s'))" %(data['en_type'],data["chosen_material"])
            cursor.execute(sql)
            enterprises = cursor.fetchall()
            print(enterprises)
            print(data["chosen_material"])
            print(data["en_type"])
            sql = "select * from material where ma_name = '%s' and ma_id in (select ma_id from enter_mater where en_id in (select en_id from enterprise where type = '%s'))" %(data["chosen_material"],data["en_type"])
            cursor.execute(sql)
            materials = cursor.fetchall()
            print(materials)
            msg = {
                'cities_name' : cities,
                'enterprise_info' : enterprises,
                'Material' :
                    {
                        'id' : materials[0][0],
                        'name' : materials[0][1],
                        'content' : materials[0][2]
                    }
            }
            return jsonify(msg)
        else:
            print("0")
            if data['chosen_province']:
                print("00")
                sql = "select city from enterprise where type = '%s' and locate('%s',province) > 0" % (data['en_type'],data["chosen_province"])
                cursor.execute(sql)
                cities = cursor.fetchall()
                
                sql = "select * from enterprise where type = '%s' and locate('%s',province) > 0" %(data['en_type'], data["chosen_province"])
                cursor.execute(sql)
                enterprises = cursor.fetchall()

                sql = "select * from material where ma_id in " \
                    "(select ma_id from enter_mater where " \
                    "en_id in (select en_id from enterprise where type = '%s' and locate('%s',province) > 0))" %(data['en_type'],data["chosen_province"])
                cursor.execute(sql)
                materials = cursor.fetchall()
                sql = "select ma_name,count(en_id) from material natural join enter_mater " \
                    "natural join enterprise where (type = '%s' and locate('%s',province) > 0) group by ma_id" % (data['en_type'],data["chosen_province"])
                cursor.execute(sql)
                rowdata = cursor.fetchall()
                data = []
                for i in range(len(rowdata)):
                    data.append({'type':rowdata[i][0],'value':rowdata[i][1]})
                msg = {
                    'cities_name': cities,
                    'enterprise_info': enterprises,
                    'Material': materials,
                    'data' : data
                }
                return jsonify(msg)
            else:
                print("01")
                sql = "select * from enterprise where type='%s'" % data["en_type"]
                cursor.execute(sql)
                enterprises = cursor.fetchall()
                print("enterprise")
                print(enterprises)
                sql = "select * from material where ma_id in " \
                    "(select ma_id from enter_mater where " \
                    "en_id in (select en_id from enterprise where type='%s'))" % data["en_type"]
                cursor.execute(sql)
                materials = cursor.fetchall()
                print("materials")
                print(materials)

                


                sql = "select ma_name,count(en_id) from material natural join enter_mater natural join enterprise where type = '%s' group by ma_id" % data["en_type"]
                # sql.format(type=data['en_type'])
                print(data["en_type"])
                cursor.execute(sql)
                # print(cursor.fetchall())
                rowdata = cursor.fetchall()
                print("rowdata")
                print(rowdata)
                data = []
                for i in range(len(rowdata)):
                    data.append({'type': rowdata[i][0], 'value': rowdata[i][1]})
                msg = {
                    'enterprise_info': enterprises,
                    'Material': materials,
                    'data':data
                }
                return jsonify(msg)


@app.route('/mdata', methods=['GET','POST'])
def admin():
    if request.method == 'POST':
        data = json.loads(request.get_data(as_text=True))
        cursor = db.cursor()
        if data["type"] == "insert":
            if data["table"] == "material":
                sql = "select * from material where ma_name='%s'" % data["ma_name"]
                cursor.execute(sql)
                if cursor.fetchall():
                    return {'code': 0, 'error': "材料已存在"}
                sql = "insert into material values(null,'{name}','{intro}')"
                sql = sql.format(name=data["ma_name"],intro=data["introduction"])
                cursor.execute(sql)
                db.commit()
            elif data["table"] == "enterprise":
                sql = "select * from enterprise where name='%s'" % data["en_name"]
                cursor.execute(sql)
                if cursor.fetchall():
                    return {'code': 0, 'error': "企业已存在"}
                
                sql = "insert into enterprise values(null,'{name}','{pro}','{city}',{amount},'{type}',{long},{lati})"
                sql = sql.format(name=data["en_name"],pro=data["province"],
                                    city=data["city"],amount=data["amount"],type=data["en_type"],
                                    long=data["longitude"],lati=data["latitude"])
                cursor.execute(sql)
                db.commit()
                sql = "select en_id from enterprise where name='%s'" % data["en_name"]
                cursor.execute(sql)
                # print(cursor.fetchone())
                en_id = cursor.fetchone()
                print(data["ma_name"])
                sql = "select ma_id from material where ma_name='%s'" % data["ma_name"]
                cursor.execute(sql)
                
                ma_id = cursor.fetchone()
               
                if ma_id is None:
                    return {'code': 0, 'error': "材料不存在"}  
                
                print(en_id)
                print(ma_id)
                sql = "insert into enter_mater values(null,{en},{ma})"
                sql = sql.format(en=en_id[0],ma=ma_id[0])
                cursor.execute(sql)
                db.commit()
            return {'code': 1,'msg':"添加成功"}
        elif data["type"] == "delete":
            if data["table"] == "material":
                sql = "select * from material where ma_name='%s'" % data["ma_name"]
                cursor.execute(sql)
                if not cursor.fetchall():
                    return {'code': 0, 'error': "材料不存在"}
                sql = "delete from material where ma_name='%s'" % data['ma_name']
                cursor.execute(sql)
                db.commit()
            elif data["table"] == "enterprise":
                sql = "select * from enterprise where name='%s'" % data["en_name"]
                cursor.execute(sql)
                if not cursor.fetchall():
                    return {'code': 0, 'error': "企业不存在"}
                sql = "delete from enterprise where name='%s'" % data['en_name']
                cursor.execute(sql)
                db.commit()
            return {'code':1,'msg':"删除成功"}
        else:
            if data["table"] == "enterprise":
                sql = "select * from enterprise where name='%s'" % data["en_name"]
                cursor.execute(sql)
                if not cursor.fetchall():
                    return {'code': 0, 'error': "企业不存在"}
                column_name = ["province","city","amount","en_type","longitude","latitude"]
                for i in column_name:
                    if data[i] != "":
                        if i == "amount":
                            sql = "update enterprise set amount={new} where name='{name}'"
                            sql = sql.format(new=int(data[i]), name=data["en_name"])
                        elif i == "longitude" or i == "latitude":
                            sql = "update enterprise set {col}={new} where name='{name}'"
                            sql = sql.format(col=i, new=float(data[i]), name=data["en_name"])
                        else:
                            sql = "update enterprise set {col}='{new}' where name='{name}'"
                            sql = sql.format(col=i,new=data[i], name=data["en_name"])
                cursor.execute(sql)
                db.commit()
                return {'code':1,'msg':"修改成功"}
            else:
                sql = "select * from material where ma_name='%s'" % data["ma_name"]
                cursor.execute(sql)
                if not cursor.fetchall():
                    return {'code': 0, 'error': "材料不存在"}
                sql = "update material set introduction='{intro}' where ma_name='{name}'"
                sql = sql.format(intro=data["introduction"], name=data["ma_name"])
                return {'code':1,'msg':"修改成功"}
                

if __name__ == '__main__':
    app.run('127.0.0.1', port=5000, debug=True)