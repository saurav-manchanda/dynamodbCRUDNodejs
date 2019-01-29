# -*- coding: utf-8 -*-
"""
Created on Tue Jan 22 18:46:20 2019

@author: saumanch
"""

import nltk
nltk.download('stopwords')
from nltk.corpus import stopwords

'''Method to preprocess the text passed in the method'''
def book_preprocess(book_data):
    #book_data is series here
    #For converting in lower case
    book_data = book_data.map(lambda x:  x.lower())
    #print(book_data)
    #book_data is still series here
    #For removing all the punctuations
    book_data = book_data.str.replace('[^\w\s]', '')
    #print(book_data)
    #book_data is still series here
    #For tokenizing-converting into seperate words
    book_data = book_data.apply(nltk.word_tokenize)
    #print(book_data)
    #book_data is still series here
    #removing the stopwords
    stop= stopwords.words('english')
    book_data= book_data.apply(lambda x: [item for item in x if item not in stop ])
    book_data=book_data.apply(lambda x: ' '.join(x))
    #print(book_data)
    return book_data;