#!/bin/bash

echo "This program need git to clone repo."
echo "Please install git if it's not installed yet!."

v2fly_dir=v2fly-geosite

# Clone/update geosite file
if ls | grep $v2fly_dir; then
    echo "Updating geosite!"
    cd $v2fly_dir && git pull
else 
    echo "Cloning geosite!"
    git clone -q https://github.com/v2fly/domain-list-community.git ./v2fly-geosite
fi;
echo "Done!"