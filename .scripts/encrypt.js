const config = require("./config");
const encryptor = require("file-encryptor");
const readline = require("readline").createInterface({
  input: process.stdin,
  output: process.stdout
});

console.log(config.warning);

readline.question(`please enter encryption password: `, key => {
  readline.close();
  checkPassword(key, function(err) {
    if (err) {
      return;
    }
    config.files.forEach(f => {
      encryptor.encryptFile(f, `${f}.enc`, key, config.options, function(err) {
        console.log(`✔️ Encrypted: ${f}`);
      });
    });
  });
});

checkPassword = (key, callback) => {
  encryptor.decryptFile(
    ".scripts/test.txt.enc",
    ".scripts/test.txt",
    key,
    config.options,
    function(err) {
      if (!err) {
        callback(!true);
      }
    }
  );
};
