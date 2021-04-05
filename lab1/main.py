#!/usr/bin/python

import sys
import re
import string

parent = dict()
rank = dict()

def open_file():
    try:
        return open("l1_2.txt")
    except FileNotFoundError:
        print("Oops! File not exist...")
        exit()

    fileName = sys.argv[1]
    try:
        return open(fileName)
    except FileNotFoundError:
        print("Oops! File not exist...")
        exit()

def make_set(vertice):
    parent[vertice] = vertice
    rank[vertice] = 0

def find(vertice):
    if parent[vertice] != vertice:
        parent[vertice] = find(parent[vertice])
    return parent[vertice]

def union(vertice1, vertice2):
    root1 = find(vertice1)
    root2 = find(vertice2)
    if root1 != root2:
        if rank[root1] > rank[root2]:
            parent[root2] = root1
        else:
            parent[root1] = root2
            if rank[root1] == rank[root2]: rank[root2] += 1

def kruskal(graph):
    for vertice in graph['vertices']:
        make_set(vertice)

    minimum_spanning_tree = set()
    edges = list(graph['edges'])
    edges.sort()
    for edge in edges:
        weight, vertice1, vertice2 = edge
        if find(vertice1) != find(vertice2):
            union(vertice1, vertice2)
            minimum_spanning_tree.add(edge)
    return minimum_spanning_tree


file = open_file()

size = int(file.readline())
vertices = []
for i in range(size): vertices.append(i)

matrix = dict()
edges = []

for line_index, line in enumerate(file):
    for index, node in enumerate(re.split('\s', re.sub('\n', '', line))):
        if line_index == index or node == '0' or (str(index) + ',' + str(line_index)) in matrix: continue
        matrix[str(line_index) + ',' + str(index)] = 1
        edges.append((int(node), line_index, index))

graph = { 'vertices': vertices, 'edges': set(edges) }

min_spanning_tree = sorted(kruskal(graph))

print("Minimum spanning tree:")
tree_weight = 0
for node in min_spanning_tree:
    tree_weight += node[0]
    print(str(node[1]) + '->' + str(node[2]) + '(' + str(node[0]) + ')', end='; ')

print("\n Weight of the minimum spanning tree:", tree_weight)
