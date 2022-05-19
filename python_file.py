import pandas as pd
import numpy as np
from collections import Counter
import re

class sub_claim():
    def __init__(self, name, claim, quote):
        self._name = name
        self._claim = claim
        self._tweet = 0
        self._quote = quote
        self._fdp = []
        self._topfdp = []
        self._text = []
        
    
    def get_name(self):
        return self._name
    def get_topfdp(self):
        self._topfdp = Counter(self._fdp).most_common(5)
        return self._topfdp
    def get_numberofhashtag(self):
        compte = 0
        for i in range(len(self._text)):
            if "#" in self._text[i]:
                compte +=1
        return compte
    
    def get_tweet(self):
        return self._tweet
    
    def get_claim(self):
        return self._claim
    
    def get_quote(self):
        return self._quote
    
    def add_a_tweet(self,author,text):
        self._tweet +=1
        self._fdp.append(author)
        self._text.append(text)
    
    def find_most_common_words(self):
        with open('test.txt', 'w',encoding='utf-8') as f:
            for line in self._text:
                f.write(line)
                f.write('\n')
        words = re.findall(r'\w+', open('test.txt',encoding='utf-8').read().lower())
        words_del = []
        for i in range(len(words)):
            if len(words[i]) < 3 or words[i] == 'https' or words[i] == 'the' or words[i] == 'and' or words[i] == 'that' or words[i] == 'are' or words[i] == 'this' or words[i] == 'has' or words[i] == 'been' or words[i] == 'for' or words[i] == 'from':
                words_del.append(words[i])
        for i in range(len(words_del)):
                words.remove(words_del[i])
        
        print(Counter(words).most_common(5))
        
    
df = pd.read_excel ('excel.xlsx')  # Reading the file
dt = pd.DataFrame.to_numpy(df) # Change it to numpy array
nb_tweet = int(dt.size/6) # Nb of tweets in the dt

nb_cat = 5 
nb_sub_cat = 7

# Creation of the sub claims classes:
c1_1 = sub_claim('1_1',1,"Ice isn't melting")
c1_2 = sub_claim('1_2',1,"We are heading into ice age")
c1_3 = sub_claim('1_3',1,"Weather is cold")
c1_4 = sub_claim('1_4',1,"There is a hiatus in warming")
#c1_5 = sub_claim('1_5') Donesn't exist...
c1_6 = sub_claim('1_6',1,"Sea level rise is exaggerated")
c1_7 = sub_claim('1_7',1,"Extremes aren't increasing")
c2_1 = sub_claim('2_1',2,"It's natural cycles")
#c2_2 = sub_claim('2_2')
c2_3 = sub_claim('2_3',2,"There is nos evidence for greenhouse effect")
c3_1 = sub_claim('3_1',3,"Sensitivity is low")
c3_2 = sub_claim('3_2',3,"There is no species impact")
c3_3 = sub_claim('3_3',3,"CO2 is not a pollutant")
c4_1 = sub_claim('4_1',4,"Policies are harmful")
c4_2 = sub_claim('4_2',4,"Policies are ineffective")
#c4_3 = sub_claim('4_3')
c4_4 = sub_claim('4_4',4,"Clean energy won't work")
c4_5 = sub_claim('4_5',4,"We need energy")
c5_1 = sub_claim('5_1',5,"Science is unreliable")
c5_2 = sub_claim('5_2',5,"Climate movement is unreliable")

# Collection of all sub claims
tab_c = [c1_1,c1_2,c1_3,c1_4,c1_6,c1_7,c2_1,c2_3,c3_1,c3_2,c3_3,c4_1,c4_2,c4_4,c4_5,c5_1,c5_2]

# Calculate the true number of tweets in the dataset
total_tweet_missinfo = 0
for i in range (nb_tweet):
    for j in range(len(tab_c)):
        if tab_c[j].get_name() == str(dt[i,5]):
            tab_c[j].add_a_tweet(str(dt[i,2]),str(dt[i,3]))
            total_tweet_missinfo+=1

print('True number of tweets:' , total_tweet_missinfo)

# Calculate the number of #
cbdehastag =0
for i in range(len(tab_c)):
    cbdehastag += tab_c[i].get_numberofhashtag()
    
print('Number of #:' , cbdehastag)
print("##############################")


# METHODS TO COLLECT INFORMATION FORM ONE SUB CLAIM:

sub_claim_wanted = c1_1 # JUST CHANGE THIS ONE TO CHANGE SUB CLAIM
print("EXEMPLE AVEC C", sub_claim_wanted.get_name())
print("CLAIM:",sub_claim_wanted.get_claim())
print("QUOTE:",sub_claim_wanted.get_quote())
print("Nb de TWEETs:", sub_claim_wanted.get_tweet())
print("TOP 5 DES FDP:")
print(sub_claim_wanted.get_topfdp())
print("NB DE #:",sub_claim_wanted.get_numberofhashtag())
print("TOP 5 DES MOTS LES PLUS UTILISES:")
sub_claim_wanted.find_most_common_words()