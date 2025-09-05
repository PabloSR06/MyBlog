Home Assistant is an open source project for controlling home IoT device automations, focusing on local control and privacy. You can start using it in two different ways: using HA OS (Home Assistant Operating System) or Home Assistant Container. Although the best option to get the most out of it is HA OS, either of these two options are perfect to start with, and you should make a decision based on your needs. You can see the differences in [the official documentation.](https://www.home-assistant.io/installation/.)

Home Assistant allows you to connect many devices from different companies. If that integration doesn't exist in the base integration, someone might have created it and uploaded it to GitHub. If not, you can try to do it yourself. In essence, you can connect almost anything. Normally, most users prefer to use their devices locally without depending on external servers to control or see their status. This is classified as:

| Classifier | Description |
|------------|-------------|
| **Assumed State** | We are unable to get the state of the device. Best we can do is to assume the state based on our last command. |
| **Cloud Polling** | Integration of this device happens via the cloud and requires an active internet connection. Polling the state means that an update might be noticed later. |
| **Cloud Push** | Integration of this device happens via the cloud and requires an active internet connection. Home Assistant will be notified as soon as a new state is available. |
| **Local Polling** | Offers direct communication with device. Polling the state means that an update might be noticed later. |
| **Local Push** | Offers direct communication with device. Home Assistant will be notified as soon as a new state is available. |

<sub>Source: <a href="https://www.home-assistant.io/blog/2016/02/12/classifying-the-internet-of-things/#classifiers" target="_blank">Home Assistant Blog - Classifying the Internet of Things</a></sub>

In summary, you want to be able to control your device by sending commands from within your local network without having to communicate with each device's external server to get information.

## Docker Configuration

My personal choice has been to use Home Assistant in a docker compose with the idea of using it with nginx. To be able to control devices locally, they need to be able to communicate with your server. In this case, the server is your machine running HA. To be able to detect those local devices, apart from being on the same network as them, you have to configure the container to be able to communicate with them.

> **Tip:** If you don't know if your device can be controlled locally, some allow you to control them from their own application. Usually there's an option to allow LAN control. If there isn't one, you can try with the router without internet connection.

```bash
docker run -d \
  --name homeassistant \
  --privileged \
  --restart=unless-stopped \
  -e TZ=MY_TIME_ZONE \
  -v /PATH_TO_YOUR_CONFIG:/config \
  -v /run/dbus:/run/dbus:ro \
  --network=host \
  ghcr.io/home-assistant/home-assistant:stable
```

> **Note:** When running Home Assistant with the `--privileged` and `--network=host` parameters, the container will have virtually full access to the host machine's resources and network. These settings are necessary, but you should be aware of the risks involved.

Whether you use the run command or with docker compose, it's important to put `--network=host` or `network_mode: host`. This will allow the container to use the host system's network directly, allowing access to the same ports and network services as the system where Docker is running.

## Verifying Network Access

To check if it's possible to detect LAN devices, you can try to connect a device that you already know you can connect via LAN, but also check that your container has access to your local network. Even if you're using network host, it never hurts to check.

Start the container and enter using:
```bash
docker exec -it homeassistant bash
```

Type `ifconfig` and look for a connection like `192.168.x.x`.

For example, running the container without specifying any network will use Docker's default network, which protects the container, so the output will look like this:

```bash
05c711469f4b:/config# ifconfig
eth0: flags=4163<UP,BROADCAST,RUNNING,MULTICAST>  mtu 1500
        inet 172.22.0.2  netmask 255.255.0.0  broadcast 172.22.255.255
        ether 0e:eb:29:08:a4:2c  txqueuelen 0  (Ethernet)
        RX packets 418  bytes 522016 (509.7 KiB)
        RX errors 0  dropped 0  overruns 0  frame 0
        TX packets 336  bytes 43034 (42.0 KiB)
        TX errors 0  dropped 0 overruns 0  carrier 0  collisions 0

lo: flags=73<UP,LOOPBACK,RUNNING>  mtu 65536
        inet 127.0.0.1  netmask 255.0.0.0
        inet6 ::1  prefixlen 128  scopeid 0x10<host>
        loop  txqueuelen 1000  (Local Loopback)
        RX packets 83  bytes 11689 (11.4 KiB)
        RX errors 0  dropped 0  overruns 0  frame 0
        TX packets 83  bytes 11689 (11.4 KiB)
        TX errors 0  dropped 0 overruns 0  carrier 0  collisions 0
```

The output with the correct configuration is longer, but you need to look for one similar to this:

In my case it's `eno1` since that's the name of my Ethernet network interface:

```bash
eno1: flags=4163<UP,BROADCAST,RUNNING,MULTICAST>  mtu 1500
        inet 192.168.1.35  netmask 255.255.255.0  broadcast 192.168.1.255
        ether 00:d4:61:1e:10:2b  txqueuelen 1000  (Ethernet)
        RX packets 1429444  bytes 1861208515 (1.7 GiB)
        RX errors 0  dropped 148  overruns 0  frame 0
        TX packets 471625  bytes 120886540 (115.2 MiB)
        TX errors 0  dropped 0 overruns 0  carrier 0  collisions 0
        device interrupt 16  memory 0xa3200000-a3220000
```

So here we can see that the Home Assistant container has the same local IP as your host system where Docker is running, meaning the container should be able to access your local network the same way as your computer will.

## Common Issues

The most common errors and reasons why your installation is not detecting devices on your network are:

1. **Docker misconfiguration**: The obvious one we talked about before - our Docker is misconfigured or simply starting up incorrectly, leaving the container isolated.

2. **Firewall or router security restrictions**: The host operating system firewall or router rules can block the traffic that Home Assistant uses to find devices on the network, preventing communication between the Docker container and LAN devices.

3. **No LAN-controllable devices**: Do you have any device that can be controlled by LAN? Maybe you can't find your devices in HA simply because they don't allow it or you don't even have them on the same network.

4. **VPN interference**: And finally, the problem I had, check if you have any VPN connection active on your machine. Maybe by accident or oversight the VPN was activated and you're looking for a problem where there isn't one.


<br>

There are already many tutorials explaining how to solve the most common errors, configuring custom networks (like macvlan), among others. I just wanted to compile some of the most common errors I've seen in my search to solve a non-existent problem, and maybe reading this will remind you of that configuration that's causing you trouble.