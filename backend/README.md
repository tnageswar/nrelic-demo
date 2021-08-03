
# nrelic-demo backend

#### Running the backend from the directory 'backend'
##### Start with default port 4000
```
npm start
```
##### Start by overriding default port ( eg: 3001 )
```
# From Powershell
$Env:BK_SRV_PORT=3001 ; npm start
# From bash
BK_SRV_PORT=3001; npm start
```
##### Configurable Environmet variables
- BK_SRV_PORT
##### Dependencies installed
- nodemon    ( While developing )
- config
- cors
