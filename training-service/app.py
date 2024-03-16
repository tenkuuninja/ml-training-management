from flask import Flask, request, jsonify
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LinearRegression
import pickle

app = Flask("Training Service")

@app.route("/")
def hello_world():
  return "Hello world"

@app.route("/training", methods = ['POST'])
def training():

  #Nhận link file
  train_file_link = request.json.get('train_file_link')
  test_file_link = request.json.get('test_file_link')

   # Đọc dữ liệu từ tệp CSV huấn luyện
  try:
    train_data = pd.read_csv(train_file_link)
  except Exception as e:
    return jsonify({'error': str(e)})

  # Đọc dữ liệu từ tệp CSV kiểm tra
  try:
    test_data = pd.read_csv(test_file_link)
  except Exception as e:
    return jsonify({'error': str(e)})
  
  # Nhận labels features và label target từ request
  labels_features = request.json.get('labels_features')
  label_target = request.json.get('label_target')

   # Lấy features và target từ tập huấn luyện
  X_train = train_data[labels_features]
  y_train = train_data[label_target]

  # Lấy features và target từ tập kiểm tra
  X_test = test_data[labels_features]
  y_test = test_data[label_target]

   # Huấn luyện mô hình hồi quy tuyến tính
  model = LinearRegression()
  model.fit(X_train, y_train)

   # Dự đoán trên tập kiểm tra
  y_pred = model.predict(X_test)

   # Tính toán các độ đo
  r2 = r2_score(y_test, y_pred)
  mse = mean_squared_error(y_test, y_pred)
  rmse = mean_squared_error(y_test, y_pred, squared=False)


  # Lưu mô hình đã huấn luyện
  with open('linear_regression_model.pkl', 'wb') as model_file:
    pickle.dump(model, model_file)
 # Trả về kết quả và các độ đo của mô hình
  return jsonify({
    'message': 'Mô hình đã được huấn luyện và lưu thành công.',
    'r2_score': r2,
    'mean_squared_error': mse,
    'root_mean_squared_error': rmse
  })

if __name__ == '__main__':  
  # py -m flask run
  app.run(debug=True)
