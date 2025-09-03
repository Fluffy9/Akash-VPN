* Reverse Proxy

This describes how to setup the Caddy reverse proxy for Akash VPN.

** Setup

*** Docker Image

Prepare the docker image.

- Build the docker image from the [Dockerfile](Dockerfile)

`docker build -t <image_name>:<tag> .`

- Push the docker image to the registry

`docker push <image_name>:<tag>`

*** SDL

Update the [SDL](../deploy.yml)

- Set the caddy service image name to the above image.

- Set the caddy service exposed port 80 to accept connections from the
  Akash VPN domain name.
  
Deploy the SDL on Akash.

*** Domain Name Configuration

Configure TLS termination via cloudflare for the domain name above
using [this][tls] guide on the Akash Documentaion.

[tls]: https://akash.network/docs/guides/deployments/tls-termination-of-akash-deployment/
