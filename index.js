const cloverParse = require("@cvrg-report/clover-json");

async function toLcov(data) {
  let cloverData = await cloverParse.parseContent(data);
  return new Promise((resolve) => {
    resolve(writeLcov(cloverData));
  })
}

function writeLcov(content) {
  let lines = [];

  content.forEach(tc => {
    if (tc.hasOwnProperty('title')) {
      lines.push(`TN:${tc.title}`);
    }

    lines.push(`SF:${tc.file}`); // Required!

    if (tc.hasOwnProperty('functions')) {
      tc.functions.details.forEach(fn => {
        lines.push(`FN:${fn.line},${fn.name}`);
      });

      tc.functions.details.forEach(fn => {
        lines.push(`FNDA:${fn.hit},${fn.name}`);
      });

      lines.push(`FNF:${tc.functions.found}`);
      lines.push(`FNH:${tc.functions.hit}`);
    }

    if (tc.hasOwnProperty('branches')) {
      tc.branches.details.forEach(br => {
        lines.push(`BRDA:${br.line},${br.block || 0},${br.branch},${br.taken || '-'}`);
      });
      lines.push(`BRF:${tc.branches.found}`);
      lines.push(`BRH:${tc.branches.hit}`);
    }

    tc.lines.details.forEach(br => {
      lines.push(`DA:${br.line},${br.hit}`); // Required!
    });

    if (tc.hasOwnProperty('lines')) {
      lines.push(`LH:${tc.lines.hit}`);
      lines.push(`LF:${tc.lines.found}`);
    }

    lines.push('end_of_record\n'); // Required!
  });

  return lines.join("\n");
}


module.exports = { toLcov };
