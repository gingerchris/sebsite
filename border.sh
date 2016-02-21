for i in {1..26}
do
   convert src/images/$i.jpg -bordercolor white -border 7x7 $i.jpg
done