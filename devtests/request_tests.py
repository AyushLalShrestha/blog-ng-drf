import requests

headers = {
    'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',
    'Accept-Encoding': 'gzip, deflate, br',
    'Accept-Language': 'en-US,en;q=0.9,ne;q=0.8',
}

params = (
    ('username', 'admin'),
    ('password', 'changeme'),
)

# data = '{"username":"admin","password":"changeme"}'
response = requests.get('http://localhost:8000/user/login/', headers=headers, params=params)
jar = requests.cookies.RequestsCookieJar()
jar.update(response.cookies)
csrf_token = jar.get('csrftoken')
session_id = jar.get('sessionid')

cookies = {
    # 'csrftoken': csrf_token,
    'sessionid': session_id,
}

response_2 = requests.get('http://localhost:8000/whoami/', headers=headers, cookies=cookies)
print response_2.text
