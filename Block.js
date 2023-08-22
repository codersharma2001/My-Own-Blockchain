const { GENESIS_DATA } = require("./config");
const cryptoHash = require("./cryptohash");
class Block {
  constructor({ timestamp, prevHash, hash, data, nonce, difficulty }) {
    this.timestamp = timestamp;
    this.prevHash = prevHash;
    this.hash = hash;
    this.data = data;
    this.nonce = nonce;
    this.difficulty = difficulty;
  }
  static genesis() {
    return new this(GENESIS_DATA);
  }

  static mineBlock({ prevBlock, data }) {
    // const timestamp = Date.now();
    let timestamp, hash;

    const prevHash = prevBlock.hash;
    const { difficulty } = prevBlock;
    let nonce = 0;
    do {
      nonce++;
      timestamp = Date.now();
      hash = cryptoHash(timestamp, prevHash, data, nonce, difficulty);
    } while (hash.substring(0, difficulty) !== "0".repeat(difficulty));

    return new this({
      timestamp,
      prevHash,
      data,
      nonce,
      difficulty,
      hash,
    });
  }
}

const block1 = new Block({
  hash: "0xabc",
  timestamp: "22/08/2023",
  prevHash: "0xc12",
  data: "hello",
});

// console.log(block1);
// console.log(block2);
// console.log(block3);

const genesisBlock = Block.genesis();

// console.log(genesisBlock);

const result = Block.mineBlock({ prevBlock: block1, data: "Block1" });
// console.log(result);

module.exports = Block;
