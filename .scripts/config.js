module.exports = {
  options: { algorithm: "aes256" },
  files: [
    ".env",
    ".env.pamba",
    ".env.wiktrop",
    ".env.bbp"
  ],
  warning: `🚨 If it's throwing ERR_INVALID_CALLBACK error that means your password is wrong`
};
