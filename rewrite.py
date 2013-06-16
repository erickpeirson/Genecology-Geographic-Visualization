
location_data = [  
  ['Latitude', 'Longitude', 'Institution', 'Researchers'],
	[52.41483,-4.08839,'Botany Dept., Aberystwyth.',1],
	[52.4155,-4.0637,'Welsh Plant Breeding Station, Aberystwyth.',4],
	[53.22647,-4.13459,'Dept. of Agricultural Botany, Bangor.',5],
	[52.4623,-1.92115,'Botany Dept., Birmingham.',4],
	[51.45523,-2.59665,'Botany Dept., Bristol.',4],
	[52.203,0.12,'Botany School, Cambridge.',4],
	[53.3444,-6.25833,'Botany School, Trinity College, Dublin.',2],
	[56.5,-2.96667,'Scottish Horticultural Research Inst., Mylnefield, Dundee.',2],
	[54.77676,-1.57566,'Botany Dept., Durham.',9],
	[55.95206,-3.19648,'Botany Dept., Edinburgh.',1],
	[55.95206,-3.19648,'Forestry Dept., Edinburgh',1],
	[55.95206,-3.19648,'Scottish Plant Breeding Station, Pentlandfield, Edinburgh.',5],
	[50.7236,-3.52751,'Botany Dept., Exeter.',4],
	[53.00628,-2.28686,'Botany Dept., Keele.',1],
	[51.48614,-0.28728,'Royal Botanic Gardens, Kew.',5],
	[53.79648,-1.54785,'Botany Dept., Leeds.',5],
	[53.79648,-1.54785,'Agriculture Dept., Leeds.',1],
	[52.62139,-1.12444,'Botany Dept., Leicester.',4],
	[53.41058,-2.97794,'Botany Dept., Liverpool.',4],
	[53.41058,-2.97794,'Genetics Dept., Liverpool.',3],
	[51.521,-0.1253,'Botany Dept., London.',2],
	[54.97328,-1.61396,'Botany Dept., Newcastle-on-Tyne.',4],
	[51.75222,-1.25596,'Botany School, Oxford.',6],
	[51.45625,-0.97113,'Dept. of Agricultural Botany, Reading.',3],
	[53.38061,-1.48762,'Botany Dept., Sheffield.',2],
	[51.62079,-3.94323,'Botany Dept., Swansea.',1]
]

geojson = '[\n'
for datum in location_data:
    geojson += '\t{\n'
    geojson += '\t\t"type": "Feature",\n'
    geojson += '\t\t"properties": {\n'
    geojson += '\t\t\t"name": "'+datum[2]+'",\n'
    geojson += '\t\t\t"researchers": '+str(datum[3])+'\n'
    geojson += '\t\t},\n'
    geojson += '\t\t"geometry": {\n'
    geojson += '\t\t\t"type": "point",\n'
    geojson += '\t\t\t"coordinates": ['+str(datum[1])+','+str(datum[0])+']\n'
    geojson += '\t\t}\n'
    geojson += '\t},\n'

geojson += ']'

print geojson