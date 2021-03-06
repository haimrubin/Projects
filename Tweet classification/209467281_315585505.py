# -*- coding: utf-8 -*-
"""Untitled2.ipynb

Automatically generated by Colaboratory.

Original file is located at
    https://colab.research.google.com/drive/1e4FZ4GopRqxIz93ebOAlQR0oLYnDSIcn
"""

from sklearn.feature_extraction.text import CountVectorizer
import pandas as pd
tf_vectorizer = CountVectorizer() 
df = pd.read_csv("training.csv")
training = df
validation = pd.read_csv("training.csv")
testcsv = pd.read_csv("test.csv")

#### PREPROC
import nltk
from nltk.corpus import stopwords
stop = stopwords.words('english')


training['text'] = training['text'].str.lower()
training['text'] = training['text'].str.replace('[^\w\s]','')
training['text'] = training['text'].apply(lambda x: " ".join(x for x in x.split() if x not in stop))
training['text'] = training['text'].replace(regex=True, to_replace=['Ð', '§', '±','ð','â','¼'], value='')


validation['text'] = validation['text'].str.lower()
validation['text'] = validation['text'].str.replace('[^\w\s]','')
validation['text'] = validation['text'].apply(lambda x: " ".join(x for x in x.split() if x not in stop))
validation['text'] = validation['text'].replace(regex=True, to_replace=['Ð', '§', '±','ð','â','¼'], value='')


testcsv['text'] = testcsv['text'].str.lower()
testcsv['text'] = testcsv['text'].str.replace('[^\w\s]','')
testcsv['text'] = testcsv['text'].apply(lambda x: " ".join(x for x in x.split() if x not in stop))
testcsv['text'] = testcsv['text'].replace(regex=True, to_replace=['Ð', '§', '±','ð','â','¼'], value='')

from sklearn.naive_bayes import MultinomialNB
from sklearn import metrics
tf_vectorizer = CountVectorizer() 
label=training['label']
traintext= tf_vectorizer.fit_transform(training['text']) #after preproc
testtext = tf_vectorizer.transform(validation['text']) #after preproc
validationlabel = validation['label']


from sklearn.ensemble import AdaBoostClassifier


clf = AdaBoostClassifier(n_estimators=100, random_state=0)
clf.fit(traintext, label)
test=clf.predict(testtext)
print("Accuracy:",metrics.accuracy_score(validationlabel, test))
######################################################################
finaltest = tf_vectorizer.transform(testcsv['text'])
test=clf.predict(finaltest)
print(test)

from numpy import asarray
from numpy import savetxt

test3=pd.read_csv("/content/test.csv")
import csv 
print(test)
# define data
# save to csv file
savetxt('final.csv', test, delimiter=',')