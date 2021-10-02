from datetime import datetime
from time import strftime

# dati_now = datetime.now()
# print(dati_now)
# date = str(dati_now.day)+"-"+str(dati_now.month)+"-"+str(dati_now.year)
# print(date)
# time = str(dati_now.hour)+":"+str(dati_now.minute)+":"+str(dati_now.second)
# print(time)

# dati_now = strftime("%d-%m-%Y_%H:%M:%S", localtime())
# print(dati_now)
date = strftime("%d-%m-%Y")
time = strftime("%H:%M:%S")
print(date)
print(time)
