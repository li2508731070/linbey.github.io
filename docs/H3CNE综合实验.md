# H3CNE综合实验

[TOC]

## 实验拓扑

![76253644893](C:\Users\Lenovo\AppData\Local\Temp\1762536448939.png)

---

## 实验需求

1. 按照图示配置 IP 地址
2. SW1 和 SW2 之间的直连链路配置链路聚合
3. 公司内部业务网段为 Vlan10 和 Vlan20；Vlan10 是市场部，
   Vlan20 是技术部，要求对 Vlan 进行命名以便识别；PC1 属于
   Vlan10，PC2 属于 Vlan20，Vlan30 用于 SW1 和 SW2 建立
   OSPF 邻居；Vlan111 为 SW1 和 R1 的互联 Vlan，Vlan222 为
   SW2 和 R2 的互联 Vlan
4. 所有交换机相连的端口配置为 Trunk，允许相关流量通过
5. 交换机连接 PC 的端口配置为边缘端口
6. 在 SW1 上配置 DHCP 服务，为 Vlan10 和 Vlan20 的 PC 动态
   分配 IP 地址、网关和 DNS 地址；要求 Vlan10 的网关
   是 192.168.1.252，Vlan20 的网关是 192.168.2.253
7. 按图示分区域配置 OSPF 实现公司内部网络全网互通，ABR 的
   环回口宣告进骨干区域；业务网段不允许出现协议报文
8. R1 上配置默认路由指向互联网，并引入到 OSPF
9. R1 通过双线连接到互联网，配置 PPP-MP，并配置双向 chap
   验证
10. 配置 EASY IP，只有业务网
    段 192.168.1.0/24 和 192.168.2.0/24 的数据流可以通过 R1 访
    问互联网
11. R1 开启 TELNET 远程管理，使用用户 abc 登录，密码 h3c1234567，
    只允许技术部远程管理 R1

---

## 实验配置

