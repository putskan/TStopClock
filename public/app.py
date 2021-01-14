from flask import Flask, render_template, url_for, request, redirect
app = Flask(__name__)
    

@app.route('/')
@app.route('/index.html')
def index():
    """
    serve webpage
    """
    return render_template('index.html')


if __name__ == '__main__':
    """
    handle website
    """
    app.run(host='0.0.0.0', port=4096, debug=True)

