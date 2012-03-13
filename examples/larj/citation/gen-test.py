from itertools import product

for p in product([20, 40, 80, 100], [100, 200, 400, 800, 1000], [1.0, 0.8, 0.6]):
    print "sh run-citation.sh " +  reduce(lambda x, y: x + " " + y, map(str, p))
