import json, requests
from pprint import pprint
from collections import MutableMapping
from contextlib import suppress

with open('states.json', 'r') as f:
    data = json.load(f)
    
#json_string = json.dumps(json_dict) idr what this does ;-;

#change key['NAME'] to ['state']
#change states to abbreviations

#remove PR
del data['features'][51]

#list of unnecessary keys
keys_to_remove = ['GEO_ID', 'STATE', 'LSAD', 'CENSUSAREA']

#remove unnecessary keys
for each in range(51):
    #data['features'][each]['properties']['state'] = data.pop['features'][each]['properties']['NAME']
    #d['test2'] = d.pop('test')
    #data['state'] = data.pop['NAME']
    for key in keys_to_remove:
        del data['features'][each]['properties'][key]

#rename 'NAME' to 'State'
for each in range(51):
    data['features'][each]['properties']['State'] = data['features'][each]['properties']['NAME']
    del data['features'][each]['properties']['NAME']

# newjson = json.dumps(data)
# print json.dumps(parsed, indent=4, sort_keys=True)
type(data)