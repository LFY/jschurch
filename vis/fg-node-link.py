import json
from pyfactorg import *
import sys

raw = json.loads(open(sys.argv[1]).read())

all_samples = []
for (samples_key, samples) in raw.items():
    for fg in samples:
        variables = {}
        factors = {}
        for one_factor in fg.values()[0]:
            curr_address = one_factor["address"]
            factors[curr_address] = 1
            for var in one_factor["scope"]:
                variables[var] = variables.get(var, []) + [curr_address]
        variable_ids = dict(zip(variables.keys(), range(len(variables))))
        sorted_variable_ids = sorted(variable_ids.items(), key = lambda (k, v): v)
        factor_ids = dict(zip(factors.keys(), range(len(variables), len(variables)+len(factors))))
        sorted_factor_ids = sorted(factor_ids.items(), key = lambda (k, v): v)
        all_samples.append((sorted_variable_ids, sorted_factor_ids, variables, factors))

def variable_node_string(v):
    return "{\"name\":\"%s\", \"group\": 1}" %v

def factor_node_string(f):
    return "{\"name\":\"%s\", \"group\": 1}" % f

def link_string(vid, fid):
    return "{\"source\": %d, \"target\": %d }" % (vid, fid)

for (sorted_variable_ids, sorted_factor_ids, variables, factors) in all_samples:

    link_data = []

    for (var, fs) in variables.items():
        for f in fs:
            link_data += [(variable_ids[var], factor_ids[f])]

    print "{"
    print "\"variablenodes\":["
    print (",".join(map(variable_node_string, fsts(sorted_variable_ids))))
    print "],"
    print "\"factornodes\":["
    print (",".join(map(factor_node_string, fsts(sorted_factor_ids))))
    print "],"
    print "\"links\":["
    print (",".join(map(lambda (vid, fid): link_string(vid, fid), link_data)))
    print "]"
    print "}"


