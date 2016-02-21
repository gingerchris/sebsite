#!/bin/bash
mkdir dist/images/lores
for i in {1..26}
do
   convert -strip -interlace Plane -gaussian-blur 0.5 -quality 65% src/images/$i.jpg dist/images/lores/$i.jpg
done