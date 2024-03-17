from flask import Flask, request, jsonify
import numpy as np
import pandas as pd
from sklearn.base import r2_score
from sklearn.metrics import f1_score, mean_absolute_error, mean_squared_error
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
  y_test_pred = model.predict(X_test)
  y_train_pred = model.predict(X_train)


   # Tính toán các độ đo
  train_loss = mean_squared_error(y_train, y_train_pred)
  test_loss = mean_squared_error(y_test, y_test_pred)


  # Lưu mô hình đã huấn luyện
  with open('linear_regression_model.pkl', 'wb') as model_file:
    pickle.dump(model, model_file)


 # Trả về kết quả và các độ đo của mô hình
  return jsonify({
    'message': 'Mô hình đã được huấn luyện và lưu thành công.',
    'best_training_loss': train_loss,
    'best_test_loss': test_loss,
  })

@app.route('/evaluate', methods=['POST'])
def evaluate_model():
    # Nhận liên kết tệp CSV kiểm tra và liên kết mô hình từ request
    test_file_link = request.json.get('test_file_link')
    model_file_link = request.json.get('model_file_link')

    # Đọc dữ liệu từ tệp CSV kiểm tra
    try:
        test_data = pd.read_csv(test_file_link)
    except Exception as e:
        return jsonify({'error': str(e)})

    # Đọc mô hình đã lưu
    try:
        with open(model_file_link, 'rb') as model_file:
            model = pickle.load(model_file)
    except Exception as e:
        return jsonify({'error': str(e)})

    # Nhận labels features và label target từ mô hình đã huấn luyện
    labels_features = model['labels_features']
    label_target = model['label_target']

    # Lấy features và target từ tập kiểm tra
    X_test = test_data[labels_features]
    y_test = test_data[label_target]

    # Dự đoán trên tập kiểm tra
    y_pred = model.predict(X_test)

    # Tính toán các độ đo
    mse = mean_squared_error(y_test, y_pred)
    rmse = np.sqrt(mse)
    mae = mean_absolute_error(y_test, y_pred)
    f1 = f1_score(y_test, y_pred.round(), average='micro')  # Vì F1 score yêu cầu y_pred phải là binary label
    rsquared = r2_score(y_test, y_pred)

    # Trả về kết quả các độ đo
    return jsonify({
        'mse': mse,
        'rmse': rmse,
        'mae': mae,
        'f1': f1,
        'rsquared': rsquared
    })



if __name__ == '__main__':  
  # py -m flask run
  app.run(debug=True)
