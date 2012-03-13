from itertools import product

for p in product([80, 100], [1], [1.0, 0.8, 0.6]):
    print "sh run-citation.sh " +  reduce(lambda x, y: x + " " + y, map(str, p))
