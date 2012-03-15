import subprocess as sp
import sys
import os

proposals = [10000]
anneal_steps = [20, 40, 80, 100, 200]
softness = [0.1, 0.2, 0.3, 0.4]

prov_exp_files = ["larj-dynamic-anneal.church"]
addressing_exp_files = [
    "larj-structural-anneal-annotate.church",
    "larj-structural-annotate.church",
    "mh.church"]

all_exps = prov_exp_files + addressing_exp_files

all_params = [(prop, ann, soft, exp) for prop in proposals for ann in anneal_steps for soft in softness for exp in all_exps]

call = lambda cmd: sp.call(cmd, shell = True)

def jsc_comp(fn):
    call("""
cd ../../../
./jschurch makecustom %s
""" % fn)

def jsc_run(fn, out):
    call("""
cd ../../../
./jschurch run examples/larj/fg-induction/%s > examples/larj/fg-induction/%s
""" % (fn, out))

for (prop, ann, soft, exp) in all_params:
    print "Running %d %d %f %s" % (prop, ann, soft, exp)

    res_file = "exp-" + reduce(lambda x, y: str(y) + "-" + x, [prop, ann, soft], exp)
    src_str = open(exp).read()
    fh = open(res_file, 'w')
    fh.write("""
(define PROPOSALS %d)
(define ANNEAL-STEPS %d)
(define SOFTNESS %f)
%s
""" % (prop, ann, soft, src_str))
    fh.close()

    if exp in prov_exp_files:
        print "Compiling with addressing+provenance"
        jsc_comp("dynamic-provenance.ss")
    if exp in addressing_exp_files:
        print "Compiling with just addressing"
        jsc_comp("compiler.ss")

    jsc_run(res_file, res_file + ".txt")
