# -*- coding: utf-8 -*-
#Purpose: To predict the author using Naive Bayes Classifier Machine Learning Algorithm
"""
Created on Tue Jan 22 18:47:53 2019

@author: saumanch
"""
import  pandas as pd
from preprocess import book_preprocess
from sklearn.feature_extraction.text import CountVectorizer
from sklearn.feature_extraction.text import TfidfTransformer
from sklearn.naive_bayes import MultinomialNB
from sklearn.metrics import accuracy_score
#using panda to read the text file
df = pd.read_table('D:/Users/saumanch/Documents/dataset/training_data.txt',
                   sep='\t',
                   header=None,
                   names=['label', 'data'])
#df is a dataframe
#print(df)
df_test = pd.read_table('D:/Users/saumanch/Documents/dataset/williamShakespeare1.txt',
                   sep='\t',
                   header=None,
                   names=['label', 'data'])
#df_test is also a dataframe
#df['data'] is from panda.core.series. 
feature_data = book_preprocess(df['data'])
#print(feature_data)
feature_test= book_preprocess(df_test['data'])
#feature_data and feature_test are also series

#Vectorization starts here
count_vect = CountVectorizer()
counts = count_vect.fit_transform(feature_data)
transformer = TfidfTransformer().fit(counts)
counts = transformer.transform(counts)

count_test=count_vect.transform(feature_test)
count_test=transformer.transform(count_test)

model = MultinomialNB()
model.fit(counts,df['label'])
predicted= model.predict(count_test)

print("The predicted Author is ",predicted)
print("The accuracy is ",accuracy_score(predicted,df_test['label']))
print("The classes : ",model.classes_, " And there Probabilities ",model.predict_proba(count_test))


