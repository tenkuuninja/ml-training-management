from flask import Flask, request

app = Flask("Training Service")

@app.route("/")
def hello_world():
  return "Hello world"

@app.route("/training", methods = ['POST'])
def training():
  return request.get_json()


if __name__ == '__main__':  
  # py -m flask run
  app.run()
