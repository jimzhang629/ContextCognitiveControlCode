# -*- coding: utf-8 -*-
"""
Created on Tue Jan 21 11:20:48 2020
​
@author: rmg55
"""

import pandas as pd
import glob
import os
import copy

#global script variables
accCutoff = .65
path = r'/Users/jinjiang-macair/Library/CloudStorage/OneDrive-DukeUniversity/Duke/Fall2022Rotation/Data/contextFlanker/'


#load files from path
allFiles = glob.glob(path + "*.txt")
assignmentID = allFiles
subjectList = []
assignmentList = []
groupDataList = []
aboveAccCutoff = []
accList = []

for file in allFiles:
    # open participant info file
    partInfoFile = open(file,"r").readlines()
    partInfo = [x.strip() for x in partInfoFile]
    
    #pull worker ID and assignment ID from file
    wID = partInfo[2]
    aID = partInfo[1]
    compID = wID.split(':')  #getting worker ID
    compID2 = aID.split(':') #getting assignment ID
    subject = compID[1] #subID
    
    #open log file with the same name as the given particant info file
    logfile = compID2[1]+'.log' 
    partDataFile = pd.read_csv(path + logfile, lineterminator=';', sep=',', header=None, error_bad_lines = False);
    partData = pd.concat([partDataFile], ignore_index=True, axis = 1) 
    testData = copy.deepcopy(partData)
    
    #formatting result dataframe
    partData['subject']=subject #adding a column with subID
    partData = partData.rename(columns={0: 'sectionType', 1: 'taskName', 2: 'block', 3: 'blockOrder', 
                                        4:'whichBlock', 5: 'trialCount', 6: 'blockTrialCount', 
                                        7: 'trialImg', 8: 'imgSource', 9:'imgCongruency', 10: 'imgDisplayLocation', 11:'repeat', 
                                        12: 'stimOnset', 13: 'respOnset', 14: 'respTime', 15: 'accuracy', 
                                        16: 'sectionStart', 17: 'sectionEnd', 18: 'sectionEnd-sectionStart'}) 
       
    #add info to individual lists
    subjectList.append(subject)
    assignmentList.append(compID2[1])
    
    #add data to whole sample dataframe list
    groupDataList.append(partData)

    #save out participant data to CSV if it doesn't exist already
    if os.path.exists(path+'Subj_'+str(subject)+'.csv'):
        print(subject+' exists.') #don't make csv again if it already exits (file creation times are helpful for keeping track of data)
    else:
        print('Creating csv file for '+subject)
        partData.to_csv(path+'Subj_'+str(subject)+'.csv', index=False)
    
#combine groupData into one file and save file
groupData = pd.concat(groupDataList, ignore_index = True)

# save out groupData into csv
print('Creating group level csv file.')
groupData.to_csv(path+'combinedData'+'.csv', index=False)