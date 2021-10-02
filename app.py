from flask import Flask, request, render_template, url_for
from time import strftime
import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore

app = Flask(__name__)

creden = credentials.Certificate('lunarops-bb7f7-firebase-adminsdk-key.json')
firebase_admin.initialize_app(creden)

@app.route('/', methods=['GET','POST'])
def home():
    return render_template('index.html')

@app.route('/message-add', methods=['GET','POST'])
def message_add():

    if request.method == 'POST':
        network = request.form.get("network")
        loglist = request.form.get("loglist")
        user = request.form.get("user")
        log_type = request.form.get("logtype")
        message = request.form.get("message")
        isof = request.form.get('isofficial')

        date = str(strftime("%d-%m-%Y"))
        time = str(strftime("%H:%M:%S"))
        date_time_user_id = '_'.join([date,time,user])

        data_base = firestore.client()
        data = {
            u"Date":date,
            u"Time":time,
            u"SendBy":user,
            u"MessageType":"/" + log_type,
            u"Message":message,
            u"IsOfficial":isof
        }

        data_base.collection(u"Networks").document(network).collection(loglist).document(date_time_user_id).set(data)
        
        return render_template('index.html', res = 1)

@app.route('/sort-urgent', methods=['GET','POST'])
def sort_urgent():

    if request.method == 'POST':
        val = "Urgent Logs"
        data_base = firestore.client()
        
        urgent_list = data_base.collection(u"Networks").document(u"Test Network").collection(u"Main Logs").stream()
        
        for urgent in urgent_list:
            temp_dict = {
                urgent.id : (urgent.to_dict())
            }
            print(temp_dict)
            if temp_dict[urgent.id]['MessageType'] == "/URGENT":
                print("===>>>",temp_dict)
                data_base.collection(u"Networks").document(u"Test Network").collection(u"Urgent Logs").document(urgent.id).set(temp_dict)
        return render_template('index.html', qual1 = 1, logtype = val)

@app.route('/sort-request', methods=['GET','POST'])
def sort_request():

    if request.method == 'POST':

        data_base = firestore.client()
        val = "Request Logs"
        urgent_list = data_base.collection(u"Networks").document(u"Test Network").collection(u"Main Logs").stream()
        
        for urgent in urgent_list:    
            temp_dict = {
                urgent.id : (urgent.to_dict())
            }
            print(temp_dict)

            if temp_dict[urgent.id]['MessageType'] == "/REQUEST":
                print("===>>>",temp_dict)
                data_base.collection(u"Networks").document(u"Test Network").collection(u"Request Logs").document(urgent.id).set(temp_dict)
        return render_template('index.html', qual2 = 1, logtype = val)

@app.route('/sort-official', methods=['GET','POST'])
def sort_official():

    if request.method == 'POST':
        val = "Official Logs"
        data_base = firestore.client()
        
        urgent_list = data_base.collection(u"Networks").document(u"Test Network").collection(u"Main Logs").stream()
        
        for urgent in urgent_list:    
            temp_dict = {
                urgent.id : (urgent.to_dict())
            }
            print(temp_dict)

            if temp_dict[urgent.id]['MessageType'] == "/OFFICIAL":
                print("===>>>",temp_dict)
                data_base.collection(u"Networks").document(u"Test Network").collection(u"Official Logs").document(urgent.id).set(temp_dict)
        return render_template('index.html', qual3 = 1, logtype = val)

@app.route('/sort-family', methods=['GET','POST'])
def sort_family():

    if request.method == 'POST':
        val = "Family Logs"
        data_base = firestore.client()
        
        urgent_list = data_base.collection(u"Networks").document(u"Test Network").collection(u"Main Logs").stream()
        
        for urgent in urgent_list:    
            temp_dict = {
                urgent.id : (urgent.to_dict())
            }
            print(temp_dict)

            if temp_dict[urgent.id]['MessageType'] == "/FAMILY":
                print("===>>>",temp_dict)
                data_base.collection(u"Networks").document(u"Test Network").collection(u"Family Logs").document(urgent.id).set(temp_dict)
        return render_template('index.html', qual4 = 1, logtype = val)

@app.route('/sort-command', methods=['GET','POST'])
def sort_command():

    if request.method == 'POST':
        val = "Output Logs"
        data_base = firestore.client()
        
        urgent_list = data_base.collection(u"Networks").document(u"Test Network").collection(u"Main Logs").stream()
        
        for urgent in urgent_list:    
            temp_dict = {
                urgent.id : (urgent.to_dict())
            }
            print(temp_dict)

            if temp_dict[urgent.id]['MessageType'] == "/COMMAND":
                print("===>>>",temp_dict)
                data_base.collection(u"Networks").document(u"Test Network").collection(u"Output Logs").document(urgent.id).set(temp_dict)

                date = str(strftime("%d-%m-%Y"))
                time = str(strftime("%H:%M:%S"))
                date_time_ = '_'.join([date,time])

                data = {
                    u"Date":date,
                    u"Time":time,
                    u"SendBy":u"SYSTEM",
                    u"MessageType":u"/OUTPUT",
                    u"Message":temp_dict[urgent.id]['SendBy'] + u"'s COMMAND  ~ " + temp_dict[urgent.id]['Message'] + ' ~  EXECUTED...',
                    u"IsOfficial":u"True"
                }
                data_base.collection(u"Networks").document(u"Test Network").collection(u"Output Logs").document(date_time_ + u"_SYSTEM").set(data)

        return render_template('index.html', qual5 = 1, logtype = val)


if __name__ == "__main__":
    app.run(debug=True)