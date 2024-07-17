from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route('/api/run-script', methods=['POST'])
def run_script():
    data = request.json
    input_text = data.get('input_text')
    
    # Here, you would normally run your Python script.
    # For example, if your script is `script.py` and it takes input text as an argument:
    # result = subprocess.run(['python', 'script.py', input_text], capture_output=True, text=True)
    
    # For demonstration purposes, let's just return the input text reversed.
    result = input_text[::-1]
    
    return jsonify({'output_text': result})
 
if __name__ == '__main__':
    app.run(debug=True)
