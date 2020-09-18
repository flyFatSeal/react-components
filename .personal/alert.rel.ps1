Set-Location $PSScriptRoot
Set-Location ../

webpack.ps1 --config ./scripts/alert.rel.js

$alert = 'D:\hmi\webserver\public\firmware\javascripts\hjs\modules\renderAlert2.js'
# $alert = 'D:\scada\ScadaBase\Resources\app\webserver\public\firmware\javascripts\hjs\modules\renderAlert2.js'

echo 'hai.define(["React", "ReactDOM"], function (haiexports) {' > $alert
Get-Content -Encoding 'utf8' ./dist/alert2.rel.js >> $alert
echo 'haiexports("renderAlert2", alert2.renderAlert); });' >> $alert


# Get-Content -Encoding  'utf8' $alert  > 'D:\hmi\webserver\public\firmware\javascripts\hjs\modules\renderAlert2.js'


# $alert = 'D:\hmi\webserver\public\firmware\javascripts\hjs\modules\renderAlert2.js'
# echo 'hai.define(["React", "ReactDOM"], function (haiexports) {' >> $alert
# Get-Content -Encoding 'utf8' ./dist/alert2.dev.js >> $alert
# echo 'haiexports("renderAlert2", alert2.renderAlert);});' >> $alert


# $alert = 'D:\hmi\app\webserver\public\firmware\javascripts\hjs\modules\renderAlert2.js.map'
# Get-Content -Encoding 'utf8' ./dist/alert2.dev.js.map > $alert