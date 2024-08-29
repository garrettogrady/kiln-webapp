import requests

access_token = 'YOUR_ACCESS_TOKEN'
instagram_account_id = 'YOUR_INSTAGRAM_ACCOUNT_ID'
post_id = 'POST_ID_YOU_WANT_METRICS_FOR'

url = f'https://graph.facebook.com/v17.0/{instagram_account_id}_{post_id}/insights'

params = {
    'metric': 'impressions,reach,engagement',
    'access_token': access_token
}

response = requests.get(url, params=params)

if response.status_code == 200:
    data = response.json()
    print(data)
else:
    print(f"Error: {response.status_code}, {response.text}")