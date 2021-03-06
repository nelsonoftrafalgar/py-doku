from flask import Flask, send_from_directory, jsonify, request
from flask_cors import CORS, cross_origin
from py_doku.src.mask import Mask

app = Flask(__name__, static_folder='client/build', static_url_path='')
cors = CORS(app)


@app.route('/api')
@cross_origin()
def Api():
    level = request.args.get('level')
    mask = Mask()
    board = mask.mask_board(float(level))
    response = jsonify(board)
    return response


@app.route('/')
def serve():
    return send_from_directory(app.static_folder, 'index.html')


if __name__ == '__main__':
    app.run(host='0.0.0.0')
