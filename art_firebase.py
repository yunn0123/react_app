import firebase_admin
from firebase_admin import credentials, db
from datetime import datetime
from flask import Flask, request, jsonify

# 初始化 Firebase
cred = credentials.Certificate('townpass-20d9f-firebase-adminsdk-r8k3s-9e1173e9a9.json')  # 替换为你的 Firebase Admin SDK JSON 文件路径
firebase_admin.initialize_app(cred, {
    'databaseURL': 'https://townpass-20d9f-default-rtdb.firebaseio.com/'  # 替换为你的 Firebase 数据库 URL
})

app = Flask(__name__)

@app.route('/add_art', methods=['POST'])
def add_art():
    data = request.json  # 获取请求中的 JSON 数据
    if not data:
        return jsonify({'error': 'No data provided'}), 400
    
    user_id = data.get('user_id')
    art_id = data.get('art_id')

    
    if not user_id or not art_id:
        return jsonify({'error': 'Missing user_id or art_id'}), 400
    

    # 自动记录当前系统时间
    current_time = datetime.now().strftime('%Y-%m-%d')

    art_data = {
        'art_id': art_id,
        'time': current_time
    }

    user_ref = db.reference(f'Users/{user_id}')
    existing_data = user_ref.get()
    if existing_data is None:
        # user_id 不存在，创建新的 user_id 节点并存储数据
        user_ref.set({})  # 仅初始化 user_id 节点
        user_ref.child('data').push(art_data)  # 使用 push 添加新数据到 data 列表中
        message = f"User {user_id} created successfully with data: {art_data}!"
    else:
        # user_id 已存在，直接在该节点下插入数据
        user_ref.child('data').push(art_data)  # 使用 push 添加新数据到 data 列表中
        message = f"User {user_id} created successfully with data: {art_data}!"

    return jsonify({'message': message}), 200

@app.route('/add_art', methods=['GET'])
def get_art():
    user_id = request.args.get('user_id')
    if not user_id:
        return jsonify('NoRecord'), 200

    user_ref = db.reference(f'Users/{user_id}')
    existing_data = user_ref.get()
    if existing_data is None:
        # 用户不存在，不返回数据
        return jsonify('NoRecord'), 200
    
    # 用户存在，返回数据
    data = existing_data.get('data', [])
    return jsonify(data), 200
   

if __name__ == '__main__':
    app.run(debug=True)        
   
#更新資料
#updated_data = {
    #'id': user_id,
    #'name': art_name,
    #'address': address,
    #'time': current_time
#}

# 将數據推到Firebase
#ref = db.reference('Users')  #設定資料庫節點

#更新資料
#user_ref = ref.order_by_child('id').equal_to(user_id).get()
#for key in user_ref:
    #ref.child(key).update(updated_data)