```javascript
1. 公司内部业务网段为 Vlan10 和 Vlan20；Vlan10 是市场部，Vlan20 是技术部，要求对 Vlan 进行命名以便识别；PC1 属于Vlan10，PC2 属于 Vlan20，Vlan30 用于 SW1 和 SW2 建立OSPF 邻居；Vlan111 为 SW1 和 R1 的互联 Vlan，Vlan222 为SW2 和 R2 的互联 Vlan
[SW1]vlan 10
[SW1-vlan10]name  SC
[SW1-vlan10]vlan 20
[SW1-vlan20]name JS
[SW1-vlan20]vlan 30
[SW1]vlan 111
---
[SW2]vlan 10
[SW2-vlan10]name  SC
[SW2-vlan10]VLAN 20
[SW2-vlan20]name JS
[SW2-vlan20]VLAN 30
[SW2]vlan 222
1. 所有交换机相连的端口配置为 Trunk，允许相关流量通过
[SW1]vlan 10 
[SW1-vlan10]vlan 20
[SW1-vlan20]vlan 30
[SW1]interface Bridge-Aggregation 1 
[SW1]int g1/0/2
[SW1-GigabitEthernet1/0/2]port link-aggregation  group 1
[SW1-GigabitEthernet1/0/2]int g1/0/4
[SW1-GigabitEthernet1/0/4]port link-aggregation  group 1
[SW1-Bridge-Aggregation1]port link-type trunk 
Configuring GigabitEthernet1/0/2 done.
Configuring GigabitEthernet1/0/4 done.
[SW1-Bridge-Aggregation1]port trunk permit vlan  10 20 30
Configuring GigabitEthernet1/0/2 done.
Configuring GigabitEthernet1/0/4 done.
[SW1-GigabitEthernet1/0/1]int g1/0/3
[SW1-GigabitEthernet1/0/3]port link-type trunk 
[SW1-GigabitEthernet1/0/3]port trunk permit vlan 10 20
---
[SW2]vlan 10 
[SW2-vlan10]vlan 20
[SW2-vlan20]vlan 30
[SW2]interface Bridge-Aggregation 1
[SW2]int g1/0/1
[SW2-GigabitEthernet1/0/1]port link-aggregation group 1
[SW2-GigabitEthernet1/0/1]int g1/0/4
[SW2-GigabitEthernet1/0/4]port link-aggregation group 1
[SW2]interface Bridge-Aggregation 1
[SW2-Bridge-Aggregation1]port link-type trunk 
Configuring GigabitEthernet1/0/1 done.
Configuring GigabitEthernet1/0/4 done.
[SW2-Bridge-Aggregation1]port trunk permit vlan 10 20 30
Configuring GigabitEthernet1/0/1 done.
Configuring GigabitEthernet1/0/4 done.
[SW2-GigabitEthernet1/0/2]int g1/0/3
[SW2-GigabitEthernet1/0/3]port link-type trunk 
[SW2-GigabitEthernet1/0/3]port trunk   permit vlan  10 20
    ---
[SW3-GigabitEthernet1/0/3]int g1/0/1
[SW3-GigabitEthernet1/0/1]port link-type trunk 
[SW3-GigabitEthernet1/0/1]port trunk permit vlan 10 20
[SW3-GigabitEthernet1/0/1]int g1/0/2
[SW3-GigabitEthernet1/0/2]port link-type trunk 
[SW3-GigabitEthernet1/0/2]port trunk permit vlan 10 20
====================================================================================
2. 按照图示配置 IP 地址
[R1]interface g0/0
[R1-GigabitEthernet0/0]ip ad 10.0.0.5 30
[R1-GigabitEthernet0/0]interface g0/1
[R1-GigabitEthernet0/1]ip ad 10.0.0.1 30
[R1-GigabitEthernet0/1]interface g0/2
[R1-GigabitEthernet0/2]ip ad 10.0.0.14 30
[R1-GigabitEthernet0/2]int l0
[R1-LoopBack0]ip ad 10.1.1.1 32
---
[R2]int g0/0
[R2-GigabitEthernet0/0]ip ad 10.0.0.9 30
[R2-GigabitEthernet0/0]int g0/1
[R2-GigabitEthernet0/1]ip ad 10.0.0.2 30
[R2-GigabitEthernet0/1]int g0/2
[R2-GigabitEthernet0/2]ip ad 10.0.0.18 30
[R2-GigabitEthernet0/2]int l0
[R2-LoopBack0]ip ad 10.1.1.2 32
---
[R3]int g0/0
[R3-GigabitEthernet0/0]ip ad 10.0.0.17 30
[R3-GigabitEthernet0/0]int g0/1
[R3-GigabitEthernet0/1]ip ad 192.168.3.254 24
[R3-GigabitEthernet0/1]int g0/2
[R3-GigabitEthernet0/2]ip ad 10.0.0.13 30
[R3-GigabitEthernet0/2]int l0 
[R3-LoopBack0]ip ad 10.1.1.3 32
---
[SW1]int vlan 10
[SW1-Vlan-interface10]ip ad 192.168.1.252 24
[SW1-Vlan-interface10]int vlan 20
[SW1-Vlan-interface20]ip ad 192.168.2.252 24
[SW1-Vlan-interface20]int vlan 30
[SW1-Vlan-interface30]ip ad 10.1.2.1 30
[SW1-vlan111]int vlan 111
[SW1-Vlan-interface111]ip ad 10.0.0.6 30
[SW1-vlan111]int g1/0/1
[SW1-GigabitEthernet1/0/1]port link-type access 
[SW1-GigabitEthernet1/0/1]vlan 111
[SW1-vlan111]port GigabitEthernet 1/0/1 
[SW1-vlan111]int l0
[SW1-LoopBack0]ip ad 10.1.1.11 32
---    
[SW2]int vlan 10
[SW2-Vlan-interface10]ip ad 192.168.1.253 24
[SW2-Vlan-interface10]int vlan 20
[SW2-Vlan-interface20]ip ad 192.168.2.253 24
[SW2-Vlan-interface20]int vlan 30
[SW2-Vlan-interface30]ip ad 10.1.2.2 30
[SW2-Vlan-interface30]int vlan 222
[SW2-Vlan-interface222]ip ad 10.0.0.10 30
[SW2]int g1/0/2
[SW2-GigabitEthernet1/0/2]port link-type access 
[SW2-GigabitEthernet1/0/2]vlan 222
[SW2-vlan222]port  GigabitEthernet 1/0/2
[SW2-vlan222]int l0
[SW2-LoopBack0]ip ad 10.1.1.12 32
====================================================================================
3. R1 通过双线连接到互联网，配置 PPP-MP，并配置双向 chap验证
[R1]interface MP-group 1
[R1-MP-group1]ip ad 202.100.1.2 30
[R1-MP-group1]int s1/0
[R1-Serial1/0]ppp mp  MP-group 1
[R1-Serial1/0]int s2/0
[R1-Serial2/0]ppp mp  MP-group 1
[R1]local-user INTERNET class network 
New local user added.
[R1-luser-network-INTERNET]password simple 123
[R1-luser-network-INTERNET]service-type ppp
[R1-luser-network-INTERNET]int s1/0
[R1-Serial1/0]ppp authentication-mode chap 
[R1-Serial1/0]ppp chap user R1 
[R1-Serial1/0]ppp chap  password  simple 456
[R1-Serial1/0]int s2/0
[R1-Serial2/0]ppp authentication-mode chap 
[R1-Serial2/0]ppp chap user R1 
[R1-Serial2/0]ppp chap  password  simple 456
---   
[INTERNET]int MP-group 1
[INTERNET-MP-group1]ip ad 202.100.1.1 30
[INTERNET]int s1/0
[INTERNET-Serial1/0]ppp mp MP-group 1
[INTERNET-Serial1/0]int s2/0
[INTERNET-Serial2/0]ppp mp MP-group 1
[INTERNET]local-user R1 class network 
New local user added.
[INTERNET-luser-network-R1]password simple 456
[INTERNET-luser-network-R1]service-type ppp 
[INTERNET-luser-network-R1]int s1/0
[INTERNET-Serial1/0]ppp authentication-mode  chap 
[INTERNET-Serial1/0]ppp chap user INTERNET 
[INTERNET-Serial1/0]ppp chap password simple 123
[INTERNET-Serial1/0]int s2/0
[INTERNET-Serial2/0]ppp chap user INTERNET 
[INTERNET-Serial2/0]ppp authentication-mode  chap 
[INTERNET-Serial2/0]ppp chap password simple 123   
====================================================================================   
4. 交换机连接 PC 的端口配置为边缘端口
[SW3-vlan30]int g1/0/3
[SW3-GigabitEthernet1/0/3]port access vlan 10 
[SW3-GigabitEthernet1/0/3]port link-type access 
[SW3-GigabitEthernet1/0/3]int g1/0/4
[SW3-GigabitEthernet1/0/3]stp edged-port
[SW3-GigabitEthernet1/0/4]port link-type access 
[SW3-GigabitEthernet1/0/4]port access vlan  20
[SW3-GigabitEthernet1/0/4]stp edged-port
====================================================================================
5. 在 SW1 上配置 DHCP 服务，为 Vlan10 和 Vlan20 的 PC 动态分配 IP 地址、网关和 DNS 地址；要求 Vlan10 的网关是 192.168.1.252，Vlan20 的网关是 192.168.2.253
[SW1]dhcp enable 
[SW1]dhcp server ip-pool 1
[SW1-dhcp-pool-1]network 192.168.1.0 24
[SW1-dhcp-pool-1]gateway-list 192.168.1.252
[SW1-dhcp-pool-1]dns-list 1.1.1.1 2.2.2.2
[SW1-dhcp-pool-1]expired day 1 
[SW1]dhcp server ip-pool  2
[SW1-dhcp-pool-2]network 192.168.2.0 24
[SW1-dhcp-pool-2]gateway-list  192.168.2.253
[SW1-dhcp-pool-2]dns-list 1.1.1.1 2.2.2.2
[SW1-dhcp-pool-2]expired day 1
====================================================================================
6. 按图示分区域配置 OSPF 实现公司内部网络全网互通，ABR 的环回口宣告进骨干区域；业务网段不允许出现协议报文
[R1]ospf 1
[R1-ospf-1]a 0
[R1-ospf-1-area-0.0.0.0]network  10.1.1.1 0.0.0.0
[R1-ospf-1-area-0.0.0.0]network  10.0.0.1 0.0.0.3
[R1-ospf-1-area-0.0.0.0]network  10.0.0.14 0.0.0.3
[R1-ospf-1]a 1
[R1-ospf-1-area-0.0.0.1]network  10.0.0.5 0.0.0.3
---
[R2]ospf 1
[R2-ospf-1]a 0
[R2-ospf-1-area-0.0.0.0]network  10.1.1.2 0.0.0.0
[R2-ospf-1-area-0.0.0.0]network  10.0.0.2 0.0.0.3
[R2-ospf-1-area-0.0.0.0]network  10.0.0.18 0.0.0.3
[R2-ospf-1]a 1
[R2-ospf-1-area-0.0.0.1]network  10.0.0.9 0.0.0.3
---    
[R3]ospf 1
[R3-ospf-1]a 0
[R3-ospf-1-area-0.0.0.0]network  10.0.0.17 0.0.0.3
[R3-ospf-1-area-0.0.0.0]network 10.0.0.13 0.0.0.3
[R3-ospf-1-area-0.0.0.0]network 10.1.1.3 0.0.0.0
[R3-ospf-1-area-0.0.0.0]network  192.168.3.0 0.0.0.255
---
[SW1]ospf 1
[SW1-ospf-1]a 1 
[SW1-ospf-1-area-0.0.0.1]network  10.1.1.11 0.0.0.0
[SW1-ospf-1-area-0.0.0.1]network  192.168.1.0 0.0.0.255
[SW1-ospf-1-area-0.0.0.1]network  192.168.2.0 0.0.0.255
[SW1-ospf-1-area-0.0.0.1]network  10.0.0.6 0.0.0.3
[SW1-ospf-1-area-0.0.0.1]network 10.1.2.1 0.0.0.3
[SW1-ospf-1]silent-interface Vlan-interface 10
[SW1-ospf-1]%Nov  7 03:07:52:841 2025 SW1 OSPF/5/OSPF_NBR_CHG: OSPF 1 Neighbor 192.168.1.253(Vlan-interface10) changed from FULL to DOWN.
[SW1-ospf-1]silent-interface Vlan-interface 20
[SW1-ospf-1]%Nov  7 03:07:55:150 2025 SW1 OSPF/5/OSPF_NBR_CHG: OSPF 1 Neighbor 192.168.2.253(Vlan-interface20) changed from FULL to DOWN.
---
[SW2-vlan222]ospf 1
[SW2-ospf-1] a 1
[SW2-ospf-1-area-0.0.0.1]network  10.1.1.12 0.0.0.0
[SW2-ospf-1-area-0.0.0.1]network  192.168.1.0 0.0.0.255
[SW2-ospf-1-area-0.0.0.1]network  192.168.2.0 0.0.0.255
[SW2-ospf-1-area-0.0.0.1]network  10.1.2.2 0.0.0.3
[SW2-ospf-1-area-0.0.0.1]network  10.0.0.10 0.0.0.3
[SW2-ospf-1]silent-interface Vlan-interface 10 
[SW2-ospf-1]%Nov  7 03:07:31:480 2025 SW2 OSPF/5/OSPF_NBR_CHG: OSPF 1 Neighbor 192.168.1.252(Vlan-interface10) changed from FULL to DOWN.
silent-interface Vlan-interface 20
[SW2-ospf-1]%Nov  7 03:07:34:720 2025 SW2 OSPF/5/OSPF_NBR_CHG: OSPF 1 Neighbor 192.168.2.252(Vlan-interface20) changed from FULL to DOWN.

====================================================================================  
7. R1 上配置默认路由指向互联网，并引入到 OSPF
[R1]ip route-static 0.0.0.0 0 202.100.1.1
[R1]ospf 1
[R1-ospf-1]default-route-advertise 
====================================================================================
8. 配置 EASY IP，只有业务网段 192.168.1.0/24 和 192.168.2.0/24 的数据流可以通过 R1 访问互联网
[R1]acl basic 2000
[R1-acl-ipv4-basic-2000]rule  permit source 192.168.1.0 0.0.0.255
[R1-acl-ipv4-basic-2000]rule  permit source 192.168.2.0 0.0.0.255
[R1]interface MP-group 1
[R1-MP-group1]nat outbound 2000
====================================================================================
9. R1 开启 TELNET 远程管理，使用用户 abc 登录，密码 abc，只允许技术部远程管理 R1
[R1]telnet server  enable 
[R1]line vty 0 4
[R1-line-vty0-4]authentication-mode scheme 
[R1]local-user abc class manage 
New local user added.
[R1-luser-manage-abc]password simple h3c1234567
[R1-luser-manage-abc]authorization-attribute user-role level-15
[R1-luser-manage-abc]service-type telnet
[R1]acl advanced 3000
[R1-acl-ipv4-adv-3000]rule 5 permit tcp source 192.168.2.0 0.0.0.255 destination-port eq telnet 
[R1]telnet server acl 3000
```

