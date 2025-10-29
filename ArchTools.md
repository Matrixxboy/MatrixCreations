# 1) Core network discovery & scanning — **why:** find hosts, open ports, services, topology. ([sectools.org][1])

Recommended tools:

* `nmap` — host/port/service discovery, scripting engine.
* `masscan` — very fast large-scale port scanning.
* `zenmap` (optional GUI for nmap).

Install:

```bash
sudo pacman -S --needed nmap masscan zenmap
```

# 2) Packet capture & analysis — **why:** capture traffic, inspect protocols, debug networks. ([blackarch.org][2])

Recommended tools:

* `tcpdump` — lightweight CLI packet capture.
* `wireshark-qt` — full-featured GUI packet analyzer (use with root privileges carefully).

Install:

```bash
sudo pacman -S --needed tcpdump wireshark-qt
```

# 3) Wireless auditing & Wi-Fi troubleshooting — **why:** monitor, inject, crack (for lab testing), and debug Wi-Fi networks. ([blackarch.org][3])

Recommended tools:

* `aircrack-ng` (suite) — monitor, capture, crack WPA/WEP (use only on networks you own/are authorized to test).
* `airmon-ng`, `airodump-ng` are included in that suite.

Install:

```bash
sudo pacman -S --needed aircrack-ng
```

# 4) Man-in-the-Middle & proxying — **why:** inspect and modify HTTP/S traffic for debugging, testing.

Recommended tools:

* `mitmproxy` — interactive HTTP/HTTPS intercepting proxy.
* `bettercap` — active network MITM framework (ARP/MDNS/DNS spoofing + more).

Install:

```bash
sudo pacman -S --needed mitmproxy bettercap
```

# 5) Packet crafting, raw testing & troubleshooting — **why:** send custom packets, test IDS, simulate attacks safely for learning.

Recommended tools:

* `hping` — craft TCP/IP packets, traceroute-like tests.
* `nping` (from nmap) / `scapy` — flexible packet crafting in Python.

Install:

```bash
sudo pacman -S --needed hping scapy
```

# 6) Recon & enumeration (OSINT, service fingerprinting) — **why:** gather targets, fingerprint services, enumerations. ([blackarch.org][4])

Recommended tools:

* `masscan` (already above), `amass` (DNS/host discovery), `whatweb` or `httprobe`.

Install:

```bash
sudo pacman -S --needed amass whatweb
```

# 7) Tunneling / pivoting / port forwarding — **why:** build test tunnels, SSH pivots, reverse shells (for lab/CTF use).

Recommended tools:

* `socat`, `ssh` (built-in), `openvpn` if you need VPN testing.
  Install:

```bash
sudo pacman -S --needed socat openvpn
```

# 8) Helpful tiny utilities (Swiss-army)

* `netcat-openbsd` (`nc`) — quick TCP/UDP listener and client.
* `traceroute`, `mtr` — route/path troubleshooting.

Install:

```bash
sudo pacman -S --needed netcat-openbsd traceroute mtr
```

---

## Quick one-line to install the curated starter set

(Installs only useful tools above; safe and small compared to installing whole groups)

```bash
sudo pacman -Syu
sudo pacman -S --needed nmap masscan tcpdump wireshark-qt aircrack-ng mitmproxy bettercap hping scapy amass whatweb socat openvpn netcat-openbsd traceroute mtr
```

## Tips & safety

* Only test networks you own or have explicit permission to test. Misuse is illegal.
* Wireshark GUI runs as root on Linux only if you configure dumpcap permissions; prefer running capture as root and analysis as a normal user.
* For wireless injection/monitor mode, use a compatible adapter (monitor-mode + packet injection) — `aircrack-ng` docs list compatible chipsets. ([blackarch.org][3])

[1]: https://sectools.org/?utm_source=chatgpt.com "SecTools.Org Top Network Security Tools"
[2]: https://blackarch.org/sniffer.html?utm_source=chatgpt.com "Sniffer tools"
[3]: https://blackarch.org/networking.html?utm_source=chatgpt.com "Networking tools"
[4]: https://blackarch.org/recon.html?utm_source=chatgpt.com "Recon tools"
