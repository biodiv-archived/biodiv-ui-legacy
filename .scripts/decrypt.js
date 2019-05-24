const config = require("./config");
const encryptor = require("file-encryptor");
const envPassword = process.env.IBP_ASSET_DECRYPTION_PASSWORD;
const readline = require("readline").createInterface({
  input: process.stdin,
  output: process.stdout
});

ibpInit = key => {
  const ops = config.files.length;
  let cnt = 0;
  config.files.forEach(f => {
    encryptor.decryptFile(`${f}.enc`, f, key, config.options, function(err) {
      cnt++;
      console.log(`✔️ Decrypted: ${f}`);
      if (cnt === ops) {
        console.log(`✨ Gracefully exiting for Travis CI ✨`);
        process.exit();
      }
    });
  });
};

if (envPassword) {
  ibpInit(envPassword);
} else {
  console.log(config.warning);
  readline.question(`please enter decryption password: `, key => {
    readline.close();
    ibpInit(key);
  });
}
