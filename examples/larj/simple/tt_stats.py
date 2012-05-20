# Read in 2d sample points from a file

import numpy as np
import scipy.stats as stats
from matplotlib.pyplot import imshow
import matplotlib.pyplot as plt
import fileinput

# parse samples and scores

rvs = []
scores = []
for line in fileinput.input():
    if line.startswith("state"):
        state, score = line.strip().split("state")[1].split("score")
        state_split = state.strip().split(" ")
        nums = map(float, state_split)
        n_score = float(score.strip())

        rvs.append(nums)
        scores.append(n_score)

# From https://gist.github.com/1035069

def kde_2d(rvs, out_fn):
    kde = stats.kde.gaussian_kde(rvs.T)

    # Regular grid to evaluate kde upon
    x_flat = np.r_[rvs[:,0].min():rvs[:,0].max():128j]
    y_flat = np.r_[rvs[:,1].min():rvs[:,1].max():128j]
    x,y = np.meshgrid(x_flat,y_flat)
    grid_coords = np.append(x.reshape(-1,1),y.reshape(-1,1),axis=1)

    z = kde(grid_coords.T)
    z = z.reshape(128,128)

    plt.scatter(rvs[:,0],rvs[:,1],alpha=0.5,color='white')
    plt.imshow(z,aspect=x_flat.ptp()/y_flat.ptp(),origin='lower',
            extent=(rvs[:,0].min(),rvs[:,0].max(),rvs[:,1].min(),rvs[:,1].max()))

    plt.savefig(out_fn)

# From https://gist.github.com/1534517

def kde_1d(rvs, out_fn, pad = 1.0):
    kde1 = stats.gaussian_kde(rvs)

    fig = plt.figure()
    ax = fig.add_subplot(111)

    ax.plot(rvs, np.zeros(rvs.shape), 'b+', ms=20)  # rug plot
    x_eval = np.linspace(min(rvs) - pad, max(rvs) + pad, num=200)
    ax.plot(x_eval, kde1(x_eval), 'k-')

    fig.savefig(out_fn)

def print_dim_changes(rvs):
    print "Num dimension changes:", len(filter(lambda (x, y): len(x) != len(y), zip(rvs, rvs[1:])))

print_dim_changes(rvs)
# kde_1d(np.array(map(lambda x: x[0], filter(lambda x: len(x) == 1, rvs))), "current-1d.png")
# kde_2d(np.array(filter(lambda x: len(x) == 2, rvs)), "current-2d.png")
