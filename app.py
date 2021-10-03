from flask import Flask, request, render_template, url_for
from time import localtime, strftime
import time
import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore
import threading

app = Flask(__name__)

creden = credentials.Certificate('lunarops4-firebase-key.json')
firebase_admin.initialize_app(creden)

def listing_official(NetworkName,uid):
    val = "Official Logs"
    data_base = firestore.client()
    urgent = data_base.collection(u"Networks").document(NetworkName).collection(u"Main Logs").document(uid).get()
    temp_dict = {
        uid: (urgent.to_dict())
    }
    print(temp_dict)

    if temp_dict[uid]['MessageType'] == "/OFFICIAL":
        date_time = str(strftime("%d-%m-%Y_%H:%M:%S",localtime()))
        data = {
            u"Timestamp":date_time,
            u"SendBy":u"SYSTEM",
            u"MessageType":u"/OUTPUT",
            u"Message": u"[SYSTEM] -=>>> User: [" + str(temp_dict[uid]['SendBy']) + u"]; ID: [" + str(uid) + u"]; Listed Under OFFICIAL LOGS"
        }
        data_base.collection(u"Networks").document(NetworkName).collection(u"Output Logs").document(date_time + u"_SYSTEM").set(data)
    return val

def listing_images(NetworkName,uid):
    val = "Image Logs"
    data_base = firestore.client()
    urgent = data_base.collection(u"Networks").document(NetworkName).collection(u"Main Logs").document(uid).get()
    temp_dict = {
        uid: (urgent.to_dict())
    }
    print(temp_dict)

    if temp_dict[uid]['MessageType'] == "/IMAGES":
        date_time = str(strftime("%d-%m-%Y_%H:%M:%S",localtime()))
        data = {
            u"Timestamp":date_time,
            u"SendBy":u"SYSTEM",
            u"MessageType":u"/OUTPUT",
            u"Message": u"[SYSTEM] -=>>> User: [" + str(temp_dict[uid]['SendBy']) + u"]; ID: ["  + str(uid) + u"]; uploaded and IMAGE"
        }
        data_base.collection(u"Networks").document(NetworkName).collection(u"Output Logs").document(date_time + u"_SYSTEM").set(data)
    return val

def sort_command(NetworkName,uid):
    val = "Output Logs"
    data_base = firestore.client()
    command = data_base.collection(u"Networks").document(NetworkName).collection(u"Main Logs").document(uid).get()    
    temp_dict = {
        command.id : (command.to_dict())
    }
    print(temp_dict)
    if temp_dict[uid]['MessageType'] == "/COMMAND":
        # temp_dict[uid]['Message'] = u"[COMMAND] -=> " + temp_dict[uid]['Message']
        print("===>>>",temp_dict)
        # data_base.collection(u"Networks").document(NetworkName).collection(u"Output Logs").document(uid).set(temp_dict)
        date_time = str(strftime("%d-%m-%Y_%H:%M:%S",localtime()))
        data = {
            u"Timestamp":date_time,
            u"SendBy":u"SYSTEM",
            u"MessageType":u"/OUTPUT",
            u"Message": u"[SYSTEM] -=>>> User [" + str(temp_dict[uid]['SendBy']) + u"] initiated [COMMAND]  ~ " + str(temp_dict[uid]['Message']) + ' ~  EXECUTED...'
        }
        data_base.collection(u"Networks").document(NetworkName).collection(u"Output Logs").document(date_time + u"_SYSTEM").set(data)
    return val


def tag_message(NetworkName,uid):
    val = "Tag"
    data_base = firestore.client()
    value = data_base.collection(u"Networks").document(NetworkName).collection(u"Main Logs").document(uid).get()    
    val_dict = value.to_dict()
    mess = (str(val_dict['Message'])).split('>>>')
    message = mess[0]
    print("TAG: ",message)
    tag_list = data_base.collection(u"Networks").document(NetworkName).collection(u"Main Logs").stream()
    for tag in tag_list:
        temp_dict = {
            tag.id : (tag.to_dict())
        }
        print(temp_dict)
        if message == "@" + str(tag.id):
            temp_dict[tag.id]['Message'] = u"[SYSTEM] -=>>> [" + str(val_dict['SendBy']) + u"] TAGGED [" + str(temp_dict[tag.id]['SendBy']) + u"]; ID: [" + str(tag.id) + u"]"
            print("===>>>",temp_dict)
            date = str(strftime("%d-%m-%Y"))
            time = str(strftime("%H:%M:%S"))
            date_time_ = '_'.join([date,time])
            data_base.collection(u"Networks").document(NetworkName).collection(u"Output Logs").document(date_time_ + u"_SYSTEM").set(temp_dict)
    return val

