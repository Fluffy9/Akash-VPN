# VPN Config Generator Research

## Takeaways

- By modifying [this file](https://github.com/akash-network/awesome-akash/blob/master/softether-vpn/launch), user + pass combos can be mass generated like one user/pass combo is already being created and later be downloaded via logs or uploaded in other ways.
- With the SDL and image in this repo, I was unable to programmatically or manually connect to the server as an admin first but it should be possible to add users during runtime as well. Maybe the config file needs to be changed?
- Maybe we want anonymous users? Uncommenting [this line](https://github.com/akash-network/awesome-akash/blob/master/softether-vpn/launch#L43) makes that possible.
- I was able to manually generate a user + pass combo (`user: testuser`, `pass: Password`) by manually typing variants of lines [40](https://github.com/akash-network/awesome-akash/blob/master/softether-vpn/launch#L40) and [41](https://github.com/akash-network/awesome-akash/blob/master/softether-vpn/launch#L41) in the Shell on Akash Console and I believe that the server certificate is optional to use and can be shared to all users. I was able to login both with and without it.
- I noticed that I had to use `6uibubtuol9fb0jtch2c0363cs.ingress.europlots.com:30435` to connect to the server with the `vpncmd_x64.exe` program, instead of `provider.europlots.com` which I had been trying previously. This opens it up for automated user + pass combo's and certificates. I used the HUB password and not the ADMIN password here. Here, I used the following commands to create another user which worked successfully and proves that this can be done during runtime and be automated. This is where I leave the research for today.

```
1
6uibubtuol9fb0jtch2c0363cs.ingress.europlots.com:30435
DEFAULT
Ramrod-Envy
UserCreate testuser2 /GROUP:none /REALNAME:none /NOTE:none
UserPasswordSet testuser2 /PASSWORD:password2
```
