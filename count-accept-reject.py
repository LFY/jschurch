import fileinput

accepts = 0
rejects = 0

num = None
for line in fileinput.input():
    if line.startswith("larj-run-accept"):
        accepts += 1
    if line.startswith("larj-run-reject"):
        rejects += 1
    if line.startswith("my-stat"):
        num = line.strip()

print "accepts", accepts, "rejects", rejects, "total", accepts + rejects, "rate", float(accepts) / (float(accepts) + float(rejects)), num
