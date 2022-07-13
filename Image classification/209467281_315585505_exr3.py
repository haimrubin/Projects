#!/usr/bin/env python
# coding: utf-8

# In[ ]:


import pandas as pd
from cv2 import cv2
from google.colab import files as FILE
import os
import requests 

train = pd.read_csv("training_ex3_dl2022b.csv")




for i in range(29111):

    img_data = requests.get(train['image'][i]).content
    id = train['id'][i]
    label =  train['label'][i]
    name = str(id) + '_' + str(label) + '.jpg'
    print(name)
    with open(name, 'wb') as handler:
      handler.write(img_data)

    FILE.download(name)


# In[ ]:


test = pd.read_csv("test_ex3_dl2022b.csv")

for i in range(7352):
    img_data = requests.get(train['image'][i]).content
    id = train['id'][i]
    name = str(id) + '.jpg'
    print(name)
    with open(name, 'wb') as handler:
      handler.write(img_data)

    FILE.download(name)


# In[146]:


from PIL import Image
from os import listdir
from keras.preprocessing.image import img_to_array
import pandas as pd
import numpy as np
import re
import tensorflow
import nltk
import tensorflow as tf
from keras.preprocessing.image import img_to_array
import keras
from keras.models import Sequential
from tensorflow.keras import datasets, layers, models
import matplotlib.pyplot as plt
import numpy as np
from keras.layers import Dense, Dropout, Flatten
from keras.layers import Conv2D, MaxPooling2D
from keras.preprocessing import image
from sklearn.model_selection import train_test_split
from tensorflow.keras.layers import BatchNormalization
from keras.layers.convolutional import Conv2D
from tensorflow.keras import optimizers
from sklearn.metrics.pairwise import cosine_similarity
import tensorflow as tf
import matplotlib.pyplot as plt
from keras.layers.pooling import MaxPooling2D
from keras.layers.core import Activation, Flatten
from keras.preprocessing.text import text_to_word_sequence
from keras.models import Sequential, load_model
from keras.layers import Dense, Dropout
import numpy as np
import pandas as pd



train_X = []
train_Y = []

imgs = listdir("C:/Users/haimr/OneDrive/שולחן העבודה/train")
for item in imgs: 
    try:
        if item.endswith("jpg") :
          fullname=str(item)
          fullname= fullname.split("_")
          temp=fullname[-1]
          t=temp.replace('.jpg','')
          image = tf.keras.preprocessing.image.load_img("C:/Users/haimr/OneDrive/שולחן העבודה/train/"+item,target_size=(64,64,3))
          reimg = img_to_array(image)
          train_Y.append(t)
          train_X.append(reimg)  
    except:
        pass

train_X = np.array(train_X, dtype="float") / 255.0
train_Y = np.array(train_Y)


# In[147]:


vald_X = []
vald_Y = []

imgs = listdir("C:/Users/haimr/OneDrive/שולחן העבודה/validation_images")

for item in imgs: 
    try:
        if item.endswith("jpg") :
          fullname=str(item)
          fullname= fullname.split("_")
          temp=fullname[-1]
          t=temp.replace('.jpg','')
          image = tf.keras.preprocessing.image.load_img("C:/Users/haimr/OneDrive/שולחן העבודה/validation_images/"+item,target_size=(64,64,3))
          reimg = img_to_array(image)
          vald_Y.append(t)
          vald_X.append(reimg)  
    except:
        pass

val_X = np.array(vald_X, dtype="float") / 255.0
val_Y = np.array(vald_Y)


# In[148]:


transform = {'bergamot': 0,'pomelo': 1,'yuzu': 2,'mandarin': 3,'lemon': 4,'orange': 5,'tangerine': 6}


# In[149]:


display(val_Y)


# In[150]:


inverse_transform = {0: 'bergamot',1: 'pomelo',2: 'yuzu',3: 'mandarin',4: 'lemon',5: 'orange',6: 'tangerine'}


# In[151]:


for i in range(len(val_Y)):
        val_Y[i]=transform[val_Y[i]]


# In[152]:


val_Y = val_Y.astype('uint8')


# In[153]:


train_Y


# In[154]:


for i in range(len(train_Y)):
        train_Y[i]=transform[train_Y[i]]


# In[ ]:


train_Y = train_Y.astype('uint8')


# In[211]:


#Create model
model = Sequential()

# Params for model
input_shape=(64, 64, 3)
kernel_size = (5, 5)
strides=(1,1)

# Add model layers
#  Stack 1:
model.add(layers.Conv2D(filters=32, kernel_size=kernel_size,padding='same', activation='relu', input_shape=input_shape))
model.add(layers.MaxPooling2D((2, 2)))

model.add(layers.Conv2D(filters=64, kernel_size=kernel_size,padding='same', activation='relu'))
model.add(layers.MaxPooling2D((2, 2)))

model.add(layers.Conv2D(filters=128, kernel_size=kernel_size,padding='same', activation='relu'))
model.add(layers.MaxPooling2D((2, 2)))



# model.add(layers.Conv2D(filters=256, strides=strides, kernel_size=kernel_size,padding='same', activation='relu'))
# model.add(layers.MaxPooling2D((2, 2),padding='same'))

# model.add(layers.Conv2D(filters=128, strides=strides, kernel_size=kernel_size,padding='same', activation='relu'))
# model.add(layers.MaxPooling2D((2, 2),padding='same'))


#  Stack 1:





model.add(Flatten())

# output layer:
model.add(layers.Dense(300, activation='relu'))
model.add(layers.Dense(7, activation='softmax'))


optimizer='adam'


# In[ ]:





# In[212]:


model.compile(optimizer='adam',
              loss='sparse_categorical_crossentropy',
              metrics=['accuracy'])


# In[ ]:





# In[ ]:


history = model.fit(train_X, train_Y, validation_data=(val_X,val_Y), epochs=10, batch_size=4) #, batch_size=4


# In[ ]:



from PIL import Image
from os import listdir
from keras.preprocessing.image import img_to_array
from keras.preprocessing.image import load_img
import pandas as pd
import numpy as np
import re
import tensorflow
import nltk
import tensorflow as tf
from keras.preprocessing.image import img_to_array
test_image = []
test_id = []

files = listdir("C:/Users/haimr/OneDrive/שולחן העבודה/test")
for item in files:
    if item.endswith("jpg") :
      temp=str(item)
      t=temp.replace('.jpg','')
      test_id.append(t)
      image2 = tf.keras.preprocessing.image.load_img("C:/Users/haimr/OneDrive/שולחן העבודה/test/"+item,target_size=(32,32,3))
      img_array2 =  img_to_array(image2)
      test_image.append(img_array2)  


test_X = np.array(test_image, dtype="float") / 255.00


# In[ ]:


haim=pd.read_csv("C:/Users/haimr/OneDrive/שולחן העבודה/sample_submission_ex3_dl2022b.csv")


# In[ ]:


predict=model.predict(test_X)
predict=(predict.argmax(axis=-1)).tolist()
for i in range(len(predict)):
        predict[i]=inverse_transform[predict[i]]

matan=dict(zip(np.array(test_id),predict))


# In[ ]:


for ids in matan:
    haim.loc[haim['id']==int(ids),'label']=matan[ids]
haim


# In[ ]:


print(history.history.keys())
haim.to_csv(f'{history.history['val_accuracy']}.csv', index=False)

