## OC_RULER (Openclash) Rule Providers

Menyediakan rule_provider untuk openclash berdasarkan data dari v2fly

```
Cek ./index.json untuk melihat daftar domain
```

## Cara Pakai

1. Ubah file **`config.yaml`** yang kamu punya.
2. Salin script dibawah ini, lalu letakkan di bawah barisan **`proxy_groups`** (baris dibawah ini hanya contoh, selebihnya silahkan improvisasi sendiri)

   ```
   # Rule Providers
   # Check time conversion here https://www.timecalculator.net/hours-to-seconds
   rule-providers:
     Whatsapp:
       type: http
       behavior: classical
       path: "./rule_provider/Whatsapp.yaml"
       url: https://raw.githubusercontent.com/dickymuliafiqri/oc_ruler/master/data/whatsapp.yaml
       interval: 86400 # Update rules every 24 hours
     1337x:
       type: http
       behavior: classical
       path: "./rule_provider/1337x.yaml"
       url: https://raw.githubusercontent.com/dickymuliafiqri/oc_ruler/master/data/1337x.yaml
       interval: 86400 # Update rules every 24 hours
   rules:
   # Rules before match global
   - RULE-SET,Whatsapp,DIRECT
   - RULE-SET,1337x,DIRECT
   # Listen all connections to GLOBAL proxy
   - MATCH,GLOBAL
   ```

3. Buka **`OpenClash > Settings > General Settings`** lalu atur seperti contoh di bawah ini

   ![image](https://user-images.githubusercontent.com/20932301/174243963-ae34021c-570d-4847-b693-9ed733ae18b3.png)

4. Lalu tekan tombol **`ENABLE OPENCLASH`** di bagian bawah halaman Overview OpenClash

## Credits

- https://github.com/blackmatrix7/ios_rule_script/tree/master/rule/Clash
- https://github.com/zzzt27/clashBlock
- https://github.com/MasterWifiNetworkSolution/PLATINUM-OPENCLASH
- https://github.com/hillz2/openclash_adblock
- https://github.com/v2fly/domain-list-community
- https://github.com/helmiau/clashrules
