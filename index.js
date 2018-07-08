#!/usr/bin/env node --harmony
'use strict';

const crypto = require('crypto');
const cli = require('commander');
const chalk = require('chalk');
const md5 = require('md5');
const fs = require('fs');

cli
  .version('0.1.0', '-v, --version')
  .arguments('<file>')
  .option('-p, --password <password>', 'Password used to encrypt')
  .option('-a, --action <action>', 'Either encrypt or decrypt', /^(encrypt|decrypt)$/i)
  .action(function(file) {
    if(cli.action != 'encrypt' && cli.action != 'decrypt') {
      return console.error(chalk.bold.red("Invalid Action"));
    }

    if(!fs.existsSync(file)) {
      return console.error(chalk.bold.red("File Not Found"));
    }

    let encKey = md5(cli.password);
    fs.readFile(file, function(err, data) {
      if(err) {
        return console.error(chalk.bold.red("Error occurred while reading a file"));
      }
      let content = data.toString();
      let processedContent = null;

      processedContent = cli.action == 'encrypt'? encrypt(encKey, content): decrypt(encKey, content);

      if(processedContent != null) {
        fs.writeFile(file, processedContent, function(err, data) {
          if(err) {
            return console.error(chalk.bold.red("Error occurred while write a file"));
          }
          return console.log(chalk.bold.green("Action " + cli.action + " ran successfully" ));
        });
      }
    });
  })
  .parse(process.argv);

function encrypt(encKey, content) {
  let iv_length = 16;
  let iv = crypto.randomBytes(iv_length);
  let cipher = crypto.createCipheriv('AES-256-CBC', Buffer.from(encKey), iv);
  let encrypted = cipher.update(content);
  encrypted = Buffer.concat([encrypted, cipher.final()]);
  return iv.toString('hex') + ':' + encrypted.toString('hex');
}

function decrypt(encKey, content){
  let textParts = content.split(':');
  let iv = Buffer.from(textParts.shift(), 'HEX');
  let encryptedContent = Buffer.from(textParts.join(':'), 'HEX');
  let decipher = crypto.createDecipheriv('AES-256-CBC', Buffer.from(encKey), iv);
  let decrypted = decipher.update(encryptedContent);
  decrypted = Buffer.concat([decrypted, decipher.final()]);
  return decrypted.toString();
}
