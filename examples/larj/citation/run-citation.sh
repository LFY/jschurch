cd ../../../
sh examples/larj/citation/citation-header.church $1 $2 $3 > examples/larj/citation/citation-$1-$2-$3.church;
./jschurch run examples/larj/citation/citation-$1-$2-$3.church > examples/larj/citation/citation-$1-$2-$3.txt
cd examples/larj/citation
