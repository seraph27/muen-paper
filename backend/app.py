from flask import Flask, request, jsonify
from flask_cors import CORS
from search_s import get_res

app = Flask(__name__)
CORS(app)

@app.route('/api/run-script', methods=['POST'])
def run_script():
    data = request.json
    input_text = data.get('input_text')
    result = get_res(input_text)    
    return jsonify(result)
 
if __name__ == '__main__':
    app.run(debug=True)
