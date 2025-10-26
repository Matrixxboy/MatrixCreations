# Fake Wi‑Fi + captive‑portal combo  (it’s funny, techy, and harmless if you keep it local.)

---

### **1. Setup**
Install the basics:
```bash
sudo pacman -Syu hostapd dnsmasq lighttpd php
```

You’ll make a fake SSID and DHCP/DNS service, then redirect all traffic to your local “portal”.

---

### **2. Wi‑Fi access point (hostapd.conf)**
Create `/etc/hostapd/hostapd.conf`:
```
interface=wlan0
driver=nl80211
ssid=Free_Cafe_WiFi
hw_mode=g
channel=6
auth_algs=1
ignore_broadcast_ssid=0
```

Launch it:
```bash
sudo hostapd /etc/hostapd/hostapd.conf
```

---

### **3. DHCP + DNS redirection (dnsmasq.conf)**
Create `/etc/dnsmasq.conf`:
```
interface=wlan0
dhcp-range=192.168.5.50,192.168.5.150,12h
dhcp-option=3,192.168.5.1
dhcp-option=6,192.168.5.1
address=/#/192.168.5.1
```

Start dnsmasq:
```bash
sudo systemctl start dnsmasq
```

---

### **4. Static IP for wlan0**
```bash
sudo ip addr add 192.168.5.1/24 dev wlan0
```

---

### **5. Local webserver (lighttpd + PHP)**
```bash
sudo systemctl enable lighttpd --now
sudo systemctl enable php-fpm --now
```

Put your “login” or **prank page** at `/srv/http/index.html`:

```html
<html>
<head><title>Welcome</title></head>
<body style="text-align:center;font-family:sans-serif;">
<h1>Please log in to access Free_Cafe_WiFi</h1>
<form><input placeholder="Username"><br><input type="password" placeholder="Password"><br></form>
<p><a href="https://www.youtube.com/watch?v=dQw4w9WgXcQ">Continue</a></p>
</body>
</html>
```

---

### **6. Run it**
Launch all services, connect a device — it’ll show your fake Wi‑Fi and redirect everything to your page.  
Congrats, you’ve made a ghost network.

---
