(function () {
  'use strict';

  const all = {
    day1: {
      part1: (data) => {
        const elves = data.trim().split('\n\n').map(cals => cals.split('\n').map(Number));
        console.log(elves);
        const sums = elves.reduce((acc, item) => {
          acc.push(item.reduce((acc2, item2) => {
            return acc2 + item2;
          }, 0));
          return acc;
        }, []);
        console.log(sums);
        const max = Math.max.apply(Math, sums);
        console.log(max);
        return max;
      },
      part2: (data) => {
        const elves = data.trim().split('\n\n').map(cals => cals.split('\n').map(Number));
        console.log(elves);
        const sums = elves.reduce((acc, item) => {
          acc.push(item.reduce((acc2, item2) => {
            return acc2 + item2;
          }, 0));
          return acc;
          // Sort and Take last 3
        }, []).sort((a, b) => a - b).slice(-3);
        console.log(sums);
        // Sum:
        const sum = sums.reduce((a, b) => a + b, 0);
        console.log(sum);
        return sum;
      }
    },
    day2: {
      part1: (data) => {
        const input = data.trim();
        const scoring = [
          { rx: /^A X$/mg, score: 1 + 3 },
          { rx: /^A Y$/mg, score: 2 + 6 },
          { rx: /^A Z$/mg, score: 3 + 0 },
          { rx: /^B X$/mg, score: 1 + 0 },
          { rx: /^B Y$/mg, score: 2 + 3 },
          { rx: /^B Z$/mg, score: 3 + 6 },
          { rx: /^C X$/mg, score: 1 + 6 },
          { rx: /^C Y$/mg, score: 2 + 0 },
          { rx: /^C Z$/mg, score: 3 + 3 }
        ];
        const total = scoring.reduce((sum, item) => {
          const scored = input.match(item.rx);
          if (scored) {
            console.log(scored, item);
            sum += (scored.length * item.score);
          }
          return sum;
        }, 0);
        console.log(total);
        // 13334 is too high
        // 12551 is too high
        return total;
      },
      part2: (data) => {
        const input = data.trim();
        const scoring = [
          { rx: /^A X$/mg, score: 3 + 0 },
          { rx: /^A Y$/mg, score: 1 + 3 },
          { rx: /^A Z$/mg, score: 2 + 6 },
          { rx: /^B X$/mg, score: 1 + 0 },
          { rx: /^B Y$/mg, score: 2 + 3 },
          { rx: /^B Z$/mg, score: 3 + 6 },
          { rx: /^C X$/mg, score: 2 + 0 },
          { rx: /^C Y$/mg, score: 3 + 3 },
          { rx: /^C Z$/mg, score: 1 + 6 }
        ];
        const total = scoring.reduce((sum, item) => {
          const scored = input.match(item.rx);
          if (scored) {
            console.log(scored, item);
            sum += (scored.length * item.score);
          }
          return sum;
        }, 0);
        console.log(total);
        return total;
      }
    },
    day3: {
      part1: (data) => {
        const all = data.trim().split('\n');
        console.log(all.length);
        const rucks = all.map(pocket => {
          const mid = Math.floor(pocket.length / 2);
          const items = {
            left: pocket.substr(0, mid),
            right: pocket.substr(mid)
          };
          const common = [];
          for (const i of items.left) {
            if (items.right.includes(i)) {
              common.push(i);
              break;
            }
          }
          return common;
        }).flat();
        console.log(rucks);
        const scores = {};
        for (let l = 1; l <= 26; l++) {
          // lowercase
          scores[String.fromCharCode(l + 96)] = l;
          // uppercase
          scores[String.fromCharCode(l + 64)] = l + 26;
        }
        console.log(scores);
        const result = rucks.reduce((sum, item) => {
          return sum + scores[item];
        }, 0);
        // not 7763
        return result;
      },
      part2: (data) => {
        const all = data.trim().split('\n');
        console.log(all.length);
        const rucks = [];
        for (let i = 0; i < all.length; i += 3) {
          rucks.push(all.slice(i, i + 3));
        }
        console.log(rucks);
        const common = rucks.reduce((comm, group) => {
          const same = [];
          for (const i of group[0]) {
            if (group[1].includes(i)) {
              same.push(i);
            }
          }
          for (const i of same) {
            if (group[2].includes(i)) {
              comm.push(i);
              break;
            }
          }
          return comm;
        }, []);
        console.log(common);
        const scores = {};
        for (let l = 1; l <= 26; l++) {
          // lowercase
          scores[String.fromCharCode(l + 96)] = l;
          // uppercase
          scores[String.fromCharCode(l + 64)] = l + 26;
        }
        const result = common.reduce((sum, item) => {
          return sum + scores[item];
        }, 0);
        return result;
      }
    },
    day4: {
      part1: (data) => {
        const pairs = data.trim().split('\n').map(row => {
          const pair = row.split(',').map(pair => {
            const range = pair.split('-').map(Number);

            return {
              lo: Math.min(range[0], range[1]),
              hi: Math.max(range[0], range[1])
            };
          });
          return {
            one: pair[0],
            two: pair[1]
          };
        });
        console.log(pairs);

        const result = pairs.reduce((count, pair) => {
          const one = pair.one;
          const two = pair.two;
          if (one.lo <= two.lo && one.hi >= two.hi) {
            // two is inside one
            count++;
          } else if (two.lo <= one.lo && two.hi >= one.hi) {
            // one is inside two
            count++;
          }
          return count;
        }, 0);
        console.log(result);

        // not 603
        return result;
      },
      part2: (data) => {
        const pairs = data.trim().split('\n').map(row => {
          const pair = row.split(',').map(pair => {
            const range = pair.split('-').map(Number);

            return {
              lo: Math.min(range[0], range[1]),
              hi: Math.max(range[0], range[1]),
              overlaps: []
            };
          });
          return {
            one: pair[0],
            two: pair[1]
          };
        });
        console.log(pairs);

        const hasOverlap = (left, right) => {
          const is =
                // left lo is in range
                (left.lo >= right.lo && left.lo <= right.hi) ||
                // left hi is in range
                (left.hi >= right.lo && left.hi <= right.hi) ||
                // left contains right
                (left.lo <= right.lo && left.hi >= right.hi);
          return is;
        };
        const result = pairs.reduce((allOverlap, pair) => {
          const one = pair.one;
          const two = pair.two;
          if (hasOverlap(one, two) || hasOverlap(two, one)) {
            allOverlap++;
          }
          return allOverlap;
        }, 0);
        console.log(result);
        // 791 is too low
        return result;
      }
    },
    day5: {
      part1: (data) => {
        const rx = /move (\d+) from (\d+) to (\d+)/;
        const rxdigit = /\d/;
        const rxupper = /[A-Z]/;
        const input = data.split('\n\n');
        const crates = input[0].split('\n').reverse().map(row => row.split(''));
        const crateInfo = crates[0].reduce((acc, char, i) => {
          if (rxdigit.test(char)) {
            acc[char] = {
              name: char,
              crates: []
            };
            for (let x = 1; x < crates.length; x++) {
              const crate = crates[x][i];
              if (rxupper.test(crate)) {
                acc[char].crates.push(crate);
              } else {
                break;
              }
            }
          }
          return acc;
        }, {});
        console.log(crateInfo);
        const instructions = input[1].split('\n').map(row => {
          const match = row.match(rx);
          return {
            amt: +match[1],
            src: match[2],
            dst: match[3]
          };
        });
        console.log(instructions);

        instructions.forEach(instruct => {
          const srcCrate = crateInfo[instruct.src].crates;
          const dstCrate = crateInfo[instruct.dst].crates;
          const newSrc = srcCrate.slice(0, -instruct.amt);
          dstCrate.push(...srcCrate.slice(-instruct.amt).reverse());
          crateInfo[instruct.src].crates = newSrc;
        });
        console.log(crateInfo);

        let result = '';
        for (const key in crateInfo) {
          const stack = crateInfo[key];
          result += stack.crates.slice().reverse()[0];
        }
        return result;
      },
      part2: (data) => {
        const rx = /move (\d+) from (\d+) to (\d+)/;
        const rxdigit = /\d/;
        const rxupper = /[A-Z]/;
        const input = data.split('\n\n');
        const crates = input[0].split('\n').reverse().map(row => row.split(''));
        const crateInfo = crates[0].reduce((acc, char, i) => {
          if (rxdigit.test(char)) {
            acc[char] = {
              name: char,
              crates: []
            };
            for (let x = 1; x < crates.length; x++) {
              const crate = crates[x][i];
              if (rxupper.test(crate)) {
                acc[char].crates.push(crate);
              } else {
                break;
              }
            }
          }
          return acc;
        }, {});
        console.log(crateInfo);
        const instructions = input[1].split('\n').map(row => {
          const match = row.match(rx);
          return {
            amt: +match[1],
            src: match[2],
            dst: match[3]
          };
        });
        console.log(instructions);

        instructions.forEach(instruct => {
          const srcCrate = crateInfo[instruct.src].crates;
          const dstCrate = crateInfo[instruct.dst].crates;
          const newSrc = srcCrate.slice(0, -instruct.amt);
          dstCrate.push(...srcCrate.slice(-instruct.amt));
          crateInfo[instruct.src].crates = newSrc;
        });
        console.log(crateInfo);

        let result = '';
        for (const key in crateInfo) {
          const stack = crateInfo[key];
          result += stack.crates.slice().reverse()[0];
        }
        return result;
      }
    },
    day6: {
      part1: (data) => {
        const buffer = data.trim().split('');
        let marker = [];
        let index = 0;
        for (let i = 4; i < buffer.length; i++) {
          const slice = buffer.slice(i - 4, i);
          const unique = [...new Set(slice)];
          if (unique.length === 4) {
            marker = unique;
            index = i;
            break;
          }
        }
        console.log(marker, index);
        return index;
      },
      part2: (data) => {
        const buffer = data.trim().split('');
        let marker = [];
        let index = 0;
        const len = 14;
        for (let i = len; i < buffer.length; i++) {
          const slice = buffer.slice(i - len, i);
          const unique = [...new Set(slice)];
          if (unique.length === len) {
            marker = unique;
            index = i;
            break;
          }
        }
        console.log(marker, index);
        return index;
      }
    },
    day7: {
      part1: (data) => {
        const rxcmd = /^(cd|ls)\s?(\w+|\/|\.\.)?$/;
        const rxls = /^(dir (\w+))|((\d+) (\w+\.?\w*))$/;
        const path = [];
        const folders = [{
          type: 'dir',
          sum: 0,
          size: 0,
          name: '/',
          parentpath: path.slice(),
          parentfolder: path.join('/'),
          path: ['/'],
          folder: ['/'].join('/'),
          folders: [],
          files: []
        }];
        const files = [];
        const output = data.trim().split(/\$ /).filter(cmd => cmd).map(cmd => cmd.trim().split('\n').map((prog, i) => {
          if (i === 0) {
            // cmd
            console.log(prog);
            const matchcmd = prog.match(rxcmd);
            const cmd = {
              type: 'cmd',
              cmd: matchcmd[1],
              dir: matchcmd[2]
            };
            if (cmd.cmd === 'cd') {
              if (cmd.dir === '..') {
                path.pop();
              } else {
                path.push(cmd.dir);
              }
            }
            cmd.path = path.slice();
            cmd.folder = path.join('/');
            return cmd;
          } else {
            const matchls = prog.match(rxls);
            if (matchls[1]) {
              const dir = {
                type: 'dir',
                sum: 0,
                size: 0,
                name: matchls[2],
                parentpath: path.slice(),
                parentfolder: path.join('/'),
                path: path.slice(),
                folder: path.join('/'),
                folders: [],
                files: []
              };
              dir.path.push(dir.name);
              dir.folder += '/' + dir.name;
              if (dir.name !== '/') {
                console.log(dir, folders, folders.filter(folder => folder.folder === dir.parentfolder));
                const parent = folders.filter(folder => folder.folder === dir.parentfolder)[0];
                parent.folders.push(dir);
              }
              folders.push(dir);
              return dir;
            } else {
              const file = {
                type: 'file',
                size: +matchls[4],
                name: matchls[5],
                parentpath: path.slice(),
                parentfolder: path.join('/'),
                path: path.slice(),
                folder: path.join('/')
              };
              file.path.push(file.name);
              file.folder += '/' + file.name;
              const parent = folders.filter(folder => folder.folder === file.parentfolder)[0];
              parent.size += file.size;
              parent.files.push(file);
              files.push(file);
              return file;
            }
          }
        }));
        console.log(output, folders, files);
        // at this point, immediate files are summed into the folders
        const getSum = (folder) => {
          if (folder.sum !== 0) {
            return folder.sum;
          } else {
            let sum = folder.size;
            for (let l = folder.folders.length; l--;) {
              sum += getSum(folder.folders[l]);
            }
            folder.sum = sum;
            return sum;
          }
        };
        getSum(folders[0]);
        console.log(folders);
        const big = folders.filter(folder => folder.sum <= 100000);
        console.log(big);
        const bigSum = big.reduce((a, b) => a + b.sum, 0);
        return bigSum;
      },
      part2: (data) => {
        const rxcmd = /^(cd|ls)\s?(\w+|\/|\.\.)?$/;
        const rxls = /^(dir (\w+))|((\d+) (\w+\.?\w*))$/;
        const path = [];
        const folders = [{
          type: 'dir',
          sum: 0,
          size: 0,
          name: '/',
          parentpath: path.slice(),
          parentfolder: path.join('/'),
          path: ['/'],
          folder: ['/'].join('/'),
          folders: [],
          files: []
        }];
        const files = [];
        const output = data.trim().split(/\$ /).filter(cmd => cmd).map(cmd => cmd.trim().split('\n').map((prog, i) => {
          if (i === 0) {
            const matchcmd = prog.match(rxcmd);
            const cmd = {
              type: 'cmd',
              cmd: matchcmd[1],
              dir: matchcmd[2]
            };
            if (cmd.cmd === 'cd') {
              if (cmd.dir === '..') {
                path.pop();
              } else {
                path.push(cmd.dir);
              }
            }
            cmd.path = path.slice();
            cmd.folder = path.join('/');
            return cmd;
          } else {
            const matchls = prog.match(rxls);
            if (matchls[1]) {
              const dir = {
                type: 'dir',
                sum: 0,
                size: 0,
                name: matchls[2],
                parentpath: path.slice(),
                parentfolder: path.join('/'),
                path: path.slice(),
                folder: path.join('/'),
                folders: [],
                files: []
              };
              dir.path.push(dir.name);
              dir.folder += '/' + dir.name;
              if (dir.name !== '/') {
                const parent = folders.filter(folder => folder.folder === dir.parentfolder)[0];
                parent.folders.push(dir);
              }
              folders.push(dir);
              return dir;
            } else {
              const file = {
                type: 'file',
                size: +matchls[4],
                name: matchls[5],
                parentpath: path.slice(),
                parentfolder: path.join('/'),
                path: path.slice(),
                folder: path.join('/')
              };
              file.path.push(file.name);
              file.folder += '/' + file.name;
              const parent = folders.filter(folder => folder.folder === file.parentfolder)[0];
              parent.size += file.size;
              parent.files.push(file);
              files.push(file);
              return file;
            }
          }
        }));
        console.log(output, folders, files);
        // at this point, immediate files are summed into the folders
        const getSum = (folder) => {
          if (folder.sum !== 0) {
            return folder.sum;
          } else {
            let sum = folder.size;
            for (let l = folder.folders.length; l--;) {
              sum += getSum(folder.folders[l]);
            }
            folder.sum = sum;
            return sum;
          }
        };
        getSum(folders[0]);
        console.log(folders);
        const total = 70000000;
        const need = 30000000;
        const current = total - folders[0].sum;
        const min = need - current;
        const big = folders.filter(folder => folder.sum >= min);
        console.log(big);
        const sorted = big.sort((a, b) => a.sum - b.sum);
        console.log(sorted);
        const bigSum = sorted[0].sum;
        return bigSum;
      }
    },
    day8: {
      part1: (data) => {
        const forest = data.trim().split('\n').map(row => row.split('').map(Number));
        const ylen = forest.length;
        const xlen = forest[0].length;
        let visible = (2 * ylen) + (2 * xlen) - 4;
        for (let y = 1; y < ylen - 1; y++) {
          for (let x = 1; x < xlen - 1; x++) {
            const tree = forest[y][x];
            // column
            let isVisibleN = true;
            let isVisibleS = true;
            for (let yy = 0; yy < ylen; yy++) {
              const compare = forest[yy][x];
              if (yy < y) {
                if (compare < tree) {
                  isVisibleN = true;
                } else {
                  isVisibleN = false;
                  yy = y;
                }
              } else if (yy > y) {
                if (compare < tree) {
                  isVisibleS = true;
                } else {
                  isVisibleS = false;
                  break;
                }
              }
            }
            // row
            let isVisibleW = true;
            let isVisibleE = true;
            for (let xx = 0; xx < xlen; xx++) {
              const compare = forest[y][xx];
              if (xx < x) {
                if (compare < tree) {
                  isVisibleW = true;
                } else {
                  isVisibleW = false;
                  xx = x;
                }
              } else if (xx > x) {
                if (compare < tree) {
                  isVisibleE = true;
                } else {
                  isVisibleE = false;
                  break;
                }
              }
            }
            if (isVisibleN || isVisibleS || isVisibleW || isVisibleE) {
              visible++;
            }
          }
        }
        return visible;
      },
      part2: (data) => {
        const forest = data.trim().split('\n').map(row => row.split('').map(cell => {
          return {
            height: +cell,
            n: 0,
            s: 0,
            w: 0,
            e: 0,
            score: 0
          };
        }));
        const ylen = forest.length;
        const xlen = forest[0].length;
        let maxScore = 0;
        for (let y = 1; y < ylen - 1; y++) {
          for (let x = 1; x < xlen - 1; x++) {
            const tree = forest[y][x];
            for (let n = y - 1; n >= 0; n--) {
              const north = forest[n][x];
              if (north.height <= tree.height) {
                tree.n++;
              }
              if (north.height >= tree.height) {
                break;
              }
            }
            if (tree.n > 0) {
              for (let s = y + 1; s < ylen; s++) {
                const south = forest[s][x];
                if (south.height <= tree.height) {
                  tree.s++;
                }
                if (south.height >= tree.height) {
                  break;
                }
              }
              if (tree.s > 0) {
                for (let w = x - 1; w >= 0; w--) {
                  const west = forest[y][w];
                  if (west.height <= tree.height) {
                    tree.w++;
                  }
                  if (west.height >= tree.height) {
                    break;
                  }
                }
                if (tree.w > 0) {
                  for (let e = x + 1; e < xlen; e++) {
                    const east = forest[y][e];
                    if (east.height < tree.height) {
                      tree.e++;
                    } else {
                      tree.e++;
                      break;
                    }
                  }
                  if (tree.e > 0) {
                    tree.score = tree.n * tree.s * tree.w * tree.e;
                    maxScore = Math.max(maxScore, tree.score);
                  }
                }
              }
            }
          }
        }
        console.log(forest);
        return maxScore;
      }
    },
    day9: {
      part1: (data) => {
        const DIR = {
          U: { ax: 'y', inc: 1 },
          D: { ax: 'y', inc: -1 },
          R: { ax: 'x', inc: 1 },
          L: { ax: 'x', inc: -1 }
        };
        const motions = data.trim().split('\n').map(motion => motion.split(' ')).map(motion => {
          const dir = DIR[motion[0]];
          return {
            ax: dir.ax,
            inc: dir.inc,
            val: +motion[1]
          };
        });
        const rope = {
          head: { y: 0, x: 0, history: [{ x: 0, y: 0 }] },
          tail: { y: 0, x: 0, history: [{ x: 0, y: 0 }] }
        };
        console.log(motions);

        const isNear = (h, t) => {
          return Math.abs(h.y - t.y) <= 1 && Math.abs(h.x - t.x) <= 1;
        };
        motions.forEach(motion => {
          for (let i = 0; i < motion.val; i++) {
            rope.head[motion.ax] += motion.inc;
            if (!isNear(rope.head, rope.tail)) {
              const previousHead = rope.head.history.slice(-1)[0];
              rope.tail.y = previousHead.y;
              rope.tail.x = previousHead.x;
            }
            rope.head.history.push({ y: rope.head.y, x: rope.head.x });
            rope.tail.history.push({ y: rope.tail.y, x: rope.tail.x });
          }
        });
        console.log(rope);

        const distinct = new Set(rope.tail.history.map(pos => pos.y + ',' + pos.x));
        console.log(distinct);
        return distinct.size;
      },
      part2: (data) => {
        const DIR = {
          U: { ax: 'y', inc: 1 },
          D: { ax: 'y', inc: -1 },
          R: { ax: 'x', inc: 1 },
          L: { ax: 'x', inc: -1 }
        };
        const motions = data.trim().split('\n').map(motion => motion.split(' ')).map(motion => {
          const dir = DIR[motion[0]];
          return {
            ax: dir.ax,
            inc: dir.inc,
            val: +motion[1]
          };
        });
        const rope = [];
        const length = 10;
        for (let i = 0; i < length; i++) {
          rope.push({ y: 0, x: 0, history: [{ x: 0, y: 0 }] });
        }
        console.log(motions);

        const isNear = (h, t) => {
          return Math.abs(h.y - t.y) <= 1 && Math.abs(h.x - t.x) <= 1;
        };

        const show = () => {
          const limits = rope.reduce((values, knot) => {
            values.minY = Math.min(values.minY, knot.y);
            values.maxY = Math.max(values.maxY, knot.y);
            values.minX = Math.min(values.minX, knot.x);
            values.maxX = Math.max(values.maxX, knot.x);
            return values;
          }, {
            minY: 0,
            maxY: 1,
            minX: 0,
            maxX: 1
          });
          const points = rope.reduceRight((values, knot, i) => {
            values[knot.y + ',' + knot.x] = (i > 0) ? i : 'H';
            return values;
          }, {});
          let plot = '';
          for (let y = limits.maxY + 1; y >= limits.minY - 1; y--) {
            for (let x = limits.minX - 1; x <= limits.maxX + 1; x++) {
              if (points[y + ',' + x]) {
                plot += points[y + ',' + x];
              } else {
                plot += '.';
              }
            }
            plot += '\n';
          }
          return plot;
        };

        motions.forEach(motion => {
          for (let i = 0; i < motion.val; i++) {
            rope[0][motion.ax] += motion.inc;
            rope[0].history.push({ y: rope[0].y, x: rope[0].x });
            for (let k = 1; k < length; k++) {
              const prev = rope[k - 1];
              const knot = rope[k];
              // console.log('k' + k + isNear(prev, knot), 'prev', prev, 'knot', knot);
              if (!isNear(prev, knot)) {
                // if in row/col, move directly, else move diagonally
                if (prev.y === knot.y) {
                  knot.x += (prev.x > knot.x) ? 1 : -1;
                } else if (prev.x === knot.x) {
                  knot.y += (prev.y > knot.y) ? 1 : -1;
                } else {
                  // diagonal
                  const dx = prev.x - knot.x;
                  const dy = prev.y - knot.y;
                  knot.x += (dx > 0) ? 1 : -1;
                  knot.y += (dy > 0) ? 1 : -1;
                }
              }
              knot.history.push({ y: knot.y, x: knot.x });
            }
            // console.log(show());
          }
          // console.log(show());
        });
        console.log(rope);
        // console.log(show());

        const distinct = new Set(rope.slice(-1)[0].history.map(pos => pos.y + ',' + pos.x));
        console.log(distinct);
        return distinct.size;
      }
    },
    day10: {
      part1: () => {},
      part2: () => {}
    },
    day11: {
      part1: () => {},
      part2: () => {}
    },
    day12: {
      part1: () => {},
      part2: () => {}
    },
    day13: {
      part1: () => {},
      part2: () => {}
    },
    day14: {
      part1: () => {},
      part2: () => {}
    },
    day15: {
      part1: () => {},
      part2: () => {}
    },
    day16: {
      part1: () => {},
      part2: () => {}
    },
    day17: {
      part1: () => {},
      part2: () => {}
    },
    day18: {
      part1: () => {},
      part2: () => {}
    },
    day19: {
      part1: () => {},
      part2: () => {}
    },
    day20: {
      part1: () => {},
      part2: () => {}
    },
    day21: {
      part1: () => {},
      part2: () => {}
    },
    day22: {
      part1: () => {},
      part2: () => {}
    },
    day23: {
      part1: () => {},
      part2: () => {}
    },
    day24: {
      part1: () => {},
      part2: () => {}
    },
    day25: {
      part1: () => {},
      part2: () => {}
    }
  };

  this.funs = (day, part) => all['day' + day]['part' + part];
}.call(this));
