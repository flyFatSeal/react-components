#!/bin/bash
for ((i=1;i<=$#;i++)); 
do
    echo ${!i}
    node-sass ./src/components/${!i}/style/_style.scss ./lib/components/${!i}/style/_style.css
done