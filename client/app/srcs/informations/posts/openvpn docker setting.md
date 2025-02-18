# openvpn docker setting

### run openvpn server
```bash
OVPN_DATA="ovpn-data-example"

docker volume create --name $OVPN_DATA
docker run -v $OVPN_DATA:/etc/openvpn --rm kylemanna/openvpn ovpn_genconfig -u udp://<공인 ip>
docker run -v $OVPN_DATA:/etc/openvpn --rm -it kylemanna/openvpn ovpn_initpki

docker run -v $OVPN_DATA:/etc/openvpn -d -p 1194:1194/udp --restart always --name openvpn --cap-add=NET_ADMIN kylemanna/openvpn
```

### gen client key
```bash
OVPN_DATA="ovpn-data-example"

docker run -v $OVPN_DATA:/etc/openvpn --rm -it kylemanna/openvpn easyrsa build-client-full CLIENT_NAME nopass
docker run -v $OVPN_DATA:/etc/openvpn --rm kylemanna/openvpn ovpn_getclient CLIENT_NAME > CLIENT_NAME.ovpn
```

### route 설정
```plain
##container 내 openvpn.conf

push "route <로컬 IP 범위> <로컬 아이피 서브넷>"
ex> "192.168.100.0 255.255.255.0"
```

### 포트포워딩
설정한 포트(예시에선 1194)로 포트 포워딩 되도록 공유기 서비스에서 설정

### 이후
openvpn 클라이언트 실행 후 로컬 IP로 접근