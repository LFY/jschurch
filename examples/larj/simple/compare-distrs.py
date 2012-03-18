from math import log
import sys

def read_state_line(line):
    has_score = "score" in line
    has_state = "state" in line

    if has_score:
        state, score = line.split("score")
        state = state.split("state")[1].strip().split(" ")
        score = score.strip()
        return tuple(state), float(score)

    if has_state:
        state = line.split("state")[1].strip().split(" ")
        return tuple(state), None

    else:
        return None


    # score = None
    # state = None
    # pieces = l.strip().split(" ")
    # if pieces[-1] != "T" and pieces[-1] != "F":
    #     score = float(pieces[-1])
    #     state = pieces[:-1]
    # else:
    #     state = pieces
    # return tuple(state), score

read_data = lambda fn: filter(lambda x: x != None, map(read_state_line, open(fn).readlines()))

true_distr = dict(read_data(sys.argv[1]))
samples = read_data(sys.argv[2])

my_distr = {}
ct = 0
for (state, asdf) in samples:
    my_distr[state] = my_distr.get(state, 0) + 1
    ct += 1

for (k, v) in my_distr.items():
    my_distr[k] /= float(ct)


def KL(d):
    res = 0
    for (k, p) in d.items():
        if p == 0:
            res += 0
        else:
            tp = true_distr[k]
            res += p * log(p / tp)
    return res

print "KL div:"
print KL(my_distr)



    

