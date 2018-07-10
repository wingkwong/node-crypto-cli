# node-crypto-cli
CLI for the crypto module to encrypt / decrypt files in your machine

## Installing
```
npm install node-crypto-cli
```


For Windows Users, run npm link
```
npm link
```


## Command Line Options

### Synopsis
```
 Usage: index [options] <file>
```

### Options
#### `-v, --version`
Added in v0.1.0
Output the version number
```
node-crypto-cli -v
```
```
node-crypto-cli --version
```

Result:
```
0.1.0
```

#### `-p, --password <password>`
Added in v0.1.0
Password used to encrypt and decrypt

#### `-a, --action <action>`
Added in v0.1.0
Either encrypt or decrypt

#### `-h, --help`
Added in v0.1.0
Output usage information

### Examples
Encrypting a text file
```
node-crypto-cli -p }W(MXXc6H!4v9,:@ -a encrypt test.txt
```
Result:
```
Action encrypt ran successfully
```
The encrpyted content looks like
```
45eacdd30a4c7ded6da256fd812796d8:c42d0f8b83b8c038b01524222d94f491
```

Decrypting a text file
```
node-crypto-cli -p }W(MXXc6H!4v9,:@ -a decrypt test.txt
```
Result:
```
Action decrypt ran successfully
```