---

## 重要配置查看

```java
1.接口IP地址查看
<R1>display ip interface brief 
*down: administratively down
(s): spoofing  (l): loopback
Interface           Physical Protocol IP address/Mask    VPN instance Description  
GE0/0               up       up       10.0.0.5/30        --           --
GE0/1               up       up       10.0.0.1/30        --           --
GE0/2               up       up       10.0.0.14/30       --           --
GE5/0               down     down     --                 --           --
GE5/1               down     down     --                 --           --
GE6/0               down     down     --                 --           --
GE6/1               down     down     --                 --           --
Loop0               up       up(s)    10.1.1.1/32        --           --
MP1                 up       up       202.100.1.2/30     --           --
Ser1/0              up       up       --                 --           --
Ser2/0              up       up       --                 --           --
Ser3/0              down     down     --                 --           --
Ser4/0              down     down     --                 --           --
---
<R2>display ip interface brief
*down: administratively down
(s): spoofing  (l): loopback
Interface           Physical Protocol IP address/Mask    VPN instance Description  
GE0/0               up       up       10.0.0.9/30        --           --
GE0/1               up       up       10.0.0.2/30        --           --
GE0/2               up       up       10.0.0.18/30       --           --
GE5/0               down     down     --                 --           --
GE5/1               down     down     --                 --           --
GE6/0               down     down     --                 --           --
GE6/1               down     down     --                 --           --
Loop0               up       up(s)    10.1.1.2/32        --           --
Ser1/0              down     down     --                 --           --
Ser2/0              down     down     --                 --           --
Ser3/0              down     down     --                 --           --
Ser4/0              down     down     --                 --           --
---
<R3>display ip interface brief
*down: administratively down
(s): spoofing  (l): loopback
Interface           Physical Protocol IP address/Mask    VPN instance Description  
GE0/0               up       up       10.0.0.17/30       --           --
GE0/1               up       up       192.168.3.254/24   --           --
GE0/2               up       up       10.0.0.13/30       --           --
GE5/0               down     down     --                 --           --
GE5/1               down     down     --                 --           --
GE6/0               down     down     --                 --           --
GE6/1               down     down     --                 --           --
Loop0               up       up(s)    10.1.1.3/32        --           --
Ser1/0              down     down     --                 --           --
Ser2/0              down     down     --                 --           --
Ser3/0              down     down     --                 --           --
Ser4/0              down     down     --                 --           --
---
<SW1>display ip interface brief
*down: administratively down
(s): spoofing  (l): loopback
Interface                Physical Protocol IP Address      Description 
Loop0                    up       up(s)    10.1.1.11       --
MGE0/0/0                 down     down     --              --
Vlan10                   up       up       192.168.1.252   --
Vlan20                   up       up       192.168.2.252   --
Vlan30                   up       up       10.1.2.1        --
Vlan111                  up       up       10.0.0.6        --
---
<SW2>display ip interface brief
*down: administratively down
(s): spoofing  (l): loopback
Interface                Physical Protocol IP Address      Description 
Loop0                    up       up(s)    10.1.1.12       --
MGE0/0/0                 down     down     --              --
Vlan10                   up       up       192.168.1.253   --
Vlan20                   up       up       192.168.2.253   --
Vlan30                   up       up       10.1.2.2        --
Vlan222                  up       up       10.0.0.10       --
---
<SW3>display ip interface brief
*down: administratively down
(s): spoofing  (l): loopback
Interface                Physical Protocol IP Address      Description 
MGE0/0/0                 down     down     --              --
---
<INTERNET>display ip interface brief
*down: administratively down
(s): spoofing  (l): loopback
Interface           Physical Protocol IP address/Mask    VPN instance Description  
GE0/0               down     down     --                 --           --
GE0/1               down     down     --                 --           --
GE0/2               down     down     --                 --           --
GE5/0               down     down     --                 --           --
GE5/1               down     down     --                 --           --
GE6/0               down     down     --                 --           --
GE6/1               down     down     --                 --           --
MP1                 up       up       202.100.1.1/30     --           --
Ser1/0              up       up       --                 --           --
Ser2/0              up       up       --                 --           --
Ser3/0              down     down     --                 --           --
Ser4/0              down     down     --                 --           --
=======================================================================
2.VLAN查看
<SW1>display vlan brief 
Brief information about all VLANs:
Supported Minimum VLAN ID: 1
Supported Maximum VLAN ID: 4094
Default VLAN ID: 1
VLAN ID   Name                             Port
1         VLAN 0001                        BAGG1  FGE1/0/53  FGE1/0/54  
                                           GE1/0/2  GE1/0/3  GE1/0/4  GE1/0/5  
                                           GE1/0/6  GE1/0/7  GE1/0/8  GE1/0/9  
                                           GE1/0/10  GE1/0/11  GE1/0/12  
                                           GE1/0/13  GE1/0/14  GE1/0/15  
                                           GE1/0/16  GE1/0/17  GE1/0/18  
                                           GE1/0/19  GE1/0/20  GE1/0/21  
                                           GE1/0/22  GE1/0/23  GE1/0/24  
                                           GE1/0/25  GE1/0/26  GE1/0/27  
                                           GE1/0/28  GE1/0/29  GE1/0/30  
                                           GE1/0/31  GE1/0/32  GE1/0/33  
                                           GE1/0/34  GE1/0/35  GE1/0/36  
                                           GE1/0/37  GE1/0/38  GE1/0/39  
                                           GE1/0/40  GE1/0/41  GE1/0/42  
                                           GE1/0/43  GE1/0/44  GE1/0/45  
                                           GE1/0/46  GE1/0/47  GE1/0/48  
                                           XGE1/0/49  XGE1/0/50  XGE1/0/51  
                                           XGE1/0/52  
10        SC                               BAGG1  GE1/0/2  GE1/0/3  GE1/0/4  
20        JS                               BAGG1  GE1/0/2  GE1/0/3  GE1/0/4  
30        VLAN 0030                        BAGG1  GE1/0/2  GE1/0/4  
111       VLAN 0111                        GE1/0/1  
---
<SW2>display vlan brief 
Brief information about all VLANs:
Supported Minimum VLAN ID: 1
Supported Maximum VLAN ID: 4094
Default VLAN ID: 1
VLAN ID   Name                             Port
1         VLAN 0001                        BAGG1  FGE1/0/53  FGE1/0/54  
                                           GE1/0/1  GE1/0/3  GE1/0/4  GE1/0/5  
                                           GE1/0/6  GE1/0/7  GE1/0/8  GE1/0/9  
                                           GE1/0/10  GE1/0/11  GE1/0/12  
                                           GE1/0/13  GE1/0/14  GE1/0/15  
                                           GE1/0/16  GE1/0/17  GE1/0/18  
                                           GE1/0/19  GE1/0/20  GE1/0/21  
                                           GE1/0/22  GE1/0/23  GE1/0/24  
                                           GE1/0/25  GE1/0/26  GE1/0/27  
                                           GE1/0/28  GE1/0/29  GE1/0/30  
                                           GE1/0/31  GE1/0/32  GE1/0/33  
                                           GE1/0/34  GE1/0/35  GE1/0/36  
                                           GE1/0/37  GE1/0/38  GE1/0/39  
                                           GE1/0/40  GE1/0/41  GE1/0/42  
                                           GE1/0/43  GE1/0/44  GE1/0/45  
                                           GE1/0/46  GE1/0/47  GE1/0/48  
                                           XGE1/0/49  XGE1/0/50  XGE1/0/51  
                                           XGE1/0/52  
10        SC                               BAGG1  GE1/0/1  GE1/0/3  GE1/0/4  
20        JS                               BAGG1  GE1/0/1  GE1/0/3  GE1/0/4  
30        VLAN 0030                        BAGG1  GE1/0/1  GE1/0/4  
222       VLAN 0222                        GE1/0/2  
---
<SW3>display vlan brief 
Brief information about all VLANs:
Supported Minimum VLAN ID: 1
Supported Maximum VLAN ID: 4094
Default VLAN ID: 1
VLAN ID   Name                             Port
1         VLAN 0001                        FGE1/0/53  FGE1/0/54  GE1/0/1  
                                           GE1/0/2  GE1/0/5  GE1/0/6  GE1/0/7  
                                           GE1/0/8  GE1/0/9  GE1/0/10  
                                           GE1/0/11  GE1/0/12  GE1/0/13  
                                           GE1/0/14  GE1/0/15  GE1/0/16  
                                           GE1/0/17  GE1/0/18  GE1/0/19  
                                           GE1/0/20  GE1/0/21  GE1/0/22  
                                           GE1/0/23  GE1/0/24  GE1/0/25  
                                           GE1/0/26  GE1/0/27  GE1/0/28  
                                           GE1/0/29  GE1/0/30  GE1/0/31  
                                           GE1/0/32  GE1/0/33  GE1/0/34  
                                           GE1/0/35  GE1/0/36  GE1/0/37  
                                           GE1/0/38  GE1/0/39  GE1/0/40  
                                           GE1/0/41  GE1/0/42  GE1/0/43  
                                           GE1/0/44  GE1/0/45  GE1/0/46  
                                           GE1/0/47  GE1/0/48  XGE1/0/49  
                                           XGE1/0/50  XGE1/0/51  XGE1/0/52  
10        SC                               GE1/0/1  GE1/0/2  GE1/0/3  
20        JS                               GE1/0/1  GE1/0/2  GE1/0/4  
30        VLAN 0030                       
=======================================================================
3.DHCP查看
<SW1>display  dhcp server ip-in-use 
IP address       Client identifier/    Lease expiration      Type
                 Hardware address
192.168.1.1      0032-3661-352e-3735-  Nov  9 01:31:58 2025  Auto(C)            
                 6462-2e30-3830-362d-                                           
                 4745-302f-302f-31                                              
192.168.2.1      0032-3661-352e-3736-  Nov  9 01:32:06 2025  Auto(C)            
                 6633-2e30-3930-362d-                                           
                 4745-302f-302f-31                                              
<SW1>display  dhcp server statistics 
    Pool number:                       2
    Pool utilization:                  0.78%
    Bindings:
      Automatic:                       2
      Manual:                          0
      Expired:                         0
    Conflict:                          0
    Messages received:                 4
      DHCPDISCOVER:                    2
      DHCPREQUEST:                     2
      DHCPDECLINE:                     0
      DHCPRELEASE:                     0
      DHCPINFORM:                      0
      BOOTPREQUEST:                    0
    Messages sent:                     4
      DHCPOFFER:                       2
      DHCPACK:                         2
      DHCPNAK:                         0
      BOOTPREPLY:                      0
    Bad Messages:                      0
<SW1>display  dhcp server pool 
Pool name: 1
  Network: 192.168.1.0 mask 255.255.255.0 
  dns-list 1.1.1.1 2.2.2.2 
  expired day 1 hour 0 minute 0 second 0
  reserve expired-ip enable
  reserve expired-ip mode client-id time 4294967295 limit 256000
  gateway-list 192.168.1.252 
Pool name: 2
  Network: 192.168.2.0 mask 255.255.255.0 
  dns-list 1.1.1.1 2.2.2.2 
  expired day 1 hour 0 minute 0 second 0
  reserve expired-ip enable
  reserve expired-ip mode client-id time 4294967295 limit 256000
  gateway-list 192.168.2.253 
=======================================================================
4.OSPF邻居
<R1>display  ospf peer 

         OSPF Process 1 with Router ID 10.1.1.1
               Neighbor Brief Information

 Area: 0.0.0.0        
 Router ID       Address         Pri Dead-Time  State             Interface
 10.1.1.2        10.0.0.2        1   34         Full/DR           GE0/1
 10.1.1.3        10.0.0.13       1   34         Full/DR           GE0/2

 Area: 0.0.0.1        
 Router ID       Address         Pri Dead-Time  State             Interface
 10.1.1.11       10.0.0.6        1   37         Full/DR           GE0/0
---
<R2>display  ospf peer 

         OSPF Process 1 with Router ID 10.1.1.2
               Neighbor Brief Information

 Area: 0.0.0.0        
 Router ID       Address         Pri Dead-Time  State             Interface
 10.1.1.1        10.0.0.1        1   30         Full/BDR          GE0/1
 10.1.1.3        10.0.0.17       1   38         Full/DR           GE0/2

 Area: 0.0.0.1        
 Router ID       Address         Pri Dead-Time  State             Interface
 10.1.1.12       10.0.0.10       1   33         Full/BDR          GE0/0
---
[R3-ospf-1-area-0.0.0.0] display  ospf peer 

         OSPF Process 1 with Router ID 10.1.1.3
               Neighbor Brief Information

 Area: 0.0.0.0        
 Router ID       Address         Pri Dead-Time  State             Interface
 10.1.1.2        10.0.0.18       1   38         Full/BDR          GE0/0
 10.1.1.1        10.0.0.14       1   38         Full/BDR          GE0/2
---
<SW1>display  ospf peer 

         OSPF Process 1 with Router ID 10.1.1.11
               Neighbor Brief Information

 Area: 0.0.0.1        
 Router ID       Address         Pri Dead-Time  State             Interface
 10.1.1.12       10.1.2.2        1   32         Full/DR           Vlan30
 10.1.1.1        10.0.0.5        1   30         Full/BDR          Vlan111
 ---
 <SW2>display  ospf peer 

         OSPF Process 1 with Router ID 10.1.1.12
               Neighbor Brief Information

 Area: 0.0.0.1        
 Router ID       Address         Pri Dead-Time  State             Interface
 10.1.1.11       10.1.2.1        1   40         Full/BDR          Vlan30
 10.1.1.2        10.0.0.9        1   39         Full/DR           Vlan222
=======================================================================
5.NAT查看
<R1>display nat all
NAT outbound information:
  Totally 1 NAT outbound rules.
  Interface: MP-group1
    ACL: 2000
    Address group ID: ---    
    Port-preserved: N        NO-PAT: N  Reversible: N
    NAT counting: 0
    Config status: Active

NAT logging:
  Log enable          : Disabled
  Flow-begin          : Disabled
  Flow-end            : Disabled
  Flow-active         : Disabled
  Port-block-assign   : Disabled
  Port-block-withdraw : Disabled
  Alarm               : Disabled
  NO-PAT IP usage     : Disabled

NAT mapping behavior:
  Mapping mode : Address and Port-Dependent
  ACL          : ---
  Config status: Active
               
NAT ALG:
  DNS        : Enabled
  FTP        : Enabled
  H323       : Disabled
  ICMP-ERROR : Enabled
  ILS        : Disabled
  MGCP       : Disabled
  NBT        : Disabled
  PPTP       : Enabled
  RTSP       : Enabled
  RSH        : Disabled
  SCCP       : Disabled
  SIP        : Disabled
  SQLNET     : Disabled
  TFTP       : Disabled
  XDMCP      : Disabled

Static NAT load balancing:     Disabled

NAT link-switch recreate-session: Disabled
=======================================================================
6.IP路由表
[R1-acl-ipv4-adv-3000]dis ip routing-table 

Destinations : 31       Routes : 32

Destination/Mask   Proto   Pre Cost        NextHop         Interface
0.0.0.0/0          Static  60  0           202.100.1.1     MP1
0.0.0.0/32         Direct  0   0           127.0.0.1       InLoop0
10.0.0.0/30        Direct  0   0           10.0.0.1        GE0/1
10.0.0.1/32        Direct  0   0           127.0.0.1       InLoop0
10.0.0.3/32        Direct  0   0           10.0.0.1        GE0/1
10.0.0.4/30        Direct  0   0           10.0.0.5        GE0/0
10.0.0.5/32        Direct  0   0           127.0.0.1       InLoop0
10.0.0.7/32        Direct  0   0           10.0.0.5        GE0/0
10.0.0.8/30        O_INTRA 10  3           10.0.0.6        GE0/0
10.0.0.12/30       Direct  0   0           10.0.0.14       GE0/2
10.0.0.14/32       Direct  0   0           127.0.0.1       InLoop0
10.0.0.15/32       Direct  0   0           10.0.0.14       GE0/2
10.0.0.16/30       O_INTRA 10  2           10.0.0.2        GE0/1
                   O_INTRA 10  2           10.0.0.13       GE0/2
10.1.1.1/32        Direct  0   0           127.0.0.1       InLoop0
10.1.1.3/32        O_INTRA 10  1           10.0.0.13       GE0/2
10.1.1.11/32       O_INTRA 10  1           10.0.0.6        GE0/0
10.1.1.12/32       O_INTRA 10  2           10.0.0.6        GE0/0
10.1.2.0/30        O_INTRA 10  2           10.0.0.6        GE0/0
127.0.0.0/8        Direct  0   0           127.0.0.1       InLoop0
127.0.0.1/32       Direct  0   0           127.0.0.1       InLoop0
127.255.255.255/32 Direct  0   0           127.0.0.1       InLoop0
192.168.1.0/24     O_INTRA 10  2           10.0.0.6        GE0/0
192.168.2.0/24     O_INTRA 10  2           10.0.0.6        GE0/0
192.168.3.0/24     O_INTRA 10  2           10.0.0.13       GE0/2
202.100.1.0/30     Direct  0   0           202.100.1.2     MP1
202.100.1.1/32     Direct  0   0           202.100.1.1     MP1
202.100.1.2/32     Direct  0   0           127.0.0.1       InLoop0
202.100.1.3/32     Direct  0   0           202.100.1.2     MP1
224.0.0.0/4        Direct  0   0           0.0.0.0         NULL0
224.0.0.0/24       Direct  0   0           0.0.0.0         NULL0
255.255.255.255/32 Direct  0   0           127.0.0.1       InLoop0
---
<R2>dis ip routing-table

Destinations : 28       Routes : 29

Destination/Mask   Proto   Pre Cost        NextHop         Interface
0.0.0.0/0          O_ASE2  150 1           10.0.0.1        GE0/1
0.0.0.0/32         Direct  0   0           127.0.0.1       InLoop0
10.0.0.0/30        Direct  0   0           10.0.0.2        GE0/1
10.0.0.2/32        Direct  0   0           127.0.0.1       InLoop0
10.0.0.3/32        Direct  0   0           10.0.0.2        GE0/1
10.0.0.4/30        O_INTRA 10  3           10.0.0.10       GE0/0
10.0.0.8/30        Direct  0   0           10.0.0.9        GE0/0
10.0.0.9/32        Direct  0   0           127.0.0.1       InLoop0
10.0.0.11/32       Direct  0   0           10.0.0.9        GE0/0
10.0.0.12/30       O_INTRA 10  2           10.0.0.1        GE0/1
                   O_INTRA 10  2           10.0.0.17       GE0/2
10.0.0.16/30       Direct  0   0           10.0.0.18       GE0/2
10.0.0.18/32       Direct  0   0           127.0.0.1       InLoop0
10.0.0.19/32       Direct  0   0           10.0.0.18       GE0/2
10.1.1.1/32        O_INTRA 10  1           10.0.0.1        GE0/1
10.1.1.2/32        Direct  0   0           127.0.0.1       InLoop0
10.1.1.3/32        O_INTRA 10  1           10.0.0.17       GE0/2
10.1.1.11/32       O_INTRA 10  2           10.0.0.10       GE0/0
10.1.1.12/32       O_INTRA 10  1           10.0.0.10       GE0/0
10.1.2.0/30        O_INTRA 10  2           10.0.0.10       GE0/0
127.0.0.0/8        Direct  0   0           127.0.0.1       InLoop0
127.0.0.1/32       Direct  0   0           127.0.0.1       InLoop0
127.255.255.255/32 Direct  0   0           127.0.0.1       InLoop0
192.168.1.0/24     O_INTRA 10  2           10.0.0.10       GE0/0
192.168.2.0/24     O_INTRA 10  2           10.0.0.10       GE0/0
192.168.3.0/24     O_INTRA 10  2           10.0.0.17       GE0/2
224.0.0.0/4        Direct  0   0           0.0.0.0         NULL0
224.0.0.0/24       Direct  0   0           0.0.0.0         NULL0
255.255.255.255/32 Direct  0   0           127.0.0.1       InLoop0
---
<R3>dis ip routing-table

Destinations : 27       Routes : 31

Destination/Mask   Proto   Pre Cost        NextHop         Interface
0.0.0.0/0          O_ASE2  150 1           10.0.0.14       GE0/2
0.0.0.0/32         Direct  0   0           127.0.0.1       InLoop0
10.0.0.0/30        O_INTRA 10  2           10.0.0.14       GE0/2
                   O_INTRA 10  2           10.0.0.18       GE0/0
10.0.0.4/30        O_INTER 10  2           10.0.0.14       GE0/2
10.0.0.8/30        O_INTER 10  2           10.0.0.18       GE0/0
10.0.0.12/30       Direct  0   0           10.0.0.13       GE0/2
10.0.0.13/32       Direct  0   0           127.0.0.1       InLoop0
10.0.0.15/32       Direct  0   0           10.0.0.13       GE0/2
10.0.0.16/30       Direct  0   0           10.0.0.17       GE0/0
10.0.0.17/32       Direct  0   0           127.0.0.1       InLoop0
10.0.0.19/32       Direct  0   0           10.0.0.17       GE0/0
10.1.1.1/32        O_INTRA 10  1           10.0.0.14       GE0/2
10.1.1.3/32        Direct  0   0           127.0.0.1       InLoop0
10.1.1.11/32       O_INTER 10  2           10.0.0.14       GE0/2
10.1.1.12/32       O_INTER 10  2           10.0.0.18       GE0/0
10.1.2.0/30        O_INTER 10  3           10.0.0.14       GE0/2
                   O_INTER 10  3           10.0.0.18       GE0/0
127.0.0.0/8        Direct  0   0           127.0.0.1       InLoop0
127.0.0.1/32       Direct  0   0           127.0.0.1       InLoop0
127.255.255.255/32 Direct  0   0           127.0.0.1       InLoop0
192.168.1.0/24     O_INTER 10  3           10.0.0.14       GE0/2
                   O_INTER 10  3           10.0.0.18       GE0/0
192.168.2.0/24     O_INTER 10  3           10.0.0.14       GE0/2
                   O_INTER 10  3           10.0.0.18       GE0/0
192.168.3.0/24     Direct  0   0           192.168.3.254   GE0/1
192.168.3.254/32   Direct  0   0           127.0.0.1       InLoop0
192.168.3.255/32   Direct  0   0           192.168.3.254   GE0/1
224.0.0.0/4        Direct  0   0           0.0.0.0         NULL0
224.0.0.0/24       Direct  0   0           0.0.0.0         NULL0
255.255.255.255/32 Direct  0   0           127.0.0.1       InLoop0
---
<SW1>dis ip routing-table

Destinations : 34       Routes : 35

Destination/Mask   Proto   Pre Cost        NextHop         Interface
0.0.0.0/0          O_ASE2  150 1           10.0.0.5        Vlan111
0.0.0.0/32         Direct  0   0           127.0.0.1       InLoop0
10.0.0.0/30        O_INTER 10  2           10.0.0.5        Vlan111
10.0.0.4/30        Direct  0   0           10.0.0.6        Vlan111
10.0.0.4/32        Direct  0   0           10.0.0.6        Vlan111
10.0.0.6/32        Direct  0   0           127.0.0.1       InLoop0
10.0.0.7/32        Direct  0   0           10.0.0.6        Vlan111
10.0.0.8/30        O_INTRA 10  2           10.1.2.2        Vlan30
10.0.0.12/30       O_INTER 10  2           10.0.0.5        Vlan111
10.0.0.16/30       O_INTER 10  3           10.0.0.5        Vlan111
                                           10.1.2.2        Vlan30
10.1.1.1/32        O_INTER 10  1           10.0.0.5        Vlan111
10.1.1.3/32        O_INTER 10  2           10.0.0.5        Vlan111
10.1.1.11/32       Direct  0   0           127.0.0.1       InLoop0
10.1.1.12/32       O_INTRA 10  1           10.1.2.2        Vlan30
10.1.2.0/30        Direct  0   0           10.1.2.1        Vlan30
10.1.2.0/32        Direct  0   0           10.1.2.1        Vlan30
10.1.2.1/32        Direct  0   0           127.0.0.1       InLoop0
10.1.2.3/32        Direct  0   0           10.1.2.1        Vlan30
127.0.0.0/8        Direct  0   0           127.0.0.1       InLoop0
127.0.0.0/32       Direct  0   0           127.0.0.1       InLoop0
127.0.0.1/32       Direct  0   0           127.0.0.1       InLoop0
127.255.255.255/32 Direct  0   0           127.0.0.1       InLoop0
192.168.1.0/24     Direct  0   0           192.168.1.252   Vlan10
192.168.1.0/32     Direct  0   0           192.168.1.252   Vlan10
192.168.1.252/32   Direct  0   0           127.0.0.1       InLoop0
192.168.1.255/32   Direct  0   0           192.168.1.252   Vlan10
192.168.2.0/24     Direct  0   0           192.168.2.252   Vlan20
192.168.2.0/32     Direct  0   0           192.168.2.252   Vlan20
192.168.2.252/32   Direct  0   0           127.0.0.1       InLoop0
192.168.2.255/32   Direct  0   0           192.168.2.252   Vlan20
192.168.3.0/24     O_INTER 10  3           10.0.0.5        Vlan111
224.0.0.0/4        Direct  0   0           0.0.0.0         NULL0
224.0.0.0/24       Direct  0   0           0.0.0.0         NULL0
255.255.255.255/32 Direct  0   0           127.0.0.1       InLoop0
---
<SW2>dis ip routing-table

Destinations : 34       Routes : 36

Destination/Mask   Proto   Pre Cost        NextHop         Interface
0.0.0.0/0          O_ASE2  150 1           10.1.2.1        Vlan30
0.0.0.0/32         Direct  0   0           127.0.0.1       InLoop0
10.0.0.0/30        O_INTER 10  2           10.0.0.9        Vlan222
10.0.0.4/30        O_INTRA 10  2           10.1.2.1        Vlan30
10.0.0.8/30        Direct  0   0           10.0.0.10       Vlan222
10.0.0.8/32        Direct  0   0           10.0.0.10       Vlan222
10.0.0.10/32       Direct  0   0           127.0.0.1       InLoop0
10.0.0.11/32       Direct  0   0           10.0.0.10       Vlan222
10.0.0.12/30       O_INTER 10  3           10.0.0.9        Vlan222
                                           10.1.2.1        Vlan30
10.0.0.16/30       O_INTER 10  2           10.0.0.9        Vlan222
10.1.1.1/32        O_INTER 10  2           10.0.0.9        Vlan222
                                           10.1.2.1        Vlan30
10.1.1.3/32        O_INTER 10  2           10.0.0.9        Vlan222
10.1.1.11/32       O_INTRA 10  1           10.1.2.1        Vlan30
10.1.1.12/32       Direct  0   0           127.0.0.1       InLoop0
10.1.2.0/30        Direct  0   0           10.1.2.2        Vlan30
10.1.2.0/32        Direct  0   0           10.1.2.2        Vlan30
10.1.2.2/32        Direct  0   0           127.0.0.1       InLoop0
10.1.2.3/32        Direct  0   0           10.1.2.2        Vlan30
127.0.0.0/8        Direct  0   0           127.0.0.1       InLoop0
127.0.0.0/32       Direct  0   0           127.0.0.1       InLoop0
127.0.0.1/32       Direct  0   0           127.0.0.1       InLoop0
127.255.255.255/32 Direct  0   0           127.0.0.1       InLoop0
192.168.1.0/24     Direct  0   0           192.168.1.253   Vlan10
192.168.1.0/32     Direct  0   0           192.168.1.253   Vlan10
192.168.1.253/32   Direct  0   0           127.0.0.1       InLoop0
192.168.1.255/32   Direct  0   0           192.168.1.253   Vlan10
192.168.2.0/24     Direct  0   0           192.168.2.253   Vlan20
192.168.2.0/32     Direct  0   0           192.168.2.253   Vlan20
192.168.2.253/32   Direct  0   0           127.0.0.1       InLoop0
192.168.2.255/32   Direct  0   0           192.168.2.253   Vlan20
192.168.3.0/24     O_INTER 10  3           10.0.0.9        Vlan222
224.0.0.0/4        Direct  0   0           0.0.0.0         NULL0
224.0.0.0/24       Direct  0   0           0.0.0.0         NULL0
255.255.255.255/32 Direct  0   0           127.0.0.1       InLoop0
---
<SW3>dis ip routing-table

Destinations : 8        Routes : 8

Destination/Mask   Proto   Pre Cost        NextHop         Interface
0.0.0.0/32         Direct  0   0           127.0.0.1       InLoop0
127.0.0.0/8        Direct  0   0           127.0.0.1       InLoop0
127.0.0.0/32       Direct  0   0           127.0.0.1       InLoop0
127.0.0.1/32       Direct  0   0           127.0.0.1       InLoop0
127.255.255.255/32 Direct  0   0           127.0.0.1       InLoop0
224.0.0.0/4        Direct  0   0           0.0.0.0         NULL0
224.0.0.0/24       Direct  0   0           0.0.0.0         NULL0
255.255.255.255/32 Direct  0   0           127.0.0.1       InLoop0
---
<INTERNET>dis ip routing-table

Destinations : 11       Routes : 11

Destination/Mask   Proto   Pre Cost        NextHop         Interface
0.0.0.0/32         Direct  0   0           127.0.0.1       InLoop0
127.0.0.0/8        Direct  0   0           127.0.0.1       InLoop0
127.0.0.1/32       Direct  0   0           127.0.0.1       InLoop0
127.255.255.255/32 Direct  0   0           127.0.0.1       InLoop0
202.100.1.0/30     Direct  0   0           202.100.1.1     MP1
202.100.1.1/32     Direct  0   0           127.0.0.1       InLoop0
202.100.1.2/32     Direct  0   0           202.100.1.2     MP1
202.100.1.3/32     Direct  0   0           202.100.1.1     MP1
224.0.0.0/4        Direct  0   0           0.0.0.0         NULL0
224.0.0.0/24       Direct  0   0           0.0.0.0         NULL0
255.255.255.255/32 Direct  0   0           127.0.0.1       InLoop0
=======================================================================
7.连通性与Telnet测试
<H3C>ping 202.100.1.1
Ping 202.100.1.1 (202.100.1.1): 56 data bytes, press CTRL_C to break
56 bytes from 202.100.1.1: icmp_seq=0 ttl=253 time=6.619 ms
56 bytes from 202.100.1.1: icmp_seq=1 ttl=253 time=3.215 ms

<H3C>ping 202.100.1.2
Ping 202.100.1.2 (202.100.1.2): 56 data bytes, press CTRL_C to break
56 bytes from 202.100.1.2: icmp_seq=0 ttl=254 time=1.413 ms
56 bytes from 202.100.1.2: icmp_seq=1 ttl=254 time=1.264 ms

<H3C>ping 192.168.2.1
Ping 192.168.2.1 (192.168.2.1): 56 data bytes, press CTRL_C to break
56 bytes from 192.168.2.1: icmp_seq=0 ttl=254 time=2.729 ms
56 bytes from 192.168.2.1: icmp_seq=1 ttl=254 time=1.955 ms

<H3C>ping 192.168.3.1
Ping 192.168.3.1 (192.168.3.1): 56 data bytes, press CTRL_C to break
56 bytes from 192.168.3.1: icmp_seq=0 ttl=252 time=2.275 ms
56 bytes from 192.168.3.1: icmp_seq=1 ttl=252 time=2.280 ms

<H3C>telnet 202.100.1.2
Trying 202.100.1.2 ...
Press CTRL+K to abort
Connected to 202.100.1.2 ...
Failed to connect to the remote host! 
---
<H3C>ping 202.100.1.1
Ping 202.100.1.1 (202.100.1.1): 56 data bytes, press CTRL_C to break
56 bytes from 202.100.1.1: icmp_seq=0 ttl=253 time=1.668 ms
56 bytes from 202.100.1.1: icmp_seq=1 ttl=253 time=2.363 ms

<H3C>ping 202.100.1.2
Ping 202.100.1.2 (202.100.1.2): 56 data bytes, press CTRL_C to break
56 bytes from 202.100.1.2: icmp_seq=0 ttl=254 time=1.575 ms
56 bytes from 202.100.1.2: icmp_seq=1 ttl=254 time=1.825 ms


<H3C>ping 192.168.1.1
Ping 192.168.1.1 (192.168.1.1): 56 data bytes, press CTRL_C to break
56 bytes from 192.168.1.1: icmp_seq=0 ttl=254 time=1.903 ms
56 bytes from 192.168.1.1: icmp_seq=1 ttl=254 time=1.608 ms


<H3C>ping 192.168.3.1
Ping 192.168.3.1 (192.168.3.1): 56 data bytes, press CTRL_C to break
56 bytes from 192.168.3.1: icmp_seq=0 ttl=252 time=2.706 ms
56 bytes from 192.168.3.1: icmp_seq=1 ttl=252 time=2.008 ms

<H3C>telnet  202.100.1.2
Trying 202.100.1.2 ...
Press CTRL+K to abort
Connected to 202.100.1.2 ...

******************************************************************************
* Copyright (c) 2004-2021 New H3C Technologies Co., Ltd. All rights reserved.*
* Without the owner's prior written consent,                                 *
* no decompiling or reverse-engineering shall be allowed.                    *
******************************************************************************

Login: abc
Password: 
<R1>dir
Directory of flash: (VFAT)
   0 drw-           - Nov 07 2025 01:47:02   diagfile
   1 -rw-         286 Nov 07 2025 03:37:54   ifindex.dat
   2 -rw-       43136 Nov 07 2025 01:47:02   licbackup
   3 -rw-       43136 Nov 07 2025 01:47:02   licnormal
   4 drw-           - Nov 07 2025 01:47:02   logfile
   5 -rw-           0 Nov 07 2025 01:47:02   msr36-cmw710-boot-r0424p22.bin
   6 -rw-           0 Nov 07 2025 01:47:02   msr36-cmw710-system-r0424p22.bin
   7 drw-           - Nov 07 2025 01:47:02   seclog
   8 -rw-        3717 Nov 07 2025 03:37:54   startup.cfg
   9 -rw-       55116 Nov 07 2025 03:37:54   startup.mdb

1046512 KB total (1046340 KB free)
---
<H3C>ping 202.100.1.1
Ping 202.100.1.1 (202.100.1.1): 56 data bytes, press CTRL_C to break
Request time out
Request time out

<H3C>ping 202.100.1.2
Ping 202.100.1.2 (202.100.1.2): 56 data bytes, press CTRL_C to break
56 bytes from 202.100.1.2: icmp_seq=0 ttl=254 time=1.050 ms
56 bytes from 202.100.1.2: icmp_seq=1 ttl=254 time=0.885 ms

<H3C>ping 192.168.1.1
Ping 192.168.1.1 (192.168.1.1): 56 data bytes, press CTRL_C to break
56 bytes from 192.168.1.1: icmp_seq=0 ttl=252 time=2.541 ms
56 bytes from 192.168.1.1: icmp_seq=1 ttl=252 time=2.061 ms


<H3C>ping 192.168.2.1
Ping 192.168.2.1 (192.168.2.1): 56 data bytes, press CTRL_C to break
56 bytes from 192.168.2.1: icmp_seq=0 ttl=252 time=3.205 ms
56 bytes from 192.168.2.1: icmp_seq=1 ttl=252 time=2.244 ms

<H3C>telnet 202.100.1.2
Trying 202.100.1.2 ...
Press CTRL+K to abort
Connected to 202.100.1.2 ...
Failed to connect to the remote host! 
=======================================================================
8.acl查看
[R1-acl-ipv4-adv-3000]dis acl all
Basic IPv4 ACL 2000, 2 rules,
ACL's step is 5
 rule 0 permit source 192.168.1.0 0.0.0.255 (2 times matched)
 rule 5 permit source 192.168.2.0 0.0.0.255 (1 times matched)

Advanced IPv4 ACL 3000, 1 rule,
ACL's step is 5
 rule 5 permit tcp source 192.168.2.0 0.0.0.255 destination-port eq telnet (2 times matched)

```

---

## 附录

> ```c++
> 在其中的实验中遇见的问题及解决方法如下：
> 1.OSPF的建立出现了问题，SW1和SW2和各自的上行路由器之间无法建立OSPF邻居连接；
> 	a.使用了ping对端接口IP地址发现无法ping通
> 	b.在SW1、SW2上使用dis ip in br查看接口IP地址时，发现物理端口和协议双Down
> 2.在查询资料后，得到两种解决方式：
> 	a.将端口划入到VLAN中（即VLAN111和VLAN222）
> 	b.在接口上开启三层转发功能，再在接口上配置IP地址
> 3.在尝试了第二种方法后发现交换机支持不了，所以采用了第一种方法将上行与路由器连接的物理端口划入至VLAN中实    现了端口与协议的双UP,成功将OSPF的邻居建立起来
> ```