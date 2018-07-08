#enter file name
file = 'westnile_dataset.csv'

import pandas as pd
import numpy as np

df = pd.read_csv(file)
df = df.loc[df['PartOfCumulativeCountSeries'] == 1]
df = df[['Admin1Name', 'PeriodStartDate', 'PeriodEndDate', 'CountValue']]
df = df.rename(columns={'Admin1Name':'State', 'PeriodStartDate':'Start', 'PeriodEndDate':'End', 'CountValue':'Count'})
df = df.loc[df['Start'] > '2009-12-31']
df.sort_values(by=['State', 'End', 'Start'], inplace=True)
df.reset_index(inplace=True, drop=True)

states = ['ALABAMA', 'ALASKA', 'ARIZONA', 'ARKANSAS', 'CALIFORNIA', 'COLORADO', 'CONNECTICUT', 'DELAWARE', 'DISTRICT OF COLUMBIA', 'FLORIDA', 'GEORGIA', 'HAWAII', 'IDAHO', 'ILLINOIS', 'INDIANA', 'IOWA', 'KANSAS', 'KENTUCKY', 'LOUISIANA', 'MAINE', 'MARYLAND', 'MASSACHUSETTS', 'MICHIGAN', 'MINNESOTA', 'MISSISSIPPI', 'MISSOURI', 'MONTANA', 'NEBRASKA', 'NEVADA', 'NEW HAMPSHIRE', 'NEW JERSEY', 'NEW MEXICO', 'NEW YORK', 'NORTH CAROLINA', 'NORTH DAKOTA', 'OHIO', 'OKLAHOMA', 'OREGON', 'PENNSYLVANIA', 'RHODE ISLAND', 'SOUTH CAROLINA', 'SOUTH DAKOTA', 'TENNESSEE', 'TEXAS', 'UTAH', 'VERMONT', 'VIRGINIA', 'WASHINGTON', 'WEST VIRGINIA', 'WISCONSIN', 'WYOMING']
states_df = pd.DataFrame(states)
states_df.rename(columns={0:'State'}, inplace=True)
template_df = pd.DataFrame(states)
template_df.rename(columns={0:'State'}, inplace=True)

USpop = 308745538

finalyear = df['Start'].iloc[-1]
finalyear = int(finalyear[0:4])
timerange = np.arange(2010, finalyear+1)

for year in timerange:
    year_df = [[]]
    year_df = df.loc[(df.Start.str.startswith(str(year)))].append(pd.Series(index=()), ignore_index=True)
    year_data = []
    lastrow = len(year_df) - 1

    for index, column in year_df.iterrows():
        if (index < lastrow) and (year_df.iloc[index,0] != year_df.iloc[(index+1),0]):
            year_data.append(year_df.iloc[index])

    cleaned_year_df = pd.DataFrame()
    cleaned_year_df = pd.DataFrame(year_data)
    cleaned_year_df.reset_index(inplace=True, drop=True)
    cleaned_year_df.drop(columns=['Start', 'End'], inplace=True)
    cleaned_year_df = cleaned_year_df.rename(columns={'Count':'Cases_'+str(year)})

    template_df = template_df.merge(cleaned_year_df, on='State', how='outer')
    merged_df = states_df.merge(template_df, on='State', how='left')
    data_df = merged_df

merged_df = merged_df.fillna(0)
merged_df.set_index('State', inplace=True, drop=True)
merged_df['TotalByState'] = merged_df.sum(axis=1)
merged_df.loc['TotalByYear'] = merged_df.sum()
    
for year in timerange:
    merged_df['Rate_'+str(year)] = merged_df['Cases_'+str(year)] / USpop * 100000
    
merged_df.to_csv('cleaned_dataset.csv')

#create csv for line graph
line = pd.DataFrame(merged_df.loc['TotalByYear'])
line = line[line.index.str.contains('Cases') == True]
line['Year'] = timerange
line.set_index('Year', drop=True, inplace=True)
line.rename(columns={'TotalByYear':'Total'}, inplace=True)
line.to_csv('line_dataset.csv')

#create csv for data.html
data_df = data_df.fillna(0)
data_df.set_index('State', inplace=True, drop=True)
data_df.rename(columns = lambda x : str(x)[-4:], inplace=True)
data_df['TotalByState'] = data_df.sum(axis=1)
data_df.loc['TotalByYear'] = data_df.sum()
data_df.to_csv('data_dataset.csv')