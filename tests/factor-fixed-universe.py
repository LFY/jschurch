from random import *
from math import log, exp

def soft_eq_discrete2((x, y)):
    if x == y:
        return 0.0
    else:
        return log(0.1)

def consec2(xs):
    return zip(xs, xs[1:])

def score(new_xs):
    return sum(map(soft_eq_discrete2, consec2(new_xs)))

def next_state_score(xs):
    new_idx = randint(0, len(xs) - 1)
    new_xs = map(lambda i: randint(0, 1) if i == new_idx else xs[i], range(len(xs)))
    return new_xs, score(new_xs)

def mh_loop(init_state, init_score, num_iter):
    i = 0
    curr_score = init_score
    curr_state = init_state
    while True:
        if i == num_iter:
            return curr_state, curr_score
        else:
            new_state, new_score = next_state_score(curr_state)
            smp = log(uniform(0, 1))
            ratio = min(new_score - curr_score, 0.0)
            if smp < ratio:
                curr_state, curr_score = new_state, new_score
            i += 1

print mh_loop([0, 1, 0, 1, 0], score([0, 1, 0, 1, 0]), 10000)