def tag_user(NetworkName,uid):
    val = "Tag"
    data_base = firestore.client()
    value = data_base.collection(u"Networks").document(NetworkName).collection(u"Main Logs").document(uid).get()    
    val_dict = value.to_dict()
    mess = (str(val_dict['Message'])).split('>>>')
    message = mess[0]
    print("TAG: ",message)
    tag_list = data_base.collection(u"Networks").document(NetworkName).collection(u"Main Logs").stream()
    for tag in tag_list:
        temp_dict = {
            tag.id : (tag.to_dict())
        }
        print(temp_dict)
        if message == "@" + temp_dict[tag.id]['SendBy']:
            temp_dict[tag.id]['Message'] = u"[SYSTEM] -=>>> [" + str(val_dict['SendBy']) + u"] TAGGED USER [" + str(temp_dict[tag.id]['SendBy']) + u"]"
            print("===>>>",temp_dict)
            date = str(strftime("%d-%m-%Y"))
            time = str(strftime("%H:%M:%S"))
            date_time_ = '_'.join([date,time])
            data_base.collection(u"Networks").document(NetworkName).collection(u"Output Logs").document(date_time_ + u"_SYSTEM").set(temp_dict)
            break
    return val

@app.route('/', methods=['GET','POST'])
def home():
    return render_template('index.html')

@app.route('/message-add', methods=['GET','POST'])
def message_add():
    if request.method == 'POST':
        network = request.form.get("network")
        user = request.form.get("user")
        log_type = request.form.get("logtype")
        message = request.form.get("message")

        date_time = str(strftime("%d-%m-%Y_%H:%M:%S"))
        date_time_user_id = '_'.join([date_time,user])
        data_base = firestore.client()
        data = {
            u"Timestamp":date_time,
            u"SendBy":user,
            u"MessageType":"/" + log_type,
            u"Message":message
        }
        data_base.collection(u"Networks").document(network).collection(u"Main Logs").document(date_time_user_id).set(data)

        start = time.perf_counter()

        t1 = threading.Thread(target=listing_official, args=(network,date_time_user_id))
        t2 = threading.Thread(target=listing_images, args=(network,date_time_user_id))
        t3 = threading.Thread(target=sort_command, args=(network,date_time_user_id))
        t4 = threading.Thread(target=tag_message, args=(network,date_time_user_id))
        t5 = threading.Thread(target=tag_user, args=(network,date_time_user_id))
        t1.start()
        t2.start()
        t3.start()
        t4.start()
        t5.start()
        t1.join()
        t2.join()
        t3.join()
        t4.join()
        t5.join()

        finish = time.perf_counter()

        duration = str(round(finish-start, 2)) + " Seconds"

        return render_template('index.html', res =1, durat = "Updated Output Logs.... Process Time: " + duration)

@app.route('/web-out-log/<string:net>/<string:uid>', methods=['GET','POST'])
def web_out_log(net,uid):
    if request.method == 'POST':
        netw = net.split('%20')
        network = ' '.join(netw)
        uid_ = uid.split('%20')
        date_time_user_id = ' '.join(uid_)
        try:
            start = time.perf_counter()
            t1 = threading.Thread(target=listing_official, args=(network,date_time_user_id))
            t2 = threading.Thread(target=listing_images, args=(network,date_time_user_id))
            t3 = threading.Thread(target=sort_command, args=(network,date_time_user_id))
            t4 = threading.Thread(target=tag_message, args=(network,date_time_user_id))
            t5 = threading.Thread(target=tag_user, args=(network,date_time_user_id))
            t1.start()
            t2.start()
            t3.start()
            t4.start()
            t5.start()
            t1.join()
            t2.join()
            t3.join()
            t4.join()
            t5.join()
            finish = time.perf_counter()
            duration = str(round(finish-start, 2)) + " Seconds"
            return "Updated Output Logs.... Process Time: " + duration
        except:
            return "Error: Cannot Acces or Log Data to Firestore"
    else:
        return "Error: Wrong Call Method"

@app.route('/app-img-log/<string:network>/<string:uid>', methods=['GET','POST'])
def app_img_log(net,uid):
    if request.method == 'POST':
        netw = net.split('%20')
        network = ' '.join(netw)
        uid_ = uid.split('%20')
        date_time_user_id = ' '.join(uid_)
        try:
            start = time.perf_counter()
            listing_images(network,date_time_user_id)
            finish = time.perf_counter()
            duration = str(round(finish-start, 2)) + " Seconds"
            return "Updated Output Logs.... Process Time: " + duration
        except:
            return "Error: Cannot Acces or Log Data to Firestore"
    else:
        return "Error: Wrong Call Method"

if __name__ == "__main__":
    app.run(debug=True)