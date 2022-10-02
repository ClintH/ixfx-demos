# Running with HTTPS

By serving your sketches over HTTPS with the [Five Server extension](https://marketplace.visualstudio.com/items?itemName=yandeu.five-server) you can access them easily from other devices.

The steps in brief are:
* Modify 'fiveserver.config.cjs'
* Create a certificate
* Install you the self-signed certificate in devices you access your server from

# 1. Modify config

# 2. Create certificate

# 3. Install certificate

## Android

* [Instructions](https://support.google.com/pixelphone/answer/2844832?hl=en&visit_id=637986556704436980-1751093210&rd=1)




Uncomment the `https` part from `bs-config.cjs` to enable https. For this to work properly, you can either trust the provided certificate or generate your own.

#### macOS

To create your own certificate:

```
# Use 'localhost' for the 'Common name'
openssl req -x509 -sha256 -nodes -newkey rsa:2048 -days 365 -keyout localhost.key -out localhost.crt
```

To trust your own certificate, or the provided one:

```
sudo security add-trusted-cert -p ssl -d -r trustRoot -k ~/Library/Keychains/login.keychain localhost.crt
```

Then double-click on the certificate, expand Trust and make sure 'Always trust' is selected.

#### Windows

To create and use a certificate:

```
New-SelfSignedCertificate -DnsName "localhost" -KeyLocation . -CertStoreLocation "cert:\LocalMachine\My"
```

[Instructions from StackOverflow](https://stackoverflow.com/questions/8169999/how-can-i-create-a-self-signed-cert-for-localhost)