### 1️⃣ Grab the correct images  
Go to OpenWRT’s device page:  
👉 https://openwrt.org/toh/xiaomi/mi_router_4a_gigabit_edition  

Download:  
```
openwrt‑xx‑xx‑ramips‑mt7621‑xiaomi_mi-router-4a-gigabit‑initramfs‑kernel.bin   ← for first temporary boot
openwrt‑xx‑xx‑ramips‑mt7621‑xiaomi_mi-router-4a-gigabit‑sysupgrade.bin        ← for final flash
```
Replace xx‑xx with the current version tag.

---

### 2️⃣ Enable SSH on stock firmware  
Xiaomi locks this by default.

1. Visit https://d.miwifi.com/rom/ssh and log into your Xiaomi account.  
   It will give you an *SSH unlock tar* file with your root password inside (you need the router’s serial number).  
2. Upload that tar via the web UI (same place you’d do a firmware upgrade).  
3. After it reboots, SSH should open at `ssh root@192.168.31.1` (using the provided password).

---

### 3️⃣ Copy the *initramfs* image to /tmp  
```bash
scp openwrt‑...‑initramfs‑kernel.bin root@192.168.31.1:/tmp/
```

---

### 4️⃣ Boot OpenWRT temporarily from RAM  
SSH in and run:
```bash
mtd write /tmp/openwrt‑...‑initramfs‑kernel.bin firmware
reboot
```
This loads OpenWRT into RAM so you can flash properly without fear of eMMC corruption.

---

### 5️⃣ Upload the permanent *sysupgrade* image  
Once the router reboots (now serving 192.168.1.1):

```bash
scp openwrt‑...‑sysupgrade.bin root@192.168.1.1:/tmp/
ssh root@192.168.1.1
sysupgrade -n /tmp/openwrt‑...‑sysupgrade.bin
```
`-n` clears old configs; cleaner start.

---

### 6️⃣ Final check  
After reboot:
```bash
ssh root@192.168.1.1
```
Set a password, run `opkg update`.  
You now have a real Linux router ready for your lab tooling.



🔥 Perfect — congratulations, Champ! 🎉
That means your **OpenWRT flash was 100% successful** and the router is now running **pure OpenWRT firmware**.

---

### ✅ Next Essential Steps

#### 1. **Set a Root Password**

Go to:
**System → Administration → Router Password**
→ Enter a **strong root password**
→ Click **Save & Apply**

---

#### 2. **Enable SSH Access**

It’s usually already on, but verify:

* Go to **System → Administration → SSH Access**
* Confirm **"Interface" = LAN** and **"Port = 22"**
* Save if needed.

Now you can SSH directly from your PC:

```bash
ssh root@192.168.1.1
```

---

#### 3. **Connect to Internet (Optional for Packages)**

If your WAN (Internet) is connected:

* Go to **Network → Interfaces**
* Check that **WAN** gets an IP (usually via DHCP).
* Then test:

  ```bash
  ping openwrt.org
  ```

  If it works, you can install packages.

---

#### 4. **Update Package List**

```bash
opkg update
```

---

#### 5. **(Optional) Install LuCI Essentials**

If any page looks minimal:

```bash
opkg install luci-app-opkg luci-theme-material
```

---

#### 6. **Backup & Snapshot**

Once setup is stable:

```bash
sysupgrade -b /tmp/backup.tar.gz
```

Download `/tmp/backup.tar.gz` to your PC for safety.
