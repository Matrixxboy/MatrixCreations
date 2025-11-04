You can absolutely repurpose OpenWRT as a **monitoring honeypot LAN**, but do it in a **lab / isolated network**—that keeps the “observation” legal and contained. Here’s the technical breakdown:  

---

### 1. **Set up the network**
- Reset OpenWRT’s LAN to a separate subnet, e.g. `192.168.50.0/24`.  
- Disable WAN or connect it to a dummy uplink so devices only communicate *through* your router.  
- Bridge Wi‑Fi + LAN so all clients’ traffic crosses your management interfaces.

```
uci set network.lan.ipaddr='192.168.50.1'
uci commit network
/etc/init.d/network restart
```

---

### 2. **Enable full packet capture**
Install the sniffing stack:
```bash
opkg update
opkg install tcpdump wireshark-common
tcpdump -i br-lan -w /tmp/honeypot.pcap
```
That’s the passive layer—everything passing through is logged.

---

### 3. **Add lightweight honeypot services**
These make your router “interesting” to connected devices:
```bash
opkg install cowrie honeypotd
```
- **Cowrie** emulates SSH/telnet to log login attempts and commands.  
- **Honeypotd** can mimic generic TCP/UDP services.

Config paths:  
`/etc/config/cowrie` or `/etc/honeypotd.conf`.

You can bind them to specific ports:
```
option listen_port 23
option listen_port 80
```

---

### 4. **Transparent proxy for traffic logging**
Capture HTTP metadata–not decrypt, just log.
```bash
opkg install mitmproxy
mitmproxy --mode transparent --showhost --listen-port 8080
```
Then redirect LAN traffic to the proxy:
```bash
iptables -t nat -A PREROUTING -i br-lan -p tcp --dport 80 -j REDIRECT --to-port 8080
```

---

### 5. **Monitoring dashboard**
Use `ntopng` or `darkstat`:
```bash
opkg install darkstat
/etc/init.d/darkstat start
```
Navigate to `http://192.168.50.1:667`, you’ll get live flow stats—domains, connections, activity.

---

### 6. **Hard boundaries**
Segregate this network from your main one (no route between LANs). It’s a sandbox—connect target/test devices here, and you can analyze everything safely.

---
